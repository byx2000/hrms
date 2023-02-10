import axios from 'axios'

/**
 * 封装axios网络请求
 */

export default function request(config) {
  const instance = axios.create({
    baseURL: 'http://localhost:9999',
    timeout: 10000,
    withCredentials: true
  })
  
  instance.interceptors.response.use(res => {
    return res.data
  })

  return instance(config)
}