import { useParams, Link } from 'react-router-dom'
import { Download, Share2, Search, ArrowLeft } from 'lucide-react'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import client from '../../api/client'
import Navbar from '../../components/layout/Navbar'

export default function EventGallery() {
 const { slug } = useParams()
 const [sort, setSort] = useState('newest')

 const { data: response } = useQuery({
 queryKey: ['event', slug],
 queryFn: () => client.get(`/events/${slug}`).then((r) => r.data),
 })

 const event = response?.event ?? response

 const { data: gallery, isLoading } = useQuery({
 queryKey: ['event-gallery', slug],
 queryFn: () => client.get(`/events/${slug}/gallery`).then((r) => r.data?.data ?? r.data ?? []),
 })

 const photos = Array.isArray(gallery) ? gallery : []

 return (
 <div className="min-h-screen bg-[#FAFAFA] dark:bg-gray-950 font-sans text-charcoal dark:text-gray-100 selection:bg-rose-300">
 <Navbar />

 <div className="bg-rose-50 dark:bg-rose-950/30 border-b-2 border-soft-gray py-6 px-6">
 <div className="max-w-6xl mx-auto flex items-center gap-4">
 <Link to={`/events/${slug}`} className="w-9 h-9 rounded-lg bg-white dark:bg-gray-900 border border-border-subtle shadow-card flex items-center justify-center text-charcoal dark:text-gray-100 hover:shadow-card-hover transition-all">
 <ArrowLeft size={16} strokeWidth={2.5} />
 </Link>
 <div>
 <h1 className="text-xl font-extrabold">
 {event?.name ?? slug?.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
 </h1>
 <p className="text-xs text-warm-gray dark:text-gray-400 font-bold">Gallery foto event</p>
 </div>
 </div>
 </div>

 <div className="max-w-6xl mx-auto px-6 py-8">
 <div className="flex flex-col sm:flex-row gap-3 mb-8">
 <div className="relative flex-1 max-w-sm">
 <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-gray-500" />
 <input type="text" placeholder="Cari nama tamu..."
 className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border-subtle text-sm bg-white dark:bg-gray-900 shadow-card focus:shadow-card focus:translate-x-[3px] focus:translate-y-[3px] focus:outline-none transition-all" />
 </div>
 <select value={sort} onChange={(e) => setSort(e.target.value)}
 className="px-4 py-2.5 rounded-xl border border-border-subtle text-sm bg-white dark:bg-gray-900 shadow-card focus:outline-none font-bold">
 <option value="newest">Terbaru</option>
 <option value="oldest">Terlama</option>
 </select>
 </div>

 {isLoading ? (
 <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
 {[1, 2, 3, 4, 5, 6].map((i) => <div key={i} className="break-inside-avoid rounded-xl border border-border-subtle bg-slate-200 animate-pulse" style={{ aspectRatio: i % 2 === 0 ? '3/4' : '4/3' }} />)}
 </div>
 ) : photos.length === 0 ? (
 <div className="text-center py-16">
 <div className="inline-block p-8 rounded-xl border border-border-subtle bg-white dark:bg-gray-900 shadow-card">
 <p className="text-warm-gray dark:text-gray-400 font-medium">Belum ada foto di gallery event ini</p>
 <Link to={`/events/${slug}/booth`} className="inline-block mt-4 px-5 py-2 rounded-lg bg-dusty-pink text-white border border-border-subtle shadow-card hover:shadow-card-hover text-charcoal dark:text-gray-100 font-bold text-sm transition-all">
 Mulai Foto
 </Link>
 </div>
 </div>
 ) : (
 <>
 <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
 {photos.map((photo, i) => (
 <div key={photo.id} className="break-inside-avoid group relative rounded-xl overflow-hidden border border-border-subtle shadow-card cursor-pointer"
 style={{ aspectRatio: i % 3 === 0 ? '3/4' : '4/3' }}>
 <div className="w-full h-full bg-gradient-to-br from-rose-200 via-rose-100 to-white" />
 <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/40 transition-colors flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100">
 <div className="flex gap-2">
 <button className="w-9 h-9 rounded-lg bg-white dark:bg-gray-900 border border-border-subtle shadow-card flex items-center justify-center text-charcoal dark:text-gray-100"><Download size={16} /></button>
 <button className="w-9 h-9 rounded-lg bg-white dark:bg-gray-900 border border-border-subtle shadow-card flex items-center justify-center text-charcoal dark:text-gray-100"><Share2 size={16} /></button>
 </div>
 </div>
 </div>
 ))}
 </div>
 <div className="text-center mt-10">
 <button className="px-6 py-2.5 rounded-xl bg-white dark:bg-gray-900 border border-border-subtle shadow-card hover:shadow-card text-sm font-bold text-charcoal dark:text-gray-100 transition-all">
 Load More
 </button>
 </div>
 </>
 )}
 </div>
 </div>
 )
}
