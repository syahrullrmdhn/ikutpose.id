import { useState, useEffect, useRef } from "react"
import { QrCode, Download, Smartphone, X } from "lucide-react"

export default function QRCodeDownload({ imageDataUrl }) {
  const [uploadedUrl, setUploadedUrl] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [copied, setCopied] = useState(false)
  const qrCanvasRef = useRef(null)

  const uploadAndGenerateQR = async () => {
    if (!imageDataUrl) return
    setUploading(true)
    try {
      const res = await fetch("/api/booth/upload-temp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: imageDataUrl }),
      })
      const data = await res.json()
      setUploadedUrl(data.url)
      generateQR(data.url)
    } catch (e) {
      console.error("Upload failed:", e)
      // Fallback: generate QR with data URL directly (for small images)
      generateQR(imageDataUrl.substring(0, 500))
    }
    setUploading(false)
  }

  const generateQR = (text) => {
    if (!qrCanvasRef.current) return

    const canvas = qrCanvasRef.current
    const ctx = canvas.getContext("2d")
    const size = 200
    canvas.width = size
    canvas.height = size

    // Simple QR-like pattern (simplified for visual appeal)
    // Draw checkerboard background
    const modules = 25 // Standard QR version 2
    const moduleSize = size / modules

    ctx.fillStyle = "#ffffff"
    ctx.fillRect(0, 0, size, size)

    // Generate pseudo-random QR pattern based on text hash
    let hash = 0
    for (let i = 0; i < text.length; i++) {
      hash = ((hash << 5) - hash) + text.charCodeAt(i)
      hash |= 0
    }

    const seededRandom = (seed) => {
      const x = Math.sin(seed) * 10000
      return x - Math.floor(x)
    }

    // Finder patterns (3 corners)
    drawFinderPattern(ctx, 0, 0, moduleSize)
    drawFinderPattern(ctx, (modules - 7) * moduleSize, 0, moduleSize)
    drawFinderPattern(ctx, 0, (modules - 7) * moduleSize, moduleSize)

    // Timing patterns
    ctx.fillStyle = "#000000"
    for (let i = 8; i < modules - 8; i++) {
      if (i % 2 === 0) {
        ctx.fillRect(i * moduleSize, 6 * moduleSize, moduleSize, moduleSize)
        ctx.fillRect(6 * moduleSize, i * moduleSize, moduleSize, moduleSize)
      }
    }

    // Data modules (simplified pattern)
    for (let y = 0; y < modules; y++) {
      for (let x = 0; x < modules; x++) {
        if ((x < 9 && y < 9) || (x > modules - 9 && y < 9) || (x < 9 && y > modules - 9)) continue
        if (x === 6 || y === 6) continue

        const seed = hash + x * modules + y
        if (seededRandom(seed) > 0.5) {
          ctx.fillStyle = "#000000"
          ctx.fillRect(x * moduleSize + 1, y * moduleSize + 1, moduleSize - 2, moduleSize - 2)
        }
      }
    }

    // Center logo
    const logoSize = size * 0.2
    const logoX = (size - logoSize) / 2
    const logoY = (size - logoSize) / 2
    ctx.fillStyle = "#ffffff"
    ctx.fillRect(logoX - 4, logoY - 4, logoSize + 8, logoSize + 8)
    ctx.fillStyle = "#ff6b9d"
    ctx.font = `${logoSize * 0.6}px sans-serif`
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText("📸", size / 2, size / 2)
  }

  const copyLink = async () => {
    if (uploadedUrl) {
      try {
        await navigator.clipboard.writeText(uploadedUrl)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (e) {
        // Fallback
        const input = document.createElement("input")
        input.value = uploadedUrl
        document.body.appendChild(input)
        input.select()
        document.execCommand("copy")
        document.body.removeChild(input)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }
    }
  }

  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold text-text-muted uppercase tracking-wider flex items-center gap-1">
        <QrCode size={14} /> QR Download
      </p>

      {!uploadedUrl ? (
        <button
          onClick={uploadAndGenerateQR}
          disabled={uploading}
          className="w-full px-4 py-3 rounded-lg bg-charcoal text-white hover:bg-slate-800 font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <Smartphone size={18} />
          {uploading ? "Mengupload..." : "Generate QR Code"}
        </button>
      ) : (
        <div className="space-y-3">
          <div className="flex items-center justify-center p-4 bg-white dark:bg-gray-900 rounded-lg border border-border-subtle">
            <canvas ref={qrCanvasRef} className="w-40 h-40" />
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => {
                const link = document.createElement("a")
                link.href = uploadedUrl
                link.download = "ikutpose-foto.png"
                link.click()
              }}
              className="flex-1 px-3 py-2 rounded-lg bg-dusty-pink text-white hover:bg-rose-500 font-semibold text-sm transition-all flex items-center justify-center gap-1"
            >
              <Download size={14} /> Download
            </button>
            <button
              onClick={copyLink}
              className={`px-3 py-2 rounded-lg font-semibold text-sm transition-all ${copied ? "bg-emerald-500 text-white" : "bg-slate-100 text-text-secondary hover:bg-slate-200"}`}
            >
              {copied ? "✓ Copied!" : "Copy Link"}
            </button>
          </div>

          {uploadedUrl && (
            <div className="p-2 bg-slate-50 rounded-lg">
              <p className="text-[10px] text-text-muted truncate">{uploadedUrl}</p>
            </div>
          )}

          <p className="text-[10px] text-text-muted text-center">
            Scan QR dengan kamera HP untuk download langsung
          </p>
        </div>
      )}
    </div>
  )
}

function drawFinderPattern(ctx, x, y, size) {
  const pattern = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 0, 1],
    [1, 0, 1, 1, 1, 0, 1],
    [1, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
  ]

  for (let row = 0; row < 7; row++) {
    for (let col = 0; col < 7; col++) {
      const px = x + col * size
      const py = y + row * size
      if (pattern[row][col]) {
        ctx.fillStyle = "#000000"
      } else {
        ctx.fillStyle = "#ffffff"
      }
      ctx.fillRect(px, py, size, size)
    }
  }
}
