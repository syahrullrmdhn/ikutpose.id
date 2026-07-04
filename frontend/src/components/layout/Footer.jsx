import {
  ArrowRight,
  Camera,
  Heart,
  MapPin,
  Music2,
  Phone,
  Sparkles,
} from 'lucide-react'
import { Link } from 'react-router-dom'

const navigationLinks = [
  { label: 'Booth', href: '/booth' },
  { label: 'Events', href: '/events' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Gallery', href: '/gallery' },
]

const companyLinks = [
  { label: 'Tentang Kami', href: '/about' },
  { label: 'Hubungi Kami', href: '/contact' },
  { label: 'Login', href: '/login' },
]

const highlights = ['Cetak Instan', 'Custom Frame', 'GIF Ready', 'Event Ready']

const socials = [
  { label: 'Instagram', value: '@ikut.pose', href: 'https://instagram.com/ikut.pose', icon: Camera },
  { label: 'TikTok', value: '@ikut_pose', href: 'https://tiktok.com/@ikut_pose', icon: Music2 },
]

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/60 bg-[linear-gradient(180deg,#fff8f9_0%,#fffefe_100%)] px-6 pb-8 pt-16 dark:border-gray-800 dark:bg-[linear-gradient(180deg,#0f172a_0%,#0a1020_100%)]">
      <div className="absolute left-0 top-0 h-56 w-56 rounded-full bg-rose-200/45 blur-3xl dark:bg-rose-900/15" />
      <div className="absolute right-0 top-10 h-72 w-72 rounded-full bg-[#f2bcc7]/35 blur-3xl dark:bg-rose-800/10" />

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-10 rounded-[32px] border border-white/80 bg-white/82 p-6 shadow-[0_22px_60px_rgba(196,145,155,0.14)] backdrop-blur dark:border-gray-800 dark:bg-gray-900/82 dark:shadow-[0_24px_54px_rgba(2,6,23,0.36)] md:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-rose-100 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-deep-rose dark:bg-rose-900/30 dark:text-rose-200">
                <Sparkles size={14} />
                IkutPose Experience
              </div>
              <h2 className="mt-4 text-3xl md:text-4xl">Photobooth yang terasa hangat, modern, dan siap bikin event lebih hidup.</h2>
              <p className="mt-3 max-w-xl text-sm leading-7 text-warm-gray dark:text-gray-300">
                Dari intimate party sampai corporate activation, semua flow kami dirancang supaya tamu tinggal datang, pose, cetak, lalu pulang bawa kenangan.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                to="/pricing"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-charcoal px-5 py-3 text-sm font-bold text-white shadow-btn transition-all hover:-translate-y-0.5 hover:bg-deep-rose dark:bg-rose-200 dark:text-charcoal dark:hover:bg-rose-100"
              >
                Lihat Pricing
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border-subtle bg-white px-5 py-3 text-sm font-bold text-charcoal shadow-btn transition-all hover:-translate-y-0.5 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
              >
                Hubungi Tim
              </Link>
            </div>
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr]">
          <div>
            <Link to="/" className="flex items-center gap-3">
              <img
                src="/Logobulat.jpg"
                alt="IkutPose"
                className="h-12 w-12 rounded-2xl border border-white/70 object-cover shadow-card dark:border-gray-700"
              />
              <div>
                <p className="font-heading text-2xl leading-none text-charcoal dark:text-white">IkutPose</p>
                <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-mauve dark:text-gray-500">
                  Digital Photobooth
                </p>
              </div>
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-7 text-warm-gray dark:text-gray-300">
              Abadikan momen, ciptakan kenangan. Photobooth berbasis web yang siap dipakai untuk personal booth maupun event dengan branding khusus.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {highlights.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-border-subtle bg-white px-3 py-1.5 text-xs font-semibold text-charcoal shadow-btn dark:border-gray-800 dark:bg-gray-900 dark:text-gray-100"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-[0.18em] text-charcoal dark:text-gray-100">Navigasi</h4>
            <ul className="mt-4 space-y-3">
              {navigationLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm font-medium text-warm-gray transition-colors hover:text-charcoal dark:text-gray-400 dark:hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-[0.18em] text-charcoal dark:text-gray-100">Perusahaan</h4>
            <ul className="mt-4 space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm font-medium text-warm-gray transition-colors hover:text-charcoal dark:text-gray-400 dark:hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-[0.18em] text-charcoal dark:text-gray-100">Tetap Terhubung</h4>

            <div className="mt-4 space-y-3">
              <a
                href="tel:+628132179767"
                className="flex items-center gap-3 rounded-2xl border border-border-subtle bg-white/80 px-4 py-3 text-sm text-charcoal shadow-btn transition-transform hover:-translate-y-0.5 dark:border-gray-800 dark:bg-gray-900/80 dark:text-gray-100"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-rose-100 text-deep-rose dark:bg-rose-900/30 dark:text-rose-200">
                  <Phone size={18} />
                </span>
                <span>
                  <span className="block text-xs uppercase tracking-[0.16em] text-muted-mauve dark:text-gray-500">WhatsApp</span>
                  <span className="font-semibold">Admin Photobooth</span>
                </span>
              </a>

              {socials.map((item) => {
                const Icon = item.icon
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 rounded-2xl border border-border-subtle bg-white/80 px-4 py-3 text-sm text-charcoal shadow-btn transition-transform hover:-translate-y-0.5 dark:border-gray-800 dark:bg-gray-900/80 dark:text-gray-100"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-rose-100 text-deep-rose dark:bg-rose-900/30 dark:text-rose-200">
                      <Icon size={18} />
                    </span>
                    <span>
                      <span className="block text-xs uppercase tracking-[0.16em] text-muted-mauve dark:text-gray-500">{item.label}</span>
                      <span className="font-semibold">{item.value}</span>
                    </span>
                  </a>
                )
              })}

              <div className="flex items-center gap-3 rounded-2xl border border-border-subtle bg-white/80 px-4 py-3 text-sm text-charcoal shadow-btn dark:border-gray-800 dark:bg-gray-900/80 dark:text-gray-100">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-rose-100 text-deep-rose dark:bg-rose-900/30 dark:text-rose-200">
                  <MapPin size={18} />
                </span>
                <span>
                  <span className="block text-xs uppercase tracking-[0.16em] text-muted-mauve dark:text-gray-500">Lokasi</span>
                  <span className="font-semibold">Indonesia, tersedia untuk berbagai event</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/80 pt-6 text-xs text-slate-500 dark:border-gray-800 dark:text-gray-500 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} IkutPose. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Made with <Heart size={12} className="text-rose-400" fill="currentColor" /> for moments that deserve to be remembered
          </p>
          <p className="flex items-center gap-1.5">
            <Camera size={12} />
            Cetak instan, soft file gratis, event-ready
          </p>
        </div>
      </div>
    </footer>
  )
}
