import { Link } from 'react-router-dom'
import { Calendar, Camera, ArrowRight, Search } from 'lucide-react'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useQuery } from '@tanstack/react-query'
import client from '../../api/client'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'

const statusBadge = {
 active: 'bg-green-200 text-green-900',
 upcoming: 'bg-blue-200 text-blue-900',
 ended: 'bg-slate-200 text-slate-700 dark:text-gray-200',
 draft: 'bg-yellow-200 text-yellow-900',
}

const statusLabel = {
 active: 'Berlangsung',
 upcoming: 'Segera',
 ended: 'Selesai',
 draft: 'Draft',
}

export default function PublicEvents() {
 const [search, setSearch] = useState('')

 const { data: events, isLoading } = useQuery({
 queryKey: ['public-events'],
 queryFn: () => client.get('/events').then((r) => r.data?.data ?? r.data ?? []),
 })

 const list = Array.isArray(events) ? events : []
 const filtered = list.filter((e) => e.name?.toLowerCase().includes(search.toLowerCase()))

 return (
 <div className="min-h-screen flex flex-col bg-[#FAFAFA] dark:bg-gray-950 font-sans text-charcoal dark:text-gray-100 selection:bg-rose-300">
 <Navbar />

 <div className="relative overflow-hidden bg-rose-50 dark:bg-rose-950/30 border-b-2 border-soft-gray">
 <div className="absolute inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#0f172a 2px, transparent 2px)', backgroundSize: '32px 32px' }} />
 <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 text-center">
 <motion.h1 className="text-3xl md:text-4xl font-extrabold mb-2" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>Events</motion.h1>
 <p className="text-slate-600 dark:text-gray-300 font-medium">Temukan event photobooth dan ambil foto</p>
 </div>
 </div>

 <div className="flex-1 max-w-6xl mx-auto px-6 py-8 w-full">
 <div className="relative max-w-sm mb-8">
 <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-gray-500" />
 <input type="text" placeholder="Cari event..." value={search} onChange={(e) => setSearch(e.target.value)}
 className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border-subtle text-sm bg-white dark:bg-gray-900 shadow-card focus:shadow-card focus:translate-x-[3px] focus:translate-y-[3px] focus:outline-none transition-all" />
 </div>

 {isLoading ? (
 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">{[1, 2, 3].map((i) => <div key={i} className="bg-white dark:bg-gray-900 rounded-xl border border-border-subtle h-64 animate-pulse" />)}</div>
 ) : (
 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
 {filtered.map((event, i) => (
 <motion.div key={event.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}>
 <Link to={`/events/${event.slug}`} className="block bg-white dark:bg-gray-900 rounded-xl border border-border-subtle shadow-card hover:shadow-card transition-all overflow-hidden group">
 <div className="h-36 bg-gradient-to-br from-rose-200 via-rose-100 to-white relative overflow-hidden">
 <img src="/abstrackping.jpeg" alt="" className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-500" />
 <div className="absolute top-3 right-3">
 <span className={`text-xs px-2.5 py-1 rounded-lg font-bold border border-border-subtle ${statusBadge[event.status] ?? 'bg-slate-200 text-slate-700 dark:text-gray-200'}`}>{statusLabel[event.status] ?? event.status}</span>
 </div>
 </div>
 <div className="p-5">
 <h3 className="font-bold text-charcoal dark:text-gray-100 mb-1">{event.name}</h3>
 <div className="flex items-center gap-3 text-xs text-warm-gray dark:text-gray-400 font-medium mb-4">
 <span className="flex items-center gap-1"><Calendar size={12} />{event.start_date?.split('T')?.[0]}</span>
 <span className="flex items-center gap-1"><Camera size={12} />{event.photo_sessions_count ?? 0} sesi</span>
 </div>
 <span className="inline-flex items-center gap-1 text-sm font-bold text-charcoal dark:text-gray-100">
 {event.status === 'active' ? 'Mulai Foto' : 'Lihat Detail'}<ArrowRight size={14} strokeWidth={2.5} />
 </span>
 </div>
 </Link>
 </motion.div>
 ))}
 </div>
 )}
 </div>

 <Footer />
 </div>
 )
}
