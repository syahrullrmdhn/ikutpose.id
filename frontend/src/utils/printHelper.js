/**
 * Print utility untuk generate foto strip yang bisa dicetak di mesin cetak.
 *
 * Standar ukuran cetak foto:
 * - 4x6 inch (10x15cm) = 1200x1800px @ 300 DPI
 * - 2x6 inch (5x15cm)  = 600x1800px @ 300 DPI  (photo strip)
 * - 3.5x5 inch         = 1050x1500px @ 300 DPI
 *
 * Mesin cetak foto biasanya terima file JPEG/PNG dengan resolusi 300 DPI.
 */

const DPI = 300

export const PRINT_SIZES = [
  { id: 'photocard', label: 'Photocard 1200×1800', width: 4, height: 6, px_w: 1200, px_h: 1800, overlay: '/1200x1800.png' },
  { id: 'strip_2x6', label: 'Photo Strip 2×6 inch', width: 2, height: 6, px_w: 600, px_h: 1800 },
  { id: '4x6', label: 'Foto 4×6 inch (standar)', width: 4, height: 6, px_w: 1200, px_h: 1800 },
  { id: '3.5x5', label: 'Foto 3.5×5 inch', width: 3.5, height: 5, px_w: 1050, px_h: 1500 },
  { id: '5x7', label: 'Foto 5×7 inch', width: 5, height: 7, px_w: 1500, px_h: 2100 },
]

/**
 * Generate print-ready canvas dari foto-foto user + template.
 *
 * @param {Object} options
 * @param {string[]} options.photos - Array base64 photo data URLs
 * @param {Object} options.template - Template data dengan photo_slots
 * @param {Object} options.printSize - Ukuran cetak dari PRINT_SIZES
 * @param {Object|null} options.filter - CSS filter object
 * @param {Array} options.stickers - Applied stickers
 * @param {string|null} options.overlaySrc - Override overlay image source (e.g. photocard overlay)
 * @returns {HTMLCanvasElement}
 */
export function generatePrintCanvas({ photos, template, printSize, filter = null, stickers = [], overlaySrc = null }) {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  const W = printSize.px_w
  const H = printSize.px_h
  canvas.width = W
  canvas.height = H

  // Background putih
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, W, H)

  // Hitung scale factor dari template canvas ke print canvas
  const templateW = template?.canvas_width || 600
  const templateH = template?.canvas_height || 1800
  const scaleX = W / templateW
  const scaleY = H / templateH

  // Apply filter jika ada
  if (filter?.css) {
    ctx.filter = filter.css
  }

  // Draw foto-foto ke slot
  const slots = template?.photo_slots || getDefaultSlots(photos.length, templateW, templateH)

  return new Promise((resolve) => {
    const images = photos.map((src) => {
      return new Promise((res) => {
        const img = new Image()
        img.onload = () => res(img)
        img.onerror = () => res(null)
        img.src = src
      })
    })

    Promise.all(images).then((loadedImages) => {
      // Reset filter
      ctx.filter = 'none'

      // Layer 1: Background (jika ada)
      if (template?.background_color) {
        ctx.fillStyle = template.background_color
        ctx.fillRect(0, 0, W, H)
      }

      // Layer 2: Foto di slots
      loadedImages.forEach((img, i) => {
        if (!img || !slots[i]) return

        const slot = slots[i]
        const sx = slot.x * scaleX
        const sy = slot.y * scaleY
        const sw = slot.width * scaleX
        const sh = slot.height * scaleY
        const radius = (slot.borderRadius || 0) * Math.min(scaleX, scaleY)

        ctx.save()

        // Clip ke slot shape
        if (radius > 0) {
          roundRect(ctx, sx, sy, sw, sh, radius)
          ctx.clip()
        }

        // Object-fit: cover (fill slot completely, crop overflow)
        const imgRatio = img.width / img.height
        const slotRatio = sw / sh
        let drawW, drawH, drawX, drawY

        if (imgRatio > slotRatio) {
          // Image lebih lebar dari slot proporsinya → fit tinggi, crop horizontal
          drawH = sh
          drawW = sh * imgRatio
          drawX = sx + (sw - drawW) / 2
          drawY = sy
        } else {
          // Image lebih tinggi dari slot proporsinya → fit lebar, crop vertikal
          drawW = sw
          drawH = sw / imgRatio
          drawX = sx
          drawY = sy + (sh - drawH) / 2
        }

        ctx.drawImage(img, drawX, drawY, drawW, drawH)
        ctx.restore()
      })

      // Layer 3: Overlay (jika ada)
      const overlay = overlaySrc || template?.overlay_image
      if (overlay) {
        const overlayImg = new Image()
        overlayImg.onload = () => {
          ctx.drawImage(overlayImg, 0, 0, W, H)
          resolve(canvas)
        }
        overlayImg.onerror = () => resolve(canvas)
        overlayImg.src = overlay
      } else {
        resolve(canvas)
      }
    })
  })
}

/**
 * Generate default slots untuk template tanpa data slot
 */
function getDefaultSlots(count, canvasW, canvasH) {
  const margin = 40
  const gap = 20
  const slotW = canvasW - margin * 2
  const slotH = (canvasH - margin * 2 - gap * (count - 1)) / count

  return Array.from({ length: count }, (_, i) => ({
    x: margin,
    y: margin + i * (slotH + gap),
    width: slotW,
    height: slotH,
    borderRadius: 8,
  }))
}

/**
 * Helper: draw rounded rectangle path
 */
function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.lineTo(x + w - r, y)
  ctx.quadraticCurveTo(x + w, y, x + w, y + r)
  ctx.lineTo(x + w, y + h - r)
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
  ctx.lineTo(x + r, y + h)
  ctx.quadraticCurveTo(x, y + h, x, y + h - r)
  ctx.lineTo(x, y + r)
  ctx.quadraticCurveTo(x, y, x + r, y)
  ctx.closePath()
}

/**
 * Download canvas sebagai file PNG/JPEG
 */
export function downloadCanvas(canvas, filename = 'ikutpose-photo', format = 'jpeg', quality = 0.95) {
  const mimeType = format === 'png' ? 'image/png' : 'image/jpeg'
  const ext = format === 'png' ? '.png' : '.jpg'

  canvas.toBlob((blob) => {
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${filename}${ext}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, mimeType, quality)
}

/**
 * Print canvas langsung ke printer
 */
export function printCanvas(canvas, printSize) {
  const dataUrl = canvas.toDataURL('image/jpeg', 0.95)

  const printWindow = window.open('', '_blank')
  if (!printWindow) return false

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Cetak Foto - IkutPose</title>
      <style>
        @page {
          size: ${printSize.width}in ${printSize.height}in;
          margin: 0;
        }
        * { margin: 0; padding: 0; }
        body {
          display: flex;
          align-items: center;
          justify-content: center;
          width: ${printSize.width}in;
          height: ${printSize.height}in;
        }
        img {
          width: ${printSize.width}in;
          height: ${printSize.height}in;
          object-fit: contain;
        }
      </style>
    </head>
    <body>
      <img src="${dataUrl}" />
      <script>
        window.onload = function() {
          setTimeout(function() { window.print(); }, 300);
        };
      <\/script>
    </body>
    </html>
  `)
  printWindow.document.close()
  return true
}
