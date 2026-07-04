import { motion } from 'framer-motion'
import { Mail, MessageCircle, Camera, MapPin } from 'lucide-react'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import { useEffect, useState } from 'react'
import { getPublicSettings } from '../../api/settings'

export default function ContactPage() {
  const [settings, setSettings] = useState(null)

  useEffect(() => {
    getPublicSettings().then((res) => {
      setSettings(res.data)
    }).catch(err => console.error(err))
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] dark:bg-gray-950 font-sans text-charcoal dark:text-gray-100 selection:bg-rose-300">
      <Navbar />
      
      <main className="flex-1 py-20 px-6 max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold text-charcoal dark:text-gray-100 mb-4">Hubungi Kami</h1>
            <p className="text-slate-600 dark:text-gray-300 font-medium">Ada pertanyaan atau butuh bantuan? Jangan ragu untuk menghubungi tim IkutPose.</p>
            <div className="w-16 h-1 bg-dusty-pink mx-auto rounded-full mt-6"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {settings?.contact_email && (
              <a href={`mailto:${settings.contact_email}`} className="flex items-center gap-5 p-6 bg-white dark:bg-gray-900 rounded-2xl border border-border-subtle shadow-card hover:shadow-card-hover hover:scale-[1.02] transition-all">
                <div className="w-12 h-12 rounded-xl bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center text-dusty-pink">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-charcoal dark:text-gray-100">Email</h3>
                  <p className="text-slate-500 text-sm mt-0.5">{settings.contact_email}</p>
                </div>
              </a>
            )}

            {settings?.contact_whatsapp && (
              <a href={`https://wa.me/${settings.contact_whatsapp}`} target="_blank" rel="noreferrer" className="flex items-center gap-5 p-6 bg-white dark:bg-gray-900 rounded-2xl border border-border-subtle shadow-card hover:shadow-card-hover hover:scale-[1.02] transition-all">
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-green-600">
                  <MessageCircle size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-charcoal dark:text-gray-100">WhatsApp</h3>
                  <p className="text-slate-500 text-sm mt-0.5">+{settings.contact_whatsapp}</p>
                </div>
              </a>
            )}

            {settings?.contact_instagram && (
              <a href={`https://instagram.com/${settings.contact_instagram}`} target="_blank" rel="noreferrer" className="flex items-center gap-5 p-6 bg-white dark:bg-gray-900 rounded-2xl border border-border-subtle shadow-card hover:shadow-card-hover hover:scale-[1.02] transition-all">
                <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600">
                  <Camera size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-charcoal dark:text-gray-100">Instagram</h3>
                  <p className="text-slate-500 text-sm mt-0.5">@{settings.contact_instagram}</p>
                </div>
              </a>
            )}

            {settings?.contact_address && (
              <div className="flex items-center gap-5 p-6 bg-white dark:bg-gray-900 rounded-2xl border border-border-subtle shadow-card md:col-span-2">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-charcoal dark:text-gray-100">Lokasi</h3>
                  <p className="text-slate-500 text-sm mt-0.5 whitespace-pre-wrap">{settings.contact_address}</p>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  )
}
