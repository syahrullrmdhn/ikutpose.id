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
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 flex-shrink-0">
          <img
            src="/Logobulat.jpg"
            alt="IkutPose"
            className="h-10 w-10 sm:h-11 sm:w-11 rounded-2xl border border-white/70 object-cover shadow-card dark:border-gray-700"
          />
          <div className="hidden sm:block">
            <p className="font-heading text-xl sm:text-2xl leading-none text-charcoal dark:text-white">IkutPose</p>
            <p className="mt-0.5 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-mauve dark:text-gray-400">
              Digital Photobooth
            </p>
          </div>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden lg:flex items-center gap-2 rounded-full border border-white/70 bg-white/72 p-1.5 shadow-card dark:border-gray-800 dark:bg-gray-900/82">
          {links.map((link) => (
            <NavLink key={link.href} to={link.href} className={desktopLinkClass}>
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Right side: actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle className="rounded-2xl hidden sm:flex" />

          {/* Primary CTA */}
          <Link
            to="/booth"
            className="inline-flex items-center gap-1.5 rounded-full bg-charcoal px-3 sm:px-4 py-2 text-sm font-bold text-white shadow-btn transition-all hover:-translate-y-0.5 hover:bg-deep-rose dark:bg-rose-200 dark:text-charcoal dark:hover:bg-rose-100"
          >
            <Sparkles size={15} className="hidden sm:block" />
            <span className="hidden sm:inline">Coba Booth</span>
            <span className="sm:hidden text-xs">Booth</span>
            <ArrowRight size={15} className="hidden sm:block" />
          </Link>

          {/* Auth */}
          {isAuthenticated ? (
            <div className="hidden sm:flex items-center gap-2">
              <Link
                to="/profile"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-rose-200 text-sm font-bold text-charcoal shadow-btn transition-all hover:-translate-y-0.5 dark:bg-rose-900/50 dark:text-rose-100"
                title={user?.name}
              >
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </Link>
              {user?.role === 'admin' && (
                <Link
                  to="/admin"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border-subtle bg-white/80 text-charcoal shadow-btn transition-all hover:-translate-y-0.5 dark:border-gray-700 dark:bg-gray-900/80 dark:text-gray-100"
                  title="Admin Panel"
                >
                  <LayoutDashboard size={16} />
                </Link>
              )}
              <button
                onClick={logout}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-transparent text-warm-gray transition-colors hover:text-muted-red hover:bg-red-50 dark:text-gray-400 dark:hover:text-rose-300 dark:hover:bg-red-900/20"
                title="Keluar"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="hidden sm:inline-flex items-center gap-2 rounded-full border border-border-subtle bg-white/80 px-4 py-2 text-sm font-semibold text-charcoal shadow-btn transition-all hover:-translate-y-0.5 dark:border-gray-700 dark:bg-gray-900/80 dark:text-gray-100"
            >
              <UserRound size={15} />
              Login
            </Link>
          )}

          {/* Hamburger */}
          <div className="flex items-center gap-2 sm:hidden">
            <ThemeToggle className="rounded-2xl" />
            <button
              className="flex h-10 w-10 items-center justify-center rounded-2xl border border-border-subtle bg-white/80 text-slate-700 shadow-btn dark:border-gray-700 dark:bg-gray-900/80 dark:text-gray-200"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="border-t border-white/70 bg-[rgba(253,245,246,0.96)] px-5 py-4 backdrop-blur-xl dark:border-gray-800 dark:bg-[rgba(10,15,28,0.96)] sm:hidden">
          <div className="mx-auto max-w-6xl space-y-3">
            {isAuthenticated && (
              <div className="rounded-2xl border border-border-subtle bg-white/80 px-4 py-3 dark:border-gray-800 dark:bg-gray-900/80">
                <p className="text-sm font-bold text-charcoal dark:text-gray-100">{user?.name}</p>
                <p className="text-xs uppercase tracking-[0.18em] text-muted-mauve dark:text-gray-500">{user?.role}</p>
              </div>
            )}

            <div className="space-y-1.5">
              {links.map((link) => (
                <NavLink key={link.href} to={link.href} className={mobileLinkClass} onClick={closeMenu}>
                  {({ isActive }) => (
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-bold ${isActive ? 'text-charcoal dark:text-white' : 'text-charcoal dark:text-gray-100'}`}>
                        {link.label}
                      </span>
                      <ArrowRight size={14} className={isActive ? 'text-deep-rose dark:text-rose-300' : 'text-muted-mauve dark:text-gray-500'} />
                    </div>
                  )}
                </NavLink>
              ))}
            </div>

            <div className="pt-2 space-y-2">
              {isAuthenticated ? (
                <>
                  <Link to="/profile" onClick={closeMenu}
                    className="flex w-full items-center justify-center gap-2 rounded-2xl border border-border-subtle bg-white/80 px-4 py-2.5 text-sm font-bold text-charcoal shadow-btn dark:border-gray-700 dark:bg-gray-900/80 dark:text-gray-100">
                    <UserRound size={15} /> Profil
                  </Link>
                  {user?.role === 'admin' && (
                    <Link to="/admin" onClick={closeMenu}
                      className="flex w-full items-center justify-center gap-2 rounded-2xl bg-rose-100 px-4 py-2.5 text-sm font-bold text-charcoal dark:bg-rose-900/30 dark:text-rose-100">
                      <LayoutDashboard size={15} /> Admin Panel
                    </Link>
                  )}
                  <button onClick={() => { logout(); closeMenu() }}
                    className="flex w-full items-center justify-center gap-2 rounded-2xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-bold text-muted-red dark:border-red-900 dark:bg-red-900/20 dark:text-rose-300">
                    <LogOut size={15} /> Keluar
                  </button>
                </>
              ) : (
                <Link to="/login" onClick={closeMenu}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl border border-border-subtle bg-white/80 px-4 py-2.5 text-sm font-bold text-charcoal shadow-btn dark:border-gray-700 dark:bg-gray-900/80 dark:text-gray-100">
                  <UserRound size={15} /> Login
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
