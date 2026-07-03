import { create } from 'zustand'

const devAdmin = {
  id: 1,
  name: 'Admin Utama',
  email: 'admin@ikutpose.com',
  role: 'admin',
  is_active: true,
}

export const useAuthStore = create((set, get) => ({
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),

  setAuth: (user, token) => {
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
    set({ user, token, isAuthenticated: true })
  },

  setUser: (user) => {
    localStorage.setItem('user', JSON.stringify(user))
    set({ user })
  },

  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    set({ user: null, token: null, isAuthenticated: false })
  },

  devLogin: () => {
    const token = 'dev-token-admin-' + Date.now()
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(devAdmin))
    set({ user: devAdmin, token, isAuthenticated: true })
  },
}))
