import axios from 'axios'

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
})
export default service