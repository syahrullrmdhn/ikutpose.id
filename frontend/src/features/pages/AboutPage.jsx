import { motion } from 'framer-motion'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import { useEffect, useState } from 'react'
import { getPublicSettings } from '../../api/settings'

export default function AboutPage() {
  const [content, setContent] = useState('')

  useEffect(() => {
    getPublicSettings().then((res) => {
      setContent(res.data.about_us_content || 'Cerita tentang IkutPose belum ditambahkan.')
    }).catch(err => console.error(err))
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] font-sans text-charcoal selection:bg-rose-300">
      <Navbar />
      
      <main className="flex-1 py-20 px-6 max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold text-charcoal mb-4">Tentang Kami</h1>
            <div className="w-16 h-1 bg-dusty-pink mx-auto rounded-full"></div>
          </div>
          
          <div className="bg-white rounded-2xl p-8 md:p-12 border border-border-subtle shadow-card text-lg leading-relaxed text-slate-600 whitespace-pre-wrap">
            {content}
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  )
}
