import { X, Camera, Settings, Zap, Layers } from 'lucide-react'
import { useState, useRef, useEffect, useCallback } from 'react'
import { useBoothStore } from '../../stores/boothStore'
import { OVERLAYS } from '../../data/filters'

export default function CameraControls({ onClose, onCapture, aspectRatio = 1, template, overlay }) {
  const videoRef = useRef(null)
  const [isMirror, setIsMirror] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState(null)
  const [timer, setTimer] = useState('off')
  const [filters, setFilters] = useState([])
  const [countdown, setCountdown] = useState(null)
  const [showOverlayPicker, setShowOverlayPicker] = useState(false)
  const countdownRef = useRef(null)
  
  const { appliedOverlay, setOverlay } = useBoothStore()

  useEffect(() => {
    fetch('/api/booth/filters')
      .then(r => r.json())
      .then(data => setFilters(Array.isArray(data) ? data : []))
      .catch(err => console.error(err))
  }, [])

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user', width: { ideal: 1920 }, height: { ideal: 1080 } }
        })
        if (videoRef.current) {
          videoRef.current.srcObject = stream
        }
      } catch (err) {
        console.error('Camera error:', err)
      }
    }
    startCamera()
    return () => {
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop())
      }
    }
  }, [])

  const handleCapture = useCallback(() => {
    if (!videoRef.current) return
    
    const video = videoRef.current
    const videoAspect = video.videoWidth / video.videoHeight
    
    let canvasWidth, canvasHeight, sx, sy, sw, sh
    
    if (Math.abs(aspectRatio - 1) < 0.1) {
      // Square target
      const minDim = Math.min(video.videoWidth, video.videoHeight)
      canvasWidth = minDim
      canvasHeight = minDim
      sw = minDim
      sh = minDim
      sx = (video.videoWidth - minDim) / 2
      sy = Math.max(0, (video.videoHeight - minDim) * 0.3)
    } else if (videoAspect > aspectRatio) {
      // Video wider - crop sides
      canvasHeight = video.videoHeight
      canvasWidth = canvasHeight * aspectRatio
      sh = video.videoHeight
      sw = sh * aspectRatio
      sx = (video.videoWidth - sw) / 2
      sy = 0
    } else {
      // Video taller - crop top/bottom
      canvasWidth = video.videoWidth
      canvasHeight = canvasWidth / aspectRatio
      sw = video.videoWidth
      sh = sw / aspectRatio
      sx = 0
      sy = Math.max(0, (video.videoHeight - sh) * 0.25)
    }
    
    const canvas = document.createElement('canvas')
    canvas.width = canvasWidth
    canvas.height = canvasHeight
    
    const ctx = canvas.getContext('2d')
    if (isMirror) {
      ctx.scale(-1, 1)
      ctx.translate(-canvas.width, 0)
    }
    
    ctx.drawImage(video, sx, sy, sw, sh, 0, 0, canvasWidth, canvasHeight)
    
    const dataUrl = canvas.toDataURL('image/png')
    onCapture(dataUrl, selectedFilter)
  }, [isMirror, selectedFilter, onCapture, aspectRatio])

  useEffect(() => {
    if (countdown === null || countdown <= 0) return
    countdownRef.current = setInterval(() => {
      setCountdown(prev => {
        if (prev === null || prev <= 1) {
          clearInterval(countdownRef.current)
          handleCapture()
          return null
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(countdownRef.current)
  }, [countdown, handleCapture])

  const startTimer = (seconds) => {
    if (seconds === 'off') {
      setTimer('off')
      setCountdown(null)
    } else {
      setTimer(seconds + 's')
      setCountdown(seconds)
    }
  }

  const getOverlaySrc = (ovl) => {
    if (!ovl || !ovl.svg) return null
    return 'data:image/svg+xml;base64,' + btoa(ovl.svg)
  }

  return (
    <div className="fixed inset-0 bg-black flex flex-col z-50">
      {/* Top Bar */}
      <div className="bg-black/70 backdrop-blur-sm px-6 py-4 flex items-center justify-between border-b border-white/10">
        <button onClick={onClose} className="w-10 h-10 rounded-lg bg-white dark:bg-gray-900/10 hover:bg-white dark:bg-gray-900/20 flex items-center justify-center transition-colors">
          <X size={20} className="text-white" />
        </button>
        <div className="flex gap-2">
          {['off', 3, 5, 10].map(t => (
            <button key={String(t)} onClick={() => startTimer(t)} className={`px-3 py-1 rounded-lg text-sm font-semibold transition-all ${timer === (t === 'off' ? 'off' : t + 's') ? 'bg-dusty-pink text-white' : 'bg-white dark:bg-gray-900/10 text-white/70 hover:bg-white dark:bg-gray-900/20'}`}>
              {t === 'off' ? 'Off' : t + 's'}
            </button>
          ))}
        </div>
        <div className="flex gap-3">
          <button onClick={() => setShowOverlayPicker(!showOverlayPicker)} className={`px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 ${appliedOverlay && appliedOverlay.id !== 'none' ? 'bg-dusty-pink text-white' : 'bg-white dark:bg-gray-900/10 text-white hover:bg-white dark:bg-gray-900/20'}`}>
            <Layers size={18} />
            Overlay
          </button>
          <button onClick={() => setIsMirror(!isMirror)} className={`px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 ${isMirror ? 'bg-dusty-pink text-white' : 'bg-white dark:bg-gray-900/10 text-white hover:bg-white dark:bg-gray-900/20'}`}>
            <Settings size={18} />
            Mirror {isMirror ? 'ON' : 'OFF'}
          </button>
          <button onClick={() => { setCountdown(null); handleCapture() }} className="px-6 py-2 rounded-lg bg-dusty-pink hover:bg-rose-500 text-white font-semibold transition-all flex items-center gap-2">
            <Camera size={20} />
            Capture
          </button>
        </div>
      </div>

      {/* Camera Preview */}
      <div className="flex-1 bg-black relative overflow-hidden flex items-center justify-center">
        <video ref={videoRef} autoPlay playsInline muted className={`h-full object-cover ${isMirror ? 'scale-x-[-1]' : ''}`} style={{ filter: selectedFilter?.css_filter || 'none' }} />
        
        {/* Aspect ratio guide - slot crop area */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="border-2 border-white/40 border-dashed" style={{ 
            aspectRatio: aspectRatio,
            height: '85%',
            maxWidth: '90%'
          }} />
        </div>

        {/* Glowing overlay preview (per-photo effect) */}
        {appliedOverlay && appliedOverlay.svg && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div style={{ 
              aspectRatio: aspectRatio,
              height: '85%',
              maxWidth: '90%',
              position: 'relative'
            }}>
              <img
                src={getOverlaySrc(appliedOverlay)}
                alt=""
                className="absolute inset-0 w-full h-full"
                style={{ objectFit: 'fill', mixBlendMode: 'screen', opacity: 0.7 }}
              />
            </div>
          </div>
        )}

        {/* DO NOT show template frame here - it's full canvas, we're capturing one slot */}
        
        {countdown !== null && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-9xl font-bold text-dusty-pink drop-shadow-2xl animate-pulse">{countdown}</div>
          </div>
        )}
      </div>

      {/* Bottom Controls */}
      <div className="bg-black/70 backdrop-blur-sm border-t border-white/10 p-4">
        {/* Overlay Picker */}
        {showOverlayPicker && (
          <div className="mb-4 bg-black/50 rounded-lg p-3 border border-white/20">
            <p className="text-white/60 text-xs font-semibold mb-2">PILIH OVERLAY (efek glowing per foto)</p>
            <div className="grid grid-cols-6 gap-2 max-h-32 overflow-y-auto">
              {OVERLAYS.slice(0, 12).map((ovl) => (
                <button
                  key={ovl.id}
                  onClick={() => setOverlay(ovl)}
                  className={`aspect-square rounded-lg overflow-hidden border transition-all ${
                    appliedOverlay?.id === ovl.id
                      ? 'border-dusty-pink ring-2 ring-dusty-pink/50'
                      : 'border-white/20 hover:border-white/40'
                  }`}
                >
                  <div className="w-full h-full bg-slate-800 relative">
                    {ovl.preview ? (
                      <div className="absolute inset-0" style={{ background: ovl.preview }} />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-white/40 text-[8px] font-bold">
                        None
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="mb-4">
          <p className="text-white/60 text-xs font-semibold mb-2">FILTERS</p>
          <div className="flex gap-2 overflow-x-auto pb-2">
            <button onClick={() => setSelectedFilter(null)} className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all flex-shrink-0 ${selectedFilter === null ? 'bg-dusty-pink text-white' : 'bg-white dark:bg-gray-900/10 text-white/70 hover:bg-white dark:bg-gray-900/20'}`}>
              None
            </button>
            {filters.map(filter => (
              <button key={filter.id} onClick={() => setSelectedFilter(filter)} className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all flex-shrink-0 flex items-center gap-2 ${selectedFilter?.id === filter.id ? 'bg-dusty-pink text-white' : 'bg-white dark:bg-gray-900/10 text-white/70 hover:bg-white dark:bg-gray-900/20'}`}>
                <Zap size={14} />
                {filter.name}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center text-white/60 text-xs">
          <div>
            <p className="font-semibold">Single Photo Capture</p>
            <p className="text-white/40">Slot ratio: {aspectRatio.toFixed(2)}:1 {template?.name && `• ${template.name}`}</p>
          </div>
          {appliedOverlay && appliedOverlay.id !== 'none' && (
            <div className="text-right">
              <p className="font-semibold text-dusty-pink">{appliedOverlay.name}</p>
              <p className="text-white/40">Glowing Effect</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
