import axios from 'axios'

// Buat Axios instance dengan base URL dari .env
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://6a4389786dba791499aae705.mockapi.io',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
})


// INTERCEPTOR REQUEST - jalan sebelum request dikirim
api.interceptors.request.use(
  (config) => {
    console.log(`[API REQUEST] ${config.method.toUpperCase()} ${config.url}`)
    return config
  },
  (error) => {
    console.error('[API REQUEST ERROR]', error)
    return Promise.reject(error)
  }
)

// INTERCEPTOR RESPONSE - jalan setelah dapat response
api.interceptors.response.use(
  (response) => {
    console.log(`[API RESPONSE] ${response.status} ${response.config.url}`)
    return response
  },
  (error) => {
    console.error('[API RESPONSE ERROR]', error.message)
    return Promise.reject(error)
  }
)

export default api