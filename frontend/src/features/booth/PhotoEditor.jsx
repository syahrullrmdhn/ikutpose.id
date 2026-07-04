import { useState } from 'react'
import { Sliders, Sticker, Type, Layers, Wand2, Film, QrCode, LayoutGrid, Undo2, Check } from 'lucide-react'
import { useBoothStore } from '../../stores/boothStore'
import { FILTERS, STICKERS, STICKER_CATEGORIES, OVERLAYS, OVERLAY_CATEGORIES } from '../../data/filters'
import DraggableSticker from '../../components/shared/DraggableSticker'
import TextArtGenerator from './TextArtGenerator'
import PhotoBeautify from './PhotoBeautify'
import GIFBoomerangMode from './GIFBoomerangMode'
import QRCodeDownload from './QRCodeDownload'
import LayoutSwap from './LayoutSwap'

export default function PhotoEditor() {
  const { photos, selectedTemplate, appliedFilter, setFilter, appliedOverlay, setOverlay, appliedStickers, addSticker, updateSticker, removeSticker, prevStep, nextStep } =
    useBoothStore()
  const [tab, setTab] = useState('filter')
  const [stickerCat, setStickerCat] = useState('all')
  const [overlayCat, setOverlayCat] = useState('none')
  const [texts, setTexts] = useState([])
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0)

  const slots = selectedTemplate?.photo_slots || []
  const canvasW = selectedTemplate?.canvas_width || 600
  const canvasH = selectedTemplate?.canvas_height || 1800
  const previewW = 320
  const previewH = (canvasH / canvasW) * previewW

  const filteredStickers = stickerCat === 'all' ? STICKERS : STICKERS.filter((s) => s.category === stickerCat)
  const filteredOverlays = overlayCat === 'none' ? OVERLAYS : OVERLAYS.filter((o) => o.category === overlayCat || o.id === 'none')

  const handleMoveSticker = (index, pos) => updateSticker(index, pos)
  const getOverlaySrc = (overlay) => {
    if (!overlay || !overlay.svg) return null
    return 'data:image/svg+xml;base64,' + btoa(overlay.svg)
  }

  const addTextOverlay = (textObj) => {
    setTexts([...texts, textObj])
  }

  const removeText = (id) => {
    setTexts(texts.filter((t) => t.id !== id))
  }

  const tabs = [
    { id: 'filter', icon: Sliders, label: 'Filter' },
    { id: 'sticker', icon: Sticker, label: 'Sticker' },
    { id: 'overlay', icon: Layers, label: 'Overlay' },
    { id: 'text', icon: Type, label: 'Text' },
    { id: 'beautify', icon: Wand2, label: 'Beautify' },
    { id: 'gif', icon: Film, label: 'GIF' },
    { id: 'qrcode', icon: QrCode, label: 'QR' },
    { id: 'layout', icon: LayoutGrid, label: 'Layout' },
  ]

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-card p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-charcoal">Edit Foto</h2>
          <button onClick={() => nextStep()}
            className="px-6 py-2 rounded-lg bg-dusty-pink hover:bg-rose-500 text-white font-semibold transition-all flex items-center gap-2">
            <Check size={18} /> Selesai
          </button>
        </div>

        <div className="flex gap-6">
          {/* Left - Preview Panel */}
          <div className="flex-shrink-0">
            <div className="relative rounded-lg overflow-hidden shadow-lg border-2 border-border-subtle" style={{ width: previewW, height: previewH }}>
              {/* Template Background */}
              <div className="absolute inset-0" style={{ backgroundColor: selectedTemplate?.background_color || '#fff' }} />

              {/* Photo Slots */}
              {slots.map((slot, i) => {
                const sx = (slot.x / canvasW) * previewW
                const sy = (slot.y / canvasH) * previewH
                const sw = (slot.width / canvasW) * previewW
                const sh = (slot.height / canvasH) * previewH
                const sr = Math.min((slot.borderRadius / canvasW) * previewW, (slot.borderRadius / canvasH) * previewH)

                return (
                  <div key={i} className="absolute overflow-hidden" style={{ left: sx, top: sy, width: sw, height: sh, borderRadius: sr, border: '2px solid #fff' }}>
                    {photos[i] ? (
                      <img src={photos[i]} alt={`Photo ${i + 1}`} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-slate-200" />
                    )}
                  </div>
                )
              })}

              {/* Text Overlays */}
              {texts.map((t) => (
                <div key={t.id} className="absolute cursor-move group" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                  <span style={{ ...t.font.style, color: t.color.hex, filter: t.effect.css, fontSize: '1.2rem' }}>
                    {t.text}
                  </span>
                  <button onClick={() => removeText(t.id)}
                    className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white text-[8px]">x</span>
                  </button>
                </div>
              ))}

              {/* Draggable Stickers */}
              {appliedStickers.map((sticker, i) => (
                <DraggableSticker key={i} sticker={sticker} index={i} onMove={handleMoveSticker} onRemove={removeSticker} previewW={previewW} previewH={previewH} />
              ))}

              {/* Template Overlay */}
              {selectedTemplate?.overlay_image && (
                <img src={selectedTemplate.overlay_image} alt="" className="absolute inset-0 w-full h-full object-fill opacity-90 pointer-events-none" />
              )}

              {/* Glowing Overlay */}
              {appliedOverlay && appliedOverlay.svg && (
                <img src={getOverlaySrc(appliedOverlay)} alt="" className="absolute inset-0 w-full h-full object-fill pointer-events-none" style={{ mixBlendMode: 'screen', opacity: 0.8 }} />
              )}
            </div>

            {/* Photo selector */}
            <div className="flex gap-2 mt-3">
              {photos.map((photo, i) => (
                <button key={i} onClick={() => setSelectedPhotoIndex(i)}
                  className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${selectedPhotoIndex === i ? 'border-dusty-pink ring-2 ring-dusty-pink/30' : 'border-transparent opacity-60 hover:opacity-100'}`}>
                  <img src={photo} alt={`Foto ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right - Tools Panel */}
          <div className="flex-1 min-w-0 space-y-4">
            {/* Tabs */}
            <div className="flex gap-1 bg-slate-100 rounded-lg p-1">
              {tabs.map(({ id, icon: Icon, label }) => (
                <button key={id} onClick={() => setTab(id)}
                  className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-md text-xs font-semibold transition-all ${tab === id ? 'bg-white text-charcoal shadow-sm' : 'text-text-muted hover:text-charcoal'}`}>
                  <Icon size={14} /> {label}
                </button>
              ))}
            </div>

            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
              {/* FILTER TAB */}
              {tab === 'filter' && (
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">Glowing Filters</p>
                  <div className="grid grid-cols-3 gap-2">
                    <button onClick={() => setFilter(null)}
                      className={`p-3 rounded-lg text-xs font-semibold transition-all ${!appliedFilter ? 'bg-dusty-pink text-white ring-2 ring-dusty-pink/30' : 'bg-slate-100 text-text-secondary hover:bg-slate-200'}`}>
                      <div className="w-full aspect-square rounded bg-slate-200 mb-1 flex items-center justify-center text-lg">📷</div>
                      None
                    </button>
                    {FILTERS.filter(f => f.id !== 1).map((filter) => (
                      <button key={filter.id} onClick={() => setFilter(filter)}
                        className={`p-3 rounded-lg text-xs font-semibold transition-all ${appliedFilter?.id === filter.id ? 'bg-dusty-pink text-white ring-2 ring-dusty-pink/30' : 'bg-slate-100 text-text-secondary hover:bg-slate-200'}`}>
                        <div className="w-full aspect-square rounded mb-1" style={{ background: filter.preview || 'linear-gradient(135deg, #ff6b9d, #ffb3d9)' }} />
                        {filter.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STICKER TAB */}
              {tab === 'sticker' && (
                <div className="space-y-2">
                  <div className="flex gap-1 flex-wrap">
                    {STICKER_CATEGORIES.map((cat) => (
                      <button key={cat.id} onClick={() => setStickerCat(cat.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${stickerCat === cat.id ? 'bg-dusty-pink text-white' : 'bg-slate-100 text-text-secondary'}`}>
                        {cat.name}
                      </button>
                    ))}
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    {filteredStickers.map((sticker) => (
                      <button key={sticker.id} onClick={() => addSticker(sticker)}
                        className={`p-2 rounded-lg transition-all hover:scale-110 ${sticker.className || ''}`}>
                        <div className="w-full aspect-square rounded bg-slate-100 flex items-center justify-center text-2xl">
                          <span className={sticker.className}>{sticker.label || '🎀'}</span>
                        </div>
                        <p className="text-[10px] text-center mt-1 text-text-muted">{sticker.name}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* OVERLAY TAB */}
              {tab === 'overlay' && (
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">Pilih Overlay</p>
                  <div className="flex gap-1 flex-wrap">
                    {OVERLAY_CATEGORIES.map((cat) => (
                      <button key={cat.id} onClick={() => setOverlayCat(cat.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${overlayCat === cat.id ? 'bg-dusty-pink text-white' : 'bg-slate-100 text-text-secondary'}`}>
                        {cat.name}
                      </button>
                    ))}
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {filteredOverlays.map((ovl) => (
                      <button key={ovl.id} onClick={() => setOverlay(ovl)}
                        className={`p-2 rounded-lg transition-all ${appliedOverlay?.id === ovl.id ? 'bg-dusty-pink/10 ring-2 ring-dusty-pink/30' : 'hover:bg-slate-50'}`}>
                        <div className="w-full aspect-square rounded-lg overflow-hidden bg-slate-800 relative">
                          {ovl.preview ? (
                            <div className="absolute inset-0" style={{ background: ovl.preview }} />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center text-white/40 text-[10px] font-bold">None</div>
                          )}
                        </div>
                        <p className="text-[10px] text-center mt-1 text-text-muted">{ovl.name}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* TEXT TAB */}
              {tab === 'text' && <TextArtGenerator onAddText={addTextOverlay} />}

              {/* BEAUTIFY TAB */}
              {tab === 'beautify' && (
                <PhotoBeautify photos={photos} selectedPhotoIndex={selectedPhotoIndex} />
              )}

              {/* GIF TAB */}
              {tab === 'gif' && <GIFBoomerangMode />}

              {/* QR CODE TAB */}
              {tab === "qrcode" && (
                photos.length > 0 && <QRCodeDownload imageDataUrl={photos[0]} />
              )}

              {/* LAYOUT SWAP TAB */}
              {tab === "layout" && <LayoutSwap />}
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="flex gap-3 pt-4 border-t border-border-subtle">
          <button onClick={() => prevStep()}
            className="px-4 py-2 rounded-lg border border-border-subtle text-charcoal font-semibold transition-all flex items-center gap-2 hover:border-border-default">
            <Undo2 size={18} /> Kembali
          </button>
          <button onClick={() => nextStep()}
            className="flex-1 px-4 py-2 rounded-lg bg-charcoal hover:bg-slate-800 text-white font-semibold transition-all flex items-center justify-center gap-2">
            <Check size={18} /> Lihat Hasil
          </button>
        </div>
      </div>
    </div>
  )
}
