import axios from 'axios'

const token = localStorage.getItem('@fbc:token') || 'null'

export const api = axios.create({
  baseURL: 'http://192.168.100.101:3000/',
  headers: {
    Authorization: `Bearer ${token}`
  }
})
