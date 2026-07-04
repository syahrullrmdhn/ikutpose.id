import { useState } from 'react'
import { Sliders, Sticker, Type, Layers, Undo2, Redo2, Check } from 'lucide-react'
import { useBoothStore } from '../../stores/boothStore'
import { FILTERS, STICKERS, STICKER_CATEGORIES, OVERLAYS, OVERLAY_CATEGORIES } from '../../data/filters'
import DraggableSticker from '../../components/shared/DraggableSticker'

export default function PhotoEditor() {
  const { photos, selectedTemplate, appliedFilter, setFilter, appliedOverlay, setOverlay, appliedStickers, addSticker, updateSticker, removeSticker, setStep } =
    useBoothStore()
  const [tab, setTab] = useState('filter')
  const [stickerCat, setStickerCat] = useState('all')
  const [overlayCat, setOverlayCat] = useState('none')

  const template = selectedTemplate
  const slots = template?.photo_slots || []
  const canvasW = template?.canvas_width || 600
  const canvasH = template?.canvas_height || 1800

  const previewW = 320
  const previewH = (canvasH / canvasW) * previewW

  const filteredStickers = stickerCat === 'all' ? STICKERS : STICKERS.filter((s) => s.category === stickerCat)
  const filteredOverlays = overlayCat === 'none' ? OVERLAYS : OVERLAYS.filter((o) => o.category === overlayCat || o.id === 'none')

  const handleMoveSticker = (index, pos) => updateSticker(index, pos)

  // Convert SVG string to data URL for img src
  const getOverlaySrc = (overlay) => {
    if (!overlay || !overlay.svg) return null
    return 'data:image/svg+xml;base64,' + btoa(overlay.svg)
  }

  return (
    <div className="max-w-5xl w-full">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Preview canvas */}
        <div className="flex-1 flex flex-col items-center">
          <div className="bg-white rounded-xl border border-border-subtle p-4 inline-block">
            <div
              className="relative overflow-hidden rounded-md"
              style={{
                width: previewW,
                height: previewH,
                backgroundColor: template?.background_color || '#f5f5f5',
                filter: appliedFilter?.css || 'none',
              }}
            >
              {/* Render foto sesuai posisi slot */}
              {slots.map((slot, i) => {
                if (!photos[i]) return null
                const scaleX = previewW / canvasW
                const scaleY = previewH / canvasH
                return (
                  <div
                    key={i}
                    className="absolute overflow-hidden"
                    style={{
                      left: slot.x * scaleX,
                      top: slot.y * scaleY,
                      width: slot.width * scaleX,
                      height: slot.height * scaleY,
                      borderRadius: (slot.borderRadius || 0) * Math.min(scaleX, scaleY),
                    }}
                  >
                    <img src={photos[i]} alt={`Photo ${i + 1}`} className="w-full h-full object-cover" />
                  </div>
                )
              })}

              {photos.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center text-slate-400 font-medium text-sm">
                  Belum ada foto
                </div>
              )}

              {/* Draggable stickers */}
              {appliedStickers.map((sticker, i) => (
                <DraggableSticker
                  key={`${sticker.id}-${i}`}
                  sticker={sticker}
                  index={i}
                  onMove={handleMoveSticker}
                  onRemove={removeSticker}
                />
              ))}

              {/* Overlay */}
              {appliedOverlay && appliedOverlay.svg && (
                <img
                  src={getOverlaySrc(appliedOverlay)}
                  alt=""
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  style={{ objectFit: 'fill', mixBlendMode: 'screen' }}
                />
              )}

              {/* Template overlay / frame */}
              {template?.overlay_image && (
                <img
                  src={template.overlay_image}
                  alt=""
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  style={{ objectFit: 'fill' }}
                  onError={(e) => e.target.style.display = 'none'}
                />
              )}
            </div>
          </div>

          {/* Info */}
          <div className="mt-3 text-center">
            <p className="text-xs text-slate-400 font-medium">
              Geser sticker &middot; Scroll untuk resize &middot; Klik X untuk hapus
            </p>
            <p className="text-xs text-warm-gray font-bold mt-1">
              {template?.name} &middot; {canvasW}&times;{canvasH}px &middot; {photos.length} foto
              {appliedOverlay && appliedOverlay.id !== 'none' && <> &middot; <span className="text-dusty-pink">{appliedOverlay.name}</span></>}
            </p>
          </div>

          {/* Actions */}
          <div className="flex justify-between w-full mt-4">
            <button onClick={() => setStep(2)} className="text-sm font-bold text-warm-gray hover:text-charcoal transition-colors">
              &larr; Ambil Ulang
            </button>
            <div className="flex gap-2">
              <button className="p-2 rounded-lg bg-white border border-border-subtle text-warm-gray hover:text-charcoal"><Undo2 size={18} strokeWidth={2.5} /></button>
              <button className="p-2 rounded-lg bg-white border border-border-subtle text-warm-gray hover:text-charcoal"><Redo2 size={18} strokeWidth={2.5} /></button>
            </div>
            <button onClick={() => setStep(4)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-dusty-pink text-white border border-border-subtle shadow-card hover:shadow-card-hover text-charcoal text-sm font-bold transition-all">
              <Check size={16} strokeWidth={3} />Selesai
            </button>
          </div>
        </div>

        {/* Tab panel */}
        <div className="lg:w-80">
          {/* Tab bar */}
          <div className="flex gap-1 bg-slate-100 rounded-xl p-1 mb-4 border border-border-subtle">
            {[
              { key: 'filter', icon: Sliders, label: 'Filter' },
              { key: 'overlay', icon: Layers, label: 'Overlay' },
              { key: 'sticker', icon: Sticker, label: 'Sticker' },
              { key: 'text', icon: Type, label: 'Text' },
            ].map((t) => (
              <button key={t.key} onClick={() => setTab(t.key)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-bold transition-all ${
                  tab === t.key ? 'bg-white text-charcoal shadow-card border border-border-subtle' : 'text-warm-gray border border-transparent'
                }`}>
                <t.icon size={16} strokeWidth={2.5} />{t.label}
              </button>
            ))}
          </div>

          {/* Filter panel */}
          {tab === 'filter' && (
            <div className="grid grid-cols-3 gap-2 max-h-[500px] overflow-y-auto pr-1">
              {FILTERS.map((f) => (
                <button key={f.id} onClick={() => setFilter(f)}
                  className={`rounded-xl overflow-hidden border transition-all ${
                    appliedFilter?.id === f.id ? 'border-soft-gray shadow-card' : 'border-slate-200 hover:border-slate-400'
                  }`}>
                  <div className="aspect-square bg-gradient-to-br from-rose-200 via-purple-200 to-blue-200" style={{ filter: f.css }} />
                  <p className="text-xs py-1.5 text-center font-bold text-slate-700">{f.name}</p>
                </button>
              ))}
            </div>
          )}

          {/* Overlay panel */}
          {tab === 'overlay' && (
            <div>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {OVERLAY_CATEGORIES.map((cat) => (
                  <button key={cat.key} onClick={() => setOverlayCat(cat.key)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold border transition-all ${
                      overlayCat === cat.key ? 'bg-dusty-pink text-white border-soft-gray shadow-card' : 'bg-white border-slate-200 text-warm-gray hover:border-slate-400'
                    }`}>
                    {cat.label}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-2 max-h-[400px] overflow-y-auto pr-1">
                {filteredOverlays.map((o) => (
                  <button key={o.id} onClick={() => setOverlay(o)}
                    className={`rounded-xl overflow-hidden border transition-all ${
                      appliedOverlay?.id === o.id ? 'border-dusty-pink shadow-card ring-2 ring-dusty-pink/30' : 'border-slate-200 hover:border-slate-400'
                    }`}>
                    <div className="aspect-square bg-slate-800 relative overflow-hidden">
                      {o.preview ? (
                        <div className="absolute inset-0" style={{ background: o.preview }} />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-slate-500 text-xs font-medium">
                          None
                        </div>
                      )}
                    </div>
                    <p className="text-xs py-1.5 text-center font-bold text-slate-700 truncate px-1">{o.name}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Sticker panel */}
          {tab === 'sticker' && (
            <div>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {STICKER_CATEGORIES.map((cat) => (
                  <button key={cat.key} onClick={() => setStickerCat(cat.key)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold border transition-all ${
                      stickerCat === cat.key ? 'bg-dusty-pink text-white border-soft-gray text-charcoal shadow-card' : 'bg-white border-slate-200 text-warm-gray hover:border-slate-400'
                    }`}>
                    {cat.label}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-4 gap-2 max-h-[400px] overflow-y-auto pr-1">
                {filteredStickers.map((s) => (
                  <button key={s.id} onClick={() => addSticker({ ...s, x: 80, y: 80, size: 48 })}
                    className="aspect-square rounded-xl border border-border-subtle shadow-card hover:shadow-card-hover bg-white flex flex-col items-center justify-center gap-0.5 transition-all active:scale-95">
                    <span className="text-2xl">{s.emoji}</span>
                    <span className="text-[10px] text-warm-gray font-bold truncate w-full text-center px-1">{s.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Text panel */}
          {tab === 'text' && (
            <div className="space-y-3">
              <input type="text" placeholder="Tulis teks di sini..."
                className="w-full px-4 py-3 rounded-xl border border-border-subtle text-sm bg-white shadow-card focus:shadow-[0px_0px_0px] focus:translate-x-[3px] focus:translate-y-[3px] focus:outline-none font-medium transition-all" />
              <button className="w-full py-2.5 rounded-xl bg-white border border-border-subtle shadow-card hover:shadow-card-hover text-sm font-bold text-charcoal transition-all">
                Tambahkan Teks
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
