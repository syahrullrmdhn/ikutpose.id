import client from './client'

export const getEvents = (params) => client.get('/admin/events', { params })
export const getEvent = (id) => client.get(`/admin/events/${id}`)
export const createEvent = (data) => client.post('/admin/events', data)
export const updateEvent = (id, data) => client.put(`/admin/events/${id}`, data)
export const deleteEvent = (id) => client.delete(`/admin/events/${id}`)
export const updateEventStatus = (id, status) => client.put(`/admin/events/${id}/status`, { status })
export const getEventPhotos = (id, params) => client.get(`/admin/events/${id}/photos`, { params })
export const getEventStats = (id) => client.get(`/admin/events/${id}/stats`)
export const exportEvent = (id) => client.post(`/admin/events/${id}/export`, {}, { responseType: 'blob' })

export const getPublicEvent = (slug) => client.get(`/events/${slug}`)
export const getEventBooth = (slug) => client.get(`/events/${slug}/booth`)
export const getEventGallery = (slug, params) => client.get(`/events/${slug}/gallery`, { params })
