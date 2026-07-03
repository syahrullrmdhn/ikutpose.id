import { Link } from 'react-router-dom'
import { Plus, Search, Calendar, Edit, Trash2, ExternalLink } from 'lucide-react'
import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getEvents, deleteEvent } from '../../../api/events'
import Card from '../../../components/ui/Card'

const statusColor = {
 active: 'bg-green-50 text-green-600',
 draft: 'bg-neutral-100 text-neutral-500',
 paused: 'bg-yellow-50 text-yellow-600',
 ended: 'bg-red-50 text-red-500',
}

export default function EventList() {
 const [search, setSearch] = useState('')
 const queryClient = useQueryClient()

 const { data: events, isLoading } = useQuery({
 queryKey: ['admin-events'],
 queryFn: () => getEvents().then((r) => r.data?.data ?? r.data ?? []),
 })

 const deleteMut = useMutation({
 mutationFn: deleteEvent,
 onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-events'] }),
 })

 const list = Array.isArray(events) ? events : []
 const filtered = list.filter((e) => e.name?.toLowerCase().includes(search.toLowerCase()))

 return (
 <div className="space-y-6">
 <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
 <div>
 <h2 className="text-xl font-bold text-neutral-800">Events</h2>
 <p className="text-sm text-neutral-500">{list.length} event</p>
 </div>
 <Link to="/admin/events/create" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-400 text-white text-sm font-semibold hover:bg-primary-500 transition-colors">
 <Plus size={16} />Buat Event
 </Link>
 </div>

 <div className="relative max-w-sm">
 <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
 <input type="text" placeholder="Cari event..." value={search} onChange={(e) => setSearch(e.target.value)}
 className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-primary-400" />
 </div>

 {isLoading ? (
 <div className="space-y-3">{[1, 2, 3].map((i) => <Card key={i} className="p-5 animate-pulse"><div className="h-12" /></Card>)}</div>
 ) : (
 <div className="space-y-3">
 {filtered.map((e) => (
 <Card key={e.id} className="p-5">
 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
 <div className="flex items-center gap-4">
 <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center">
 <Calendar size={20} className="text-primary-400" />
 </div>
 <div>
 <p className="font-semibold text-neutral-800">{e.name}</p>
 <p className="text-xs text-neutral-400 mt-0.5">{e.start_date?.split('T')?.[0]} &middot; {e.photo_sessions_count ?? 0} sesi</p>
 </div>
 </div>
 <div className="flex items-center gap-2">
 <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusColor[e.status]}`}>{e.status}</span>
 <Link to={`/events/${e.slug}`} className="p-2 rounded-lg hover:bg-neutral-100 text-neutral-400"><ExternalLink size={16} /></Link>
 <Link to={`/admin/events/${e.id}/edit`} className="p-2 rounded-lg hover:bg-neutral-100 text-neutral-400"><Edit size={16} /></Link>
 <button onClick={() => { if (confirm('Hapus event?')) deleteMut.mutate(e.id) }} className="p-2 rounded-lg hover:bg-neutral-100 text-neutral-400 hover:text-red-500"><Trash2 size={16} /></button>
 </div>
 </div>
 </Card>
 ))}
 </div>
 )}
 </div>
 )
}
