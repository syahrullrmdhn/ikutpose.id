import { useState } from 'react'
import { Save, ArrowLeft, Upload } from 'lucide-react'
import { Link } from 'react-router-dom'
import Card from '../../../components/ui/Card'

export default function EventForm() {
 const [form, setForm] = useState({
 name: '',
 slug: '',
 code: '',
 description: '',
 startDate: '',
 endDate: '',
 status: 'draft',
 galleryPublic: true,
 requireEmail: false,
 maxPhotosPerSession: 4,
 countdownSeconds: 3,
 })

 return (
 <div className="max-w-3xl space-y-6">
 <div className="flex items-center justify-between">
 <div className="flex items-center gap-3">
 <Link to="/admin/events" className="p-2 rounded-lg hover:bg-neutral-100 text-neutral-500">
 <ArrowLeft size={18} />
 </Link>
 <h2 className="text-xl font-bold text-neutral-800">
 Buat Event
 </h2>
 </div>
 <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-400 text-white text-sm font-semibold hover:bg-primary-500 transition-colors">
 <Save size={16} />
 Simpan
 </button>
 </div>

 <Card className="p-5 space-y-4">
 <h3 className="text-sm font-semibold text-neutral-800">Info Event</h3>
 <div>
 <label className="block text-sm font-medium text-neutral-600 mb-1.5">Nama Event</label>
 <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Wedding Rina & Budi" className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-primary-400" />
 </div>
 <div className="grid grid-cols-2 gap-3">
 <div>
 <label className="block text-sm font-medium text-neutral-600 mb-1.5">Slug</label>
 <input type="text" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="wedding-rina-budi" className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-primary-400" />
 </div>
 <div>
 <label className="block text-sm font-medium text-neutral-600 mb-1.5">Kode Singkat</label>
 <input type="text" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} placeholder="WRB2026" className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-primary-400" />
 </div>
 </div>
 <div>
 <label className="block text-sm font-medium text-neutral-600 mb-1.5">Deskripsi</label>
 <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-primary-400 resize-none" />
 </div>
 <div className="grid grid-cols-2 gap-3">
 <div>
 <label className="block text-sm font-medium text-neutral-600 mb-1.5">Tanggal Mulai</label>
 <input type="datetime-local" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-primary-400" />
 </div>
 <div>
 <label className="block text-sm font-medium text-neutral-600 mb-1.5">Tanggal Selesai</label>
 <input type="datetime-local" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-primary-400" />
 </div>
 </div>
 </Card>

 <Card className="p-5 space-y-4">
 <h3 className="text-sm font-semibold text-neutral-800">Branding</h3>
 <div className="grid grid-cols-2 gap-3">
 <div>
 <label className="block text-sm font-medium text-neutral-600 mb-1.5">Logo</label>
 <div className="border border-dashed border-neutral-200 rounded-xl p-4 text-center hover:border-primary-300 transition-colors cursor-pointer">
 <Upload size={16} className="mx-auto text-neutral-400 mb-1" />
 <p className="text-xs text-neutral-400">Upload logo</p>
 </div>
 </div>
 <div>
 <label className="block text-sm font-medium text-neutral-600 mb-1.5">Banner</label>
 <div className="border border-dashed border-neutral-200 rounded-xl p-4 text-center hover:border-primary-300 transition-colors cursor-pointer">
 <Upload size={16} className="mx-auto text-neutral-400 mb-1" />
 <p className="text-xs text-neutral-400">Upload banner</p>
 </div>
 </div>
 </div>
 </Card>

 <Card className="p-5 space-y-4">
 <h3 className="text-sm font-semibold text-neutral-800">Pengaturan Booth</h3>
 <div className="grid grid-cols-2 gap-3">
 <div>
 <label className="block text-sm font-medium text-neutral-600 mb-1.5">Max Foto per Sesi</label>
 <input type="number" value={form.maxPhotosPerSession} onChange={(e) => setForm({ ...form, maxPhotosPerSession: Number(e.target.value) })} className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-primary-400" />
 </div>
 <div>
 <label className="block text-sm font-medium text-neutral-600 mb-1.5">Countdown (detik)</label>
 <input type="number" value={form.countdownSeconds} onChange={(e) => setForm({ ...form, countdownSeconds: Number(e.target.value) })} className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-primary-400" />
 </div>
 </div>
 <div className="flex gap-6">
 <label className="flex items-center gap-2 text-sm text-neutral-600">
 <input type="checkbox" checked={form.galleryPublic} onChange={(e) => setForm({ ...form, galleryPublic: e.target.checked })} className="rounded accent-primary-400" />
 Gallery publik
 </label>
 <label className="flex items-center gap-2 text-sm text-neutral-600">
 <input type="checkbox" checked={form.requireEmail} onChange={(e) => setForm({ ...form, requireEmail: e.target.checked })} className="rounded accent-primary-400" />
 Wajibkan email
 </label>
 </div>
 </Card>
 </div>
 )
}
