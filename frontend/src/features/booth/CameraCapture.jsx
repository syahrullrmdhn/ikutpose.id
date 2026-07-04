import { useState } from 'react'
import { useBoothStore } from '../../stores/boothStore'
import CameraControls from './CameraControls'

export default function CameraCapture() {
  const { photos, selectedTemplate, appliedOverlay, addPhoto, prevStep, nextStep } = useBoothStore()
  const [showCamera, setShowCamera] = useState(false)

  // For strip/grid templates, use INDIVIDUAL SLOT aspect ratio
  // Camera captures one photo at a time that fits into ONE slot
  const slots = selectedTemplate?.photo_slots || []
  const targetAspectRatio = slots.length > 0 
    ? slots[0].width / slots[0].height 
    : 1

  const handleCapture = (imageData, filter) => {
    addPhoto(imageData)
    setShowCamera(false)
    
    const maxSlots = slots.length || 4
    if (photos.length + 1 >= maxSlots) {
      setTimeout(() => nextStep(), 500)
    }
  }

  if (showCamera) {
    return (
      <CameraControls
        onClose={() => setShowCamera(false)}
        onCapture={handleCapture}
        aspectRatio={targetAspectRatio}
        template={selectedTemplate}
        overlay={appliedOverlay}
      />
    )
  }

  const maxSlots = slots.length || 4
  const progress = photos.length / maxSlots

  return (
    <div className="w-full max-w-2xl">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-card p-8 space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-charcoal dark:text-gray-100 mb-2">Ambil Foto</h2>
          <p className="text-slate-600 dark:text-gray-300">
            {photos.length < maxSlots 
              ? `Foto ${photos.length + 1} dari ${maxSlots} — ${selectedTemplate?.name}`
              : 'Semua foto sudah diambil!'}
          </p>
          {photos.length > 0 && (
            <div className="mt-3 bg-slate-100 rounded-full h-2 overflow-hidden">
              <div className="h-full bg-dusty-pink transition-all" style={{ width: `${progress * 100}%` }} />
            </div>
          )}
        </div>

        {photos.length > 0 ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {photos.map((photo, idx) => (
                <div key={idx} className="bg-slate-100 rounded-lg overflow-hidden aspect-square relative group">
                  <img src={photo} alt={`Foto ${idx + 1}`} className="w-full h-full object-cover" />
                  <div className="absolute top-2 left-2 bg-dusty-pink text-white text-xs font-bold px-2 py-1 rounded-full">
                    {idx + 1}
                  </div>
                </div>
              ))}
              {photos.length < maxSlots && (
                <button
                  onClick={() => setShowCamera(true)}
                  className="aspect-square rounded-lg border-2 border-dashed border-slate-300 hover:border-dusty-pink transition-colors flex flex-col items-center justify-center gap-2 bg-slate-50 hover:bg-slate-100 dark:hover:bg-gray-800"
                >
                  <svg className="w-12 h-12 text-slate-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                  </svg>
                  <p className="text-sm font-semibold text-slate-600 dark:text-gray-300">Foto {photos.length + 1}</p>
                </button>
              )}
            </div>
            <div className="flex gap-3">
              {photos.length < maxSlots ? (
                <>
                  <button
                    onClick={() => setShowCamera(true)}
                    className="flex-1 px-4 py-2 rounded-lg bg-dusty-pink hover:bg-rose-500 text-white font-semibold transition-colors"
                  >
                    Lanjut Foto ({photos.length}/{maxSlots})
                  </button>
                  <button
                    onClick={() => prevStep()}
                    className="px-4 py-2 rounded-lg border border-slate-300 hover:border-slate-400 text-charcoal dark:text-gray-100 font-semibold transition-colors"
                  >
                    Kembali
                  </button>
                </>
              ) : (
                <button
                  onClick={() => nextStep()}
                  className="flex-1 px-4 py-2 rounded-lg bg-charcoal hover:bg-slate-800 text-white font-semibold transition-colors"
                >
                  Lanjut ke Edit →
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <button
              onClick={() => setShowCamera(true)}
              className="w-full py-12 rounded-lg border-2 border-dashed border-slate-300 hover:border-dusty-pink transition-colors flex flex-col items-center justify-center gap-3 bg-slate-50 hover:bg-slate-100 dark:hover:bg-gray-800"
            >
              <svg className="w-16 h-16 text-slate-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <div className="text-center">
                <p className="text-lg font-semibold text-charcoal dark:text-gray-100">Buka Kamera</p>
                <p className="text-sm text-slate-600 dark:text-gray-300">Klik untuk memulai foto 1 dari {maxSlots}</p>
              </div>
            </button>
            <button
              onClick={() => prevStep()}
              className="w-full px-4 py-2 rounded-lg border border-slate-300 hover:border-slate-400 text-charcoal dark:text-gray-100 font-semibold transition-colors"
            >
              Kembali
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
