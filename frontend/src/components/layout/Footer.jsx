import { Camera, Heart } from 'lucide-react'
import { Link } from 'react-router-dom'

const links = [
 { label: 'Booth', href: '/booth' },
 { label: 'Events', href: '/events' },
 { label: 'Gallery', href: '/gallery' },
 { label: 'Tentang Kami', href: '/about' },
 { label: 'Hubungi Kami', href: '/contact' },
 { label: 'Login', href: '/login' },
]

export default function Footer() {
 return (
 <footer className="bg-white border-t-2 border-soft-gray py-12 px-6">
 <div className="max-w-6xl mx-auto">
 <div className="flex flex-col md:flex-row justify-between gap-8">
 <div>
 <Link to="/" className="flex items-center mb-3">
 <img src="/Logobulat.jpg" alt="IkutPose" className="h-8 w-8 rounded-full" />
 </Link>
 <p className="text-sm text-warm-gray max-w-xs font-medium">
 Abadikan momen, ciptakan kenangan. Digital photobooth yang bisa kamu akses kapanpun, di manapun.
 </p>
 </div>
 <div className="flex gap-12">
 <div>
 <h4 className="text-sm font-bold text-charcoal mb-3">Navigasi</h4>
 <ul className="space-y-2">
 {links.map((link) => (
 <li key={link.href}>
 <Link to={link.href} className="text-sm text-warm-gray font-medium hover:text-charcoal transition-colors">{link.label}</Link>
 </li>
 ))}
 </ul>
 </div>
 </div>
 </div>
 <div className="mt-10 pt-6 border-t-2 border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-2">
 <p className="text-xs text-slate-400 font-medium">&copy; {new Date().getFullYear()} IkutPose. All rights reserved.</p>
 <p className="text-xs text-slate-400 font-medium flex items-center gap-1">
 Made with <Heart size={12} className="text-rose-400" fill="currentColor" /> in Indonesia
 </p>
 </div>
 </div>
 </footer>
 )
}
