import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../../stores/authStore'
import ThemeToggle from '../ui/ThemeToggle'

const links = [
  { label: 'Booth', href: '/booth' },
  { label: 'Events', href: '/events' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Tentang', href: '/about' },
  { label: 'Kontak', href: '/contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { user, isAuthenticated, logout } = useAuthStore()

  return (
    <nav className="sticky top-0 z-50 bg-white/40 dark:bg-gray-950/40 backdrop-blur-lg border-b border-border-subtle dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img src="/Logobulat.jpg" alt="IkutPose" className="h-10 w-10 rounded-full shadow-card hover:scale-105 transition-transform" />
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <Link key={link.href} to={link.href}
              className="text-sm font-bold text-slate-600 dark:text-gray-300 hover:text-charcoal dark:hover:text-white transition-colors">
              {link.label}
            </Link>
          ))}

          <ThemeToggle />

          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <Link to="/profile"
                className="flex items-center gap-2 text-sm font-bold text-charcoal dark:text-gray-200">
                <div className="w-8 h-8 rounded-lg bg-rose-200 dark:bg-rose-900/50 border border-border-subtle dark:border-gray-700 shadow-card flex items-center justify-center text-xs font-bold">
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                {user?.name}
              </Link>
              {user?.role === 'admin' && (
                <Link to="/admin"
                  className="text-sm font-bold px-4 py-1.5 rounded-lg bg-rose-200 dark:bg-rose-900/50 border border-border-subtle dark:border-gray-700 shadow-card hover:shadow-card text-charcoal dark:text-gray-200 transition-all">
                  Admin
                </Link>
              )}
            </div>
          ) : (
            <Link to="/login"
              className="text-sm font-bold px-5 py-2 rounded-lg bg-white dark:bg-gray-800 border border-border-subtle dark:border-gray-700 shadow-card hover:shadow-card text-charcoal dark:text-gray-200 transition-all">
              Login
            </Link>
          )}
        </div>

        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button className="text-slate-600 dark:text-gray-400" onClick={() => setOpen(!open)} aria-label="Toggle menu">
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t-2 border-soft-gray dark:border-gray-800 px-6 py-4 space-y-2">
          {links.map((link) => (
            <Link key={link.href} to={link.href} className="block text-sm font-bold text-slate-600 dark:text-gray-300 hover:text-charcoal dark:hover:text-white py-2" onClick={() => setOpen(false)}>
              {link.label}
            </Link>
          ))}
          {isAuthenticated ? (
            <>
              <Link to="/profile" className="block text-sm font-bold text-charcoal dark:text-gray-200 py-2" onClick={() => setOpen(false)}>Profil Saya</Link>
              {user?.role === 'admin' && <Link to="/admin" className="block text-sm font-bold text-rose-500 dark:text-rose-400 py-2" onClick={() => setOpen(false)}>Admin Panel</Link>}
              <button onClick={() => { logout(); setOpen(false) }} className="block text-sm font-bold text-red-500 dark:text-red-400 py-2 w-full text-left">Keluar</button>
            </>
          ) : (
            <Link to="/login" className="block text-sm font-bold px-5 py-2.5 rounded-lg bg-white dark:bg-gray-800 border border-border-subtle dark:border-gray-700 shadow-card text-charcoal dark:text-gray-200 text-center mt-2" onClick={() => setOpen(false)}>
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  )
}
