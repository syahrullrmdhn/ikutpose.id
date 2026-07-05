import { useState, useEffect, useRef } from 'react'
import { useBoothStore } from '../../stores/boothStore'
import { Download, Share2, RotateCcw, Loader2 } from 'lucide-react'
import Confetti from './Confetti'

function useSound() {
  const playSound = (type) => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)()
      const oscillator = ctx.createOscillator()
      const gainNode = ctx.createGain()
      oscillator.connect(gainNode)
      gainNode.connect(ctx.destination)
      switch (type) {
        case 'shutter':
          oscillator.type = 'square'
          oscillator.frequency.setValueAtTime(800, ctx.currentTime)
          oscillator.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.1)
          gainNode.gain.setValueAtTime(0.3, ctx.currentTime)
          gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1)
          oscillator.start(ctx.currentTime)
          oscillator.stop(ctx.currentTime + 0.1)
          break
        case 'sparkle':
          oscillator.type = 'sine'
          oscillator.frequency.setValueAtTime(1200, ctx.currentTime)
          oscillator.frequency.exponentialRampToValueAtTime(2400, ctx.currentTime + 0.3)
          gainNode.gain.setValueAtTime(0.15, ctx.currentTime)
          gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5)
          oscillator.start(ctx.currentTime)
          oscillator.stop(ctx.currentTime + 0.5)
          break
        case 'success':
          const notes = [523, 659, 784, 1047]
          notes.forEach((freq, i) => {
            const osc = ctx.createOscillator()
            const gain = ctx.createGain()
            osc.connect(gain)
            gain.connect(ctx.destination)
            osc.type = 'sine'
            osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.12)
            gain.gain.setValueAtTime(0.2, ctx.currentTime + i * 0.12)
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.12 + 0.2)
            osc.start(ctx.currentTime + i * 0.12)
            osc.stop(ctx.currentTime + i * 0.12 + 0.2)
          })
          break
        default: break
      }
    } catch (e) {}
  }
  return playSound
}

export default function ResultPreview() {
  const { photos, template, prevStep, reset } = useBoothStore()
  const { canvasRef, canvasReady } = useCanvas(photos, template)
  const [showConfetti, setShowConfetti] = useState(false)
  const [downloaded, setDownloaded] = useState(false)
  const playSound = useSound()

  useEffect(() => {
    playSound('success')
    setShowConfetti(true)
    const timer = setTimeout(() => setShowConfetti(false), 3000)
    return () => clearTimeout(timer)
  }, [playSound])

  const handleDownload = () => {
    if (!canvasRef.current || !canvasReady) return
    playSound('sparkle')
    const link = document.createElement('a')
    link.download = `ikutpose-${Date.now()}.png`
    link.href = canvasRef.current.toDataURL('image/png')
    link.click()
    setDownloaded(true)
  }

  const handleShare = async () => {
    if (!canvasRef.current || !canvasReady) return
    try {
      const blob = await new Promise(resolve => canvasRef.current.toBlob(resolve, 'image/png'))
      if (!blob) { handleDownload(); return }
      if (navigator.share) {
        await navigator.share({
          title: 'Foto dari ikutpose.id',
          text: 'Lihat foto photobooth aku!',
          files: [new File([blob], 'ikutpose.png', { type: 'image/png' })]
        })
      } else {
        handleDownload()
      }
    } catch (err) {
      handleDownload()
    }
  }

  const handleRetake = () => {
    reset()
    window.location.reload()
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {showConfetti && <Confetti />}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-card p-6 sm:p-8 space-y-6 relative overflow-hidden">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-dusty-pink/10 via-dusty-pink/20 to-dusty-pink/10 rounded-full">
            <h2 className="text-2xl font-bold text-text-primary">Foto Siap!</h2>
          </div>
          <p className="text-text-muted mt-2">Cantik banget hasilnya!</p>
        </div>

        <div className="relative">
          <div className="mx-auto max-w-sm shadow-2xl rounded-lg overflow-hidden ring-4 ring-white ring-offset-4 ring-offset-dusty-pink/10">
            <canvas ref={canvasRef} className="w-full" />
            {!canvasReady && (
              <div className="absolute inset-0 bg-white/60 dark:bg-gray-900/60 flex items-center justify-center">
                <Loader2 size={32} className="animate-spin text-dusty-pink" />
              </div>
            )}
          </div>
          <div className="absolute inset-0 -z-10 blur-3xl opacity-20 bg-dusty-pink rounded-full" />
        </div>

        <div className="flex justify-center gap-6 text-sm text-text-muted">
          <span>{template?.name || 'Photo Strip'}</span>
          <span>·</span>
          <span>{template?.canvas_width}×{template?.canvas_height}</span>
          <span>·</span>
          <span>{photos?.length || 4} foto</span>
        </div>

        <div className="grid grid-cols-2 sm:flex sm:gap-3 gap-2">
          <button
            onClick={handleDownload}
            disabled={!canvasReady}
            className={`col-span-2 sm:flex-1 px-4 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
              !canvasReady ? 'bg-slate-300 cursor-not-allowed text-white' :
              downloaded ? 'bg-emerald-500 text-white' : 'bg-dusty-pink hover:bg-rose-500 text-white'
            }`}
          >
            {!canvasReady ? <Loader2 size={20} className="animate-spin" /> : <Download size={20} />}
            {!canvasReady ? 'Menyiapkan...' : downloaded ? 'Tersimpan' : 'Download'}
          </button>
          <button
            onClick={handleShare}
            disabled={!canvasReady}
            className="flex-1 px-4 py-3 rounded-lg bg-charcoal hover:bg-slate-800 text-white font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Share2 size={20} /> Share
          </button>
          <button
            onClick={handleRetake}
            className="px-4 py-3 rounded-lg border border-border-subtle hover:border-border-default text-charcoal dark:text-gray-100 font-semibold transition-all flex items-center justify-center gap-2"
          >
            <RotateCcw size={20} />
          </button>
        </div>

        <button
          onClick={() => prevStep()}
          className="w-full text-center py-2 text-text-muted hover:text-charcoal dark:text-gray-100 transition-colors text-sm"
        >
          Kembali ke edit
        </button>
      </div>
    </div>
  )
}

function useCanvas(photos, template) {
  const canvasRef = useRef(null)
  const [canvasReady, setCanvasReady] = useState(false)

  useEffect(() => {
    if (!template || !photos?.length) return
    const canvas = canvasRef.current
    if (!canvas) return

    setCanvasReady(false)
    canvas.width = template.canvas_width
    canvas.height = template.canvas_height
    const ctx = canvas.getContext('2d')

    ctx.fillStyle = template.background_color || '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    const slots = template.photo_slots || []
    const isDuplikatStrip = slots.length === 6 && photos.length <= 3
    const slotPhotos = slots.map((_, i) => {
      if (isDuplikatStrip && i >= 3) return photos[i - 3] ?? null
      return photos[i] ?? null
    })

    const drawPhotoInSlot = (slot, src) => {
      return new Promise((resolve) => {
        if (!src) { resolve(); return }
        const img = new Image()
        img.crossOrigin = 'anonymous'
        img.onload = () => {
          ctx.save()
          drawRoundedRect(ctx, slot.x, slot.y, slot.width, slot.height, slot.borderRadius || 0)
          ctx.clip()
          const imgAspect = img.naturalWidth / img.naturalHeight
          const slotAspect = slot.width / slot.height
          let drawW, drawH, drawX, drawY
          if (imgAspect > slotAspect) {
            drawH = slot.height
            drawW = img.naturalWidth * (slot.height / img.naturalHeight)
            drawX = slot.x - (drawW - slot.width) / 2
            drawY = slot.y
          } else {
            drawW = slot.width
            drawH = img.naturalHeight * (slot.width / img.naturalWidth)
            drawX = slot.x
            drawY = slot.y - (drawH - slot.height) / 2
          }
          ctx.drawImage(img, drawX, drawY, drawW, drawH)
          ctx.restore()
          resolve()
        }
        img.onerror = resolve
        img.src = src
      })
    }

    const drawOverlay = (src) => {
      return new Promise((resolve) => {
        if (!src) { resolve(); return }
        const img = new Image()
        img.crossOrigin = 'anonymous'
        img.onload = () => { ctx.drawImage(img, 0, 0, canvas.width, canvas.height); resolve() }
        img.onerror = resolve
        img.src = src
      })
    }

    ;(async () => {
      await Promise.all(slots.map((slot, i) => drawPhotoInSlot(slot, slotPhotos[i])))
      if (template.overlay_image) {
        await drawOverlay(template.overlay_image)
      }
      setCanvasReady(true)
    })()
  }, [photos, template])

  return { canvasRef, canvasReady }
}

function drawRoundedRect(ctx, x, y, w, h, r) {
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
