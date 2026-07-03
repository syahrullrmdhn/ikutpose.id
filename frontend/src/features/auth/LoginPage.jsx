import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, LogIn } from 'lucide-react'
import { motion } from 'framer-motion'
import { useAuthStore } from '../../stores/authStore'
import { login } from '../../api/auth'

export default function LoginPage() {
 const navigate = useNavigate()
 const { setAuth } = useAuthStore()
 const [form, setForm] = useState({ email: '', password: '' })
 const [showPass, setShowPass] = useState(false)
 const [loading, setLoading] = useState(false)
 const [error, setError] = useState('')

 const handleSubmit = async (e) => {
 e.preventDefault()
 setError('')
 setLoading(true)
 try {
 const res = await login(form)
 const { user, token } = res.data
 setAuth(user, token)
 if (user.role === 'admin' || user.role === 'operator') navigate('/admin')
 else navigate('/')
 } catch (err) {
 setError(err.response?.data?.message || 'Email atau password salah')
 } finally { setLoading(false) }
 }

 return (
 <div className="min-h-screen bg-[#FAFAFA] font-sans text-charcoal selection:bg-rose-300 flex flex-col justify-center px-6 py-12">
 <div className="sm:mx-auto sm:w-full sm:max-w-md">
 <Link to="/" className="flex justify-center mb-8">
 <img src="/LightMode.png" alt="IkutPose" className="h-8 w-auto" />
 </Link>

 <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
 <div className="bg-white rounded-xl border border-border-subtle shadow-card px-8 py-10">
 <div className="text-center mb-8">
 <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-rose-200 border border-border-subtle shadow-card text-charcoal mb-4">
 <LogIn size={22} strokeWidth={2.5} />
 </div>
 <h1 className="text-xl font-extrabold text-charcoal">Masuk ke Akun</h1>
 <p className="text-sm text-warm-gray font-medium mt-1">
 Belum punya akun?{' '}
 <Link to="/register" className="font-bold text-charcoal hover:text-rose-500 transition-colors">Daftar</Link>
 </p>
 </div>

 {error && <div className="mb-4 px-4 py-3 rounded-xl bg-red-50 border border-red-400 text-sm text-red-700 font-medium">{error}</div>}

 <form onSubmit={handleSubmit} className="space-y-4">
 <div>
 <label className="block text-sm font-bold text-slate-700 mb-1.5">Email</label>
 <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="admin@ikutpose.com"
 className="w-full px-4 py-3 rounded-xl border border-border-subtle text-sm bg-white shadow-card focus:shadow-card focus:translate-x-[3px] focus:translate-y-[3px] focus:outline-none transition-all" />
 </div>
 <div>
 <label className="block text-sm font-bold text-slate-700 mb-1.5">Password</label>
 <div className="relative">
 <input type={showPass ? 'text' : 'password'} required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Masukkan password"
 className="w-full px-4 py-3 rounded-xl border border-border-subtle text-sm bg-white shadow-card focus:shadow-card focus:translate-x-[3px] focus:translate-y-[3px] focus:outline-none pr-12 transition-all" />
 <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
 {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
 </button>
 </div>
 </div>
 <button type="submit" disabled={loading}
 className="w-full py-3 rounded-xl bg-dusty-pink text-white border border-border-subtle shadow-card hover:shadow-card text-charcoal font-bold text-sm disabled:opacity-60 transition-all">
 {loading ? 'Masuk...' : 'Masuk'}
 </button>
 </form>

 <div className="mt-6 pt-4 border-t-2 border-slate-100">
 <p className="text-xs text-slate-400 font-medium text-center">
 Admin: <span className="text-slate-600">admin@ikutpose.com</span> / <span className="text-slate-600">password</span>
 </p>
 </div>
 </div>
 </motion.div>

 <p className="text-center text-xs text-slate-400 font-medium mt-6">
 <Link to="/" className="hover:text-slate-600 transition-colors">&larr; Kembali ke beranda</Link>
 </p>
 </div>
 </div>
 )
}
