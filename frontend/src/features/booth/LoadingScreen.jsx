import { useState, useEffect } from 'react'
import { Camera, Heart, Sparkles } from 'lucide-react'

const MESSAGES = [
  'Bentar ya, lagi bikin cantik fotonya~ ✨',
  'Menyusun foto dengan penuh cinta... 💕',
  'Loading magic photobooth... 🎀',
  'Bikin kamu makin glowing... 🌸',
  'Sentuhan akhir, bentar lagi~ 🌟',
]

export default function LoadingScreen() {
  const [msg, setMsg] = useState(MESSAGES[0])
  const [dots, setDots] = useState('')

  useEffect(() => {
    const msgInterval = setInterval(() => {
      setMsg(MESSAGES[Math.floor(Math.random() * MESSAGES.length)])
    }, 2500)
    
    const dotsInterval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.')
    }, 400)

    return () => {
      clearInterval(msgInterval)
      clearInterval(dotsInterval)
    }
  }, [])

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-dusty-pink/5 via-white to-rose-100/20 flex items-center justify-center">
      <div className="text-center space-y-8 max-w-sm px-6">
        {/* Animated Camera Icon */}
        <div className="relative mx-auto w-24 h-24">
          <div className="absolute inset-0 bg-dusty-pink/20 rounded-full animate-ping" />
          <div className="absolute inset-2 bg-dusty-pink/30 rounded-full animate-pulse" />
          <div className="relative w-full h-full bg-white dark:bg-gray-900 rounded-full shadow-lg flex items-center justify-center">
            <Camera size={36} className="text-dusty-pink animate-bounce" />
          </div>
          
          {/* Floating hearts */}
          <Heart size={16} className="absolute -top-2 -left-2 text-dusty-pink animate-sparkle-twinkle fill-dusty-pink/30" />
          <Heart size={12} className="absolute -top-4 right-0 text-rose-400 animate-sparkle-twinkle fill-rose-400/30" style={{ animationDelay: '0.3s' }} />
          <Sparkles size={14} className="absolute -bottom-3 -right-3 text-pink-400 animate-sparkle-twinkle" style={{ animationDelay: '0.7s' }} />
          <Heart size={10} className="absolute bottom-0 -left-3 text-pink-300 animate-sparkle-twinkle fill-pink-300/30" style={{ animationDelay: '1s' }} />
        </div>

        {/* Loading Bar */}
        <div className="space-y-3">
          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-dusty-pink via-rose-400 to-pink-400 rounded-full animate-loading-bar" />
          </div>
          <p className="text-text-muted text-sm font-medium min-h-[2rem] transition-all">
            {msg}{dots}
          </p>
        </div>
      </div>
    </div>
  )
}
