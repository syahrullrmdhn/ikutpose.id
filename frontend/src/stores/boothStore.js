import { create } from 'zustand'

export const useBoothStore = create((set, get) => ({
  step: 1,
  selectedTemplate: null,
  photos: [],
  currentSlot: 0,
  appliedFilter: null,
  appliedOverlay: null,
  appliedStickers: [],
  textOverlays: [],
  sessionUuid: null,

  setStep: (step) => set({ step }),
  nextStep: () => set((s) => ({ step: Math.min(s.step + 1, 4) })),
  prevStep: () => set((s) => ({ step: Math.max(s.step - 1, 1) })),
  setTemplate: (template) => set({ selectedTemplate: template, step: 2 }),

  addPhoto: (photo) => {
    const { photos, selectedTemplate } = get()
    const newPhotos = [...photos, photo]
    const maxSlots = selectedTemplate?.photo_slots?.length || 4
    set({
      photos: newPhotos,
      currentSlot: Math.min(newPhotos.length, maxSlots - 1),
    })
  },

  retakePhoto: (index) => {
    const { photos } = get()
    const newPhotos = [...photos]
    newPhotos.splice(index, 1)
    set({ photos: newPhotos, currentSlot: index })
  },

  setFilter: (filter) => set({ appliedFilter: filter }),
  setOverlay: (overlay) => set({ appliedOverlay: overlay }),

  addSticker: (sticker) =>
    set((s) => ({ appliedStickers: [...s.appliedStickers, sticker] })),
  updateSticker: (index, data) =>
    set((s) => ({
      appliedStickers: s.appliedStickers.map((st, i) => (i === index ? { ...st, ...data } : st)),
    })),
  removeSticker: (index) =>
    set((s) => ({ appliedStickers: s.appliedStickers.filter((_, i) => i !== index) })),

  addTextOverlay: (text) =>
    set((s) => ({ textOverlays: [...s.textOverlays, text] })),
  removeTextOverlay: (index) =>
    set((s) => ({ textOverlays: s.textOverlays.filter((_, i) => i !== index) })),

  setSessionUuid: (uuid) => set({ sessionUuid: uuid }),

  reset: () =>
    set({
      step: 1,
      selectedTemplate: null,
      photos: [],
      currentSlot: 0,
      appliedFilter: null,
      appliedOverlay: null,
      appliedStickers: [],
      textOverlays: [],
      sessionUuid: null,
    }),
}))
