import { Link } from 'react-router-dom'
import { Plus, Search, Frame, Trash2, Edit, Copy } from 'lucide-react'
import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getTemplates, deleteTemplate, duplicateTemplate } from '../../../api/templates'
import Card from '../../../components/ui/Card'

export default function TemplateList() {
 const [search, setSearch] = useState('')
 const queryClient = useQueryClient()

 const { data: templates, isLoading } = useQuery({
 queryKey: ['admin-templates'],
 queryFn: () => getTemplates().then((r) => r.data?.data ?? r.data ?? []),
 })

 const deleteMut = useMutation({
 mutationFn: deleteTemplate,
 onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-templates'] }),
 })

 const dupMut = useMutation({
 mutationFn: duplicateTemplate,
 onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-templates'] }),
 })

 const list = Array.isArray(templates) ? templates : []
 const filtered = list.filter((t) => t.name?.toLowerCase().includes(search.toLowerCase()))

 return (
 <div className="space-y-6">
 <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
 <div>
 <h2 className="text-xl font-bold text-neutral-800">Templates</h2>
 <p className="text-sm text-neutral-500">{list.length} template tersedia</p>
 </div>
 <Link to="/admin/templates/create" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-400 text-white text-sm font-semibold hover:bg-primary-500 transition-colors">
 <Plus size={16} />Buat Template
 </Link>
 </div>

 <div className="relative max-w-sm">
 <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
 <input type="text" placeholder="Cari template..." value={search} onChange={(e) => setSearch(e.target.value)}
 className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-primary-400" />
 </div>

 {isLoading ? (
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
 {[1, 2, 3].map((i) => <Card key={i} className="animate-pulse"><div className="aspect-[3/4] bg-neutral-100" /><div className="p-4 space-y-2"><div className="h-4 w-32 bg-neutral-100 rounded" /><div className="h-3 w-20 bg-neutral-100 rounded" /></div></Card>)}
 </div>
 ) : (
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
 {filtered.map((t) => (
 <Card key={t.id} className="overflow-hidden">
 <div className="aspect-[3/4] bg-neutral-100 flex items-center justify-center">
 <Frame size={40} className="text-neutral-300" />
 </div>
 <div className="p-4">
 <div className="flex items-start justify-between">
 <div>
 <p className="font-semibold text-neutral-800">{t.name}</p>
 <p className="text-xs text-neutral-400 mt-0.5">{t.layout?.replace('_', ' ')} &middot; {t.photo_slots?.length ?? 0} foto</p>
 </div>
 <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${t.is_active ? 'bg-green-50 text-green-600' : 'bg-neutral-100 text-neutral-400'}`}>
 {t.is_active ? 'active' : 'inactive'}
 </span>
 </div>
 <div className="flex gap-2 mt-3">
 <Link to={`/admin/templates/${t.id}/edit`} className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border border-neutral-200 text-sm text-neutral-600 hover:border-primary-300 transition-colors">
 <Edit size={14} />Edit
 </Link>
 <button onClick={() => dupMut.mutate(t.id)} className="px-3 py-2 rounded-lg border border-neutral-200 text-neutral-400 hover:text-primary-400 hover:border-primary-300 transition-colors">
 <Copy size={14} />
 </button>
 <button onClick={() => { if (confirm('Hapus template?')) deleteMut.mutate(t.id) }} className="px-3 py-2 rounded-lg border border-neutral-200 text-neutral-400 hover:text-red-500 hover:border-red-200 transition-colors">
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
