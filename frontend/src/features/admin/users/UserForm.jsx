import { useState } from 'react'
import { Save, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import Card from '../../../components/ui/Card'

export default function UserForm() {
 const [form, setForm] = useState({
 name: '',
 email: '',
 password: '',
 role: 'user',
 isActive: true,
 })

 return (
 <div className="max-w-lg space-y-6">
 <div className="flex items-center justify-between">
 <div className="flex items-center gap-3">
 <Link to="/admin/users" className="p-2 rounded-lg hover:bg-neutral-100 text-neutral-500">
 <ArrowLeft size={18} />
 </Link>
 <h2 className="text-xl font-bold text-neutral-800">
 Tambah User
 </h2>
 </div>
 <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-400 text-white text-sm font-semibold hover:bg-primary-500 transition-colors">
 <Save size={16} />
 Simpan
 </button>
 </div>

 <Card className="p-5 space-y-4">
 <div>
 <label className="block text-sm font-medium text-neutral-600 mb-1.5">Nama</label>
 <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="John Doe" className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-primary-400" />
 </div>
 <div>
 <label className="block text-sm font-medium text-neutral-600 mb-1.5">Email</label>
 <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="john@mail.com" className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-primary-400" />
 </div>
 <div>
 <label className="block text-sm font-medium text-neutral-600 mb-1.5">Password</label>
 <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Minimal 8 karakter" className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-primary-400" />
 </div>
 <div>
 <label className="block text-sm font-medium text-neutral-600 mb-1.5">Role</label>
 <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-primary-400">
 <option value="user">User</option>
 <option value="operator">Operator</option>
 <option value="admin">Admin</option>
 </select>
 </div>
 <label className="flex items-center gap-2 text-sm text-neutral-600">
 <input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} className="rounded accent-primary-400" />
 Akun aktif
 </label>
 </Card>
 </div>
 )
}
