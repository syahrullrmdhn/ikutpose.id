import { useEffect, useState } from 'react'

const COLORS = ['#ff6b9d', '#ff9ec4', '#ffd1e0', '#ffb3d9', '#ff85b3', '#ffcce5', '#ff4d88', '#fff0f5']
const SHAPES = ['circle', 'heart', 'star', 'square']

function randomBetween(min, max) {
  return Math.random() * (max - min) + min
}

function ConfettiPiece({ index }) {
  const [style, setStyle] = useState({})

  useEffect(() => {
    const color = COLORS[Math.floor(Math.random() * COLORS.length)]
    const shape = SHAPES[Math.floor(Math.random() * SHAPES.length)]
    const left = randomBetween(0, 100)
    const delay = randomBetween(0, 2)
    const duration = randomBetween(2, 4)
    const size = randomBetween(8, 16)
    const rotation = randomBetween(0, 360)

    setStyle({
      left: `${left}%`,
      width: `${size}px`,
      height: `${size}px`,
      backgroundColor: color,
      borderRadius: shape === 'circle' ? '50%' : shape === 'square' ? '2px' : '0',
      animationDelay: `${delay}s`,
      animationDuration: `${duration}s`,
      transform: `rotate(${rotation}deg)`,
    })
  }, [])

  const getShapeContent = () => {
    switch (SHAPES[index % SHAPES.length]) {
      case 'heart':
        return '♥'
      case 'star':
        return '★'
      default:
        return ''
    }
  }

  return (
    <div
      className="confetti-piece animate-confetti-fall"
      style={style}
    >
      {(SHAPES[index % SHAPES.length] === 'heart' || SHAPES[index % SHAPES.length] === 'star') ? (
        <span className="text-white text-xs">{getShapeContent()}</span>
      ) : null}
    </div>
  )
}

export default function Confetti() {
  const [pieces] = useState(() => Array.from({ length: 50 }, (_, i) => i))

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      {pieces.map(i => (
        <ConfettiPiece key={i} index={i} />
      ))}
      {/* Sparkle text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="animate-sparkle-pop text-center">
          <p className="text-4xl md:text-6xl font-bold text-dusty-pink drop-shadow-2xl animate-bounce-in">
            ✨ Foto Siap! ✨
          </p>
          <p className="text-lg text-white/80 mt-2 animate-fade-in-delay">
            Cantik banget! 🎀
          </p>
        </div>
      </div>
    </div>
  )
}
