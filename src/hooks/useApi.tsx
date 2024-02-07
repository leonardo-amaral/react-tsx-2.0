import axios from 'axios'

export const useApi = () => {
  const api = axios.create({
    baseURL: 'http://192.168.100.101:3000/',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('@fbc:token')}`
    }
  })

  api.interceptors.response.use(
    response => response,
    error => {
      if (error.response.status === 404) {
        console.log('404')
      }
      return Promise.reject(error)
    }
  )

  return { api }
}
