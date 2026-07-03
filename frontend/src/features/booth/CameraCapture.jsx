import { useState, useCallback } from 'react'
import Webcam from 'react-webcam'
import { Camera, FlipHorizontal2, X, RefreshCw, Video, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useBoothStore } from '../../stores/boothStore'
import { useCamera } from '../../hooks/useCamera'
import { useCountdown } from '../../hooks/useCountdown'

export default function CameraCapture() {
 const { selectedTemplate, photos, addPhoto, retakePhoto, setStep } = useBoothStore()
 const {
 webcamRef, mirrored, toggleMirror, switchCamera, selectCamera,
 videoConstraints, error: cameraError,
 devices, isMobile, isTablet, isDesktop, hasMultipleCameras, currentDeviceLabel, facingMode, orientation,
 } = useCamera()
 const { count, isRunning, start } = useCountdown(3)
 const [flash, setFlash] = useState(false)
 const [showDevices, setShowDevices] = useState(false)

 const slots = selectedTemplate?.photo_slots || []
 const maxSlots = slots.length || 4
 const allDone = photos.length >= maxSlots

 const currentSlot = slots[photos.length] || slots[0] || { width: 490, height: 790 }
 const isPortrait = orientation === 'portrait'
 const isVerticalLayout = isPortrait && isMobile

 // Camera: natural aspect ratio, tidak dipaksa
 // Desktop: landscape 16:9 / 4:3 (tergantung webcam)
 // Mobile portrait: full height
 // Mobile landscape: full width
 const getCameraClass = () => {
 if (isDesktop) return 'aspect-video' // 16:9 natural webcam
 if (isMobile && isPortrait) return 'aspect-[3/4]' // portrait natural phone camera
 return 'aspect-video' // landscape
 }

 // Capture foto ASLI tanpa crop — object-fit: cover di preview/download yang handle
 const handleCapture = useCallback(() => {
 start(() => {
 const webcam = webcamRef.current
 if (!webcam) return
 const screenshot = webcam.getScreenshot()
 if (!screenshot) return

 setFlash(true)
 setTimeout(() => setFlash(false), 300)
 addPhoto(screenshot) // Simpan asli, tanpa crop
 })
 }, [start, addPhoto, webcamRef])

 return (
 <div className="max-w-5xl w-full">
 <div className={`flex ${isVerticalLayout ? 'flex-col' : 'flex-col lg:flex-row'} gap-6`}>
 {/* Camera viewport */}
 <div className={isVerticalLayout ? 'w-full' : 'flex-1'}>
 <div className="flex items-center justify-between mb-2">
 <p className="text-xs font-bold text-warm-gray">
 Slot {photos.length + 1}: {currentSlot.width}×{currentSlot.height}px
 </p>
 <div className="flex items-center gap-2">
 {devices.length > 1 && (
 <div className="relative">
 <button onClick={() => setShowDevices(!showDevices)}
 className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white border border-border-subtle text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors">
 <Video size={12} strokeWidth={2.5} />
 {currentDeviceLabel.length > 18 ? currentDeviceLabel.substring(0, 18) + '...' : currentDeviceLabel}
 <ChevronDown size={12} />
 </button>
 {showDevices && (
 <div className="absolute top-full right-0 mt-1 w-64 bg-white rounded-xl border border-border-subtle z-20 overflow-hidden">
 {devices.map((device, i) => (
 <button key={device.deviceId} onClick={() => { selectCamera(device.deviceId); setShowDevices(false) }}
 className="w-full text-left px-3 py-2.5 text-xs font-medium hover:bg-rose-50 border-b border-slate-100 last:border-0">
 {device.label || `Kamera ${i + 1}`}
 </button>
 ))}
 </div>
 )}
 </div>
 )}
 </div>
 </div>

 {cameraError && (
 <div className="mb-4 p-4 rounded-xl bg-red-50 border border-red-300 text-sm text-red-700 font-medium">{cameraError}</div>
 )}

 {/* Camera — natural, tidak dipaksa resolusi */}
 <div className={`relative rounded-xl overflow-hidden bg-slate-900 ${getCameraClass()} border border-border-subtle`}>
 <Webcam
 ref={webcamRef}
 mirrored={mirrored}
 screenshotFormat="image/jpeg"
 screenshotQuality={0.92}
 className="w-full h-full object-cover"
 videoConstraints={videoConstraints}
 />

 <AnimatePresence>
 {isRunning && count !== null && (
 <motion.div key={count} initial={{ scale: 1.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }} transition={{ duration: 0.4 }}
 className="absolute inset-0 flex items-center justify-center bg-slate-900/40">
 <span className="text-8xl font-extrabold text-white drop-shadow-lg">{count}</span>
 </motion.div>
 )}
 </AnimatePresence>

 {flash && <div className="absolute inset-0 bg-white animate-flash pointer-events-none" />}

 <div className="absolute top-4 left-4 bg-white/90 border border-border-subtle text-charcoal text-sm px-3 py-1.5 rounded-lg font-bold">
 Foto {Math.min(photos.length + 1, maxSlots)} dari {maxSlots}
 </div>

 <div className="absolute bottom-4 right-4 flex gap-2">
 <button onClick={toggleMirror}
 className="w-10 h-10 rounded-lg bg-white/90 border border-border-subtle text-charcoal flex items-center justify-center hover:bg-white transition-colors">
 <FlipHorizontal2 size={18} strokeWidth={2.5} />
 </button>
 {hasMultipleCameras && (
 <button onClick={switchCamera}
 className="w-10 h-10 rounded-lg bg-white/90 border border-border-subtle text-charcoal flex items-center justify-center hover:bg-white transition-colors">
 <RefreshCw size={18} strokeWidth={2.5} />
 </button>
 )}
 </div>

 {isMobile && (
 <div className="absolute top-4 right-4 bg-white/80 border border-slate-300 text-slate-700 text-[10px] px-2 py-1 rounded-md font-bold">
 {facingMode === 'user' ? 'Depan' : 'Belakang'}
 </div>
 )}
 </div>

 <p className="text-center text-[11px] text-slate-400 font-medium mt-2">
 Foto akan di-crop otomatis sesuai frame template saat download
 </p>

 <div className="flex justify-center mt-4">
 <button onClick={handleCapture} disabled={isRunning || allDone}
 className="w-16 h-16 rounded-full bg-dusty-pink text-white border border-border-subtle shadow-card hover:shadow-card-hover text-charcoal flex items-center justify-center disabled:opacity-40 disabled:shadow-none disabled:translate-x-0 disabled:translate-y-0 transition-all active:scale-95">
 <Camera size={28} strokeWidth={2.5} />
 </button>
 </div>
 </div>

 {/* Mini strip preview */}
 <div className={isVerticalLayout ? 'w-full' : 'lg:w-40'}>
 <p className="text-sm font-bold text-slate-700 mb-3">Foto tersimpan</p>
 <div className={`flex ${isVerticalLayout ? 'flex-row overflow-x-auto pb-2' : 'flex-wrap lg:flex-col'} gap-2`}>
 {slots.map((slot, i) => (
 <div key={i} className={`relative ${isVerticalLayout ? 'w-20 shrink-0' : 'w-16 lg:w-full'} rounded-lg overflow-hidden border border-border-subtle bg-white`}
 style={{ aspectRatio: slot.width / slot.height }}>
 {photos[i] ? (
 <>
 <img src={photos[i]} alt={`Foto ${i + 1}`} className="w-full h-full object-cover" />
 <button onClick={() => retakePhoto(i)}
 className="absolute top-1 right-1 w-5 h-5 rounded-md bg-slate-900/80 text-white flex items-center justify-center">
 <X size={12} strokeWidth={3} />
 </button>
 </>
 ) : (
 <div className="w-full h-full bg-rose-50 flex items-center justify-center">
 <Camera size={14} className="text-slate-300" />
 </div>
 )}
 <div className="absolute bottom-0 left-0 right-0 bg-slate-900/60 text-white text-[9px] font-bold text-center py-0.5">
 {slot.width}×{slot.height}
 </div>
 </div>
 ))}
 </div>

 <div className="mt-4 flex flex-col gap-2">
 <button onClick={() => setStep(1)} className="text-sm font-bold text-warm-gray hover:text-charcoal transition-colors">
 Ganti template
 </button>
 {allDone && (
 <button onClick={() => setStep(3)} className="text-sm font-bold text-rose-500 hover:text-rose-600 transition-colors">
 Lanjut Edit &rarr;
 </button>
 )}
 </div>
 </div>
 </div>
 </div>
 )
}
