import axios from 'axios'
import useSession from '@/store/session'
const service = axios.create({
  // baseURL: 'http://api.imooc-front.lgdsunday.club/api',
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 5000,
})
service.interceptors.response.use(response => {
  const { data, success, message } = response.data
  if (success) {
    return data
  } else {
    return Promise.reject(new Error(message))
  }
}, error => {
  // 处理 token 超时问题
  if (
    error.response &&
    error.response.data &&
    error.response.data.code === 401
  ) {
    // TODO: token超时
    useSession().logout()
  }
  return Promise.reject(error)
})
service.interceptors.request.use(config => {
  const session = useSession()
  const token = session.token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, error => {
  return Promise.reject(error)
})
export default service