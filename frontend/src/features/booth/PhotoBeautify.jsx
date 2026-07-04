import { useState, useEffect } from "react"
import { Wand2, Sun, Contrast, Palette, Smile } from "lucide-react"

export default function PhotoBeautify({ photos, selectedPhotoIndex, onBeautify }) {
  const [smoothing, setSmoothing] = useState(0)
  const [brightness, setBrightness] = useState(0)
  const [contrast, setContrast] = useState(0)
  const [saturation, setSaturation] = useState(0)
  const [preset, setPreset] = useState("none")

  const presets = {
    none: { smoothing: 0, brightness: 0, contrast: 0, saturation: 0 },
    glowing: { smoothing: 2, brightness: 5, contrast: 3, saturation: 8 },
    natural: { smoothing: 1, brightness: 3, contrast: 2, saturation: 5 },
    kawaii: { smoothing: 3, brightness: 8, contrast: -2, saturation: 10 },
    cool: { smoothing: 0, brightness: -3, contrast: 5, saturation: -5 },
    warm: { smoothing: 1, brightness: 5, contrast: -1, saturation: 10 },
  }

  useEffect(() => {
    if (preset !== "none" && presets[preset]) {
      const p = presets[preset]
      setSmoothing(p.smoothing)
      setBrightness(p.brightness)
      setContrast(p.contrast)
      setSaturation(p.saturation)
    }
  }, [preset])

  const getFilterStyle = () => {
    const filters = []
    if (brightness !== 0) filters.push(`brightness(${1 + brightness / 100})`)
    if (contrast !== 0) filters.push(`contrast(${1 + contrast / 100})`)
    if (saturation !== 0) filters.push(`saturate(${1 + saturation / 100})`)
    if (smoothing > 0) filters.push(`blur(${smoothing * 0.3}px)`)
    return filters.join(" ")
  }

  const currentPhoto = selectedPhotoIndex !== null && photos?.[selectedPhotoIndex] ? photos[selectedPhotoIndex] : null

  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold text-text-muted uppercase tracking-wider flex items-center gap-1">
        <Wand2 size={14} /> Beautify
      </p>

      <div className="flex gap-1.5 flex-wrap">
        {Object.keys(presets).map((p) => (
          <button key={p} onClick={() => setPreset(p)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${preset === p ? 'bg-dusty-pink text-white' : 'bg-slate-100 text-text-secondary hover:bg-slate-200'}`}>
            {p === "none" ? "Original" : p}
          </button>
        ))}
      </div>

      {currentPhoto && (
        <div className="rounded-lg overflow-hidden bg-slate-100" style={{ filter: getFilterStyle() }}>
          <img src={currentPhoto} alt="Preview" className="w-full h-32 object-cover" />
        </div>
      )}

      <div className="space-y-2">
        <label className="flex items-center justify-between text-xs text-text-secondary">
          <span className="flex items-center gap-1"><Smile size={12} /> Smoothing</span>
          <span>{smoothing}</span>
        </label>
        <input type="range" min="0" max="10" value={smoothing} onChange={(e) => { setSmoothing(Number(e.target.value)); setPreset("none") }}
          className="w-full h-1.5 bg-slate-200 rounded-full appearance-none cursor-pointer accent-dusty-pink" />
        
        <label className="flex items-center justify-between text-xs text-text-secondary">
          <span className="flex items-center gap-1"><Sun size={12} /> Brightness</span>
          <span>{brightness > 0 ? '+' : ''}{brightness}</span>
        </label>
        <input type="range" min="-20" max="20" value={brightness} onChange={(e) => { setBrightness(Number(e.target.value)); setPreset("none") }}
          className="w-full h-1.5 bg-slate-200 rounded-full appearance-none cursor-pointer accent-dusty-pink" />
        
        <label className="flex items-center justify-between text-xs text-text-secondary">
          <span className="flex items-center gap-1"><Contrast size={12} /> Contrast</span>
          <span>{contrast > 0 ? '+' : ''}{contrast}</span>
        </label>
        <input type="range" min="-20" max="20" value={contrast} onChange={(e) => { setContrast(Number(e.target.value)); setPreset("none") }}
          className="w-full h-1.5 bg-slate-200 rounded-full appearance-none cursor-pointer accent-dusty-pink" />
        
        <label className="flex items-center justify-between text-xs text-text-secondary">
          <span className="flex items-center gap-1"><Palette size={12} /> Saturation</span>
          <span>{saturation > 0 ? '+' : ''}{saturation}</span>
        </label>
        <input type="range" min="-20" max="20" value={saturation} onChange={(e) => { setSaturation(Number(e.target.value)); setPreset("none") }}
          className="w-full h-1.5 bg-slate-200 rounded-full appearance-none cursor-pointer accent-dusty-pink" />
      </div>
    </div>
  )
}
