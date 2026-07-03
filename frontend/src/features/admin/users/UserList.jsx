import { Link } from 'react-router-dom'
import { Plus, Search, Edit, Trash2, UserCheck, UserX } from 'lucide-react'
import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getUsers, deleteUser, toggleUserActive } from '../../../api/admin'
import Card from '../../../components/ui/Card'

const roleColor = {
 admin: 'bg-purple-50 text-purple-600',
 operator: 'bg-blue-50 text-blue-600',
 user: 'bg-neutral-100 text-neutral-500',
}

export default function UserList() {
 const [search, setSearch] = useState('')
 const queryClient = useQueryClient()

 const { data: users, isLoading } = useQuery({
 queryKey: ['admin-users'],
 queryFn: () => getUsers().then((r) => r.data?.data ?? r.data ?? []),
 })

 const deleteMut = useMutation({
 mutationFn: deleteUser,
 onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-users'] }),
 })

 const toggleMut = useMutation({
 mutationFn: toggleUserActive,
 onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-users'] }),
 })

 const list = Array.isArray(users) ? users : []
 const filtered = list.filter((u) =>
 u.name?.toLowerCase().includes(search.toLowerCase()) ||
 u.email?.toLowerCase().includes(search.toLowerCase())
 )

 return (
 <div className="space-y-6">
 <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
 <div>
 <h2 className="text-xl font-bold text-neutral-800">Users</h2>
 <p className="text-sm text-neutral-500">{list.length} user</p>
 </div>
 <Link to="/admin/users/create" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-400 text-white text-sm font-semibold hover:bg-primary-500 transition-colors">
 <Plus size={16} />Tambah User
 </Link>
 </div>

 <div className="relative max-w-sm">
 <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
 <input type="text" placeholder="Cari user..." value={search} onChange={(e) => setSearch(e.target.value)}
 className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-primary-400" />
 </div>

 <Card className="overflow-hidden">
 <div className="overflow-x-auto">
 <table className="w-full text-sm">
 <thead className="bg-neutral-50 border-b border-neutral-200">
 <tr>
 <th className="text-left px-4 py-3 font-medium text-neutral-600">User</th>
 <th className="text-left px-4 py-3 font-medium text-neutral-600">Role</th>
 <th className="text-left px-4 py-3 font-medium text-neutral-600">Status</th>
 <th className="text-left px-4 py-3 font-medium text-neutral-600">Login Terakhir</th>
 <th className="text-right px-4 py-3 font-medium text-neutral-600">Aksi</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-neutral-100">
 {isLoading ? (
 <tr><td colSpan={5} className="px-4 py-8 text-center text-neutral-400">Loading...</td></tr>
 ) : filtered.length === 0 ? (
 <tr><td colSpan={5} className="px-4 py-8 text-center text-neutral-400">Tidak ada user</td></tr>
 ) : filtered.map((u) => (
 <tr key={u.id} className="hover:bg-neutral-50">
 <td className="px-4 py-3">
 <div className="flex items-center gap-3">
 <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-500 flex items-center justify-center text-xs font-semibold">{u.name?.charAt(0).toUpperCase()}</div>
 <div>
 <p className="text-neutral-800 font-medium">{u.name}</p>
 <p className="text-xs text-neutral-400">{u.email}</p>
 </div>
 </div>
 </td>
 <td className="px-4 py-3"><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${roleColor[u.role]}`}>{u.role}</span></td>
 <td className="px-4 py-3">
 <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${u.is_active ? 'bg-green-50 text-green-600' : 'bg-neutral-100 text-neutral-400'}`}>
 {u.is_active ? 'Aktif' : 'Nonaktif'}
 </span>
 </td>
 <td className="px-4 py-3 text-neutral-400">{u.last_login_at ?? '-'}</td>
 <td className="px-4 py-3 text-right">
 <div className="flex justify-end gap-1">
 <button onClick={() => toggleMut.mutate(u.id)} className="p-1.5 rounded-lg hover:bg-neutral-100 text-neutral-400" title={u.is_active ? 'Nonaktifkan' : 'Aktifkan'}>
 {u.is_active ? <UserX size={15} /> : <UserCheck size={15} />}
 </button>
 <Link to={`/admin/users/${u.id}/edit`} className="p-1.5 rounded-lg hover:bg-neutral-100 text-neutral-400"><Edit size={15} /></Link>
 <button onClick={() => { if (confirm('Hapus user?')) deleteMut.mutate(u.id) }} className="p-1.5 rounded-lg hover:bg-neutral-100 text-neutral-400 hover:text-red-500"><Trash2 size={15} /></button>
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
