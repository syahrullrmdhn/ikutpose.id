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
 <div className="min-h-screen flex flex-col bg-[#FAFAFA] font-sans text-charcoal selection:bg-rose-300">
 <Navbar />

 <div className="h-48 md:h-64 bg-gradient-to-r from-rose-300 to-rose-400 border-b-2 border-soft-gray flex items-center justify-center relative overflow-hidden">
 <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#0f172a 2px, transparent 2px)', backgroundSize: '32px 32px' }} />
 <motion.div className="text-center relative z-10" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
 <h1 className="text-3xl md:text-5xl font-extrabold text-charcoal mb-2">
 {event?.name ?? slug?.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
 </h1>
 <p className="text-slate-800 font-medium text-sm">Abadikan momen, ciptakan kenangan</p>
 </motion.div>
 </div>

 <div className="flex-1 max-w-4xl mx-auto px-6 py-12 w-full">
 <div className="text-center mb-12">
 <p className="text-slate-600 font-medium mb-6 max-w-xl mx-auto">
 {event?.description ?? 'Selamat datang di photobooth event ini. Ambil foto, hias dengan template dan sticker, lalu simpan kenanganmu!'}
 </p>
 <Link to={`/events/${slug}/booth`}
 className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-dusty-pink text-white border border-border-subtle shadow-card hover:shadow-card text-charcoal font-bold transition-all">
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
 <div key={info.label} className="bg-white rounded-xl border border-border-subtle shadow-card p-5 text-center">
 <div className="w-10 h-10 rounded-lg bg-rose-200 border border-border-subtle shadow-card flex items-center justify-center mx-auto mb-3 text-charcoal">
 <info.icon size={18} strokeWidth={2.5} />
 </div>
 <p className="text-xs text-warm-gray font-bold uppercase tracking-wider mb-1">{info.label}</p>
 <p className="text-sm font-bold text-charcoal">{info.value}</p>
 </div>
 ))}
 </div>

 {/* Assigned templates */}
 {event?.templates?.length > 0 && (
 <div className="mb-12">
 <h2 className="text-xl font-extrabold mb-4">Template Tersedia</h2>
 <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
 {event.templates.map((t, i) => (
 <div key={t.id} className="bg-white rounded-xl border border-border-subtle shadow-card overflow-hidden">
 <div className={`aspect-[3/4] flex items-center justify-center ${['bg-rose-200', 'bg-blue-200', 'bg-green-200', 'bg-yellow-200'][i % 4]}`}>
 <span className="text-2xl font-black text-charcoal/20">{t.photo_slots?.length ?? '?'}</span>
 </div>
 <div className="p-2 border-t-2 border-soft-gray">
 <p className="text-xs font-bold text-charcoal truncate">{t.name}</p>
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
 <Link to={`/events/${slug}/gallery`} className="text-sm font-bold text-charcoal hover:text-rose-500 transition-colors">
 Lihat Semua &rarr;
 </Link>
 </div>
 <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
 {Array.from({ length: 8 }).map((_, i) => (
 <div key={i} className="aspect-[3/4] rounded-xl border border-border-subtle bg-gradient-to-br from-rose-200 via-rose-100 to-white shadow-card" />
 ))}
 </div>
 </div>
 </div>

 <Footer />
 </div>
 )
}
