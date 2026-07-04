import { Link } from 'react-router-dom'
import { Plus, Search, Trash2, Edit } from 'lucide-react'
import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getFilters, deleteFilter } from '../../../api/filters'
import Card from '../../../components/ui/Card'

export default function FilterList() {
 const [search, setSearch] = useState('')
 const queryClient = useQueryClient()

 const { data: filters, isLoading } = useQuery({
 queryKey: ['admin-filters'],
 queryFn: () => getFilters().then((r) => r.data?.data ?? r.data ?? []),
 })

 const deleteMut = useMutation({
 mutationFn: deleteFilter,
 onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-filters'] }),
 })

 const list = Array.isArray(filters) ? filters : []
 const filtered = list.filter((f) => f.name?.toLowerCase().includes(search.toLowerCase()))

 const getCss = (f) => {
 const c = f.css_filter || {}
 return `brightness(${(c.brightness ?? 100) / 100}) contrast(${(c.contrast ?? 100) / 100}) saturate(${(c.saturate ?? 100) / 100}) hue-rotate(${c['hue-rotate'] ?? 0}deg) grayscale(${(c.grayscale ?? 0) / 100}) sepia(${(c.sepia ?? 0) / 100})`
 }

 return (
 <div className="space-y-6">
 <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
 <div>
 <h2 className="text-xl font-bold text-neutral-800 dark:text-gray-100">Filters</h2>
 <p className="text-sm text-neutral-500 dark:text-gray-400">{list.length} filter tersedia</p>
 </div>
 <Link to="/admin/filters/create" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-400 text-white text-sm font-semibold hover:bg-primary-500 transition-colors">
 <Plus size={16} />Buat Filter
 </Link>
 </div>

 <div className="relative max-w-sm">
 <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-gray-500" />
 <input type="text" placeholder="Cari filter..." value={search} onChange={(e) => setSearch(e.target.value)}
 className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-200 dark:border-gray-700 text-sm focus:outline-none focus:border-primary-400" />
 </div>

 {isLoading ? (
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">{[1, 2, 3].map((i) => <Card key={i} className="animate-pulse"><div className="aspect-square bg-neutral-100 dark:bg-gray-800" /></Card>)}</div>
 ) : (
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
 {filtered.map((f) => (
 <Card key={f.id} className="overflow-hidden">
 <div className="grid grid-cols-2">
 <div className="aspect-square bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200" />
 <div className="aspect-square bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200" style={{ filter: getCss(f) }} />
 </div>
 <div className="p-4">
 <div className="flex items-center justify-between mb-3">
 <p className="font-semibold text-neutral-800 dark:text-gray-100">{f.name}</p>
 <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${f.is_active ? 'bg-green-50 text-green-600' : 'bg-neutral-100 dark:bg-gray-800 text-neutral-400 dark:text-gray-500'}`}>{f.is_active ? 'active' : 'inactive'}</span>
 </div>
 <div className="flex gap-2">
 <Link to={`/admin/filters/${f.id}/edit`} className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border border-neutral-200 dark:border-gray-700 text-sm text-neutral-600 dark:text-gray-300 hover:border-primary-300 transition-colors">
 <Edit size={14} />Edit
 </Link>
 <button onClick={() => { if (confirm('Hapus filter?')) deleteMut.mutate(f.id) }} className="px-3 py-2 rounded-lg border border-neutral-200 dark:border-gray-700 text-neutral-400 dark:text-gray-500 hover:text-red-500 hover:border-red-200 transition-colors">
 <Trash2 size={14} />
 </button>
 </div>
 </div>
 </Card>
 ))}
 </div>
 )}
 </div>
 )
}
