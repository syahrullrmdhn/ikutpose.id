import { useBoothStore } from '../../stores/boothStore'
import Navbar from '../../components/layout/Navbar'
import TemplateSelector from './TemplateSelector'
import CameraCapture from './CameraCapture'
import PhotoEditor from './PhotoEditor'
import ResultPreview from './ResultPreview'

const steps = [
 { number: 1, label: 'Pilih Template' },
 { number: 2, label: 'Ambil Foto' },
 { number: 3, label: 'Edit & Hias' },
 { number: 4, label: 'Download' },
]

export default function BoothPage() {
 const step = useBoothStore((s) => s.step)

 return (
 <div className="min-h-screen bg-[#FAFAFA] font-sans text-charcoal selection:bg-rose-300 flex flex-col">
 <Navbar />

 <div className="bg-white border-b-2 border-soft-gray py-4 px-6">
 <div className="max-w-4xl mx-auto flex items-center justify-between">
 {steps.map((s, i) => (
 <div key={s.number} className="flex items-center">
 <div className="flex items-center gap-2">
 <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold border border-border-subtle ${
 step >= s.number ? 'bg-dusty-pink text-white text-charcoal shadow-card' : 'bg-slate-100 text-slate-400 shadow-none'
 }`}>
 {s.number}
 </div>
 <span className={`hidden sm:block text-sm font-bold ${step >= s.number ? 'text-charcoal' : 'text-slate-400'}`}>
 {s.label}
 </span>
 </div>
 {i < steps.length - 1 && (
 <div className={`hidden sm:block w-16 h-0.5 mx-3 ${step > s.number ? 'bg-slate-900' : 'bg-slate-200'}`} />
 )}
 </div>
 ))}
 </div>
 </div>

 <div className="flex-1 flex items-start justify-center p-6">
 {step === 1 && <TemplateSelector />}
 {step === 2 && <CameraCapture />}
 {step === 3 && <PhotoEditor />}
 {step === 4 && <ResultPreview />}
 </div>
 </div>
 )
}
