import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { Camera, Image, Calendar, Users, ArrowUpRight } from 'lucide-react'
import Card from '../../../components/ui/Card'
import LineChart from '../../../components/ui/LineChart'
import BarChart from '../../../components/ui/BarChart'
import { getDashboard } from '../../../api/admin'

export default function Dashboard() {
 const { data: stats, isLoading } = useQuery({
 queryKey: ['dashboard'],
 queryFn: () => getDashboard().then((r) => r.data),
 })

 if (isLoading) {
 return (
 <div className="space-y-6">
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
 {[1, 2, 3, 4].map((i) => (
 <Card key={i} className="p-5 animate-pulse">
 <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-gray-800 mb-3" />
 <div className="h-7 w-16 bg-neutral-100 dark:bg-gray-800 rounded mb-1" />
 <div className="h-4 w-24 bg-neutral-100 dark:bg-gray-800 rounded" />
 </Card>
 ))}
 </div>
 </div>
 )
 }

 const statCards = [
 { label: 'Foto Hari Ini', value: stats?.photos_today ?? 0, change: '+12%', icon: Camera, color: 'bg-primary-50 text-primary-500' },
 { label: 'Event Aktif', value: stats?.events_active ?? 0, icon: Calendar, color: 'bg-green-50 text-green-600' },
 { label: 'Total Template', value: stats?.total_templates ?? 0, icon: Image, color: 'bg-blue-50 text-blue-600' },
 { label: 'Total User', value: stats?.total_users ?? 0, icon: Users, color: 'bg-purple-50 text-purple-600' },
 ]

 const lineData = stats?.photos_per_day?.map((d) => d.count) ?? [0, 0, 0, 0, 0, 0, 0]
 const lineLabels = stats?.photos_per_day?.map((d) => d.day) ?? ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min']
 const barData = stats?.top_templates?.map((t) => t.count) ?? [0, 0, 0, 0, 0]
 const barLabels = stats?.top_templates?.map((t) => t.name?.substring(0, 8)) ?? ['-', '-', '-', '-', '-']

 return (
 <div className="space-y-6">
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
 {statCards.map((stat) => (
 <Card key={stat.label} className="p-5">
 <div className="flex items-start justify-between">
 <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color}`}>
 <stat.icon size={20} />
 </div>
 {stat.change && (
 <span className="flex items-center gap-0.5 text-xs font-medium text-green-600">
 <ArrowUpRight size={12} />{stat.change}
 </span>
 )}
 </div>
 <p className="mt-3 text-2xl font-bold text-neutral-800 dark:text-gray-100">{stat.value}</p>
 <p className="text-sm text-neutral-500 dark:text-gray-400">{stat.label}</p>
 </Card>
 ))}
 </div>

 <div className="grid lg:grid-cols-2 gap-4">
 <Card className="p-5">
 <h3 className="text-base font-bold text-neutral-800 dark:text-gray-100 mb-4">Foto per Hari</h3>
 <LineChart data={lineData} labels={lineLabels} height={200} />
 </Card>
 <Card className="p-5">
 <h3 className="text-base font-bold text-neutral-800 dark:text-gray-100 mb-4">Template Populer</h3>
 <BarChart data={barData} labels={barLabels} height={200} />
 </Card>
 </div>

 <div className="grid lg:grid-cols-3 gap-4">
 <Card className="lg:col-span-2 overflow-hidden">
 <div className="p-5 border-b border-neutral-200 dark:border-gray-700 flex items-center justify-between">
 <h3 className="text-base font-bold text-neutral-800 dark:text-gray-100">Foto Terbaru</h3>
 <Link to="/admin/photos" className="text-sm text-primary-400 hover:text-primary-500 font-medium">Lihat Semua</Link>
 </div>
 <div className="divide-y divide-neutral-100 dark:divide-gray-800">
 {(stats?.recent_photos ?? []).map((photo) => (
 <div key={photo.id} className="px-5 py-3 flex items-center justify-between">
 <div className="flex items-center gap-3">
 <div className="w-10 h-10 rounded-lg bg-neutral-100 dark:bg-gray-800" />
 <div>
 <p className="text-sm font-medium text-neutral-800 dark:text-gray-100">{photo.event ?? 'Photo'}</p>
 <p className="text-xs text-neutral-400 dark:text-gray-500">{photo.template ?? '-'}</p>
 </div>
 </div>
 <span className="text-xs text-neutral-400 dark:text-gray-500">{photo.created_at}</span>
 </div>
 ))}
 {(!stats?.recent_photos || stats.recent_photos.length === 0) && (
 <div className="px-5 py-8 text-center text-sm text-neutral-400 dark:text-gray-500">Belum ada foto</div>
 )}
 </div>
 </Card>

 <Card className="overflow-hidden">
 <div className="p-5 border-b border-neutral-200 dark:border-gray-700 flex items-center justify-between">
 <h3 className="text-base font-bold text-neutral-800 dark:text-gray-100">Event Mendatang</h3>
 <Link to="/admin/events" className="text-sm text-primary-400 hover:text-primary-500 font-medium">Kelola</Link>
 </div>
 <div className="divide-y divide-neutral-100 dark:divide-gray-800">
 {(stats?.upcoming_events ?? []).map((event) => (
 <div key={event.id} className="px-5 py-3">
 <p className="text-sm font-medium text-neutral-800 dark:text-gray-100">{event.name}</p>
 <p className="text-xs text-neutral-400 dark:text-gray-500 mt-0.5">{event.start_date}</p>
 </div>
 ))}
 {(!stats?.upcoming_events || stats.upcoming_events.length === 0) && (
 <div className="px-5 py-8 text-center text-sm text-neutral-400 dark:text-gray-500">Tidak ada event</div>
 )}
 </div>
 </Card>
 </div>
 </div>
 )
}
