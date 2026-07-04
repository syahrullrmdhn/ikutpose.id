import { Camera, Frame, Download, Sparkles, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'

const steps = [
 {
 icon: Frame,
 number: '01',
 title: 'Pilih Bingkai',
 desc: 'Pilih dari puluhan desain frame dan layout yang pas dengan mood kamu hari ini.',
 },
 {
 icon: Camera,
 number: '02',
 title: 'Mulai Foto',
 desc: 'Bebas gaya! Tambahkan sedikit filter atau stiker langsung dari layar kameramu.',
 },
 {
 icon: Download,
 number: '03',
 title: 'Simpan & Bagikan',
 desc: 'Download hasil fotomu dalam resolusi tinggi atau langsung bagikan ke media sosial.',
 },
]

export default function LandingPage() {
 return (
 <div className="min-h-screen flex flex-col bg-[#FAFAFA] dark:bg-gray-950 font-sans text-charcoal dark:text-gray-100 selection:bg-rose-300">
 <Navbar />

 {/* Hero Section */}
 <section 
   className="relative flex-1 flex items-center justify-center px-6 py-20 md:py-32 overflow-hidden bg-cover bg-center"
   style={{ backgroundImage: 'url(/abstrackping.jpeg)' }}
 >
   {/* Subtle overlay agar teks tetap terbaca elegan */}
   <div className="absolute inset-0 z-0 bg-white/60 dark:bg-gray-950/60 backdrop-blur-[2px]" />

 <div className="relative z-10 max-w-3xl mx-auto text-center">
 <motion.div
 initial={{ opacity: 0, y: 15 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.4 }}
 >
 {/* BADGE DIMIRINGIN DIKIT (-rotate-2) */}
 <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-rose-200 dark:bg-rose-900/50 border border-border-subtle shadow-card text-charcoal dark:text-gray-100 text-xs font-bold tracking-wide uppercase mb-8 transform -rotate-2 hover:rotate-0 transition-transform duration-300 cursor-default">
 <Sparkles size={14} />
 <span>Digital Photobooth</span>
 </div>
 </motion.div>

 <motion.h1
 className="text-4xl md:text-6xl font-extrabold leading-[1.15] mb-6 tracking-tight"
 initial={{ opacity: 0, y: 15 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.4, delay: 0.1 }}
 >
 Abadikan Momen, <br className="hidden sm:block" />
 <span className="relative inline-block mt-3 md:mt-4">
 <span className="relative z-10 inline-block bg-rose-300 px-4 py-1 border border-border-subtle shadow-card transform -rotate-3 hover:rotate-0 hover:scale-105 transition-all duration-300 cursor-default">
 Ciptakan Kenangan.
 </span>
 </span>
 </motion.h1>

 <motion.p
 className="text-lg text-slate-600 dark:text-gray-300 max-w-xl mx-auto mb-10 leading-relaxed font-medium mt-4"
 initial={{ opacity: 0, y: 15 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.4, delay: 0.2 }}
 >
 Bawa pengalaman photobooth ke dalam genggamanmu. Buka langsung lewat browser, pilih frame favoritmu, dan mulai ambil foto sekarang.
 </motion.p>

 <motion.div
 className="flex flex-col sm:flex-row gap-5 justify-center items-center"
 initial={{ opacity: 0, y: 15 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.4, delay: 0.3 }}
 >
 <a
 href="/booth"
 className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-dusty-pink text-white border border-border-subtle shadow-card hover:shadow-card text-charcoal dark:text-gray-100 font-bold text-base transition-all w-full sm:w-auto"
 >
 Mulai Sekarang
 <ArrowRight size={18} strokeWidth={2.5} />
 </a>
 <a
 href="/events"
 className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-white dark:bg-gray-900 border border-border-subtle shadow-card hover:shadow-card text-charcoal dark:text-gray-100 font-bold text-base transition-all w-full sm:w-auto"
 >
 Untuk Event
 </a>
 </motion.div>
 </div>
 </section>

 {/* How It Works - Neobrutalist Cards */}
 <section className="py-24 px-6 border-y-2 border-soft-gray bg-rose-50 dark:bg-rose-950/30">
 <div className="max-w-5xl mx-auto">
 <motion.div 
 className="text-center mb-16"
 initial={{ opacity: 0, y: 15 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 >
 <h2 className="text-3xl font-extrabold mb-3 text-charcoal dark:text-gray-100">Sangat Mudah Digunakan</h2>
 <p className="text-slate-600 dark:text-gray-300 font-medium">Tiga langkah sederhana untuk hasil foto terbaikmu.</p>
 </motion.div>

 <div className="grid md:grid-cols-3 gap-6">
 {steps.map((step, i) => (
 <motion.div
 key={step.number}
 className="p-8 rounded-xl bg-white dark:bg-gray-900 border border-border-subtle shadow-card hover:shadow-card transition-all"
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.4, delay: i * 0.1 }}
 >
 <div className="flex items-center justify-between mb-8">
 <div className="w-12 h-12 rounded-lg bg-rose-200 dark:bg-rose-900/50 border border-border-subtle flex items-center justify-center text-charcoal dark:text-gray-100 shadow-card">
 <step.icon size={24} strokeWidth={2.5} />
 </div>
 <span className="text-lg font-black text-slate-300">
 {step.number}
 </span>
 </div>
 <h3 className="text-xl font-bold text-charcoal dark:text-gray-100 mb-2">{step.title}</h3>
 <p className="text-slate-600 dark:text-gray-300 leading-relaxed text-sm font-medium">
 {step.desc}
 </p>
 </motion.div>
 ))}
 </div>
 </div>
 </section>

 {/* Gallery & Events - Hard Borders & White Text for Dark Image Background */}
 <section className="py-24 px-6 bg-[#FAFAFA] dark:bg-gray-950">
 <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
 
 {/* Card Galeri Publik */}
 <motion.a
 href="/gallery"
 className="group relative block h-80 rounded-xl overflow-hidden cursor-pointer border border-border-subtle shadow-card hover:shadow-card transition-all"
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 >
 <img
 src="/abstrackping.jpeg"
 alt="Gallery"
 className="w-full h-full object-cover"
 />
 {/* Gradient overlay dipertegas */}
 <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/10 to-transparent" />
 
 <div className="absolute bottom-0 left-0 p-8 w-full flex justify-between items-end">
 <div>
 {/* Text putih + drop shadow */}
 <h3 className="text-2xl font-bold !text-white mb-1 drop-shadow-md">Galeri Publik</h3>
 <p className="text-rose-50 text-sm font-medium drop-shadow-md opacity-90">Lihat momen yang dibagikan</p>
 </div>
 <div className="w-10 h-10 rounded-lg bg-white dark:bg-gray-900 border border-border-subtle shadow-card flex items-center justify-center text-charcoal dark:text-gray-100 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
 <ArrowRight size={18} strokeWidth={2.5} />
 </div>
 </div>
 </motion.a>

 {/* Card Custom Event */}
 <motion.a
 href="/events"
 className="group relative block h-80 rounded-xl overflow-hidden cursor-pointer border border-border-subtle shadow-card hover:shadow-card transition-all"
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ delay: 0.1 }}
 >
 <img
 src="/abstrackping.jpeg"
 alt="Events"
 className="w-full h-full object-cover scale-x-[-1]"
 />
 {/* Gradient overlay dipertegas */}
 <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/10 to-transparent" />
 
 <div className="absolute bottom-0 left-0 p-8 w-full flex justify-between items-end">
 <div>
 {/* Text putih + drop shadow */}
 <h3 className="text-2xl font-bold !text-white mb-1 drop-shadow-md">Custom Event</h3>
 <p className="text-rose-50 text-sm font-medium drop-shadow-md opacity-90">Photobooth dengan brandingmu</p>
 </div>
 <div className="w-10 h-10 rounded-lg bg-white dark:bg-gray-900 border border-border-subtle shadow-card flex items-center justify-center text-charcoal dark:text-gray-100 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
 <ArrowRight size={18} strokeWidth={2.5} />
 </div>
 </div>
 </motion.a>
 </div>
 </section>

 {/* CTA Section - Punchy Block */}
 <section className="py-24 px-6 pb-32">
 <motion.div 
 className="max-w-4xl mx-auto rounded-2xl bg-rose-300 border border-border-subtle shadow-card p-12 md:p-16 text-center"
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 >
 <h2 className="text-3xl md:text-5xl font-extrabold text-charcoal dark:text-gray-100 mb-6">
 Abadikan Momen, Ciptakan Kenangan
 </h2>
 <p className="text-slate-800 dark:text-gray-100 font-medium mb-10 max-w-lg mx-auto">
 Tidak perlu unduh aplikasi atau bikin akun. Langsung jepret dan simpan hasil fotomu sekarang juga.
 </p>
 <a
 href="/booth"
 className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-slate-900 text-white font-bold text-lg border border-transparent hover:bg-white dark:bg-gray-900 hover:text-charcoal dark:text-gray-100 hover:border-soft-gray transition-colors"
 >
 Buka Kamera
 <ArrowRight size={20} strokeWidth={2.5} />
 </a>
 </motion.div>
 </section>

 <Footer />
 </div>
 )
}