import { Download, Share2, Search, Heart } from 'lucide-react'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useQuery } from '@tanstack/react-query'
import { getPublicGallery } from '../../api/photos'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'

export default function PublicGallery() {
 const [search, setSearch] = useState('')
 const [selectedPhoto, setSelectedPhoto] = useState(null)

 const { data: photos, isLoading } = useQuery({
 queryKey: ['public-gallery'],
 queryFn: () => getPublicGallery().then((r) => r.data?.data ?? r.data ?? []),
 })

 const list = Array.isArray(photos) ? photos : []

 return (
 <div className="min-h-screen flex flex-col bg-[#FAFAFA] dark:bg-gray-950 font-sans text-charcoal dark:text-gray-100 selection:bg-rose-300">
 <Navbar />

 <div className="relative overflow-hidden bg-rose-50 dark:bg-rose-950/30 border-b-2 border-soft-gray">
 <div className="absolute inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#0f172a 2px, transparent 2px)', backgroundSize: '32px 32px' }} />
 <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 text-center">
 <motion.h1 className="text-3xl md:text-4xl font-extrabold mb-2" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>Gallery</motion.h1>
 <p className="text-slate-600 dark:text-gray-300 font-medium">Koleksi momen dari berbagai event</p>
 </div>
 </div>

 <div className="flex-1 max-w-6xl mx-auto px-6 py-8 w-full">
 <div className="relative max-w-sm mb-8">
 <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-gray-500" />
 <input type="text" placeholder="Cari..." value={search} onChange={(e) => setSearch(e.target.value)}
 className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border-subtle text-sm bg-white dark:bg-gray-900 shadow-card focus:shadow-card focus:translate-x-[3px] focus:translate-y-[3px] focus:outline-none transition-all" />
 </div>

 {isLoading ? (
 <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
 {[1, 2, 3, 4, 5, 6].map((i) => <div key={i} className="break-inside-avoid rounded-xl border border-border-subtle bg-slate-200 animate-pulse" style={{ aspectRatio: i % 2 === 0 ? '3/4' : '4/3' }} />)}
 </div>
 ) : list.length === 0 ? (
 <div className="text-center py-16">
 <div className="inline-block p-8 rounded-xl border border-border-subtle bg-white dark:bg-gray-900 shadow-card">
 <p className="text-warm-gray dark:text-gray-400 font-medium">Belum ada foto di gallery</p>
 </div>
 </div>
 ) : (
 <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
 {list.map((photo, i) => (
 <motion.div key={photo.id} className="break-inside-avoid group relative rounded-xl overflow-hidden border border-border-subtle shadow-card cursor-pointer"
 style={{ aspectRatio: i % 3 === 0 ? '3/4' : '4/3' }}
 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }}
 onClick={() => setSelectedPhoto(photo)}>
 <div className="w-full h-full bg-gradient-to-br from-rose-200 via-rose-100 to-white" />
 <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/40 transition-colors flex flex-col justify-between p-4 opacity-0 group-hover:opacity-100">
 <div className="flex justify-end">
 <button className="w-8 h-8 rounded-lg bg-white dark:bg-gray-900 border border-border-subtle shadow-card flex items-center justify-center text-charcoal dark:text-gray-100"><Heart size={14} /></button>
 </div>
 <div>
 <p className="text-white text-sm font-bold">{photo.photo_session?.event?.name ?? 'Photo'}</p>
 <div className="flex gap-2 mt-2">
 <button className="w-8 h-8 rounded-lg bg-white dark:bg-gray-900 border border-border-subtle shadow-card flex items-center justify-center text-charcoal dark:text-gray-100"><Download size={14} /></button>
 <button className="w-8 h-8 rounded-lg bg-white dark:bg-gray-900 border border-border-subtle shadow-card flex items-center justify-center text-charcoal dark:text-gray-100"><Share2 size={14} /></button>
 </div>
 </div>
 </div>
 </motion.div>
 ))}
 </div>
 )}
 </div>

 {selectedPhoto && (
 <div className="fixed inset-0 z-50 bg-slate-900/80 flex items-center justify-center p-6" onClick={() => setSelectedPhoto(null)}>
 <motion.div className="relative max-w-lg w-full bg-white dark:bg-gray-900 rounded-xl border border-border-subtle shadow-card overflow-hidden" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} onClick={(e) => e.stopPropagation()}>
 <div className="aspect-[3/4] bg-gradient-to-br from-rose-200 via-rose-100 to-white" />
 <div className="p-5">
 <p className="font-bold text-charcoal dark:text-gray-100">{selectedPhoto.photo_session?.event?.name ?? 'Photo'}</p>
 <div className="flex gap-3 mt-4">
 <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-dusty-pink text-white border border-border-subtle shadow-card hover:shadow-card text-charcoal dark:text-gray-100 font-bold text-sm transition-all"><Download size={16} />Download</button>
 <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white dark:bg-gray-900 border border-border-subtle shadow-card hover:shadow-card text-charcoal dark:text-gray-100 font-bold text-sm transition-all"><Share2 size={16} />Share</button>
 </div>
 </div>
 </motion.div>
 </div>
 )}

 <Footer />
 </div>
 )
}
