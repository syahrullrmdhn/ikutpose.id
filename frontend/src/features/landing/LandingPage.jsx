import { Camera, Frame, Download, Sparkles, ArrowRight, Calendar, Heart, Smile, Star, Gift, ShieldCheck, Zap } from 'lucide-react'
import { motion } from 'framer-motion'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'

const steps = [
  {
    icon: Frame,
    number: '01',
    title: 'Pilih Bingkai',
    desc: 'Pilih dari berbagai desain frame lucu dan aesthetic yang pas dengan mood kamu hari ini.',
    color: 'bg-rose-100 text-deep-rose border-rose-200 dark:bg-rose-900/40 dark:text-rose-200',
  },
  {
    icon: Camera,
    number: '02',
    title: 'Mulai Foto',
    desc: 'Bebas ekspresi! Tambahkan filter warna atau stiker langsung dari layar kameramu.',
    color: 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/40 dark:text-amber-200',
  },
  {
    icon: Download,
    number: '03',
    title: 'Simpan & Bagikan',
    desc: 'Download hasil fotomu dalam resolusi tinggi atau langsung bagikan ke teman-temanmu.',
    color: 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-200',
  },
]

const highlights = [
  {
    icon: Smile,
    title: 'Desain Frame Gemas',
    desc: 'Koleksi frame eksklusif yang lucu, manis, dan selalu diperbarui mengikuti tren terbaru.',
    bg: 'bg-rose-50/80 dark:bg-gray-900/80 border-rose-200/80 dark:border-gray-800',
    iconBg: 'bg-rose-200/80 text-deep-rose dark:bg-rose-900/60 dark:text-rose-200',
  },
  {
    icon: Calendar,
    title: 'Bisa Booking Untuk Event',
    desc: 'Mau photobooth khusus untuk pernikahan, ulang tahun, atau pensi sekolah? Kami siap bantu!',
    bg: 'bg-purple-50/80 dark:bg-gray-900/80 border-purple-200/80 dark:border-gray-800',
    iconBg: 'bg-purple-200/80 text-purple-700 dark:bg-purple-900/60 dark:text-purple-200',
  },
  {
    icon: Zap,
    title: 'Tanpa Install Aplikasi',
    desc: 'Langsung buka lewat browser di handphone atau laptop tanpa memakan memori perangkatmu.',
    bg: 'bg-amber-50/80 dark:bg-gray-900/80 border-amber-200/80 dark:border-gray-800',
    iconBg: 'bg-amber-200/80 text-amber-700 dark:bg-amber-900/60 dark:text-amber-200',
  },
  {
    icon: Star,
    title: 'Kualitas Foto Tinggi',
    desc: 'Hasil foto jernih dengan tata letak rapi yang pas untuk dicetak atau dijadikan koleksi digital.',
    bg: 'bg-teal-50/80 dark:bg-gray-900/80 border-teal-200/80 dark:border-gray-800',
    iconBg: 'bg-teal-200/80 text-teal-700 dark:bg-teal-900/60 dark:text-teal-200',
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-rose-cream/40 dark:bg-gray-950 font-sans text-charcoal dark:text-gray-100 selection:bg-rose-300">
      <Navbar />

      {/* Hero Section */}
      <section 
        className="relative flex-1 flex items-center justify-center px-6 py-20 md:py-32 overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: 'url(/abstrackping.jpeg)' }}
      >
        {/* Soft pastel overlay agar ceria namun teks tetap sangat terbaca */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-rose-50/85 via-white/80 to-rose-cream/90 dark:from-gray-950/90 dark:via-gray-950/85 dark:to-gray-950 backdrop-blur-[3px]" />

        {/* Playful floating accent badges (hidden on small screens to keep it clean) */}
        <div className="absolute top-12 left-8 lg:left-24 hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 dark:bg-gray-900/90 border border-rose-200 dark:border-gray-800 shadow-card -rotate-6 animate-bounce duration-1000">
          <Heart className="text-dusty-pink fill-dusty-pink" size={16} />
          <span className="text-xs font-bold text-charcoal dark:text-gray-200">100% Seru & Gratis</span>
        </div>
        
        <div className="absolute top-20 right-8 lg:right-24 hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 dark:bg-gray-900/90 border border-rose-200 dark:border-gray-800 shadow-card rotate-6 animate-pulse">
          <Smile className="text-mauve-gold" size={16} />
          <span className="text-xs font-bold text-charcoal dark:text-gray-200">Desain Bingkai Lucu</span>
        </div>

        <div className="absolute bottom-12 left-16 hidden lg:flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 dark:bg-gray-900/90 border border-rose-200 dark:border-gray-800 shadow-card rotate-3">
          <Star className="text-amber-500 fill-amber-500" size={16} />
          <span className="text-xs font-bold text-charcoal dark:text-gray-200">Kualitas Resolusi Tinggi</span>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* BADGE DIMIRINGIN DIKIT (-rotate-2) */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-200 dark:bg-rose-900/50 border border-border-subtle shadow-card text-charcoal dark:text-gray-100 text-xs font-bold tracking-wider uppercase mb-8 transform -rotate-2 hover:rotate-0 transition-transform duration-300 cursor-default">
              <Sparkles className="text-deep-rose dark:text-rose-300" size={16} />
              <span>Photobooth Digital & Event Booking</span>
            </div>
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.15] mb-6 tracking-tight text-charcoal dark:text-white"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            Abadikan Setiap Momen, <br className="hidden sm:block" />
            <span className="relative inline-block mt-3 md:mt-4">
              <span className="relative z-10 inline-block bg-gradient-to-r from-rose-200 via-rose-300 to-blush-mist dark:from-rose-900/80 dark:to-rose-800/80 px-5 py-1.5 rounded-2xl border border-rose-300 dark:border-rose-700 shadow-card transform -rotate-2 hover:rotate-0 hover:scale-105 transition-all duration-300 cursor-default text-charcoal dark:text-white">
                Bikin Kenangan Manis.
              </span>
            </span>
          </motion.h1>

          <motion.p
            className="text-lg text-slate-600 dark:text-gray-300 max-w-xl mx-auto mb-10 leading-relaxed font-medium mt-4"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            Bawa keseruan photobooth langsung ke browser kamu. Pilih bingkai favoritmu, ambil foto sekarang, atau booking untuk meramaikan acara spesialmu.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <a
              href="/booth"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-dusty-pink text-white border border-border-subtle shadow-card hover:bg-deep-rose hover:shadow-lg hover:-translate-y-0.5 font-bold text-base transition-all w-full sm:w-auto"
            >
              <Camera size={18} strokeWidth={2.5} />
              Mulai Foto
              <ArrowRight size={18} strokeWidth={2.5} />
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-charcoal text-white dark:bg-rose-200 dark:text-charcoal border border-transparent shadow-card hover:bg-slate-800 dark:hover:bg-rose-100 hover:shadow-lg hover:-translate-y-0.5 font-bold text-base transition-all w-full sm:w-auto"
            >
              <Calendar size={18} strokeWidth={2.5} />
              Booking Sekarang
            </a>
            <a
              href="/events"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white dark:bg-gray-900 border border-border-subtle shadow-card hover:bg-rose-50 dark:hover:bg-gray-800 hover:shadow-lg hover:-translate-y-0.5 text-charcoal dark:text-gray-100 font-bold text-base transition-all w-full sm:w-auto"
            >
              Lihat Event
            </a>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us - Happy & Colorful Grid */}
      <section className="py-20 px-6 bg-white dark:bg-gray-900 border-t border-border-subtle">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-900/40 text-deep-rose dark:text-rose-300 text-xs font-bold uppercase tracking-wider mb-3">
              <Gift size={14} />
              <span>Keunggulan Ikut Pose</span>
            </div>
            <h2 className="text-3xl font-extrabold text-charcoal dark:text-gray-100 mb-3">
              Seru, Rapi, dan Mudah Digunakan
            </h2>
            <p className="text-slate-600 dark:text-gray-300 font-medium">
              Dirancang untuk memberikan pengalaman photobooth terbaik di setiap momen berharga kamu.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((item, i) => (
              <motion.div
                key={i}
                className={`p-6 rounded-3xl border shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 ${item.bg}`}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 ${item.iconBg}`}>
                  <item.icon size={24} strokeWidth={2.5} />
                </div>
                <h3 className="text-lg font-bold text-charcoal dark:text-gray-100 mb-2">{item.title}</h3>
                <p className="text-slate-600 dark:text-gray-300 text-sm leading-relaxed font-medium">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - Playful Cards */}
      <section className="py-24 px-6 border-t border-border-subtle bg-rose-50/70 dark:bg-rose-950/30">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-extrabold mb-3 text-charcoal dark:text-gray-100">Tiga Langkah Mudah</h2>
            <p className="text-slate-600 dark:text-gray-300 font-medium">Tanpa ribet, langsung dapatkan hasil foto estetikmu.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                className="p-8 rounded-3xl bg-white dark:bg-gray-900 border border-border-subtle shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <div className="flex items-center justify-between mb-8">
                  <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center shadow-sm ${step.color}`}>
                    <step.icon size={26} strokeWidth={2.5} />
                  </div>
                  <span className="text-2xl font-black text-slate-300 dark:text-gray-700">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-charcoal dark:text-gray-100 mb-3">{step.title}</h3>
                <p className="text-slate-600 dark:text-gray-300 leading-relaxed text-sm font-medium">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery & Events */}
      <section className="py-24 px-6 bg-white dark:bg-gray-950 border-t border-border-subtle">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          
          {/* Card Galeri Publik */}
          <motion.a
            href="/gallery"
            className="group relative block h-80 rounded-3xl overflow-hidden cursor-pointer border border-border-subtle shadow-card hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <img
              src="/abstrackping.jpeg"
              alt="Gallery"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 via-slate-900/20 to-transparent" />
            
            <div className="absolute bottom-0 left-0 p-8 w-full flex justify-between items-end">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold mb-2">
                  <Sparkles size={12} />
                  <span>Koleksi Foto</span>
                </div>
                <h3 className="text-2xl font-bold !text-white mb-1 drop-shadow-md">Galeri Publik</h3>
                <p className="text-rose-50 text-sm font-medium drop-shadow-md opacity-90">Lihat momen ceria yang dibagikan</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-white dark:bg-gray-900 border border-border-subtle shadow-card flex items-center justify-center text-charcoal dark:text-gray-100 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                <ArrowRight size={20} strokeWidth={2.5} />
              </div>
            </div>
          </motion.a>

          {/* Card Custom Event */}
          <motion.a
            href="/contact"
            className="group relative block h-80 rounded-3xl overflow-hidden cursor-pointer border border-border-subtle shadow-card hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <img
              src="/abstrackping.jpeg"
              alt="Events"
              className="w-full h-full object-cover scale-x-[-1] transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 via-slate-900/20 to-transparent" />
            
            <div className="absolute bottom-0 left-0 p-8 w-full flex justify-between items-end">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold mb-2">
                  <Calendar size={12} />
                  <span>Layanan Acara</span>
                </div>
                <h3 className="text-2xl font-bold !text-white mb-1 drop-shadow-md">Booking Event</h3>
                <p className="text-rose-50 text-sm font-medium drop-shadow-md opacity-90">Hadirkan photobooth di acaramu</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-white dark:bg-gray-900 border border-border-subtle shadow-card flex items-center justify-center text-charcoal dark:text-gray-100 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                <ArrowRight size={20} strokeWidth={2.5} />
              </div>
            </div>
          </motion.a>
        </div>
      </section>

      {/* CTA Section - Cheerful Block */}
      <section className="py-20 px-6 pb-28 bg-rose-cream/30 dark:bg-gray-950">
        <motion.div 
          className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-br from-rose-200 via-rose-300 to-blush-mist dark:from-rose-900 dark:to-rose-950 border border-border-subtle shadow-card p-10 sm:p-16 text-center relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-extrabold text-charcoal dark:text-gray-100 mb-5 tracking-tight">
              Siap Menciptakan Kenangan?
            </h2>
            <p className="text-slate-800 dark:text-gray-100 font-medium mb-10 max-w-lg mx-auto leading-relaxed">
              Langsung ambil fotomu sekarang dengan berbagai pilihan frame menarik, atau hubungi kami untuk meramaikan acara spesialmu.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="/booth"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-slate-900 text-white font-bold text-base shadow-md hover:bg-white hover:text-charcoal dark:bg-white dark:text-charcoal dark:hover:bg-rose-100 transition-all w-full sm:w-auto"
              >
                <Camera size={18} strokeWidth={2.5} />
                Buka Kamera Sekarang
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white/90 text-charcoal font-bold text-base border border-rose-300 shadow-md hover:bg-white hover:shadow-lg dark:bg-gray-900 dark:text-white dark:border-gray-700 transition-all w-full sm:w-auto"
              >
                <Calendar size={18} strokeWidth={2.5} />
                Booking Untuk Event
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  )
}
