import { useState, useRef, useEffect, useCallback } from "react"
import { Film, Play, Square, RotateCcw } from "lucide-react"
import { useBoothStore } from "../../stores/boothStore"

export default function GIFBoomerangMode() {
  const { addPhoto, photos, selectedTemplate } = useBoothStore()
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const [recording, setRecording] = useState(false)
  const [frames, setFrames] = useState([])
  const [mode, setMode] = useState("gif") // gif | boomerang
  const [countdown, setCountdown] = useState(null)
  const [gifUrl, setGifUrl] = useState(null)
  const streamRef = useRef(null)

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user", width: { ideal: 480 }, height: { ideal: 480 } }
        })
        if (videoRef.current) videoRef.current.srcObject = stream
        streamRef.current = stream
      } catch (err) {
        console.error("Camera error:", err)
      }
    }
    startCamera()
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop())
      }
    }
  }, [])

  const captureFrame = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return
    const canvas = canvasRef.current
    const video = videoRef.current
    const size = Math.min(video.videoWidth, video.videoHeight)
    canvas.width = 400
    canvas.height = 400
    const ctx = canvas.getContext("2d")
    ctx.drawImage(video, (video.videoWidth - size) / 2, (video.videoHeight - size) / 2, size, size, 0, 0, 400, 400)
    return canvas.toDataURL("image/jpeg", 0.7)
  }, [])

  const startRecording = () => {
    setFrames([])
    setGifUrl(null)
    setRecording(true)
    setCountdown(3)

    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(countdownInterval)
          setCountdown(null)
          startCapture()
          return null
        }
        return prev - 1
      })
    }, 800)
  }

  const startCapture = () => {
    const capturedFrames = []
    const totalFrames = 20
    let frameIndex = 0

    const interval = setInterval(() => {
      const frame = captureFrame()
      if (frame) capturedFrames.push(frame)
      frameIndex++

      if (frameIndex >= totalFrames) {
        clearInterval(interval)
        setRecording(false)

        let finalFrames = capturedFrames
        if (mode === "boomerang") {
          finalFrames = [...capturedFrames, ...capturedFrames.slice().reverse()]
        }

        setFrames(finalFrames)
        createGIF(finalFrames)
      }
    }, 150)
  }

  const createGIF = async (framesData) => {
    // For simplicity, create a canvas-based animated preview
    // GIF encoding would need a library like gif.js
    // Instead, we'll offer individual frames or a simple canvas animation
    const canvas = document.createElement("canvas")
    canvas.width = 400
    canvas.height = 400
    const ctx = canvas.getContext("2d")

    let currentFrame = 0
    const animate = () => {
      if (currentFrame >= framesData.length) currentFrame = 0
      const img = new Image()
      img.onload = () => {
        ctx.clearRect(0, 0, 400, 400)
        ctx.drawImage(img, 0, 0, 400, 400)
        currentFrame++
        setGifUrl(canvas.toDataURL("image/gif"))
      }
      img.src = framesData[currentFrame]
    }

    const animInterval = setInterval(animate, 150)
    setTimeout(() => clearInterval(animInterval), framesData.length * 150 + 500)
  }

  const stopRecording = () => {
    setRecording(false)
    setCountdown(null)
  }

  const saveGIF = () => {
    if (gifUrl) {
      const link = document.createElement("a")
      link.download = `ikutpose-${mode}-${Date.now()}.png`
      link.href = gifUrl
      link.click()
    }
  }

  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold text-text-muted uppercase tracking-wider flex items-center gap-1">
        <Film size={14} /> {mode === "gif" ? "GIF" : "Boomerang"} Mode
      </p>

      <div className="flex gap-2">
        <button onClick={() => setMode("gif")}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${mode === "gif" ? "bg-dusty-pink text-white" : "bg-slate-100 text-text-secondary"}`}>
          GIF Loop
        </button>
        <button onClick={() => setMode("boomerang")}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${mode === "boomerang" ? "bg-dusty-pink text-white" : "bg-slate-100 text-text-secondary"}`}>
          Boomerang
        </button>
      </div>

      <div className="relative bg-black rounded-lg overflow-hidden aspect-square">
        <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
        <canvas ref={canvasRef} className="hidden" />

        {countdown !== null && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="text-8xl font-bold text-white animate-bounce-in">{countdown}</span>
          </div>
        )}

        {gifUrl && (
          <img src={gifUrl} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
        )}
      </div>

      {frames.length > 0 && (
        <div className="text-xs text-text-muted text-center">
          {frames.length} frames captured · {mode === "boomerang" ? "Boomerang" : "Loop"} effect
        </div>
      )}

      <div className="flex gap-2">
        {!recording ? (
          <button onClick={startRecording}
            className="flex-1 px-4 py-2 rounded-lg bg-dusty-pink text-white hover:bg-rose-500 font-semibold transition-all flex items-center justify-center gap-2">
            <Play size={16} /> Record {mode === "gif" ? "GIF" : "Boomerang"}
          </button>
        ) : (
          <button onClick={stopRecording}
            className="flex-1 px-4 py-2 rounded-lg bg-red-500 text-white font-semibold transition-all flex items-center justify-center gap-2">
            <Square size={16} /> Stop
          </button>
        )}

        {gifUrl && (
          <button onClick={saveGIF}
            className="px-4 py-2 rounded-lg bg-charcoal text-white hover:bg-slate-800 font-semibold transition-all flex items-center gap-2">
            <RotateCcw size={16} /> Save
          </button>
        )}
      </div>
    </div>
  )
}
