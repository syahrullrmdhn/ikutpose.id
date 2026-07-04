import { useState } from "react"
import { Type, Sparkles } from "lucide-react"

const FONTS = [
  { name: "Bubble", style: { fontFamily: "Comic Sans MS, cursive", fontWeight: "bold", letterSpacing: "1px" } },
  { name: "Cute", style: { fontFamily: "Georgia, serif", fontStyle: "italic", fontWeight: "bold" } },
  { name: "Neon", style: { fontFamily: "Arial Black, sans-serif", fontWeight: "900", textTransform: "uppercase" } },
  { name: "Script", style: { fontFamily: "Brush Script MT, cursive", fontSize: "1.2em" } },
  { name: "Kawaii", style: { fontFamily: "Courier New, monospace", fontWeight: "bold", letterSpacing: "2px" } },
]

const COLORS = [
  { name: "Pink", hex: "#ff6b9d" }, { name: "Rose", hex: "#e11d48" },
  { name: "Purple", hex: "#a855f7" }, { name: "Gold", hex: "#f59e0b" },
  { name: "Blue", hex: "#3b82f6" }, { name: "White", hex: "#ffffff" },
  { name: "Black", hex: "#1e293b" }, { name: "Neon", hex: "#ff1493" },
]

const EFFECTS = [
  { name: "None", css: "" },
  { name: "Glow", css: "drop-shadow(0 0 8px currentColor)" },
  { name: "Shadow", css: "drop-shadow(2px 4px 4px rgba(0,0,0,0.5))" },
  { name: "Outline", css: "drop-shadow(1px 0 0 #fff) drop-shadow(-1px 0 0 #fff) drop-shadow(0 1px 0 #fff) drop-shadow(0 -1px 0 #fff)" },
  { name: "Neon", css: "drop-shadow(0 0 4px currentColor) drop-shadow(0 0 8px currentColor)" },
]

export default function TextArtGenerator({ onAddText }) {
  const [text, setText] = useState("")
  const [font, setFont] = useState(FONTS[0])
  const [color, setColor] = useState(COLORS[0])
  const [effect, setEffect] = useState(EFFECTS[0])

  const handleAdd = () => {
    if (!text.trim()) return
    onAddText?.({ text, font, color, effect, id: Date.now() })
    setText("")
  }

  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold text-text-muted uppercase tracking-wider flex items-center gap-1">
        <Type size={14} /> Text Art
      </p>
      
      <div className="flex gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Ketik teks lucu..."
          className="flex-1 px-3 py-2 rounded-lg border border-border-subtle bg-white dark:bg-gray-900 text-sm focus:ring-2 focus:ring-dusty-pink/30 focus:border-dusty-pink outline-none"
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
        />
        <button onClick={handleAdd} disabled={!text.trim()}
          className="px-3 py-2 rounded-lg bg-dusty-pink text-white hover:bg-rose-500 disabled:opacity-40 transition-all">
          <Sparkles size={18} />
        </button>
      </div>

      <div className="flex gap-1.5 flex-wrap">
        {FONTS.map((f) => (
          <button key={f.name} onClick={() => setFont(f)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${font.name === f.name ? 'bg-dusty-pink text-white' : 'bg-slate-100 text-text-secondary hover:bg-slate-200'}`}>
            {f.name}
          </button>
        ))}
      </div>

      <div className="flex gap-2 flex-wrap">
        {COLORS.map((c) => (
          <button key={c.hex} onClick={() => setColor(c)}
            className={`w-7 h-7 rounded-full border-2 transition-all ${color.hex === c.hex ? 'border-charcoal scale-110' : 'border-transparent'}`}
            style={{ backgroundColor: c.hex }} title={c.name} />
        ))}
      </div>

      <div className="flex gap-1.5 flex-wrap">
        {EFFECTS.map((e) => (
          <button key={e.name} onClick={() => setEffect(e)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${effect.name === e.name ? 'bg-charcoal text-white' : 'bg-slate-100 text-text-secondary hover:bg-slate-200'}`}>
            {e.name}
          </button>
        ))}
      </div>

      {text && (
        <div className="p-4 bg-slate-900 rounded-lg flex items-center justify-center min-h-[50px]">
          <span style={{ ...font.style, color: color.hex, filter: effect.css, fontSize: "1.5rem" }}>
            {text || "Preview"}
          </span>
        </div>
      )}

      <p className="text-[10px] text-text-muted">
        Presets: Bestie Goals 💕 · Birthday Queen 👑 · Slay! ✨
      </p>
    </div>
  )
}
