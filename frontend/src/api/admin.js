import client from './client'

export const getDashboard = () => client.get('/admin/dashboard')
export const getSettings = () => client.get('/admin/settings')
export const updateSettings = (data) => client.put('/admin/settings', data)

export const getUsers = (params) => client.get('/admin/users', { params })
export const getUser = (id) => client.get(`/admin/users/${id}`)
export const createUser = (data) => client.post('/admin/users', data)
export const updateUser = (id, data) => client.put(`/admin/users/${id}`, data)
export const deleteUser = (id) => client.delete(`/admin/users/${id}`)
export const toggleUserActive = (id) => client.put(`/admin/users/${id}/toggle-active`)
