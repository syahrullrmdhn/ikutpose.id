import { useState } from 'react'
import { Save, ArrowLeft, Upload, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import Card from '../../../components/ui/Card'

export default function StickerPackForm() {
 const [form, setForm] = useState({
 name: '',
 description: '',
 category: '',
 isPremium: false,
 isActive: true,
 })

 return (
 <div className="max-w-3xl space-y-6">
 <div className="flex items-center justify-between">
 <div className="flex items-center gap-3">
 <Link to="/admin/sticker-packs" className="p-2 rounded-lg hover:bg-neutral-100 text-neutral-500">
 <ArrowLeft size={18} />
 </Link>
 <h2 className="text-xl font-bold text-neutral-800">
 Buat Sticker Pack
 </h2>
 </div>
 <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-400 text-white text-sm font-semibold hover:bg-primary-500 transition-colors">
 <Save size={16} />
 Simpan
 </button>
 </div>

 <Card className="p-5 space-y-4">
 <h3 className="text-sm font-semibold text-neutral-800">Info Pack</h3>
 <div>
 <label className="block text-sm font-medium text-neutral-600 mb-1.5">Nama</label>
 <input
 type="text"
 value={form.name}
 onChange={(e) => setForm({ ...form, name: e.target.value })}
 placeholder="Cute Animals"
 className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-primary-400"
 />
 </div>
 <div>
 <label className="block text-sm font-medium text-neutral-600 mb-1.5">Deskripsi</label>
 <textarea
 value={form.description}
 onChange={(e) => setForm({ ...form, description: e.target.value })}
 rows={3}
 className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-primary-400 resize-none"
 />
 </div>
 <div>
 <label className="block text-sm font-medium text-neutral-600 mb-1.5">Kategori</label>
 <select
 value={form.category}
 onChange={(e) => setForm({ ...form, category: e.target.value })}
 className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-primary-400"
 >
 <option value="">Pilih kategori</option>
 <option value="cute">Cute</option>
 <option value="party">Party</option>
 <option value="wedding">Wedding</option>
 <option value="birthday">Birthday</option>
 <option value="nature">Nature</option>
 </select>
 </div>
 </Card>

 <Card className="p-5 space-y-4">
 <h3 className="text-sm font-semibold text-neutral-800">Upload Sticker</h3>
 <div className="border border-dashed border-neutral-200 rounded-xl p-8 text-center hover:border-primary-300 transition-colors cursor-pointer">
 <Upload size={24} className="mx-auto text-neutral-400 mb-2" />
 <p className="text-sm text-neutral-500">Drag & drop file PNG (transparan)</p>
 <p className="text-xs text-neutral-400 mt-1">atau klik untuk browse</p>
 </div>
 <p className="text-xs text-neutral-400">Upload multiple file sekaligus untuk bulk upload.</p>
 </Card>
 </div>
 )
}
