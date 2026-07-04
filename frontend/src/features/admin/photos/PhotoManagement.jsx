import { Search, Trash2, Download, Eye } from 'lucide-react'
import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getPhotos, deletePhoto } from '../../../api/photos'
import Card from '../../../components/ui/Card'

export default function PhotoManagement() {
 const [search, setSearch] = useState('')
 const queryClient = useQueryClient()

 const { data: photos, isLoading } = useQuery({
 queryKey: ['admin-photos'],
 queryFn: () => getPhotos().then((r) => r.data?.data ?? r.data ?? []),
 })

 const deleteMut = useMutation({
 mutationFn: deletePhoto,
 onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-photos'] }),
 })

 const list = Array.isArray(photos) ? photos : []
 const filtered = list.filter((p) =>
 p.photo_session?.event?.name?.toLowerCase().includes(search.toLowerCase()) ||
 p.photo_session?.guest_name?.toLowerCase().includes(search.toLowerCase())
 )

 return (
 <div className="space-y-6">
 <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
 <div>
 <h2 className="text-xl font-bold text-neutral-800 dark:text-gray-100">Photos</h2>
 <p className="text-sm text-neutral-500 dark:text-gray-400">{list.length} foto</p>
 </div>
 <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-gray-700 text-sm text-neutral-600 dark:text-gray-300 hover:border-primary-300 transition-colors">
 <Download size={16} />Export ZIP
 </button>
 </div>

 <div className="relative max-w-sm">
 <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-gray-500" />
 <input type="text" placeholder="Cari event atau nama..." value={search} onChange={(e) => setSearch(e.target.value)}
 className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-200 dark:border-gray-700 text-sm focus:outline-none focus:border-primary-400" />
 </div>

 <Card className="overflow-hidden">
 <div className="overflow-x-auto">
 <table className="w-full text-sm">
 <thead className="bg-neutral-50 dark:bg-gray-800 border-b border-neutral-200 dark:border-gray-700">
 <tr>
 <th className="text-left px-4 py-3 font-medium text-neutral-600 dark:text-gray-300">Foto</th>
 <th className="text-left px-4 py-3 font-medium text-neutral-600 dark:text-gray-300">Event</th>
 <th className="text-left px-4 py-3 font-medium text-neutral-600 dark:text-gray-300">Template</th>
 <th className="text-left px-4 py-3 font-medium text-neutral-600 dark:text-gray-300">Tamu</th>
 <th className="text-left px-4 py-3 font-medium text-neutral-600 dark:text-gray-300">Status</th>
 <th className="text-right px-4 py-3 font-medium text-neutral-600 dark:text-gray-300">Aksi</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-neutral-100 dark:divide-gray-800">
 {isLoading ? (
 <tr><td colSpan={6} className="px-4 py-8 text-center text-neutral-400 dark:text-gray-500">Loading...</td></tr>
 ) : filtered.length === 0 ? (
 <tr><td colSpan={6} className="px-4 py-8 text-center text-neutral-400 dark:text-gray-500">Tidak ada foto</td></tr>
 ) : filtered.map((p) => (
 <tr key={p.id} className="hover:bg-neutral-50 dark:hover:bg-gray-800 dark:bg-gray-800">
 <td className="px-4 py-3"><div className="w-12 h-9 rounded bg-neutral-100 dark:bg-gray-800" /></td>
 <td className="px-4 py-3 text-neutral-800 dark:text-gray-100">{p.photo_session?.event?.name ?? '-'}</td>
 <td className="px-4 py-3 text-neutral-500 dark:text-gray-400">{p.photo_session?.template?.name ?? '-'}</td>
 <td className="px-4 py-3 text-neutral-500 dark:text-gray-400">{p.photo_session?.guest_name ?? '-'}</td>
 <td className="px-4 py-3">
 <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${p.status === 'ready' ? 'bg-green-50 text-green-600' : 'bg-neutral-100 dark:bg-gray-800 text-neutral-400 dark:text-gray-500'}`}>{p.status}</span>
 </td>
 <td className="px-4 py-3 text-right">
 <div className="flex justify-end gap-1">
 <button className="p-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-gray-800 dark:bg-gray-800 text-neutral-400 dark:text-gray-500"><Eye size={15} /></button>
 <button className="p-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-gray-800 dark:bg-gray-800 text-neutral-400 dark:text-gray-500"><Download size={15} /></button>
 <button onClick={() => { if (confirm('Hapus foto?')) deleteMut.mutate(p.id) }} className="p-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-gray-800 dark:bg-gray-800 text-neutral-400 dark:text-gray-500 hover:text-red-500"><Trash2 size={15} /></button>
 </div>
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 </Card>
 </div>
 )
}
