import { motion } from 'framer-motion'
import {
  BadgeCheck,
  Camera,
  Check,
  Crown,
  Gift,
  MessageCircle,
  PartyPopper,
  Printer,
  Sparkles,
  Star,
  TimerReset,
} from 'lucide-react'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'

const packages = [
  {
    name: 'Paket Silver',
    price: 'Rp 1.500.000',
    duration: '2 jam',
    accent: 'from-[#f6cad3] via-[#e58aa0] to-[#c95d7b]',
    badge: 'Favorit untuk intimate event',
    icon: Sparkles,
    features: [
      'Unlimited photo session',
      'Maksimal 80 lembar cetak 4R',
      'Semua soft file via QR download',
      'Video GIF',
      '2 desain frame custom',
      'Free fun property',
      'Crew standby',
    ],
  },
  {
    name: 'Paket Gold',
    price: 'Rp 2.200.000',
    duration: '3 jam',
    accent: 'from-[#f6d9a9] via-[#dea258] to-[#bf7a33]',
    badge: 'Paling sering dipilih',
    icon: Star,
    featured: true,
    features: [
      'Unlimited photo session',
      'Maksimal 120 lembar cetak 4R',
      'Semua soft file via QR download',
      'Video GIF',
      '2 desain frame custom',
      'Free fun property',
      'Crew standby',
      'Free bingkai display 4R',
    ],
  },
  {
    name: 'Paket Premium',
    price: 'Rp 2.900.000',
    duration: '4 jam',
    accent: 'from-[#f6c8d3] via-[#d97792] to-[#9d4760]',
    badge: 'Untuk crowd dan event besar',
    icon: Crown,
    features: [
      'Unlimited photo session',
      'Maksimal 180 lembar cetak 4R',
      'Semua soft file via QR download',
      'Video GIF',
      '3 desain frame custom',
      'Free fun property premium',
      'Crew standby',
      'Free bingkai display 4R',
    ],
  },
]

const addOns = [
  { icon: TimerReset, title: 'Tambah Durasi 1 Jam', price: 'Rp 500.000', note: 'Tidak termasuk tambahan media cetak' },
  { icon: BadgeCheck, title: 'Tambah Frame Custom', price: 'Rp 50.000', note: 'Cocok untuk nama event atau branding khusus' },
  { icon: Gift, title: 'Backdrop Photobooth', price: 'Rp 150.000', note: 'Bikin area booth makin rapi dan standout' },
  { icon: Printer, title: 'Tambah 10 Lembar Cetak', price: 'Rp 100.000', note: 'Untuk tamu yang ingin bawa pulang lebih banyak' },
  { icon: Printer, title: 'Tambah 20 Lembar Cetak', price: 'Rp 180.000', note: 'Pilihan hemat untuk volume menengah' },
  { icon: Printer, title: 'Tambah 50 Lembar Cetak', price: 'Rp 400.000', note: 'Pas untuk resepsi dan corporate gathering' },
]

const highlights = [
  { icon: Printer, label: 'Cetak Instan' },
  { icon: MessageCircle, label: 'Soft File Gratis' },
  { icon: Camera, label: 'GIF Ready' },
  { icon: BadgeCheck, label: 'Frame Custom' },
  { icon: Sparkles, label: 'Kualitas Foto Premium' },
]

const moments = ['Wedding', 'Birthday', 'Wisuda', 'Gathering', 'Corporate Event']

export default function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-rose-cream dark:bg-gray-950 text-charcoal dark:text-gray-100">
      <Navbar />

      <main className="flex-1 overflow-hidden">
        <section className="relative isolate px-6 py-20 md:py-24">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.95),_rgba(245,230,232,0.92)_38%,_rgba(232,205,208,0.7)_100%)] dark:bg-[radial-gradient(circle_at_top_left,_rgba(29,38,55,0.96),_rgba(16,23,42,0.98)_42%,_rgba(8,12,23,1)_100%)]" />
          <div className="absolute -left-16 top-10 h-56 w-56 rounded-full bg-white/70 dark:bg-rose-900/20 blur-3xl" />
          <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-[#f2bcc7]/50 dark:bg-rose-800/20 blur-3xl" />
          <div className="mx-auto max-w-6xl">
            <motion.div
              className="mx-auto max-w-3xl text-center"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white dark:border-gray-700 dark:bg-gray-900/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-deep-rose dark:text-rose-200 shadow-card backdrop-blur">
                <Sparkles size={14} />
                Paket Pricing Ikut Pose
              </div>
              <h1 className="text-5xl leading-none sm:text-6xl md:text-7xl">
                Abadikan Momen,
                <span className="mt-3 block text-deep-rose dark:text-rose-200">Ciptakan Kenangan</span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-warm-gray dark:text-gray-400 sm:text-lg">
                Pilih paket photobooth yang paling pas untuk wedding, ulang tahun, wisuda, sampai acara kantor.
                Semua paket sudah siap cetak instan, soft file QR, dan pengalaman booth yang hangat tapi tetap premium.
              </p>
            </motion.div>

            <motion.div
              className="mt-14 grid gap-6 lg:grid-cols-3"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
            >
              {packages.map((item, index) => {
                const Icon = item.icon

                return (
                  <article
                    key={item.name}
                    className={[
                      'relative overflow-hidden rounded-[28px] border border-white/70 dark:border-gray-800 bg-white dark:bg-gradient-to-b dark:from-gray-900 dark:to-[#111827] p-7 shadow-[0_20px_45px_rgba(196,145,155,0.16)] backdrop-blur transition-transform duration-300 hover:-translate-y-1',
                      item.featured ? 'lg:-translate-y-4 lg:shadow-[0_24px_54px_rgba(166,107,118,0.26)]' : '',
                    ].join(' ')}
                  >
                    {item.featured && (
                      <div className="absolute right-5 top-5 rounded-full bg-charcoal px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white dark:bg-rose-200 dark:text-charcoal">
                        Best Value
                      </div>
                    )}

                    <div className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r px-4 py-2 text-sm font-semibold text-white shadow-btn ${item.accent}`}>
                      <Icon size={16} />
                      {item.name}
                    </div>

                    <div className="mt-6">
                      <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-mauve">{item.badge}</p>
                      <p className="mt-4 text-4xl text-deep-rose dark:text-rose-200 sm:text-5xl">{item.price}</p>
                      <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-blush-mist dark:border-gray-700 bg-petal-white dark:bg-gray-800/90 px-4 py-2 text-sm font-medium text-warm-gray dark:text-gray-300">
                        <TimerReset size={16} className="text-dusty-pink" />
                        Durasi {item.duration}
                      </div>
                    </div>

                    <div className="my-6 h-px bg-gradient-to-r from-transparent via-blush-mist to-transparent" />

                    <ul className="space-y-3">
                      {item.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3 text-sm leading-6 text-warm-gray dark:text-gray-400">
                          <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#f8d8de] text-deep-rose">
                            <Check size={13} strokeWidth={3} />
                          </span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                )
              })}
            </motion.div>
          </div>
        </section>

        <section className="px-6 py-8">
          <div className="mx-auto max-w-6xl">
            <motion.div
              className="rounded-[32px] border border-blush-mist dark:border-gray-800 bg-white dark:bg-gray-900/85 p-8 shadow-card"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
            >
              <div className="text-center">
                <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#df7896] to-[#c75278] px-5 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-white shadow-btn">
                  <PartyPopper size={16} />
                  Add-ons
                </div>
                <h2 className="mt-5 text-4xl">Tambahan Supaya Booth Makin Personal</h2>
                <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-warm-gray dark:text-gray-400 sm:text-base">
                  Tinggal tambahkan sesuai kebutuhan acara. Semua opsi ini fleksibel dan bisa dikombinasikan dengan paket utama.
                </p>
              </div>

              <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {addOns.map((item) => {
                  const Icon = item.icon

                  return (
                    <div key={item.title} className="rounded-3xl border border-blush-mist dark:border-gray-800 bg-petal-white/90 dark:bg-gray-800/70 p-5 transition-colors hover:border-dusty-pink">
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white dark:bg-gray-900 text-deep-rose shadow-btn">
                          <Icon size={22} />
                        </div>
                        <div>
                          <h3 className="font-body text-lg font-bold text-charcoal dark:text-gray-100">{item.title}</h3>
                          <p className="mt-2 text-2xl font-semibold text-deep-rose dark:text-rose-200">{item.price}</p>
                          <p className="mt-2 text-sm leading-6 text-muted-mauve dark:text-gray-400">{item.note}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </motion.div>
          </div>
        </section>

        <section className="px-6 py-10">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
              <motion.div
                className="rounded-[30px] border border-blush-mist dark:border-gray-800 bg-white dark:bg-gray-900 p-8 shadow-card"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45 }}
              >
                <h2 className="text-4xl">Yang Sudah Termasuk</h2>
                <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
                  {highlights.map((item) => {
                    const Icon = item.icon

                    return (
                      <div key={item.label} className="rounded-3xl border border-blush-mist dark:border-gray-800 bg-petal-white dark:bg-gray-800/80 p-5 text-center">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white dark:bg-gray-900 text-dusty-pink shadow-btn">
                          <Icon size={24} />
                        </div>
                        <p className="mt-4 text-sm font-semibold uppercase tracking-[0.16em] text-charcoal dark:text-gray-100">{item.label}</p>
                      </div>
                    )
                  })}
                </div>

                <div className="mt-10 rounded-[28px] bg-gradient-to-r from-[#fff5f7] via-[#ffe7ec] to-[#fff7f8] dark:from-gray-900 dark:via-slate-900 dark:to-gray-800 p-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-deep-rose dark:text-rose-200">Cocok untuk berbagai momen spesial</p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {moments.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white bg-white dark:bg-gray-900 px-4 py-2 text-sm font-semibold text-charcoal dark:text-gray-100 shadow-btn"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>

              <motion.aside
                className="rounded-[30px] border border-[#e8c3cb] bg-gradient-to-br from-[#d56a86] via-[#c95a78] to-[#9b425a] p-8 text-white shadow-[0_24px_54px_rgba(166,107,118,0.28)]"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.05 }}
              >
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/80">Siap booking?</p>
                <h2 className="mt-4 text-4xl text-white">Kita bantu pilih paket yang paling pas.</h2>
                <p className="mt-4 text-sm leading-7 text-white/85">
                  Kalau jumlah tamu, durasi acara, atau kebutuhan cetakmu masih belum pasti, tim Ikut Pose bisa bantu hitungkan opsi terbaiknya.
                </p>

                <div className="mt-8 space-y-3 text-sm text-white/90">
                  <div className="rounded-2xl border border-white/20 bg-white dark:bg-gray-900/10 px-4 py-3">Admin 1: 08132179767</div>
                  <div className="rounded-2xl border border-white/20 bg-white dark:bg-gray-900/10 px-4 py-3">Admin 2: 08998251297</div>
                  <div className="rounded-2xl border border-white/20 bg-white dark:bg-gray-900/10 px-4 py-3">Instagram: @ikut.pose</div>
                </div>

                <div className="mt-8 flex flex-col gap-3">
                  <a
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-bold text-charcoal transition-transform hover:-translate-y-0.5 dark:bg-rose-100 dark:text-charcoal"
                  >
                    Hubungi Kami
                  </a>
                  <a
                    href="/booth"
                    className="inline-flex items-center justify-center rounded-2xl border border-white/40 bg-transparent px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-white hover:text-charcoal dark:hover:bg-white/10 dark:hover:text-white"
                  >
                    Coba Booth Demo
                  </a>
                </div>
              </motion.aside>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
