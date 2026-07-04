import { motion } from 'framer-motion'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import { useEffect, useState } from 'react'
import { getPublicSettings } from '../../api/settings'
import { Target, CheckCircle, Clock, DollarSign, Image, Shield, Camera, Heart, Briefcase, Package, User } from 'lucide-react'

export default function AboutPage() {
  const [rawContent, setRawContent] = useState('')

  useEffect(() => {
    getPublicSettings().then((res) => {
      setRawContent(res.data.about_us_content || 'Cerita tentang IkutPose belum ditambahkan.')
    }).catch(err => console.error(err))
  }, [])

  // Parse content sections
  const sections = rawContent.split('\n\n')
  const intro = sections.slice(0, 2).join('\n\n')
  
  const features = [
    { icon: CheckCircle, text: 'Fotografer Terverifikasi - Semua fotografer telah melalui proses seleksi ketat untuk memastikan kualitas hasil karya' },
    { icon: Clock, text: 'Booking Mudah & Cepat - Proses pemesanan yang simpel dan transparan' },
    { icon: DollarSign, text: 'Harga Kompetitif - Berbagai pilihan paket sesuai kebutuhan dan budget' },
    { icon: Image, text: 'Portfolio Lengkap - Lihat hasil karya fotografer sebelum memutuskan' },
    { icon: Shield, text: 'Perlindungan Transaksi - Sistem pembayaran yang aman dan terpercaya' }
  ]

  const services = [
    { icon: Heart, text: 'Wedding Photography - Abadikan momen pernikahan Anda' },
    { icon: Camera, text: 'Pre-wedding & Engagement - Sesi foto romantis sebelum hari H' },
    { icon: Briefcase, text: 'Event Photography - Dokumentasi acara perusahaan, ulang tahun, dan acara lainnya' },
    { icon: Package, text: 'Product Photography - Foto produk profesional untuk kebutuhan bisnis' },
    { icon: User, text: 'Portrait & Personal - Sesi foto pribadi, keluarga, atau profesional' }
  ]

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] dark:bg-gray-950 font-sans text-charcoal dark:text-gray-100 selection:bg-rose-300">
      <Navbar />
      
      <main className="flex-1 py-20 px-6 max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold text-charcoal dark:text-gray-100 mb-4">Tentang Kami</h1>
            <div className="w-16 h-1 bg-dusty-pink mx-auto rounded-full"></div>
          </div>
          
          {/* Intro */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 md:p-12 border border-border-subtle shadow-card mb-8">
            <p className="text-lg leading-relaxed text-slate-600 dark:text-gray-300 whitespace-pre-wrap">{intro}</p>
          </div>

          {/* Vision */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 md:p-12 border border-border-subtle shadow-card mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Target className="text-dusty-pink" size={28} />
              <h2 className="text-2xl font-bold text-charcoal dark:text-gray-100">Visi Kami</h2>
            </div>
            <p className="text-lg leading-relaxed text-slate-600 dark:text-gray-300">
              Menjadi platform terdepan dalam industri jasa fotografi di Indonesia, mempermudah akses ke layanan fotografi profesional untuk semua kalangan.
            </p>
          </div>

          {/* Features */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 md:p-12 border border-border-subtle shadow-card mb-8">
            <h2 className="text-2xl font-bold text-charcoal dark:text-gray-100 mb-6">Mengapa Memilih IkutPose?</h2>
            <div className="space-y-4">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center text-dusty-pink shrink-0 mt-1">
                    <feature.icon size={20} />
                  </div>
                  <p className="text-slate-600 dark:text-gray-300 leading-relaxed pt-2">{feature.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 md:p-12 border border-border-subtle shadow-card mb-8">
            <div className="flex items-center gap-3 mb-6">
              <Camera className="text-dusty-pink" size={28} />
              <h2 className="text-2xl font-bold text-charcoal dark:text-gray-100">Layanan Kami</h2>
            </div>
            <div className="space-y-4">
              {services.map((service, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-300 shrink-0 mt-1">
                    <service.icon size={20} />
                  </div>
                  <p className="text-slate-600 dark:text-gray-300 leading-relaxed pt-2">{service.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-dusty-pink to-rose-400 rounded-2xl p-8 md:p-12 text-center text-white shadow-lg">
            <p className="text-xl font-semibold">
              Bergabunglah dengan ribuan klien yang telah mempercayai IkutPose untuk mengabadikan momen berharga mereka.
            </p>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  )
}
