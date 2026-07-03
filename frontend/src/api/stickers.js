import client from './client'

export const getStickerPacks = (params) => client.get('/admin/sticker-packs', { params })
export const getStickerPack = (id) => client.get(`/admin/sticker-packs/${id}`)
export const createStickerPack = (data) => client.post('/admin/sticker-packs', data)
export const updateStickerPack = (id, data) => client.put(`/admin/sticker-packs/${id}`, data)
export const deleteStickerPack = (id) => client.delete(`/admin/sticker-packs/${id}`)

export const addSticker = (packId, data) => client.post(`/admin/sticker-packs/${packId}/stickers`, data)
export const updateSticker = (packId, stickerId, data) =>
  client.put(`/admin/sticker-packs/${packId}/stickers/${stickerId}`, data)
export const deleteSticker = (packId, stickerId) =>
  client.delete(`/admin/sticker-packs/${packId}/stickers/${stickerId}`)

export const getPublicStickerPacks = (params) => client.get('/booth/sticker-packs', { params })
