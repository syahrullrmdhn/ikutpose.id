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
