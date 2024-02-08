import axios from 'axios'

export enum AdrressProps {
  GATEWAY = 'http://192.168.100.101:3000/',
  TEMPLATE = 'http://localhost:2424/'
}

export const useApi = (address: string) => {
  const api = axios.create({
    baseURL: address,
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
