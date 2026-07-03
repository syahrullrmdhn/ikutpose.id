import api from './client'

export const getPublicSettings = () => {
  return api.get('/settings')
}
