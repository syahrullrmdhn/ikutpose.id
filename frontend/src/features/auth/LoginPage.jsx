import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BadgeCheck, Eye, EyeOff, LogIn, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import { useAuthStore } from '../../stores/authStore'
import { login } from '../../api/auth'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'

const sideHighlights = [
  'Cetak instan untuk momen yang langsung bisa dibawa pulang.',
  'Soft file gratis via QR download untuk semua tamu.',
  'Template cantik, GIF ready, dan event custom branding.',
]

const unsplashImage =
  'https://images.unsplash.com/photo-1544194215-541c2d3561a4?auto=format&fit=crop&w=1200&q=80'

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
 <div className="min-h-screen bg-[#FAFAFA] dark:bg-gray-950 font-sans text-charcoal dark:text-gray-100 selection:bg-rose-300 flex flex-col">
 <Navbar />

 <main className="flex-1 px-6 py-10 md:py-14">
 <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.92fr_1.08fr]">
 <motion.div
 className="order-2 lg:order-1 flex items-center"
 initial={{ opacity: 0, x: -18 }}
 animate={{ opacity: 1, x: 0 }}
 transition={{ duration: 0.45 }}
 >
 <div className="w-full rounded-[32px] border border-border-subtle dark:border-gray-800 bg-white/86 dark:bg-gray-900/88 p-8 shadow-[0_24px_60px_rgba(196,145,155,0.18)] backdrop-blur md:p-10">
 <div className="inline-flex items-center gap-2 rounded-full bg-rose-100 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-deep-rose dark:bg-rose-900/30 dark:text-rose-200">
 <LogIn size={14} />
 Login IkutPose
 </div>

 <div className="mt-6">
 <h1 className="text-3xl md:text-4xl">Masuk ke akunmu dan lanjutkan momen yang belum selesai.</h1>
 <p className="mt-3 text-sm leading-7 text-warm-gray dark:text-gray-300">
 Akses dashboard event, simpan template favorit, dan lanjutkan pengalaman photobooth dengan tampilan yang sudah kami rapikan untuk desktop maupun mobile.
 </p>
 </div>

 {error && <div className="mt-6 px-4 py-3 rounded-2xl bg-red-50 dark:bg-red-950/30 border border-red-400 dark:border-red-900 text-sm text-red-700 dark:text-red-300 font-medium">{error}</div>}

 <form onSubmit={handleSubmit} className="mt-6 space-y-4">
 <div>
 <label className="block text-sm font-bold text-slate-700 dark:text-gray-200 mb-1.5">Email</label>
 <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="admin@ikutpose.com"
 className="w-full px-4 py-3 rounded-xl border border-border-subtle dark:border-gray-700 text-sm bg-white dark:bg-gray-900 shadow-card focus:shadow-card focus:translate-x-[3px] focus:translate-y-[3px] focus:outline-none transition-all" />
 </div>
 <div>
 <label className="block text-sm font-bold text-slate-700 dark:text-gray-200 mb-1.5">Password</label>
 <div className="relative">
 <input type={showPass ? 'text' : 'password'} required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Masukkan password"
 className="w-full px-4 py-3 rounded-xl border border-border-subtle dark:border-gray-700 text-sm bg-white dark:bg-gray-900 shadow-card focus:shadow-card focus:translate-x-[3px] focus:translate-y-[3px] focus:outline-none pr-12 transition-all" />
 <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-gray-500 hover:text-slate-600 dark:hover:text-gray-300">
 {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
 </button>
 </div>
 </div>
 <button type="submit" disabled={loading}
 className="w-full py-3 rounded-xl bg-dusty-pink text-white border border-border-subtle shadow-card hover:bg-deep-rose hover:shadow-card font-bold text-sm disabled:opacity-60 transition-all">
 {loading ? 'Masuk...' : 'Masuk'}
 </button>
 </form>

 <div className="mt-6 border-t border-border-subtle dark:border-gray-800 pt-6 text-sm text-warm-gray dark:text-gray-400">
 <Link to="/" className="font-semibold hover:text-charcoal dark:hover:text-white transition-colors">
 &larr; Kembali ke beranda
 </Link>
 </div>
 </div>
 </motion.div>

 <motion.div
 className="order-1 lg:order-2"
 initial={{ opacity: 0, x: 18 }}
 animate={{ opacity: 1, x: 0 }}
 transition={{ duration: 0.45, delay: 0.06 }}
 >
 <div className="relative overflow-hidden rounded-[36px] border border-white/70 dark:border-gray-800 shadow-[0_28px_64px_rgba(166,107,118,0.24)] min-h-[320px] lg:min-h-[680px]">
 <img
 src={unsplashImage}
 alt="Pink neon sign aesthetic from Unsplash"
 className="absolute inset-0 h-full w-full object-cover"
 />
 <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,250,251,0.14)_0%,rgba(45,34,38,0.34)_45%,rgba(45,34,38,0.8)_100%)] dark:bg-[linear-gradient(180deg,rgba(15,23,42,0.18)_0%,rgba(15,23,42,0.46)_42%,rgba(2,6,23,0.88)_100%)]" />

 <div className="relative flex h-full flex-col justify-between p-6 md:p-8">
 <div className="flex items-start justify-between gap-4">
 <div className="inline-flex items-center gap-2 rounded-full bg-white/78 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-deep-rose backdrop-blur dark:bg-gray-900/70 dark:text-rose-200">
 <Sparkles size={14} />
 Moodboard
 </div>
 <span className="rounded-full border border-white/35 bg-white/16 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur">
 Unsplash
 </span>
 </div>

 <div className="mt-10 max-w-md">
 <p className="text-xs font-semibold uppercase tracking-[0.26em] text-white/75">IkutPose Photobooth</p>
 <h2 className="mt-3 text-4xl leading-tight text-white md:text-5xl">
 Masuk, pilih frame favoritmu, lalu lanjut bikin kenangan.
 </h2>
 <p className="mt-4 text-sm leading-7 text-white/82">
 Visual ini saya ambil dari Unsplash supaya sisi login terasa lebih hangat, dreamy, dan tetap selaras dengan nuansa dusty pink brand kita.
 </p>

 <div className="mt-6 space-y-3">
 {sideHighlights.map((item) => (
 <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/18 bg-white/12 px-4 py-3 text-sm text-white/90 backdrop-blur">
 <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/18 text-white">
 <BadgeCheck size={14} />
 </span>
 <span>{item}</span>
 </div>
 ))}
 </div>
 </div>
 </div>
 </div>
 </motion.div>
 </div>
 </main>

 <Footer />
 </div>
 )
}
