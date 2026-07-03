import { useState } from 'react'
import { Save, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import Card from '../../../components/ui/Card'

export default function FilterForm() {
 const [form, setForm] = useState({
 name: '',
 brightness: 100,
 contrast: 100,
 saturate: 100,
 hueRotate: 0,
 grayscale: 0,
 sepia: 0,
 blur: 0,
 })

 const cssFilter = `brightness(${form.brightness / 100}) contrast(${form.contrast / 100}) saturate(${form.saturate / 100}) hue-rotate(${form.hueRotate}deg) grayscale(${form.grayscale / 100}) sepia(${form.sepia / 100})`

 return (
 <div className="max-w-3xl space-y-6">
 <div className="flex items-center justify-between">
 <div className="flex items-center gap-3">
 <Link to="/admin/filters" className="p-2 rounded-lg hover:bg-neutral-100 text-neutral-500">
 <ArrowLeft size={18} />
 </Link>
 <h2 className="text-xl font-bold text-neutral-800">
 Buat Filter
 </h2>
 </div>
 <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-400 text-white text-sm font-semibold hover:bg-primary-500 transition-colors">
 <Save size={16} />
 Simpan
 </button>
 </div>

 <div className="grid lg:grid-cols-2 gap-6">
 <Card className="p-5 space-y-5">
 <h3 className="text-sm font-semibold text-neutral-800">Pengaturan Filter</h3>
 <div>
 <label className="block text-sm font-medium text-neutral-600 mb-1.5">Nama Filter</label>
 <input
 type="text"
 value={form.name}
 onChange={(e) => setForm({ ...form, name: e.target.value })}
 placeholder="Warm Glow"
 className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-primary-400"
 />
 </div>

 {[
 { key: 'brightness', label: 'Brightness', min: 0, max: 200 },
 { key: 'contrast', label: 'Contrast', min: 0, max: 200 },
 { key: 'saturate', label: 'Saturation', min: 0, max: 200 },
 { key: 'hueRotate', label: 'Hue Rotate', min: 0, max: 360 },
 { key: 'grayscale', label: 'Grayscale', min: 0, max: 100 },
 { key: 'sepia', label: 'Sepia', min: 0, max: 100 },
 ].map((slider) => (
 <div key={slider.key}>
 <div className="flex justify-between text-sm mb-1.5">
 <label className="font-medium text-neutral-600">{slider.label}</label>
 <span className="text-neutral-400">{form[slider.key]}{slider.key === 'hueRotate' ? '°' : '%'}</span>
 </div>
 <input
 type="range"
 min={slider.min}
 max={slider.max}
 value={form[slider.key]}
 onChange={(e) => setForm({ ...form, [slider.key]: Number(e.target.value) })}
 className="w-full accent-primary-400"
 />
 </div>
 ))}
 </Card>

 <Card className="p-5">
 <h3 className="text-sm font-semibold text-neutral-800 mb-4">Preview</h3>
 <div className="grid grid-cols-2 gap-3">
 <div>
 <p className="text-xs text-neutral-400 mb-2 text-center">Before</p>
 <div className="aspect-square rounded-xl bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200" />
 </div>
 <div>
 <p className="text-xs text-neutral-400 mb-2 text-center">After</p>
 <div
 className="aspect-square rounded-xl bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200"
 style={{ filter: cssFilter }}
 />
 </div>
 </div>
 </Card>
 </div>
 </div>
 )
}
