import { useState } from 'react'
import {
  ArrowRight,
  LayoutDashboard,
  LogOut,
  Menu,
  Sparkles,
  UserRound,
  X,
} from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'
import { useAuthStore } from '../../stores/authStore'
import ThemeToggle from '../ui/ThemeToggle'

const links = [
  { label: 'Booth', href: '/booth', description: 'Buka kamera dan mulai ambil foto' },
  { label: 'Events', href: '/events', description: 'Lihat event dan gallery per acara' },
  { label: 'Pricing', href: '/pricing', description: 'Pilih paket photobooth terbaikmu' },
  { label: 'Gallery', href: '/gallery', description: 'Jelajahi hasil foto yang sudah dibagikan' },
  { label: 'Tentang', href: '/about', description: 'Kenali cerita dan layanan IkutPose' },
  { label: 'Kontak', href: '/contact', description: 'Hubungi tim untuk event custom' },
]

const desktopLinkClass = ({ isActive }) =>
  [
    'rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200',
    isActive
      ? 'bg-rose-200 text-charcoal shadow-btn dark:bg-rose-900/60 dark:text-rose-100'
      : 'text-slate-600 hover:bg-white hover:text-charcoal dark:text-gray-300 dark:hover:bg-gray-800/80 dark:hover:text-white',
  ].join(' ')

const mobileLinkClass = ({ isActive }) =>
  [
    'group block rounded-2xl border px-4 py-3 transition-all',
    isActive
      ? 'border-rose-300 bg-rose-50 dark:border-rose-800 dark:bg-rose-900/20'
      : 'border-border-subtle bg-white/80 hover:border-dusty-pink dark:border-gray-800 dark:bg-gray-900/70 dark:hover:border-rose-700',
  ].join(' ')

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { user, isAuthenticated, logout } = useAuthStore()

  const closeMenu = () => setOpen(false)

  return (
    <nav className="sticky top-0 z-50 border-b border-white/60 bg-[rgba(253,245,246,0.78)] backdrop-blur-xl dark:border-gray-800 dark:bg-[rgba(10,15,28,0.8)]">
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-rose-300/80 to-transparent dark:via-rose-800/80" />

      <div className="mx-auto flex h-16 sm:h-20 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/Logobulat.jpg"
            alt="IkutPose"
            className="h-11 w-11 rounded-2xl border border-white/70 object-cover shadow-card dark:border-gray-700"
          />
          <div className="hidden sm:block">
            <p className="font-heading text-2xl leading-none text-charcoal dark:text-white">IkutPose</p>
            <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-mauve dark:text-gray-400">
              Digital Photobooth
            </p>
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-2 rounded-full border border-white/70 bg-white/72 p-1.5 shadow-card dark:border-gray-800 dark:bg-gray-900/82">
          {links.map((link) => (
            <NavLink key={link.href} to={link.href} className={desktopLinkClass}>
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle className="rounded-2xl" />

          <Link
            to="/booth"
            className="inline-flex items-center gap-2 rounded-full bg-charcoal px-4 py-2 text-sm font-bold text-white shadow-btn transition-all hover:-translate-y-0.5 hover:bg-deep-rose dark:bg-rose-200 dark:text-charcoal dark:hover:bg-rose-100"
          >
            Coba Booth
            <ArrowRight size={15} />
          </Link>

          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-dusty-pink px-4 py-2 text-sm font-bold text-white shadow-btn transition-all hover:-translate-y-0.5 hover:bg-deep-rose dark:bg-rose-500 dark:text-white dark:hover:bg-rose-400"
          >
            Booking Sekarang
            <ArrowRight size={15} />
          </Link>

          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <Link
                to="/profile"
                className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-white/80 px-3 py-2 text-sm font-semibold text-charcoal shadow-btn transition-all hover:-translate-y-0.5 dark:border-gray-700 dark:bg-gray-900/80 dark:text-gray-100"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-200 text-xs font-bold text-charcoal dark:bg-rose-900/50 dark:text-rose-100">
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </span>
                <span className="max-w-28 truncate">{user?.name}</span>
              </Link>

              {user?.role === 'admin' && (
                <Link
                  to="/admin"
                  className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-white/80 px-3 py-2 text-sm font-semibold text-charcoal shadow-btn transition-all hover:-translate-y-0.5 dark:border-gray-700 dark:bg-gray-900/80 dark:text-gray-100"
                >
                  <LayoutDashboard size={15} />
                  Admin
                </Link>
              )}

              <button
                onClick={logout}
                className="inline-flex items-center gap-2 rounded-full border border-transparent px-3 py-2 text-sm font-semibold text-warm-gray transition-colors hover:text-muted-red dark:text-gray-400 dark:hover:text-rose-300"
              >
                <LogOut size={15} />
                Keluar
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-white/80 px-4 py-2 text-sm font-semibold text-charcoal shadow-btn transition-all hover:-translate-y-0.5 dark:border-gray-700 dark:bg-gray-900/80 dark:text-gray-100"
            >
              <UserRound size={15} />
              Login
            </Link>
          )}
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle className="rounded-2xl" />
          <button
            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border-subtle bg-white/80 text-slate-700 shadow-btn dark:border-gray-700 dark:bg-gray-900/80 dark:text-gray-200"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-white/70 bg-[rgba(253,245,246,0.96)] px-6 py-5 backdrop-blur-xl dark:border-gray-800 dark:bg-[rgba(10,15,28,0.96)] md:hidden">
          <div className="mx-auto max-w-6xl">
            <div className="mb-4 rounded-[28px] border border-border-subtle bg-white/80 p-4 shadow-card dark:border-gray-800 dark:bg-gray-900/82">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-deep-rose dark:text-rose-300">
                Capture Moments
              </p>
              <p className="mt-2 text-sm leading-6 text-warm-gray dark:text-gray-300">
                Photobooth yang siap untuk hangout, wedding, wisuda, sampai event kantor dengan hasil yang langsung bisa dibawa pulang.
              </p>
            </div>

            <div className="space-y-3">
              {links.map((link) => (
                <NavLink key={link.href} to={link.href} className={mobileLinkClass} onClick={closeMenu}>
                  {({ isActive }) => (
                    <>
                      <div className="flex items-center justify-between">
                        <span className={`text-sm font-bold ${isActive ? 'text-charcoal dark:text-white' : 'text-charcoal dark:text-gray-100'}`}>
                          {link.label}
                        </span>
                        <ArrowRight size={16} className={isActive ? 'text-deep-rose dark:text-rose-300' : 'text-muted-mauve dark:text-gray-500'} />
                      </div>
                      <p className="mt-1 text-xs leading-5 text-warm-gray dark:text-gray-400">{link.description}</p>
                    </>
                  )}
                </NavLink>
              ))}
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <Link
                to="/booth"
                onClick={closeMenu}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-charcoal px-4 py-3 text-sm font-bold text-white shadow-btn dark:bg-rose-200 dark:text-charcoal"
              >
                <Sparkles size={16} />
                Coba Booth
              </Link>

              <Link
                to="/contact"
                onClick={closeMenu}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-dusty-pink px-4 py-3 text-sm font-bold text-white shadow-btn hover:bg-deep-rose dark:bg-rose-500 dark:text-white"
              >
                Booking Sekarang
              </Link>
            </div>

            <div className="mt-3">
              {isAuthenticated ? (
                <Link
                  to="/profile"
                  onClick={closeMenu}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-border-subtle bg-white/80 px-4 py-3 text-sm font-bold text-charcoal shadow-btn dark:border-gray-700 dark:bg-gray-900/80 dark:text-gray-100"
                >
                  <UserRound size={16} />
                  Profil
                </Link>
              ) : (
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-border-subtle bg-white/80 px-4 py-3 text-sm font-bold text-charcoal shadow-btn dark:border-gray-700 dark:bg-gray-900/80 dark:text-gray-100"
                >
                  <UserRound size={16} />
                  Login
                </Link>
              )}
            </div>

            {isAuthenticated && (
              <div className="mt-4 flex items-center justify-between rounded-2xl border border-border-subtle bg-white/70 px-4 py-3 dark:border-gray-800 dark:bg-gray-900/70">
                <div>
                  <p className="text-sm font-bold text-charcoal dark:text-gray-100">{user?.name}</p>
                  <p className="text-xs uppercase tracking-[0.18em] text-muted-mauve dark:text-gray-500">{user?.role}</p>
                </div>
                <div className="flex items-center gap-2">
                  {user?.role === 'admin' && (
                    <Link
                      to="/admin"
                      onClick={closeMenu}
                      className="rounded-xl bg-rose-100 px-3 py-2 text-xs font-bold text-charcoal dark:bg-rose-900/30 dark:text-rose-100"
                    >
                      Admin
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      logout()
                      closeMenu()
                    }}
                    className="rounded-xl px-3 py-2 text-xs font-bold text-muted-red dark:text-rose-300"
                  >
                    Keluar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
