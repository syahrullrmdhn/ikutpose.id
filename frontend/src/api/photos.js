import client from './client'

export const getPhotos = (params) => client.get('/admin/photos', { params })
export const getPhoto = (id) => client.get(`/admin/photos/${id}`)
export const deletePhoto = (id) => client.delete(`/admin/photos/${id}`)
export const bulkDeletePhotos = (ids) => client.post('/admin/photos/bulk-delete', { ids })
export const getGalleryStats = () => client.get('/admin/gallery/stats')

export const getPublicGallery = (params) => client.get('/gallery', { params })
export const getPublicPhoto = (id) => client.get(`/gallery/${id}`)

export const createSession = (data) => client.post('/booth/sessions', data)
export const capturePhoto = (uuid, data) => client.post(`/booth/sessions/${uuid}/capture`, data)
export const finalizeSession = (uuid, data) => client.put(`/booth/sessions/${uuid}/finalize`, data)
export const getSessionResult = (uuid) => client.get(`/booth/sessions/${uuid}/result`)
