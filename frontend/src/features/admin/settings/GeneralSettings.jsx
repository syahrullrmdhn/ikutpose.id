import { Save } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import { getSettings, updateSettings } from '../../../api/admin'
import Card from '../../../components/ui/Card'

export default function GeneralSettings() {
 const [settings, setSettings] = useState({
 site_name: '',
 site_tagline: '',
 default_countdown: 3,
 default_max_photos: 4,
 watermark_text: '',
 watermark_position: 'bottom-right',
 watermark_opacity: 0.3,
 storage_driver: 'local',
 photo_retention_days: 30,
 max_upload_size: 10,
 about_us_content: '',
 contact_email: '',
 contact_whatsapp: '',
 contact_instagram: '',
 contact_address: '',
 })
 const [saved, setSaved] = useState(false)

 const { data: remoteSettings, isLoading } = useQuery({
 queryKey: ['admin-settings'],
 queryFn: () => getSettings().then((r) => r.data),
 })

 useEffect(() => {
 if (remoteSettings) {
 const flat = {}
 const grouped = Array.isArray(remoteSettings) ? remoteSettings : []
 grouped.forEach((s) => { flat[s.key] = s.value })
 setSettings((prev) => ({ ...prev, ...flat }))
 }
 }, [remoteSettings])

 const mut = useMutation({
 mutationFn: (data) => updateSettings(data),
 onSuccess: () => { setSaved(true); setTimeout(() => setSaved(false), 2000) },
 })

 const handleSave = () => {
 mut.mutate(settings)
 }

 const update = (key, val) => setSettings((s) => ({ ...s, [key]: val }))

 return (
 <div className="max-w-2xl space-y-6">
 <div className="flex items-center justify-between">
 <h2 className="text-xl font-bold text-neutral-800 dark:text-gray-100">Settings</h2>
 <button onClick={handleSave} disabled={mut.isPending}
 className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-400 text-white text-sm font-semibold hover:bg-primary-500 disabled:opacity-60 transition-colors">
 <Save size={16} />
 {saved ? 'Tersimpan!' : mut.isPending ? 'Menyimpan...' : 'Simpan'}
 </button>
 </div>

 {isLoading ? (
 <Card className="p-5 animate-pulse"><div className="h-48" /></Card>
 ) : (
 <>
 <Card className="p-5 space-y-4">
 <h3 className="text-sm font-bold text-neutral-800 dark:text-gray-100">General</h3>
 <div>
 <label className="block text-sm font-medium text-neutral-600 dark:text-gray-300 mb-1.5">Nama Situs</label>
 <input type="text" value={settings.site_name} onChange={(e) => update('site_name', e.target.value)}
 className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-gray-700 text-sm focus:outline-none focus:border-primary-400" />
 </div>
 <div>
 <label className="block text-sm font-medium text-neutral-600 dark:text-gray-300 mb-1.5">Tagline</label>
 <input type="text" value={settings.site_tagline} onChange={(e) => update('site_tagline', e.target.value)}
 className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-gray-700 text-sm focus:outline-none focus:border-primary-400" />
 </div>
 </Card>

 <Card className="p-5 space-y-4">
 <h3 className="text-sm font-bold text-neutral-800 dark:text-gray-100">Booth Defaults</h3>
 <div className="grid grid-cols-2 gap-3">
 <div>
 <label className="block text-sm font-medium text-neutral-600 dark:text-gray-300 mb-1.5">Countdown (detik)</label>
 <input type="number" value={settings.default_countdown} onChange={(e) => update('default_countdown', Number(e.target.value))}
 className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-gray-700 text-sm focus:outline-none focus:border-primary-400" />
 </div>
 <div>
 <label className="block text-sm font-medium text-neutral-600 dark:text-gray-300 mb-1.5">Max Foto/Sesi</label>
 <input type="number" value={settings.default_max_photos} onChange={(e) => update('default_max_photos', Number(e.target.value))}
 className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-gray-700 text-sm focus:outline-none focus:border-primary-400" />
 </div>
 </div>
 </Card>

 <Card className="p-5 space-y-4">
 <h3 className="text-sm font-bold text-neutral-800 dark:text-gray-100">Storage</h3>
 <div>
 <label className="block text-sm font-medium text-neutral-600 dark:text-gray-300 mb-1.5">Storage Driver</label>
 <select value={settings.storage_driver} onChange={(e) => update('storage_driver', e.target.value)}
 className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-gray-700 text-sm focus:outline-none focus:border-primary-400">
 <option value="local">Local</option>
 <option value="s3">S3 / MinIO</option>
 </select>
 </div>
 <div className="grid grid-cols-2 gap-3">
 <div>
 <label className="block text-sm font-medium text-neutral-600 dark:text-gray-300 mb-1.5">Retensi Foto (hari)</label>
 <input type="number" value={settings.photo_retention_days} onChange={(e) => update('photo_retention_days', Number(e.target.value))}
 className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-gray-700 text-sm focus:outline-none focus:border-primary-400" />
 </div>
 <div>
 <label className="block text-sm font-medium text-neutral-600 dark:text-gray-300 mb-1.5">Max Upload (MB)</label>
 <input type="number" value={settings.max_upload_size} onChange={(e) => update('max_upload_size', Number(e.target.value))}
 className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-gray-700 text-sm focus:outline-none focus:border-primary-400" />
 </div>
 </div>
 </Card>
 </>
 )}
 </div>
 )
}
