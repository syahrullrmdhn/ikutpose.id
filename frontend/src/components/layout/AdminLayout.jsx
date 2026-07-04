import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import {
  LayoutDashboard, Image, Sticker, Palette, Calendar,
  Camera, Users, Settings, Menu, X, ChevronLeft, LogOut, Upload
} from 'lucide-react'
import { useAuthStore } from '../../stores/authStore'
import ThemeToggle from '../ui/ThemeToggle'

const navItems = [
  { to: '/admin', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { type: 'divider', label: 'Konten' },
  { to: '/admin/templates', icon: Image, label: 'Template & Photocard' },
  { to: '/admin/sticker-packs', icon: Sticker, label: 'Sticker Packs' },
  { to: '/admin/filters', icon: Palette, label: 'Filters' },
  { type: 'divider', label: 'Event' },
  { to: '/admin/events', icon: Calendar, label: 'Events' },
  { to: '/admin/photos', icon: Camera, label: 'Photos' },
  { type: 'divider', label: 'Pengaturan' },
  { to: '/admin/users', icon: Users, label: 'Users' },
  { to: '/admin/settings', icon: Settings, label: 'Settings' },
]

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuthStore()

  const currentPage = navItems.find((item) =>
    item.to && (
      (item.end && location.pathname === item.to) ||
      (!item.end && location.pathname.startsWith(item.to) && item.to !== '/admin')
    )
  )?.label || 'Dashboard'

  const handleLogout = () => { logout(); navigate('/') }

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-gray-950 font-sans text-charcoal dark:text-gray-100 flex">
      {mobileOpen && <div className="fixed inset-0 bg-black/40 dark:bg-black/60 z-40 lg:hidden" onClick={() => setMobileOpen(false)} />}

      <aside className={`fixed lg:sticky top-0 left-0 h-screen z-50 bg-white dark:bg-gray-900 border-r-2 border-soft-gray dark:border-gray-800 flex flex-col transition-all duration-300 ${collapsed ? 'w-[72px]' : 'w-64'} ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="h-16 flex items-center justify-between px-4 border-b-2 border-soft-gray dark:border-gray-800">
          {!collapsed && <img src="/Logobulat.jpg" alt="IkutPose" className="h-8 w-8 rounded-full" />}
          <button onClick={() => setCollapsed(!collapsed)} className="hidden lg:flex items-center justify-center w-8 h-8 rounded-lg hover:bg-slate-100 dark:hover:bg-gray-800 text-slate-400 dark:text-gray-500">
            <ChevronLeft size={18} className={`transition-transform ${collapsed ? 'rotate-180' : ''}`} />
          </button>
        </div>

        <nav className="flex-1 py-3 px-2 space-y-0.5 overflow-y-auto">
          {navItems.map((item, i) => {
            if (item.type === 'divider') {
              return !collapsed ? (
                <p key={i} className="text-[10px] font-bold text-slate-400 dark:text-gray-500 uppercase tracking-wider px-3 pt-4 pb-1">{item.label}</p>
              ) : <div key={i} className="my-2 border-t border-slate-200 dark:border-gray-800" />
            }
            return (
              <NavLink key={item.to} to={item.to} end={item.end} onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold transition-all ${
                    isActive ? 'bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-800' : 'text-warm-gray dark:text-gray-400 hover:bg-slate-50 dark:hover:bg-gray-800 hover:text-charcoal dark:hover:text-gray-200 border border-transparent'
                  }`
                }>
                <item.icon size={18} strokeWidth={2.5} className="shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </NavLink>
            )
          })}
        </nav>

        <div className="p-3 border-t-2 border-soft-gray dark:border-gray-800">
          <div className="flex items-center gap-3 px-3 py-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-rose-200 dark:bg-rose-900/50 border border-border-subtle dark:border-gray-700 flex items-center justify-center text-xs font-bold text-charcoal dark:text-rose-200">
              {user?.name?.charAt(0).toUpperCase() || 'A'}
            </div>
            {!collapsed && (
              <div className="min-w-0">
                <p className="text-sm font-bold text-charcoal dark:text-gray-100 truncate">{user?.name || 'Admin'}</p>
                <p className="text-[10px] text-slate-400 dark:text-gray-500 font-medium capitalize">{user?.role || 'admin'}</p>
              </div>
            )}
          </div>
          <button onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold text-warm-gray dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 w-full transition-colors">
            <LogOut size={18} strokeWidth={2.5} className="shrink-0" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      <div className="flex-1 min-w-0">
        <header className="sticky top-0 z-30 h-16 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b-2 border-soft-gray dark:border-gray-800 flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <button onClick={() => setMobileOpen(true)} className="lg:hidden text-slate-600 dark:text-gray-400"><Menu size={24} /></button>
            <h1 className="text-lg font-extrabold text-charcoal dark:text-gray-100">{currentPage}</h1>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <div className="w-8 h-8 rounded-lg bg-rose-200 dark:bg-rose-900/50 border border-border-subtle dark:border-gray-700 flex items-center justify-center text-xs font-bold text-charcoal dark:text-rose-200">
              {user?.name?.charAt(0).toUpperCase() || 'A'}
            </div>
          </div>
        </header>
        <main className="p-6">
          <div className="max-w-5xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
