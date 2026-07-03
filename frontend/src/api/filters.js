import client from './client'

export const getFilters = (params) => client.get('/admin/filters', { params })
export const getFilter = (id) => client.get(`/admin/filters/${id}`)
export const createFilter = (data) => client.post('/admin/filters', data)
export const updateFilter = (id, data) => client.put(`/admin/filters/${id}`, data)
export const deleteFilter = (id) => client.delete(`/admin/filters/${id}`)

export const getPublicFilters = (params) => client.get('/booth/filters', { params })
