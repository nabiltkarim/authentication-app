import axios, { AxiosInstance } from 'axios'

const authServiceAPI = (token?: string): AxiosInstance => {
  const APIKit = axios.create({
    timeout: 10000,
  })

  if (token) {
    APIKit.interceptors.request.use((config: any) => {
      config.headers.Authorization = `Bearer ${token}`
      return config
    })
  }

  return APIKit
}

export default authServiceAPI
