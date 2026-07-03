import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Download, Share2, RotateCcw, Printer, ChevronDown, Lock } from 'lucide-react'
import { useBoothStore } from '../../stores/boothStore'
import { useAuthStore } from '../../stores/authStore'
import { PRINT_SIZES, generatePrintCanvas, downloadCanvas, printCanvas } from '../../utils/printHelper'

export default function ResultPreview() {
 const { photos, selectedTemplate, appliedFilter, appliedStickers, reset, setStep } = useBoothStore()
 const { isAuthenticated } = useAuthStore()
 const [printSize, setPrintSize] = useState(PRINT_SIZES[0])
 const [showSizePicker, setShowSizePicker] = useState(false)
 const [processing, setProcessing] = useState(false)

 const template = selectedTemplate
 const slots = template?.photo_slots || []
 const canvasW = template?.canvas_width || 600
 const canvasH = template?.canvas_height || 1800
 const previewWidth = 240
 const previewHeight = (canvasH / canvasW) * previewWidth

 const handleDownload = async (format = 'jpeg') => {
 if (!isAuthenticated) return
 setProcessing(true)
 try {
 const canvas = await generatePrintCanvas({
 photos, template, printSize,
 filter: appliedFilter, stickers: appliedStickers,
 overlaySrc: printSize?.overlay || null,
 })
 downloadCanvas(canvas, `ikutpose-${Date.now()}`, format)
 } catch (e) { console.error(e) }
 finally { setProcessing(false) }
 }

 const handlePrint = async () => {
 if (!isAuthenticated) return
 setProcessing(true)
 try {
 const canvas = await generatePrintCanvas({
 photos, template, printSize,
 filter: appliedFilter, stickers: appliedStickers,
 overlaySrc: printSize?.overlay || null,
 })
 printCanvas(canvas, printSize)
 } catch (e) { console.error(e) }
 finally { setProcessing(false) }
 }

 const handleShare = async () => {
 if (navigator.share) {
 await navigator.share({ title: 'IkutPose — Foto Saya', text: 'Lihat foto photobooth saya!', url: window.location.href })
 }
 }

 return (
 <div className="max-w-2xl w-full text-center">
 <h2 className="text-2xl font-extrabold mb-2">Foto Siap!</h2>
 <p className="text-warm-gray font-medium mb-6">{template?.name} &middot; {canvasW}×{canvasH}px &middot; {photos.length} foto</p>

 {/* Preview */}
 <div className="inline-block mb-6">
 <div className="bg-white rounded-xl border border-border-subtle shadow-card p-4">
 <div className="relative overflow-hidden rounded-md"
 style={{ width: previewWidth, height: previewHeight, backgroundColor: template?.background_color || '#f5f5f5', filter: appliedFilter?.css || 'none' }}>
 {slots.map((slot, i) => {
 if (!photos[i]) return null
 const scaleX = previewWidth / canvasW
 const scaleY = previewHeight / canvasH
 return (
 <div key={i} className="absolute overflow-hidden"
 style={{ left: slot.x * scaleX, top: slot.y * scaleY, width: slot.width * scaleX, height: slot.height * scaleY, borderRadius: (slot.borderRadius || 0) * Math.min(scaleX, scaleY) }}>
 <img src={photos[i]} alt={`Photo ${i + 1}`} className="w-full h-full object-cover" />
 </div>
 )
 })}
 {template?.overlay_image && <img src={template.overlay_image} alt="" className="absolute inset-0 w-full h-full pointer-events-none" style={{ objectFit: 'fill' }} onError={(e) => e.target.style.display = 'none'} />}
 </div>
 </div>
 <div className="mt-2 flex items-center justify-center gap-3 text-xs text-slate-400 font-medium">
 <span>{template?.layout?.replace('_', ' ')}</span><span>&middot;</span><span>{photos.length} foto</span>
 {appliedFilter && <><span>&middot;</span><span>{appliedFilter.name}</span></>}
 </div>
 </div>

 {/* Login required notice */}
 {!isAuthenticated && (
 <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-300 border-dashed max-w-sm mx-auto">
 <div className="flex items-center justify-center gap-2 mb-2">
 <Lock size={16} className="text-rose-500" />
 <p className="text-sm font-bold text-rose-700">Login diperlukan</p>
 </div>
 <p className="text-xs text-rose-600 mb-3">Masuk atau daftar untuk download dan cetak foto</p>
 <div className="flex gap-2 justify-center">
 <Link to="/login" className="px-5 py-2 rounded-lg bg-dusty-pink text-white border border-border-subtle shadow-card hover:shadow-card-hover text-charcoal font-bold text-sm transition-all">
 Login
 </Link>
 <Link to="/register" className="px-5 py-2 rounded-lg bg-white border border-border-subtle shadow-card hover:shadow-card-hover text-charcoal font-bold text-sm transition-all">
 Daftar
 </Link>
 </div>
 </div>
 )}

 {/* Print size selector */}
 {isAuthenticated && (
 <div className="mb-6">
 <p className="text-xs font-bold text-warm-gray uppercase tracking-wider mb-2">Ukuran Cetak</p>
 <div className="relative inline-block">
 <button onClick={() => setShowSizePicker(!showSizePicker)}
 className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-border-subtle shadow-card hover:shadow-card text-sm font-bold text-charcoal transition-all">
 {printSize.label}
 <ChevronDown size={16} className={`transition-transform ${showSizePicker ? 'rotate-180' : ''}`} />
 </button>
 {showSizePicker && (
 <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 bg-white rounded-xl border border-border-subtle shadow-card z-10 overflow-hidden">
 {PRINT_SIZES.map((size) => (
 <button key={size.id} onClick={() => { setPrintSize(size); setShowSizePicker(false) }}
 className={`w-full text-left px-4 py-3 text-sm font-medium hover:bg-rose-50 border-b border-slate-100 last:border-0 ${printSize.id === size.id ? 'bg-rose-100 font-bold' : ''}`}>
 <span className="text-charcoal">{size.label}</span>
 <span className="block text-xs text-slate-400 mt-0.5">{size.px_w} × {size.px_h} px @ 300 DPI{size.overlay ? ' + frame' : ''}</span>
 </button>
 ))}
 </div>
 )}
 </div>
 </div>
 )}

 {/* Action buttons */}
 <div className="flex flex-col sm:flex-row gap-3 justify-center">
 <button onClick={() => handleDownload('jpeg')} disabled={processing || !isAuthenticated}
 className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-dusty-pink text-white border border-border-subtle shadow-card hover:shadow-card text-charcoal font-bold transition-all disabled:opacity-40 disabled:shadow-none disabled:translate-x-0 disabled:translate-y-0">
 <Download size={18} strokeWidth={2.5} />
 {processing ? 'Memproses...' : 'Download JPG'}
 </button>
 <button onClick={handlePrint} disabled={processing || !isAuthenticated}
 className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-slate-900 text-white border border-border-subtle shadow-card hover:shadow-card font-bold transition-all disabled:opacity-40 disabled:shadow-none disabled:translate-x-0 disabled:translate-y-0">
 <Printer size={18} strokeWidth={2.5} />
 Cetak Foto
 </button>
 </div>

 <button onClick={() => { reset(); setStep(1) }}
 className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-charcoal transition-colors">
 <RotateCcw size={14} strokeWidth={2.5} />
 Foto Lagi
 </button>
 </div>
 )
}
