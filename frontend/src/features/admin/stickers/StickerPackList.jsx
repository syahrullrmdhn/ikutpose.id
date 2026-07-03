import { Link } from 'react-router-dom'
import { Plus, Search, Sticker, Trash2, Edit } from 'lucide-react'
import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getStickerPacks, deleteStickerPack } from '../../../api/stickers'
import Card from '../../../components/ui/Card'

export default function StickerPackList() {
 const [search, setSearch] = useState('')
 const queryClient = useQueryClient()

 const { data: packs, isLoading } = useQuery({
 queryKey: ['admin-sticker-packs'],
 queryFn: () => getStickerPacks().then((r) => r.data?.data ?? r.data ?? []),
 })

 const deleteMut = useMutation({
 mutationFn: deleteStickerPack,
 onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-sticker-packs'] }),
 })

 const list = Array.isArray(packs) ? packs : []
 const filtered = list.filter((p) => p.name?.toLowerCase().includes(search.toLowerCase()))

 return (
 <div className="space-y-6">
 <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
 <div>
 <h2 className="text-xl font-bold text-neutral-800">Sticker Packs</h2>
 <p className="text-sm text-neutral-500">{list.length} pack tersedia</p>
 </div>
 <Link to="/admin/sticker-packs/create" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-400 text-white text-sm font-semibold hover:bg-primary-500 transition-colors">
 <Plus size={16} />Buat Pack
 </Link>
 </div>

 <div className="relative max-w-sm">
 <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
 <input type="text" placeholder="Cari sticker pack..." value={search} onChange={(e) => setSearch(e.target.value)}
 className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-primary-400" />
 </div>

 {isLoading ? (
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">{[1, 2, 3].map((i) => <Card key={i} className="p-5 animate-pulse"><div className="h-16" /></Card>)}</div>
 ) : (
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
 {filtered.map((p) => (
 <Card key={p.id} className="p-5">
 <div className="flex items-start gap-4">
 <div className="w-16 h-16 rounded-xl bg-primary-50 flex items-center justify-center shrink-0">
 <Sticker size={24} className="text-primary-400" />
 </div>
 <div className="flex-1 min-w-0">
 <p className="font-semibold text-neutral-800 truncate">{p.name}</p>
 <p className="text-xs text-neutral-400 mt-0.5">{p.category} &middot; {p.stickers_count ?? p.stickers?.length ?? 0} sticker</p>
 <span className={`inline-block text-xs px-2 py-0.5 rounded-full font-medium mt-2 ${p.is_active ? 'bg-green-50 text-green-600' : 'bg-neutral-100 text-neutral-400'}`}>
 {p.is_active ? 'active' : 'inactive'}
 </span>
 </div>
 </div>
 <div className="flex gap-2 mt-4">
 <Link to={`/admin/sticker-packs/${p.id}/edit`} className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border border-neutral-200 text-sm text-neutral-600 hover:border-primary-300 transition-colors">
 <Edit size={14} />Edit
 </Link>
 <button onClick={() => { if (confirm('Hapus pack?')) deleteMut.mutate(p.id) }} className="px-3 py-2 rounded-lg border border-neutral-200 text-neutral-400 hover:text-red-500 hover:border-red-200 transition-colors">
 <Trash2 size={14} />
 </button>
 </div>
 </Card>
 ))}
 </div>
 )}
 </div>
 )
}
