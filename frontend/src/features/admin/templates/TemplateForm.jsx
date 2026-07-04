import { useState, useEffect } from 'react'
import { Save, ArrowLeft, Upload, X } from 'lucide-react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery } from '@tanstack/react-query'
import { createTemplate, getTemplate, updateTemplate } from '../../../api/templates'
import Card from '../../../components/ui/Card'

const layouts = [
 { value: 'strip_4', label: 'Strip 4 Foto', w: 600, h: 1800, slots: 4 },
 { value: 'strip_3', label: 'Strip 3 Foto', w: 600, h: 1500, slots: 3 },
 { value: 'strip_2', label: 'Strip 2 Foto', w: 600, h: 1100, slots: 2 },
 { value: 'grid_2x2', label: 'Grid 2×2', w: 1200, h: 1200, slots: 4 },
 { value: 'single', label: 'Single Foto', w: 800, h: 1000, slots: 1 },
 { value: 'wide_strip_3', label: 'Wide Strip 3', w: 1800, h: 600, slots: 3 },
]

export default function TemplateForm() {
 const { id } = useParams()
 const isEdit = !!id
 const navigate = useNavigate()

 const [form, setForm] = useState({
 name: '', description: '', layout: 'strip_4',
 canvasWidth: 600, canvasHeight: 1800,
 isPremium: false, isActive: true,
 })
 const [overlayFile, setOverlayFile] = useState(null)
 const [overlayPreview, setOverlayPreview] = useState(null)
 const [bgFile, setBgFile] = useState(null)
 const [bgPreview, setBgPreview] = useState(null)

 // Fetch existing template for edit mode
 const { data: existing, isLoading } = useQuery({
 queryKey: ['admin-template', id],
 queryFn: () => getTemplate(id).then((r) => r.data?.data ?? r.data),
 enabled: isEdit,
 })

 // Populate form when data loads
 useEffect(() => {
 if (existing) {
 setForm({
 name: existing.name || '',
 description: existing.description || '',
 layout: existing.layout || 'strip_4',
 canvasWidth: existing.canvas_width || 600,
 canvasHeight: existing.canvas_height || 1800,
 isPremium: existing.is_premium || false,
 isActive: existing.is_active ?? true,
 })
 if (existing.overlay_image) setOverlayPreview(existing.overlay_image)
 if (existing.background_image) setBgPreview(existing.background_image)
 }
 }, [existing])

 const createMut = useMutation({
 mutationFn: createTemplate,
 onSuccess: () => navigate('/admin/templates'),
 })

 const updateMut = useMutation({
 mutationFn: (data) => updateTemplate(id, data),
 onSuccess: () => navigate('/admin/templates'),
 })

 const handleLayoutChange = (layout) => {
 const l = layouts.find((l) => l.value === layout)
 setForm({ ...form, layout, canvasWidth: l?.w || 600, canvasHeight: l?.h || 1800 })
 }

 const handleOverlayUpload = (e) => {
 const file = e.target.files?.[0]
 if (!file) return
 setOverlayFile(file)
 const reader = new FileReader()
 reader.onload = (ev) => setOverlayPreview(ev.target.result)
 reader.readAsDataURL(file)
 }

 const handleBgUpload = (e) => {
 const file = e.target.files?.[0]
 if (!file) return
 setBgFile(file)
 const reader = new FileReader()
 reader.onload = (ev) => setBgPreview(ev.target.result)
 reader.readAsDataURL(file)
 }

 const handleSave = () => {
 const formData = new FormData()
 formData.append('name', form.name)
 formData.append('description', form.description)
 formData.append('layout', form.layout)
 formData.append('canvas_width', form.canvasWidth)
 formData.append('canvas_height', form.canvasHeight)
 formData.append('is_premium', form.isPremium ? 1 : 0)
 formData.append('is_active', form.isActive ? 1 : 0)
 if (overlayFile) formData.append('overlay_image', overlayFile)
 if (bgFile) formData.append('background_image', bgFile)
 if (isEdit) formData.append('_method', 'PUT')

 if (isEdit) updateMut.mutate(formData)
 else createMut.mutate(formData)
 }

 const mut = isEdit ? updateMut : createMut

 if (isEdit && isLoading) {
 return (
 <div className="max-w-4xl space-y-6">
 <div className="h-10 w-48 bg-slate-200 rounded-lg animate-pulse" />
 <div className="h-64 bg-slate-200 rounded-xl animate-pulse" />
 </div>
 )
 }

 return (
 <div className="max-w-4xl space-y-6">
 <div className="flex items-center justify-between">
 <div className="flex items-center gap-3">
 <Link to="/admin/templates" className="w-9 h-9 rounded-lg bg-white dark:bg-gray-900 border border-border-subtle flex items-center justify-center text-charcoal dark:text-gray-100 hover:shadow-card-hover transition-all">
 <ArrowLeft size={16} strokeWidth={2.5} />
 </Link>
 <h2 className="text-xl font-extrabold">{isEdit ? 'Edit Template' : 'Buat Template / Photocard'}</h2>
 </div>
 <button onClick={handleSave} disabled={mut.isPending || !form.name}
 className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-dusty-pink text-white border border-border-subtle hover:shadow-card-hover text-charcoal dark:text-gray-100 text-sm font-bold disabled:opacity-50 transition-all">
 <Save size={16} strokeWidth={2.5} />{mut.isPending ? 'Menyimpan...' : 'Simpan'}
 </button>
 </div>

 <div className="grid lg:grid-cols-2 gap-6">
 <div className="space-y-4">
 <Card className="p-5 space-y-4">
 <h3 className="text-sm font-bold text-charcoal dark:text-gray-100">Info Template</h3>
 <div>
 <label className="block text-sm font-bold text-slate-700 dark:text-gray-200 mb-1.5">Nama</label>
 <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Photocard Aesthetic"
 className="w-full px-4 py-2.5 rounded-xl border border-border-subtle text-sm bg-white dark:bg-gray-900 focus:shadow-[0px_0px_0px] focus:translate-x-[3px] focus:translate-y-[3px] focus:outline-none transition-all" />
 </div>
 <div>
 <label className="block text-sm font-bold text-slate-700 dark:text-gray-200 mb-1.5">Deskripsi</label>
 <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2}
 className="w-full px-4 py-2.5 rounded-xl border border-border-subtle text-sm bg-white dark:bg-gray-900 focus:shadow-[0px_0px_0px] focus:translate-x-[3px] focus:translate-y-[3px] focus:outline-none resize-none transition-all" />
 </div>
 <div>
 <label className="block text-sm font-bold text-slate-700 dark:text-gray-200 mb-1.5">Layout</label>
 <select value={form.layout} onChange={(e) => handleLayoutChange(e.target.value)}
 className="w-full px-4 py-2.5 rounded-xl border border-border-subtle text-sm bg-white dark:bg-gray-900 focus:outline-none font-bold">
 {layouts.map((l) => <option key={l.value} value={l.value}>{l.label} ({l.w}×{l.h}, {l.slots} foto)</option>)}
 </select>
 </div>
 <div className="grid grid-cols-2 gap-3">
 <div>
 <label className="block text-sm font-bold text-slate-700 dark:text-gray-200 mb-1.5">Width</label>
 <input type="number" value={form.canvasWidth} readOnly className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-slate-50 font-bold" />
 </div>
 <div>
 <label className="block text-sm font-bold text-slate-700 dark:text-gray-200 mb-1.5">Height</label>
 <input type="number" value={form.canvasHeight} readOnly className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-slate-50 font-bold" />
 </div>
 </div>
 <div className="flex gap-4">
 <label className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-gray-200">
 <input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} className="rounded accent-rose-400" />
 Aktif
 </label>
 <label className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-gray-200">
 <input type="checkbox" checked={form.isPremium} onChange={(e) => setForm({ ...form, isPremium: e.target.checked })} className="rounded accent-rose-400" />
 Premium
 </label>
 </div>
 </Card>

 <Card className="p-5 space-y-4">
 <h3 className="text-sm font-bold text-charcoal dark:text-gray-100">Upload Gambar</h3>
 <div>
 <label className="block text-sm font-bold text-slate-700 dark:text-gray-200 mb-1.5">Overlay / Frame (PNG transparan)</label>
 <p className="text-xs text-slate-400 dark:text-gray-500 mb-2">Area transparan = tempat foto user muncul.</p>
 {overlayPreview ? (
 <div className="relative rounded-xl border border-border-subtle overflow-hidden">
 <img src={overlayPreview} alt="Overlay" className="w-full max-h-48 object-contain bg-slate-100" />
 <button onClick={() => { setOverlayFile(null); setOverlayPreview(null) }}
 className="absolute top-2 right-2 w-7 h-7 rounded-lg bg-white dark:bg-gray-900 border border-border-subtle flex items-center justify-center text-charcoal dark:text-gray-100">
 <X size={14} strokeWidth={3} />
 </button>
 </div>
 ) : (
 <label className="block border border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-rose-400 transition-colors cursor-pointer">
 <Upload size={20} className="mx-auto text-slate-400 dark:text-gray-500 mb-1" />
 <p className="text-xs text-slate-400 dark:text-gray-500 font-medium">Klik untuk upload PNG</p>
 <input type="file" accept="image/png" className="hidden" onChange={handleOverlayUpload} />
 </label>
 )}
 </div>
 <div>
 <label className="block text-sm font-bold text-slate-700 dark:text-gray-200 mb-1.5">Background Image (opsional)</label>
 {bgPreview ? (
 <div className="relative rounded-xl border border-border-subtle overflow-hidden">
 <img src={bgPreview} alt="Background" className="w-full max-h-32 object-contain bg-slate-100" />
 <button onClick={() => { setBgFile(null); setBgPreview(null) }}
 className="absolute top-2 right-2 w-7 h-7 rounded-lg bg-white dark:bg-gray-900 border border-border-subtle flex items-center justify-center text-charcoal dark:text-gray-100">
 <X size={14} strokeWidth={3} />
 </button>
 </div>
 ) : (
 <label className="block border border-dashed border-slate-300 rounded-xl p-4 text-center hover:border-rose-400 transition-colors cursor-pointer">
 <Upload size={16} className="mx-auto text-slate-400 dark:text-gray-500 mb-1" />
 <p className="text-xs text-slate-400 dark:text-gray-500 font-medium">Upload gambar background</p>
 <input type="file" accept="image/*" className="hidden" onChange={handleBgUpload} />
 </label>
 )}
 </div>
 </Card>
 </div>

 <Card className="p-5">
 <h3 className="text-sm font-bold text-charcoal dark:text-gray-100 mb-4">Preview</h3>
 <div className="aspect-[3/4] bg-slate-50 rounded-xl border border-dashed border-slate-300 flex items-center justify-center overflow-hidden">
 {overlayPreview ? (
 <img src={overlayPreview} alt="Preview" className="w-full h-full object-contain" />
 ) : (
 <div className="text-center p-6">
 <Upload size={40} className="mx-auto text-slate-300 mb-2" />
 <p className="text-sm text-slate-400 dark:text-gray-500 font-medium">Upload overlay untuk preview</p>
 </div>
 )}
 </div>
 <div className="mt-4 p-3 rounded-lg bg-rose-50 dark:bg-rose-950/30 border border-dashed border-rose-200">
 <p className="text-xs font-bold text-rose-700 mb-1">Tips:</p>
 <ul className="text-xs text-rose-600 space-y-0.5">
 <li>• Area <strong>transparan</strong> di overlay = tempat foto</li>
 <li>• Export dari Canva sebagai <strong>PNG Transparent</strong></li>
 <li>• Ukuran: {form.canvasWidth}×{form.canvasHeight}px</li>
 </ul>
 </div>
 </Card>
 </div>
 </div>
 )
}
