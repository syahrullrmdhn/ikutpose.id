import { useState } from 'react'
import { Frame, Grid3x3, Image, LayoutGrid } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { getPublicTemplates } from '../../api/templates'
import { useBoothStore } from '../../stores/boothStore'

const layoutFilters = [
 { key: 'all', label: 'Semua', icon: LayoutGrid },
 { key: 'strip', label: 'Strip', icon: Frame },
 { key: 'grid', label: 'Grid', icon: Grid3x3 },
 { key: 'single', label: 'Single', icon: Image },
]

export default function TemplateSelector() {
 const [filter, setFilter] = useState('all')
 const setTemplate = useBoothStore((s) => s.setTemplate)

 const { data: templates, isLoading } = useQuery({
 queryKey: ['booth-templates'],
 queryFn: () => getPublicTemplates().then((r) => r.data?.data ?? r.data ?? []),
 })

 const list = Array.isArray(templates) ? templates : []
 const filtered = filter === 'all' ? list : list.filter((t) => t.layout?.startsWith(filter))

 const colors = ['bg-rose-200 dark:bg-rose-900/50', 'bg-blue-200 dark:bg-blue-900/40', 'bg-green-200 dark:bg-green-900/40', 'bg-yellow-200 dark:bg-yellow-900/40', 'bg-purple-200 dark:bg-purple-900/40', 'bg-pink-200 dark:bg-pink-900/40']

 return (
 <div className="max-w-4xl w-full">
 <h2 className="text-2xl font-extrabold mb-6 text-center">Pilih Template</h2>

 <div className="flex justify-center gap-2 mb-8">
 {layoutFilters.map((f) => (
 <button key={f.key} onClick={() => setFilter(f.key)}
 className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold border border-border-subtle transition-all ${
 filter === f.key
 ? 'bg-dusty-pink text-white shadow-card'
 : 'bg-white dark:bg-gray-900 text-slate-600 dark:text-gray-300 shadow-card hover:shadow-card '
 }`}>
 <f.icon size={16} />{f.label}
 </button>
 ))}
 </div>

 {isLoading ? (
 <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
 {[1, 2, 3, 4, 5, 6].map((i) => <div key={i} className="bg-white dark:bg-gray-900 rounded-xl border border-border-subtle dark:border-gray-800 animate-pulse"><div className="aspect-[3/4] bg-slate-100 dark:bg-gray-800" /><div className="p-3"><div className="h-4 w-24 bg-slate-100 dark:bg-gray-800 rounded" /></div></div>)}
 </div>
 ) : (
 <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
 {filtered.map((template, i) => {
 const hasOverlay = !!template.overlay_image
 return (
 <button key={template.id} onClick={() => setTemplate(template)}
 className="group bg-white dark:bg-gray-900 rounded-xl border border-border-subtle overflow-hidden shadow-card hover:shadow-card transition-all text-left">
 <div className={`aspect-[3/4] relative flex items-center justify-center ${colors[i % colors.length]}`}>
 <Frame size={40} className="text-charcoal dark:text-gray-100/30" strokeWidth={2} />
 {hasOverlay && (
 <div className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-slate-900 text-white text-[10px] font-bold">
 FRAME
 </div>
 )}
 </div>
 <div className="p-3 border-t-2 border-soft-gray">
 <p className="text-sm font-bold text-charcoal dark:text-gray-100">{template.name}</p>
 <p className="text-xs text-warm-gray dark:text-gray-400 font-medium mt-0.5">
 {template.photo_slots?.length ?? 0} foto &middot; {template.canvas_width}×{template.canvas_height}px
 </p>
 <div className="flex items-center gap-2 mt-1.5">
 <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-gray-800 text-slate-600 dark:text-gray-300 border border-slate-300 dark:border-gray-700">
 {template.layout?.replace('_', ' ')}
 </span>
 {hasOverlay && (
 <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border border-green-300 dark:border-green-800">
 Photocard
 </span>
 )}
 {template.is_premium && (
 <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 border border-yellow-300 dark:border-yellow-800">
 Premium
 </span>
 )}
 </div>
 </div>
 </button>
 )
 })}
 </div>
 )}
 </div>
 )
}
