import { useState } from 'react'
import { curretUserToken } from '../utils/auth-helper'
import authServiceAPI from '../utils/auth-service-api'
import { AxiosProps, Status } from '../types/hooks'

const useAxios = ({ url, method }: AxiosProps) => {
  const [data, setData] = useState<any>(null)
  const [errors, setErrors] = useState(null)
  const [status, setStatus] = useState<Status>(Status.Initial)

  const exec = (body: any = null, query?: string) => {
    const token = curretUserToken()
    setStatus(Status.Pending)

    authServiceAPI(token?.toString())
      [method](`${process.env.REACT_APP_AUTHENTICATION_API + url}?${query ? `${query}` : ''}`, body)
      .then((res: any) => {
        setErrors(null)
        setData(res.data)
        setStatus(Status.Success)
      })
      .catch((err: any) => {
        setStatus(Status.Failed)
        setErrors(err.message.includes('401') ? 'User not found and unauthorized' : err?.response?.data?.message)
      })
  }

  return {
    data,
    status,
    errors,
    exec,
  }
}

export default useAxios
