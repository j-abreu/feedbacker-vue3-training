import axios from 'axios'
import AuthService from './auth'
import UserServices from './users'
import FeedbackServices from './feedbacks'
import router from '../router'
import { setGlobalLoading } from '../store/global'

const API_ENVS = {
  production: 'https://backend-vue3-training-nine.vercel.app/',
  development: 'http://localhost:3000',
  local: 'http://localhost:3000'
}

const httpClient = axios.create({
  baseURL: API_ENVS[process.env.NODE_ENV] ?? API_ENVS.local
})

httpClient.interceptors.request.use(config => {
  setGlobalLoading(true)
  const token = window.localStorage.getItem('token')

  if (token) {
    config.headers.common.Authorization = `Bearer ${token}`
    config.timeout = 5000
  }

  return config
})

httpClient.interceptors.response.use((response) => {
  setGlobalLoading(false)
  return response
}, (error) => {
  const canThrowAnError = error.request.status === 0 ||
    error.request.status === 500

  if (canThrowAnError) {
    setGlobalLoading(false)
    throw new Error(error.message)
  }

  if (error.response.status === 401) {
    router.push({ name: 'Home' })
  }

  setGlobalLoading(false)
  return error
})

export default {
  auth: AuthService(httpClient),
  users: UserServices(httpClient),
  feedbacks: FeedbackServices(httpClient)
}
