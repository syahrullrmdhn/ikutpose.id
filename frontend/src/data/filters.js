export const FILTERS = [
  { id: 1, name: 'Normal', css: 'none' },
  { id: 2, name: 'Warm Glow', css: 'brightness(1.08) saturate(1.25) sepia(0.18)' },
  { id: 3, name: 'Cool Breeze', css: 'brightness(1.05) saturate(0.85) hue-rotate(18deg) contrast(1.05)' },
  { id: 4, name: 'Vintage', css: 'sepia(0.4) contrast(1.1) brightness(0.92) saturate(0.85)' },
  { id: 5, name: 'Noir', css: 'grayscale(1) contrast(1.15) brightness(1.05)' },
  { id: 6, name: 'Vivid', css: 'saturate(1.6) contrast(1.12) brightness(1.03)' },
  { id: 7, name: 'Soft Pink', css: 'brightness(1.05) saturate(1.1) sepia(0.08) hue-rotate(330deg)' },
  { id: 8, name: 'Golden Hour', css: 'brightness(1.1) saturate(1.3) sepia(0.25) hue-rotate(10deg)' },
  { id: 9, name: 'Mint', css: 'brightness(1.08) saturate(0.9) hue-rotate(80deg) contrast(1.05)' },
  { id: 10, name: 'Lavender', css: 'brightness(1.05) saturate(0.95) hue-rotate(240deg) contrast(1.02)' },
  { id: 11, name: 'Sunset', css: 'brightness(1.08) saturate(1.4) sepia(0.15) hue-rotate(350deg) contrast(1.05)' },
  { id: 12, name: 'Film Grain', css: 'sepia(0.2) contrast(1.15) brightness(0.95) saturate(0.9)' },
]

export const STICKERS = [
  // Love & Hearts
  { id: 1, name: 'Love', emoji: '\u2764\uFE0F', category: 'love' },
  { id: 2, name: 'Heart Eyes', emoji: '\uD83D\uDE0D', category: 'love' },
  { id: 3, name: 'Kiss', emoji: '\uD83D\uDC8B', category: 'love' },
  { id: 4, name: 'Two Hearts', emoji: '\uD83D\uDC95', category: 'love' },
  { id: 5, name: 'Sparkling Heart', emoji: '\uD83D\uDC96', category: 'love' },

  // Party & Celebration
  { id: 6, name: 'Party', emoji: '\uD83C\uDF89', category: 'party' },
  { id: 7, name: 'Confetti', emoji: '\uD83C\uDF8A', category: 'party' },
  { id: 8, name: 'Balloon', emoji: '\uD83C\uDF88', category: 'party' },
  { id: 9, name: 'Gift', emoji: '\uD83C\uDF81', category: 'party' },
  { id: 10, name: 'Trophy', emoji: '\uD83C\uDFC6', category: 'party' },
  { id: 11, name: 'Star', emoji: '\u2B50', category: 'party' },
  { id: 12, name: 'Sparkle', emoji: '\u2728', category: 'party' },
  { id: 13, name: 'Fire', emoji: '\uD83D\uDD25', category: 'party' },

  // Cute & Fun
  { id: 14, name: 'Crown', emoji: '\uD83D\uDC51', category: 'cute' },
  { id: 15, name: 'Flower', emoji: '\uD83C\uDF38', category: 'cute' },
  { id: 16, name: 'Cherry Blossom', emoji: '\uD83C\uDF3A', category: 'cute' },
  { id: 17, name: 'Sunflower', emoji: '\uD83C\uDF3B', category: 'cute' },
  { id: 18, name: 'Butterfly', emoji: '\uD83E\uDD8B', category: 'cute' },
  { id: 19, name: 'Rainbow', emoji: '\uD83C\uDF08', category: 'cute' },
  { id: 20, name: 'Cloud', emoji: '\u2601\uFE0F', category: 'cute' },
  { id: 21, name: 'Moon', emoji: '\uD83C\uDF19', category: 'cute' },
  { id: 22, name: 'Sun', emoji: '\u2600\uFE0F', category: 'cute' },

  // Faces & Emotions
  { id: 23, name: 'Smile', emoji: '\uD83D\uDE0A', category: 'face' },
  { id: 24, name: 'Wink', emoji: '\uD83D\uDE09', category: 'face' },
  { id: 25, name: 'Cool', emoji: '\uD83D\uDE0E', category: 'face' },
  { id: 26, name: 'Angel', emoji: '\uD83D\uDE07', category: 'face' },
  { id: 27, name: 'WOW', emoji: '\uD83D\uDE32', category: 'face' },
  { id: 28, name: 'LOL', emoji: '\uD83D\uDE02', category: 'face' },
  { id: 29, name: 'Wink Tongue', emoji: '\uD83D\uDE1C', category: 'face' },
  { id: 30, name: 'Sunglasses', emoji: '\uD83D\uDE0E', category: 'face' },

  // Accessories
  { id: 31, name: 'Diamond', emoji: '\uD83D\uDC8E', category: 'accessories' },
  { id: 32, name: 'Ribbon', emoji: '\uD83C\uDF80', category: 'accessories' },
  { id: 33, name: 'Bow', emoji: '\uD83E\uDDE5', category: 'accessories' },
  { id: 34, name: 'Lipstick', emoji: '\uD83D\uDC84', category: 'accessories' },
  { id: 35, name: 'Ring', emoji: '\uD83D\uDC8D', category: 'accessories' },

  // Food & Drink
  { id: 36, name: 'Cake', emoji: '\uD83C\uDF70', category: 'food' },
  { id: 37, name: 'Ice Cream', emoji: '\uD83C\uDF68', category: 'food' },
  { id: 38, name: 'Donut', emoji: '\uD83C\uDF69', category: 'food' },
  { id: 39, name: 'Bubble Tea', emoji: '\uD83E\uDDCB', category: 'food' },
  { id: 40, name: 'Strawberry', emoji: '\uD83C\uDF53', category: 'food' },
]

export const STICKER_CATEGORIES = [
  { key: 'all', label: 'Semua' },
  { key: 'love', label: 'Love' },
  { key: 'party', label: 'Party' },
  { key: 'cute', label: 'Cute' },
  { key: 'face', label: 'Faces' },
  { key: 'accessories', label: 'Aksesoris' },
  { key: 'food', label: 'Makanan' },
]

// Overlays - SVG-based glowing effects
export const OVERLAYS = [
  {
    id: 'none',
    name: 'Tanpa Overlay',
    category: 'none',
    preview: null,
    svg: null,
  },
  {
    id: 'sparkle-corner',
    name: 'Sparkle Corner',
    category: 'sparkle',
    preview: 'linear-gradient(135deg, rgba(255,215,0,0.6) 0%, transparent 40%)',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 600">
      <defs>
        <radialGradient id="glow1" cx="10%" cy="10%" r="40%">
          <stop offset="0%" stop-color="#FFD700" stop-opacity="0.8"/>
          <stop offset="100%" stop-color="#FFD700" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="glow2" cx="90%" cy="85%" r="35%">
          <stop offset="0%" stop-color="#FF69B4" stop-opacity="0.7"/>
          <stop offset="100%" stop-color="#FF69B4" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="400" height="600" fill="url(#glow1)"/>
      <rect width="400" height="600" fill="url(#glow2)"/>
      <circle cx="40" cy="50" r="3" fill="#FFD700" opacity="0.9"/>
      <circle cx="80" cy="30" r="2" fill="#FFF" opacity="0.8"/>
      <circle cx="120" cy="70" r="2.5" fill="#FFD700" opacity="0.7"/>
      <circle cx="30" cy="100" r="1.5" fill="#FFF" opacity="0.6"/>
      <circle cx="360" cy="500" r="3" fill="#FF69B4" opacity="0.9"/>
      <circle cx="330" cy="540" r="2" fill="#FFF" opacity="0.8"/>
      <circle cx="370" cy="470" r="2.5" fill="#FF69B4" opacity="0.7"/>
      <circle cx="340" cy="560" r="1.5" fill="#FFF" opacity="0.6"/>
      <path d="M60 60 L63 68 L71 68 L65 73 L67 81 L60 76 L53 81 L55 73 L49 68 L57 68Z" fill="#FFD700" opacity="0.9"/>
      <path d="M350 490 L353 498 L361 498 L355 503 L357 511 L350 506 L343 511 L345 503 L339 498 L347 498Z" fill="#FF69B4" opacity="0.9"/>
    </svg>`,
  },
  {
    id: 'light-leak-pink',
    name: 'Light Leak Pink',
    category: 'lightleak',
    preview: 'linear-gradient(180deg, rgba(255,105,180,0.5) 0%, transparent 50%)',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 600">
      <defs>
        <radialGradient id="leak1" cx="0%" cy="0%" r="70%">
          <stop offset="0%" stop-color="#FF69B4" stop-opacity="0.6"/>
          <stop offset="50%" stop-color="#FF1493" stop-opacity="0.2"/>
          <stop offset="100%" stop-color="#FF69B4" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="400" height="600" fill="url(#leak1)"/>
    </svg>`,
  },
  {
    id: 'light-leak-gold',
    name: 'Light Leak Gold',
    category: 'lightleak',
    preview: 'linear-gradient(135deg, rgba(255,215,0,0.5) 0%, transparent 60%)',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 600">
      <defs>
        <radialGradient id="leak2" cx="0%" cy="30%" r="60%">
          <stop offset="0%" stop-color="#FFD700" stop-opacity="0.65"/>
          <stop offset="50%" stop-color="#FFA500" stop-opacity="0.2"/>
          <stop offset="100%" stop-color="#FFD700" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="400" height="600" fill="url(#leak2)"/>
    </svg>`,
  },
  {
    id: 'bokeh-pink',
    name: 'Bokeh Pink',
    category: 'bokeh',
    preview: 'radial-gradient(circle at 20% 80%, rgba(255,105,180,0.4), transparent 50%)',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 600">
      <defs>
        <filter id="blur1"><feGaussianBlur stdDeviation="15"/></filter>
      </defs>
      <circle cx="80" cy="480" r="50" fill="#FF69B4" opacity="0.35" filter="url(#blur1)"/>
      <circle cx="200" cy="520" r="35" fill="#FF1493" opacity="0.3" filter="url(#blur1)"/>
      <circle cx="320" cy="450" r="45" fill="#FF69B4" opacity="0.25" filter="url(#blur1)"/>
      <circle cx="150" cy="550" r="25" fill="#FFB6C1" opacity="0.4" filter="url(#blur1)"/>
      <circle cx="300" cy="560" r="30" fill="#FF1493" opacity="0.3" filter="url(#blur1)"/>
      <circle cx="50" cy="400" r="40" fill="#FF69B4" opacity="0.2" filter="url(#blur1)"/>
      <circle cx="350" cy="380" r="30" fill="#FFB6C1" opacity="0.25" filter="url(#blur1)"/>
    </svg>`,
  },
  {
    id: 'bokeh-gold',
    name: 'Bokeh Gold',
    category: 'bokeh',
    preview: 'radial-gradient(circle at 80% 20%, rgba(255,215,0,0.4), transparent 50%)',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 600">
      <defs>
        <filter id="blur2"><feGaussianBlur stdDeviation="15"/></filter>
      </defs>
      <circle cx="320" cy="120" r="50" fill="#FFD700" opacity="0.35" filter="url(#blur2)"/>
      <circle cx="100" cy="80" r="35" fill="#FFA500" opacity="0.3" filter="url(#blur2)"/>
      <circle cx="250" cy="200" r="45" fill="#FFD700" opacity="0.25" filter="url(#blur2)"/>
      <circle cx="370" cy="250" r="25" fill="#FFEC8B" opacity="0.4" filter="url(#blur2)"/>
      <circle cx="60" cy="180" r="30" fill="#FFA500" opacity="0.3" filter="url(#blur2)"/>
      <circle cx="200" cy="50" r="40" fill="#FFD700" opacity="0.2" filter="url(#blur2)"/>
    </svg>`,
  },
  {
    id: 'rainbow-arc',
    name: 'Rainbow Arc',
    category: 'rainbow',
    preview: 'conic-gradient(from 180deg, #FF0000, #FF7F00, #FFFF00, #00FF00, #0000FF, #8B00FF, #FF0000)',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 600">
      <defs>
        <filter id="blur3"><feGaussianBlur stdDeviation="8"/></filter>
      </defs>
      <path d="M-50 600 Q200 100 450 600" fill="none" stroke="#FF0000" stroke-width="25" opacity="0.15" filter="url(#blur3)"/>
      <path d="M-30 600 Q200 130 430 600" fill="none" stroke="#FF7F00" stroke-width="25" opacity="0.15" filter="url(#blur3)"/>
      <path d="M-10 600 Q200 160 410 600" fill="none" stroke="#FFFF00" stroke-width="25" opacity="0.15" filter="url(#blur3)"/>
      <path d="M10 600 Q200 190 390 600" fill="none" stroke="#00FF00" stroke-width="25" opacity="0.15" filter="url(#blur3)"/>
      <path d="M30 600 Q200 220 370 600" fill="none" stroke="#0000FF" stroke-width="25" opacity="0.15" filter="url(#blur3)"/>
      <path d="M50 600 Q200 250 350 600" fill="none" stroke="#8B00FF" stroke-width="25" opacity="0.15" filter="url(#blur3)"/>
    </svg>`,
  },
  {
    id: 'glow-border',
    name: 'Glow Border',
    category: 'glow',
    preview: 'radial-gradient(ellipse at center, transparent 60%, rgba(255,105,180,0.5))',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 600">
      <defs>
        <filter id="blur4"><feGaussianBlur stdDeviation="20"/></filter>
      </defs>
      <rect x="-20" y="-20" width="440" height="640" fill="none" stroke="#FF69B4" stroke-width="60" opacity="0.35" filter="url(#blur4)" rx="20"/>
    </svg>`,
  },
  {
    id: 'hearts-fall',
    name: 'Hearts Fall',
    category: 'love',
    preview: 'linear-gradient(180deg, rgba(255,105,180,0.3) 0%, transparent 30%)',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 600">
      <defs><filter id="blur5"><feGaussianBlur stdDeviation="2"/></filter></defs>
      <g opacity="0.6" filter="url(#blur5)">
        <path d="M50 50 C50 30 70 30 70 50 C70 30 90 30 90 50 C90 70 70 90 70 90 C70 90 50 70 50 50Z" fill="#FF69B4"/>
        <path d="M300 100 C300 85 315 85 315 100 C315 85 330 85 330 100 C330 115 315 130 315 130 C315 130 300 115 300 100Z" fill="#FF1493"/>
        <path d="M180 30 C180 18 192 18 192 30 C192 18 204 18 204 30 C204 42 192 54 192 54 C192 54 180 42 180 30Z" fill="#FFB6C1"/>
        <path d="M350 200 C350 190 360 190 360 200 C360 190 370 190 370 200 C370 210 360 220 360 220 C360 220 350 210 350 200Z" fill="#FF69B4" opacity="0.8"/>
        <path d="M20 200 C20 190 30 190 30 200 C30 190 40 190 40 200 C40 210 30 220 30 220 C30 220 20 210 20 200Z" fill="#FF1493" opacity="0.7"/>
      </g>
    </svg>`,
  },
  {
    id: 'confetti',
    name: 'Confetti',
    category: 'party',
    preview: 'linear-gradient(180deg, rgba(255,215,0,0.3) 0%, rgba(255,105,180,0.2) 50%, transparent 100%)',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 600">
      <g opacity="0.7">
        <rect x="30" y="20" width="8" height="16" rx="2" fill="#FFD700" transform="rotate(25 34 28)"/>
        <rect x="100" y="50" width="6" height="14" rx="2" fill="#FF69B4" transform="rotate(-15 103 57)"/>
        <rect x="200" y="30" width="8" height="16" rx="2" fill="#00D9FF" transform="rotate(40 204 38)"/>
        <rect x="300" y="60" width="6" height="14" rx="2" fill="#FF1493" transform="rotate(-30 303 67)"/>
        <rect x="360" y="25" width="8" height="16" rx="2" fill="#FFD700" transform="rotate(15 364 33)"/>
        <rect x="60" y="80" width="6" height="14" rx="2" fill="#9D4EDD" transform="rotate(-20 63 87)"/>
        <rect x="150" y="70" width="8" height="16" rx="2" fill="#00FF00" transform="rotate(35 154 78)"/>
        <rect x="250" y="45" width="6" height="14" rx="2" fill="#FF69B4" transform="rotate(-45 253 52)"/>
        <rect x="340" y="90" width="8" height="16" rx="2" fill="#00D9FF" transform="rotate(10 344 98)"/>
      </g>
    </svg>`,
  },
  {
    id: 'neon-frame',
    name: 'Neon Frame',
    category: 'neon',
    preview: 'linear-gradient(45deg, rgba(0,255,255,0.3), rgba(255,0,255,0.3))',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 600">
      <defs>
        <filter id="neon"><feGaussianBlur stdDeviation="6"/><feComposite in="SourceGraphic"/></filter>
      </defs>
      <rect x="15" y="15" width="370" height="570" rx="15" fill="none" stroke="#00FFFF" stroke-width="4" opacity="0.8" filter="url(#neon)"/>
      <rect x="15" y="15" width="370" height="570" rx="15" fill="none" stroke="#FF00FF" stroke-width="2" opacity="0.6" filter="url(#neon)"/>
    </svg>`,
  },
  {
    id: 'vintage-dust',
    name: 'Vintage Dust',
    category: 'vintage',
    preview: 'radial-gradient(circle at 30% 70%, rgba(139,90,43,0.3), transparent 60%)',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 600">
      <defs>
        <filter id="dust"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="linear" slope="0.15"/></feComponentTransfer></filter>
      </defs>
      <rect width="400" height="600" filter="url(#dust)" opacity="0.5"/>
      <radialGradient id="vignette" cx="50%" cy="50%" r="60%">
        <stop offset="0%" stop-color="transparent"/>
        <stop offset="100%" stop-color="rgba(80,40,0,0.4)"/>
      </radialGradient>
      <rect width="400" height="600" fill="url(#vignette)"/>
    </svg>`,
  },
]

export const OVERLAY_CATEGORIES = [
  { key: 'none', label: 'Tanpa' },
  { key: 'sparkle', label: 'Sparkle' },
  { key: 'lightleak', label: 'Light Leak' },
  { key: 'bokeh', label: 'Bokeh' },
  { key: 'rainbow', label: 'Rainbow' },
  { key: 'glow', label: 'Glow' },
  { key: 'love', label: 'Love' },
  { key: 'party', label: 'Party' },
  { key: 'neon', label: 'Neon' },
  { key: 'vintage', label: 'Vintage' },
]
