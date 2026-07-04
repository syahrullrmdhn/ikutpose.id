import { useParams, Link } from 'react-router-dom'
import { Camera, Calendar, Image } from 'lucide-react'
import { motion } from 'framer-motion'
import { useQuery } from '@tanstack/react-query'
import client from '../../api/client'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'

export default function EventLanding() {
 const { slug } = useParams()

 const { data: response, isLoading } = useQuery({
 queryKey: ['event', slug],
 queryFn: () => client.get(`/events/${slug}`).then((r) => r.data),
 })

 const event = response?.event ?? response

 return (
 <div className="min-h-screen flex flex-col bg-[#FAFAFA] dark:bg-gray-950 font-sans text-charcoal dark:text-gray-100 selection:bg-rose-300">
 <Navbar />

 <div className="h-48 md:h-64 bg-gradient-to-r from-rose-300 to-rose-400 dark:from-rose-900 dark:to-rose-950 border-b-2 border-soft-gray dark:border-gray-800 flex items-center justify-center relative overflow-hidden">
 <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#0f172a 2px, transparent 2px)', backgroundSize: '32px 32px' }} />
 <motion.div className="text-center relative z-10" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
 <h1 className="text-3xl md:text-5xl font-extrabold text-charcoal dark:text-gray-100 mb-2">
 {event?.name ?? slug?.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
 </h1>
 <p className="text-slate-800 dark:text-gray-100 font-medium text-sm">Abadikan momen, ciptakan kenangan</p>
 </motion.div>
 </div>

 <div className="flex-1 max-w-4xl mx-auto px-6 py-12 w-full">
 <div className="text-center mb-12">
 <p className="text-slate-600 dark:text-gray-300 font-medium mb-6 max-w-xl mx-auto">
 {event?.description ?? 'Selamat datang di photobooth event ini. Ambil foto, hias dengan template dan sticker, lalu simpan kenanganmu!'}
 </p>
 <Link to={`/events/${slug}/booth`}
 className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-dusty-pink text-white border border-border-subtle shadow-card hover:bg-deep-rose hover:shadow-card font-bold transition-all">
 <Camera size={18} strokeWidth={2.5} />
 Mulai Foto
 </Link>
 </div>

 <div className="grid md:grid-cols-3 gap-5 mb-12">
 {[
 { icon: Calendar, label: 'Tanggal', value: event?.start_date?.split('T')?.[0] ?? '-' },
 { icon: Camera, label: 'Foto Diambil', value: `${event?.photo_sessions_count ?? 0} foto` },
 { icon: Image, label: 'Template', value: `${event?.templates_count ?? event?.templates?.length ?? 0} template` },
 ].map((info) => (
 <div key={info.label} className="bg-white dark:bg-gray-900 rounded-xl border border-border-subtle shadow-card p-5 text-center">
 <div className="w-10 h-10 rounded-lg bg-rose-200 dark:bg-rose-900/50 border border-border-subtle shadow-card flex items-center justify-center mx-auto mb-3 text-charcoal dark:text-gray-100">
 <info.icon size={18} strokeWidth={2.5} />
 </div>
 <p className="text-xs text-warm-gray dark:text-gray-400 font-bold uppercase tracking-wider mb-1">{info.label}</p>
 <p className="text-sm font-bold text-charcoal dark:text-gray-100">{info.value}</p>
 </div>
 ))}
 </div>

 {/* Assigned templates */}
 {event?.templates?.length > 0 && (
 <div className="mb-12">
 <h2 className="text-xl font-extrabold mb-4">Template Tersedia</h2>
 <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
 {event.templates.map((t, i) => (
 <div key={t.id} className="bg-white dark:bg-gray-900 rounded-xl border border-border-subtle shadow-card overflow-hidden">
 <div className={`aspect-[3/4] flex items-center justify-center ${['bg-rose-200 dark:bg-rose-900/50', 'bg-blue-200 dark:bg-blue-900/40', 'bg-green-200 dark:bg-green-900/40', 'bg-yellow-200 dark:bg-yellow-900/40'][i % 4]}`}>
 <span className="text-2xl font-black text-charcoal dark:text-gray-100/20">{t.photo_slots?.length ?? '?'}</span>
 </div>
 <div className="p-2 border-t-2 border-soft-gray">
 <p className="text-xs font-bold text-charcoal dark:text-gray-100 truncate">{t.name}</p>
 </div>
 </div>
 ))}
 </div>
 </div>
 )}

 {/* Gallery preview */}
 <div>
 <div className="flex items-center justify-between mb-6">
 <h2 className="text-2xl font-extrabold">Gallery</h2>
 <Link to={`/events/${slug}/gallery`} className="text-sm font-bold text-charcoal dark:text-gray-100 hover:text-rose-500 transition-colors">
 Lihat Semua &rarr;
 </Link>
 </div>
 <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
 {Array.from({ length: 8 }).map((_, i) => (
 <div key={i} className="aspect-[3/4] rounded-xl border border-border-subtle dark:border-gray-800 bg-gradient-to-br from-rose-200 via-rose-100 to-white dark:from-rose-900/40 dark:via-slate-900 dark:to-gray-900 shadow-card" />
 ))}
 </div>
 </div>
 </div>

 <Footer />
 </div>
 )
}
