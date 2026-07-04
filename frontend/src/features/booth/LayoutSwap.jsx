import { useState } from "react"
import { ArrowLeftRight, Grid3X3, LayoutGrid, Shuffle, ImagePlus } from "lucide-react"
import { useBoothStore } from "../../stores/boothStore"

export default function LayoutSwap() {
  const { photos, selectedTemplate, setPhotos } = useBoothStore()
  const [dragIndex, setDragIndex] = useState(null)
  const [viewMode, setViewMode] = useState("slots") // slots | gallery
  const [swapping, setSwapping] = useState(false)

  const slots = selectedTemplate?.photo_slots || []
  const maxSlots = slots.length || 4

  // Fill empty slots with placeholders for visual reference
  const displayArray = Array.from({ length: maxSlots }, (_, i) => photos[i] || null)

  const handleDragStart = (index) => {
    setDragIndex(index)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDrop = (dropIndex) => {
    if (dragIndex === null || dragIndex === dropIndex) return
    if (!displayArray[dragIndex] && !displayArray[dropIndex]) return

    const newPhotos = [...photos]
    const temp = newPhotos[dragIndex]
    newPhotos[dragIndex] = newPhotos[dropIndex] || null
    newPhotos[dropIndex] = temp || null

    // Filter out nulls
    const filtered = newPhotos.filter((p) => p !== null && p !== undefined)
    setPhotos(filtered)
    setDragIndex(null)
  }

  const handleAutoFill = () => {
    // Duplicate existing photos to fill slots
    if (photos.length === 0) return
    const filled = []
    for (let i = 0; i < maxSlots; i++) {
      filled.push(photos[i % photos.length])
    }
    setPhotos(filled)
  }

  const handleShuffle = () => {
    if (photos.length < 2) return
    const shuffled = [...photos].sort(() => Math.random() - 0.5)
    setPhotos(shuffled)
  }

  const handleSwapTwo = (a, b) => {
    if (a === b) return
    const newPhotos = [...photos]
    if (a < newPhotos.length && b < newPhotos.length) {
      ;[newPhotos[a], newPhotos[b]] = [newPhotos[b], newPhotos[a]]
    }
    setPhotos(newPhotos)
  }

  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold text-text-muted uppercase tracking-wider flex items-center gap-1">
        <ArrowLeftRight size={14} /> Layout & Gallery
      </p>

      {/* View Mode Toggle */}
      <div className="flex gap-2">
        <button
          onClick={() => setViewMode("slots")}
          className={`flex-1 px-3 py-2 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1 ${
            viewMode === "slots" ? "bg-dusty-pink text-white" : "bg-slate-100 text-text-secondary hover:bg-slate-200"
          }`}
        >
          <LayoutGrid size={14} /> Template Slots
        </button>
        <button
          onClick={() => setViewMode("gallery")}
          className={`flex-1 px-3 py-2 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1 ${
            viewMode === "gallery" ? "bg-dusty-pink text-white" : "bg-slate-100 text-text-secondary hover:bg-slate-200"
          }`}
        >
          <Grid3X3 size={14} /> Gallery
        </button>
      </div>

      {/* Slot View */}
      {viewMode === "slots" && (
        <div className="space-y-3">
          <div className="text-xs text-text-muted text-center">
            Drag & drop foto untuk tukar posisi
          </div>

          <div
            className="grid gap-2"
            style={{
              gridTemplateColumns: `repeat(${Math.min(maxSlots, 2)}, 1fr)`,
            }}
          >
            {displayArray.map((photo, index) => (
              <div
                key={index}
                draggable={!!photo}
                onDragStart={() => handleDragStart(index)}
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(index)}
                className={`aspect-square rounded-lg overflow-hidden border-2 transition-all cursor-grab active:cursor-grabbing ${
                  dragIndex === index
                    ? "border-dusty-pink ring-4 ring-dusty-pink/30 scale-95"
                    : photo
                    ? "border-border-subtle hover:border-dusty-pink"
                    : "border-dashed border-slate-300"
                }`}
              >
                {photo ? (
                  <div className="relative w-full h-full group">
                    <img src={photo} alt={`Slot ${index + 1}`} className="w-full h-full object-cover" />
                    <div className="absolute top-2 left-2 bg-dusty-pink text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      {index + 1}
                    </div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <span className="text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity font-semibold">
                        Drag to swap
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-slate-50">
                    <ImagePlus size={24} className="text-slate-300" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="flex gap-2">
            <button
              onClick={handleAutoFill}
              disabled={photos.length === 0}
              className="flex-1 px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-text-secondary text-xs font-semibold transition-all flex items-center justify-center gap-1 disabled:opacity-40"
            >
              <ImagePlus size={14} /> Auto Fill
            </button>
            <button
              onClick={handleShuffle}
              disabled={photos.length < 2}
              className="flex-1 px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-text-secondary text-xs font-semibold transition-all flex items-center justify-center gap-1 disabled:opacity-40"
            >
              <Shuffle size={14} /> Shuffle
            </button>
          </div>

          {/* Manual Swap Buttons */}
          {photos.length >= 2 && (
            <div className="space-y-1">
              <p className="text-[10px] text-text-muted">Quick Swap:</p>
              <div className="flex flex-wrap gap-1">
                {photos.map((_, i) =>
                  photos.map((_, j) =>
                    i < j ? (
                      <button
                        key={`${i}-${j}`}
                        onClick={() => handleSwapTwo(i, j)}
                        className="px-2 py-1 rounded bg-slate-100 hover:bg-dusty-pink/10 text-xs text-text-secondary hover:text-dusty-pink transition-all"
                      >
                        {i + 1} ↔ {j + 1}
                      </button>
                    ) : null
                  )
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Gallery View */}
      {viewMode === "gallery" && (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            {photos.map((photo, index) => (
              <div key={index} className="aspect-square rounded-lg overflow-hidden border border-border-subtle relative group">
                <img src={photo} alt={`Foto ${index + 1}`} className="w-full h-full object-cover" />
                <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded-full">
                  {index + 1}
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <button className="flex-1 px-3 py-2 rounded-lg bg-dusty-pink text-white hover:bg-rose-500 text-xs font-semibold transition-all flex items-center justify-center gap-1">
              + Tambah Foto
            </button>
          </div>

          {/* Stats */}
          <div className="flex justify-between text-xs text-text-muted">
            <span>{photos.length} foto</span>
            <span>{maxSlots} slot tersedia</span>
            <span>{maxSlots - photos.length} kosong</span>
          </div>
        </div>
      )}
    </div>
  )
}
