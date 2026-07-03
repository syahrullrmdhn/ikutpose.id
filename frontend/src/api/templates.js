import client from './client'

export const getTemplates = (params) => client.get('/admin/templates', { params })
export const getTemplate = (id) => client.get(`/admin/templates/${id}`)
export const createTemplate = (data) => client.post('/admin/templates', data)
export const updateTemplate = (id, data) => client.put(`/admin/templates/${id}`, data)
export const deleteTemplate = (id) => client.delete(`/admin/templates/${id}`)
export const duplicateTemplate = (id) => client.post(`/admin/templates/${id}/duplicate`)
export const reorderTemplates = (data) => client.put('/admin/templates/reorder', data)

export const getPublicTemplates = (params) => client.get('/booth/templates', { params })
