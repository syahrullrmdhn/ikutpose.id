import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { ArrowLeft } from 'lucide-react'
import client from '../../api/client'
import Navbar from '../../components/layout/Navbar'
import { useBoothStore } from '../../stores/boothStore'
import { useState } from 'react'
import { Frame, Grid3x3, Image, LayoutGrid, Camera, FlipHorizontal2, X, Sliders, Sticker, Type, Check, Download, RotateCcw, Printer, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Webcam from 'react-webcam'
import { useCamera } from '../../hooks/useCamera'
import { useCountdown } from '../../hooks/useCountdown'
import { PRINT_SIZES, generatePrintCanvas, downloadCanvas, printCanvas } from '../../utils/printHelper'
import { FILTERS, STICKERS, STICKER_CATEGORIES } from '../../data/filters'
import DraggableSticker from '../../components/shared/DraggableSticker'

const layoutFilters = [
 { key: 'all', label: 'Semua', icon: LayoutGrid },
 { key: 'strip', label: 'Strip', icon: Frame },
 { key: 'grid', label: 'Grid', icon: Grid3x3 },
 { key: 'single', label: 'Single', icon: Image },
]

export default function EventBoothPage() {
 const { slug } = useParams()
 const { step, setStep, selectedTemplate, setTemplate, photos, addPhoto, retakePhoto, appliedFilter, setFilter, appliedStickers, addSticker, updateSticker, removeSticker, reset } = useBoothStore()

 const { data: response, isLoading: eventLoading } = useQuery({
 queryKey: ['event', slug],
 queryFn: () => client.get(`/events/${slug}`).then((r) => r.data),
 })

 const event = response?.event ?? response
 const templates = event?.templates ?? []

 return (
 <div className="min-h-screen bg-[#FAFAFA] dark:bg-gray-950 font-sans text-charcoal dark:text-gray-100 selection:bg-rose-300 flex flex-col">
 <Navbar />
 <div className="bg-white dark:bg-gray-900 border-b-2 border-soft-gray px-6 py-3 flex items-center justify-between">
 <div className="flex items-center gap-3">
 <Link to={`/events/${slug}`} className="w-8 h-8 rounded-lg bg-white dark:bg-gray-900 border border-border-subtle shadow-card flex items-center justify-center text-charcoal dark:text-gray-100 hover:shadow-card-hover transition-all">
 <ArrowLeft size={14} strokeWidth={2.5} />
 </Link>
 <span className="font-bold text-sm">{event?.name ?? slug}</span>
 </div>
 <span className="text-xs font-bold text-warm-gray dark:text-gray-400">Abadikan momen, ciptakan kenangan</span>
 </div>

 <div className="bg-white dark:bg-gray-900 border-b-2 border-soft-gray py-3 px-6">
 <div className="max-w-4xl mx-auto flex items-center justify-between">
 {['Pilih Template', 'Ambil Foto', 'Edit & Hias', 'Download'].map((label, i) => {
 const num = i + 1
 return (
 <div key={num} className="flex items-center">
 <div className="flex items-center gap-2">
 <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold border border-border-subtle ${step >= num ? 'bg-dusty-pink text-white text-charcoal dark:text-gray-100 shadow-card' : 'bg-slate-100 text-slate-400 dark:text-gray-500'}`}>{num}</div>
 <span className={`hidden sm:block text-sm font-bold ${step >= num ? 'text-charcoal dark:text-gray-100' : 'text-slate-400 dark:text-gray-500'}`}>{label}</span>
 </div>
 {i < 3 && <div className={`hidden sm:block w-12 lg:w-16 h-0.5 mx-2 ${step > num ? 'bg-slate-900' : 'bg-slate-200'}`} />}
 </div>
 )
 })}
 </div>
 </div>

 <div className="flex-1 flex items-start justify-center p-6">
 {eventLoading ? (
 <div className="text-center py-16"><div className="w-8 h-8 border-4 border-rose-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" /><p className="text-warm-gray dark:text-gray-400 font-medium">Memuat event...</p></div>
 ) : step === 1 ? (
 <EventTemplateSelector templates={templates} setTemplate={setTemplate} />
 ) : step === 2 ? (
 <EventCameraCapture />
 ) : step === 3 ? (
 <EventPhotoEditor />
 ) : (
 <EventResultPreview event={event} />
 )}
 </div>
 </div>
 )
}

function EventTemplateSelector({ templates, setTemplate }) {
 const [filter, setFilter] = useState('all')
 const colors = ['bg-rose-200 dark:bg-rose-900/50', 'bg-blue-200', 'bg-green-200', 'bg-yellow-200', 'bg-purple-200', 'bg-pink-200']
 const filtered = filter === 'all' ? templates : templates.filter((t) => t.layout?.startsWith(filter))

 return (
 <div className="max-w-4xl w-full">
 <h2 className="text-2xl font-extrabold mb-6 text-center">Pilih Template</h2>
 <div className="flex justify-center gap-2 mb-8">
 {layoutFilters.map((f) => (
 <button key={f.key} onClick={() => setFilter(f.key)}
 className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold border border-border-subtle transition-all ${filter === f.key ? 'bg-dusty-pink text-white text-charcoal dark:text-gray-100 shadow-card' : 'bg-white dark:bg-gray-900 text-slate-600 dark:text-gray-300 shadow-card hover:shadow-card-hover '}`}>
 <f.icon size={16} />{f.label}
 </button>
 ))}
 </div>
 {filtered.length === 0 ? (
 <div className="text-center py-12"><div className="inline-block p-8 rounded-xl border border-border-subtle bg-white dark:bg-gray-900 shadow-card"><p className="text-warm-gray dark:text-gray-400 font-medium">Tidak ada template</p></div></div>
 ) : (
 <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
 {filtered.map((template, i) => (
 <button key={template.id} onClick={() => setTemplate(template)}
 className="group bg-white dark:bg-gray-900 rounded-xl border border-border-subtle overflow-hidden shadow-card hover:shadow-card transition-all text-left">
 <div className={`aspect-[3/4] flex items-center justify-center ${colors[i % colors.length]}`}>
 <Frame size={40} className="text-charcoal dark:text-gray-100/30" />
 </div>
 <div className="p-3 border-t-2 border-soft-gray">
 <p className="text-sm font-bold text-charcoal dark:text-gray-100">{template.name}</p>
 <p className="text-xs text-warm-gray dark:text-gray-400 font-medium mt-0.5">{template.photo_slots?.length ?? 0} foto &middot; {template.canvas_width}×{template.canvas_height}px</p>
 <span className="inline-block text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 dark:text-gray-300 border border-slate-300 mt-1.5">
 {template.layout?.replace('_', ' ')}
 </span>
 </div>
 </button>
 ))}
 </div>
 )}
 </div>
 )
}

function EventCameraCapture() {
 const { selectedTemplate, photos, addPhoto, retakePhoto, setStep } = useBoothStore()
 const { webcamRef, mirrored, toggleMirror } = useCamera()
 const { count, isRunning, start } = useCountdown(3)
 const [flash, setFlash] = useState(false)

 const slots = selectedTemplate?.photo_slots || []
 const maxSlots = slots.length || 4
 const allDone = photos.length >= maxSlots
 const currentSlot = slots[photos.length] || slots[0] || { width: 490, height: 790 }
 const slotAspect = currentSlot.width / currentSlot.height

 const cameraClass = slotAspect < 0.7 ? 'aspect-[3/5]' : slotAspect < 0.9 ? 'aspect-[3/4]' : slotAspect < 1.1 ? 'aspect-square' : slotAspect < 1.4 ? 'aspect-[4/3]' : 'aspect-[16/9]'

 const handleCapture = () => {
 start(() => {
 const webcam = webcamRef.current
 if (!webcam) return
 const screenshot = webcam.getScreenshot()
 if (!screenshot) return

 const img = new Image()
 img.onload = () => {
 const canvas = document.createElement('canvas')
 const ctx = canvas.getContext('2d')
 const targetW = currentSlot.width * 2
 const targetH = currentSlot.height * 2
 canvas.width = targetW
 canvas.height = targetH
 const srcAspect = img.width / img.height
 const targetAspect = targetW / targetH
 let sx, sy, sw, sh
 if (srcAspect > targetAspect) { sh = img.height; sw = img.height * targetAspect; sx = (img.width - sw) / 2; sy = 0 }
 else { sw = img.width; sh = img.width / targetAspect; sx = 0; sy = (img.height - sh) / 2 }
 ctx.drawImage(img, sx, sy, sw, sh, 0, 0, targetW, targetH)
 const cropped = canvas.toDataURL('image/jpeg', 0.92)
 setFlash(true); setTimeout(() => setFlash(false), 300)
 addPhoto(cropped)
 }
 img.src = screenshot
 })
 }

 return (
 <div className="max-w-3xl w-full">
 <div className="flex flex-col lg:flex-row gap-6">
 <div className="flex-1">
 <div className="flex items-center justify-between mb-2">
 <p className="text-xs font-bold text-warm-gray dark:text-gray-400">Slot {photos.length + 1}: {currentSlot.width}×{currentSlot.height}px</p>
 <p className="text-xs font-bold text-slate-400 dark:text-gray-500">{slotAspect < 1 ? 'Portrait' : slotAspect > 1 ? 'Landscape' : 'Square'}</p>
 </div>
 <div className={`relative rounded-xl overflow-hidden bg-slate-900 ${cameraClass} border border-border-subtle`}>
 <Webcam ref={webcamRef} mirrored={mirrored} screenshotFormat="image/jpeg" screenshotQuality={0.92} className="w-full h-full object-cover" videoConstraints={{ facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 1280 } }} />
 <div className="absolute inset-0 pointer-events-none"><div className="absolute inset-0 border-4 border-white/20 rounded-lg" /><div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 border border-white/40 rounded-full" /></div>
 <AnimatePresence>{isRunning && count !== null && (
 <motion.div key={count} initial={{ scale: 1.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }} transition={{ duration: 0.4 }} className="absolute inset-0 flex items-center justify-center bg-slate-900/40">
 <span className="text-8xl font-extrabold text-white drop-shadow-lg">{count}</span>
 </motion.div>
 )}</AnimatePresence>
 {flash && <div className="absolute inset-0 bg-white dark:bg-gray-900 animate-flash pointer-events-none" />}
 <div className="absolute top-4 left-4 bg-white dark:bg-gray-900/90 border border-border-subtle text-charcoal dark:text-gray-100 text-sm px-3 py-1.5 rounded-lg font-bold">Foto {Math.min(photos.length + 1, maxSlots)} dari {maxSlots}</div>
 <div className="absolute bottom-4 right-4">
 <button onClick={toggleMirror} className="w-10 h-10 rounded-lg bg-white dark:bg-gray-900/90 border border-border-subtle text-charcoal dark:text-gray-100 flex items-center justify-center"><FlipHorizontal2 size={18} strokeWidth={2.5} /></button>
 </div>
 </div>
 <div className="flex justify-center mt-5">
 <button onClick={handleCapture} disabled={isRunning || allDone} className="w-16 h-16 rounded-full bg-dusty-pink text-white border border-border-subtle shadow-card hover:shadow-card-hover text-charcoal dark:text-gray-100 flex items-center justify-center disabled:opacity-40 disabled:shadow-none disabled:translate-x-0 disabled:translate-y-0 transition-all active:scale-95">
 <Camera size={28} strokeWidth={2.5} />
 </button>
 </div>
 </div>
 <div className="lg:w-36">
 <p className="text-sm font-bold text-slate-700 dark:text-gray-200 mb-3">Foto tersimpan</p>
 <div className="flex lg:flex-col gap-2">
 {slots.map((slot, i) => (
 <div key={i} className="relative w-20 lg:w-full rounded-lg overflow-hidden border border-border-subtle bg-white dark:bg-gray-900" style={{ aspectRatio: slot.width / slot.height }}>
 {photos[i] ? (<><img src={photos[i]} alt={`Foto ${i + 1}`} className="w-full h-full object-cover" /><button onClick={() => retakePhoto(i)} className="absolute top-1 right-1 w-5 h-5 rounded-md bg-slate-900/80 text-white flex items-center justify-center"><X size={12} strokeWidth={3} /></button></>) : (<div className="w-full h-full bg-rose-50 dark:bg-rose-950/30 flex items-center justify-center"><Camera size={14} className="text-slate-300" /></div>)}
 <div className="absolute bottom-0 left-0 right-0 bg-slate-900/60 text-white text-[9px] font-bold text-center py-0.5">{slot.width}×{slot.height}</div>
 </div>
 ))}
 </div>
 <div className="mt-4 flex flex-col gap-2">
 <button onClick={() => setStep(1)} className="text-sm font-bold text-warm-gray dark:text-gray-400 hover:text-charcoal dark:text-gray-100">Ganti template</button>
 {allDone && <button onClick={() => setStep(3)} className="text-sm font-bold text-rose-500 hover:text-rose-600">Lanjut Edit &rarr;</button>}
 </div>
 </div>
 </div>
 </div>
 )
}

function EventPhotoEditor() {
 const { photos, selectedTemplate, appliedFilter, setFilter, appliedStickers, addSticker, updateSticker, removeSticker, setStep } = useBoothStore()
 const [tab, setTab] = useState('filter')
 const [stickerCat, setStickerCat] = useState('all')

 const template = selectedTemplate
 const slots = template?.photo_slots || []
 const canvasW = template?.canvas_width || 600
 const canvasH = template?.canvas_height || 1800
 const previewW = 320
 const previewH = (canvasH / canvasW) * previewW

 const filteredStickers = stickerCat === 'all' ? STICKERS : STICKERS.filter((s) => s.category === stickerCat)

 return (
 <div className="max-w-5xl w-full">
 <div className="flex flex-col lg:flex-row gap-6">
 <div className="flex-1 flex flex-col items-center">
 <div className="bg-white dark:bg-gray-900 rounded-xl border border-border-subtle p-4 inline-block">
 <div className="relative overflow-hidden rounded-md"
 style={{ width: previewW, height: previewH, backgroundColor: template?.background_color || '#f5f5f5', filter: appliedFilter?.css || 'none' }}>
 {slots.map((slot, i) => {
 if (!photos[i]) return null
 const sx = previewW / canvasW
 const sy = previewH / canvasH
 return (
 <div key={i} className="absolute overflow-hidden"
 style={{ left: slot.x * sx, top: slot.y * sy, width: slot.width * sx, height: slot.height * sy, borderRadius: (slot.borderRadius || 0) * Math.min(sx, sy) }}>
 <img src={photos[i]} alt={`Photo ${i + 1}`} className="w-full h-full object-cover" />
 </div>
 )
 })}
 {photos.length === 0 && <div className="absolute inset-0 flex items-center justify-center text-slate-400 dark:text-gray-500 font-medium text-sm">Belum ada foto</div>}
 {appliedStickers.map((sticker, i) => (
 <DraggableSticker key={`${sticker.id}-${i}`} sticker={sticker} index={i} onMove={(idx, pos) => updateSticker(idx, pos)} onRemove={removeSticker} />
 ))}
 {template?.overlay_image && <img src={template.overlay_image} alt="" className="absolute inset-0 w-full h-full pointer-events-none" style={{ objectFit: 'fill' }} onError={(e) => e.target.style.display = 'none'} />}
 </div>
 </div>
 <p className="text-xs text-slate-400 dark:text-gray-500 font-medium mt-2">Geser sticker &middot; Scroll untuk resize</p>
 <p className="text-xs text-warm-gray dark:text-gray-400 font-bold mt-1">{template?.name} &middot; {canvasW}×{canvasH}px</p>
 <div className="flex justify-between w-full mt-4">
 <button onClick={() => setStep(2)} className="text-sm font-bold text-warm-gray dark:text-gray-400 hover:text-charcoal dark:text-gray-100">&larr; Ambil Ulang</button>
 <button onClick={() => setStep(4)} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-dusty-pink text-white border border-border-subtle shadow-card hover:shadow-card-hover text-charcoal dark:text-gray-100 text-sm font-bold transition-all">
 <Check size={16} strokeWidth={3} />Selesai
 </button>
 </div>
 </div>
 <div className="lg:w-80">
 <div className="flex gap-1 bg-slate-100 rounded-xl p-1 mb-4 border border-border-subtle">
 {[{ key: 'filter', icon: Sliders, label: 'Filter' }, { key: 'sticker', icon: Sticker, label: 'Sticker' }].map((t) => (
 <button key={t.key} onClick={() => setTab(t.key)}
 className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-sm font-bold transition-all ${tab === t.key ? 'bg-white dark:bg-gray-900 text-charcoal dark:text-gray-100 shadow-card border border-border-subtle' : 'text-warm-gray dark:text-gray-400 border border-transparent'}`}>
 <t.icon size={16} strokeWidth={2.5} />{t.label}
 </button>
 ))}
 </div>
 {tab === 'filter' && (
 <div className="grid grid-cols-3 gap-2 max-h-[500px] overflow-y-auto pr-1">
 {FILTERS.map((f) => (
 <button key={f.id} onClick={() => setFilter(f)}
 className={`rounded-xl overflow-hidden border transition-all ${appliedFilter?.id === f.id ? 'border-soft-gray shadow-card' : 'border-slate-200 hover:border-slate-400'}`}>
 <div className="aspect-square bg-gradient-to-br from-rose-200 via-purple-200 to-blue-200" style={{ filter: f.css }} />
 <p className="text-xs py-1.5 text-center font-bold text-slate-700 dark:text-gray-200">{f.name}</p>
 </button>
 ))}
 </div>
 )}
 {tab === 'sticker' && (
 <div>
 <div className="flex flex-wrap gap-1.5 mb-3">
 {STICKER_CATEGORIES.map((cat) => (
 <button key={cat.key} onClick={() => setStickerCat(cat.key)}
 className={`px-3 py-1 rounded-lg text-xs font-bold border transition-all ${stickerCat === cat.key ? 'bg-dusty-pink text-white border-soft-gray text-charcoal dark:text-gray-100 shadow-card' : 'bg-white dark:bg-gray-900 border-slate-200 text-warm-gray dark:text-gray-400 hover:border-slate-400'}`}>
 {cat.label}
 </button>
 ))}
 </div>
 <div className="grid grid-cols-4 gap-2 max-h-[400px] overflow-y-auto pr-1">
 {filteredStickers.map((s) => (
 <button key={s.id} onClick={() => addSticker({ ...s, x: 80, y: 80, size: 48 })}
 className="aspect-square rounded-xl border border-border-subtle shadow-card hover:shadow-card-hover bg-white dark:bg-gray-900 flex flex-col items-center justify-center gap-0.5 transition-all active:scale-95">
 <span className="text-2xl">{s.emoji}</span>
 <span className="text-[10px] text-warm-gray dark:text-gray-400 font-bold truncate w-full text-center px-1">{s.name}</span>
 </button>
 ))}
 </div>
 </div>
 )}
 </div>
 </div>
 </div>
 )
}

function EventResultPreview({ event }) {
 const { photos, selectedTemplate, appliedFilter, appliedStickers, reset, setStep } = useBoothStore()
 const [printSize, setPrintSize] = useState(PRINT_SIZES[0])
 const [showSizePicker, setShowSizePicker] = useState(false)
 const [processing, setProcessing] = useState(false)

 const handleDownload = async (format = 'jpeg') => {
 setProcessing(true)
 try { const canvas = await generatePrintCanvas({ photos, template: selectedTemplate, printSize, filter: appliedFilter, stickers: appliedStickers, overlaySrc: printSize?.overlay || null }); downloadCanvas(canvas, `${event?.slug ?? 'ikutpose'}-${Date.now()}`, format) }
 catch (e) { console.error(e) } finally { setProcessing(false) }
 }

 const handlePrint = async () => {
 setProcessing(true)
 try { const canvas = await generatePrintCanvas({ photos, template: selectedTemplate, printSize, filter: appliedFilter, stickers: appliedStickers, overlaySrc: printSize?.overlay || null }); printCanvas(canvas, printSize) }
 catch (e) { console.error(e) } finally { setProcessing(false) }
 }

 const template = selectedTemplate
 const slots = template?.photo_slots || []
 const canvasW = template?.canvas_width || 600
 const canvasH = template?.canvas_height || 1800
 const previewWidth = 240
 const previewHeight = (canvasH / canvasW) * previewWidth

 return (
 <div className="max-w-2xl w-full text-center">
 <h2 className="text-2xl font-extrabold mb-2">Foto Siap!</h2>
 <p className="text-warm-gray dark:text-gray-400 font-medium mb-6">{template?.name} &middot; {canvasW}×{canvasH}px &middot; {photos.length} foto</p>
 <div className="inline-block mb-8">
 <div className="bg-white dark:bg-gray-900 rounded-xl border border-border-subtle shadow-card p-4">
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
 <div className="mt-3 flex items-center justify-center gap-3 text-xs text-slate-400 dark:text-gray-500 font-medium">
 <span>{template?.layout?.replace('_', ' ')}</span><span>&middot;</span><span>{photos.length} foto</span>
 {appliedFilter && <><span>&middot;</span><span>Filter: {appliedFilter.name}</span></>}
 </div>
 </div>
 <div className="mb-6">
 <p className="text-xs font-bold text-warm-gray dark:text-gray-400 uppercase tracking-wider mb-2">Ukuran Cetak</p>
 <div className="relative inline-block">
 <button onClick={() => setShowSizePicker(!showSizePicker)} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-gray-900 border border-border-subtle shadow-card hover:shadow-card-hover text-sm font-bold text-charcoal dark:text-gray-100 transition-all">
 {printSize.label}<ChevronDown size={16} className={`transition-transform ${showSizePicker ? 'rotate-180' : ''}`} />
 </button>
 {showSizePicker && (
 <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 bg-white dark:bg-gray-900 rounded-xl border border-border-subtle shadow-card z-10 overflow-hidden">
 {PRINT_SIZES.map((size) => (
 <button key={size.id} onClick={() => { setPrintSize(size); setShowSizePicker(false) }}
 className={`w-full text-left px-4 py-3 text-sm font-medium hover:bg-rose-50 dark:bg-rose-950/30 border-b border-slate-100 dark:border-gray-800 last:border-0 ${printSize.id === size.id ? 'bg-rose-100 dark:bg-rose-900/30 font-bold' : ''}`}>
 <span className="text-charcoal dark:text-gray-100">{size.label}</span><span className="block text-xs text-slate-400 dark:text-gray-500 mt-0.5">{size.px_w} × {size.px_h} px{size.overlay ? ' + frame' : ''}</span>
 </button>
 ))}
 </div>
 )}
 </div>
 </div>
 <div className="flex flex-col sm:flex-row gap-3 justify-center">
 <button onClick={() => handleDownload('jpeg')} disabled={processing} className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-dusty-pink text-white border border-border-subtle shadow-card hover:shadow-card-hover text-charcoal dark:text-gray-100 font-bold transition-all disabled:opacity-60">
 <Download size={18} strokeWidth={2.5} />{processing ? 'Memproses...' : 'Download JPG'}
 </button>
 <button onClick={handlePrint} disabled={processing} className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-slate-900 text-white border border-border-subtle shadow-card hover:shadow-card-hover font-bold transition-all disabled:opacity-60">
 <Printer size={18} strokeWidth={2.5} />Cetak Foto
 </button>
 </div>
 <button onClick={() => { reset(); setStep(1) }} className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-slate-400 dark:text-gray-500 hover:text-charcoal dark:text-gray-100 transition-colors">
 <RotateCcw size={14} strokeWidth={2.5} />Foto Lagi
 </button>
 </div>
 )
}
