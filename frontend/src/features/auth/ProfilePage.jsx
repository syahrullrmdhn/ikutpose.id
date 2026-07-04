import { useAuthStore } from '../../stores/authStore'
import { useNavigate, Link } from 'react-router-dom'
import { Camera, LogOut, User, Mail, Shield } from 'lucide-react'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'

export default function ProfilePage() {
 const navigate = useNavigate()
 const { user, logout } = useAuthStore()

 const handleLogout = () => { logout(); navigate('/') }

 if (!user) {
 return (
 <div className="min-h-screen bg-[#FAFAFA] dark:bg-gray-950 font-sans text-charcoal dark:text-gray-100 selection:bg-rose-300 flex flex-col">
 <Navbar />
 <div className="flex-1 flex items-center justify-center px-6">
 <div className="text-center p-10 rounded-xl bg-white dark:bg-gray-900 border border-border-subtle shadow-card">
 <div className="w-16 h-16 rounded-lg bg-rose-200 dark:bg-rose-900/50 border border-border-subtle shadow-card flex items-center justify-center mx-auto mb-4 text-charcoal dark:text-gray-100">
 <User size={28} strokeWidth={2.5} />
 </div>
 <h2 className="text-xl font-extrabold mb-2">Belum Masuk</h2>
 <p className="text-sm text-warm-gray dark:text-gray-400 font-medium mb-6">Silakan login untuk melihat profil</p>
 <Link to="/login" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-dusty-pink text-white border border-border-subtle shadow-card hover:bg-deep-rose hover:shadow-card font-bold text-sm transition-all">
 Login
 </Link>
 </div>
 </div>
 <Footer />
 </div>
 )
 }

 return (
 <div className="min-h-screen bg-[#FAFAFA] dark:bg-gray-950 font-sans text-charcoal dark:text-gray-100 selection:bg-rose-300 flex flex-col">
 <Navbar />
 <div className="flex-1 max-w-2xl mx-auto px-6 py-12 w-full">
 <div className="bg-white dark:bg-gray-900 rounded-xl border border-border-subtle shadow-card overflow-hidden">
 <div className="h-24 bg-gradient-to-r from-rose-300 to-rose-400 border-b-2 border-soft-gray" />
 <div className="px-8 pb-8">
 <div className="flex items-end gap-4 -mt-10 mb-6">
 <div className="w-20 h-20 rounded-xl bg-white dark:bg-gray-900 border border-border-subtle shadow-card flex items-center justify-center text-2xl font-bold text-charcoal dark:text-gray-100">
 {user.name?.charAt(0).toUpperCase() || 'U'}
 </div>
 <div className="pb-1">
 <h1 className="text-xl font-extrabold">{user.name}</h1>
 <span className="text-xs px-2 py-0.5 rounded-lg bg-rose-200 dark:bg-rose-900/50 border border-border-subtle font-bold capitalize">{user.role}</span>
 </div>
 </div>
 <div className="space-y-4">
 {[
 { icon: Mail, label: 'Email', value: user.email },
 { icon: Shield, label: 'Role', value: user.role },
 { icon: Camera, label: 'Foto Diambil', value: '0 foto' },
 ].map((item) => (
 <div key={item.label} className="flex items-center gap-3 py-3 border-b-2 border-slate-100 dark:border-gray-800">
 <div className="w-8 h-8 rounded-lg bg-rose-100 dark:bg-rose-900/30 border border-border-subtle flex items-center justify-center text-charcoal dark:text-gray-100">
 <item.icon size={16} strokeWidth={2.5} />
 </div>
 <div>
 <p className="text-xs text-warm-gray dark:text-gray-400 font-bold uppercase tracking-wider">{item.label}</p>
 <p className="text-sm font-bold text-charcoal dark:text-gray-100 capitalize">{item.value}</p>
 </div>
 </div>
 ))}
 </div>
 <div className="flex gap-3 mt-6">
 <Link to="/booth" className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-dusty-pink text-white border border-border-subtle shadow-card hover:bg-deep-rose hover:shadow-card font-bold text-sm transition-all">
 <Camera size={16} strokeWidth={2.5} />Mulai Foto
 </Link>
 <button onClick={handleLogout} className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white dark:bg-gray-900 border border-border-subtle shadow-card hover:shadow-card text-charcoal dark:text-gray-100 font-bold text-sm transition-all">
 <LogOut size={16} strokeWidth={2.5} />Keluar
 </button>
 </div>
 </div>
 </div>
 </div>
 <Footer />
 </div>
 )
}
