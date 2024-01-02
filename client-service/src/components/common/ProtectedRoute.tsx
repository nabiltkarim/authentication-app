import { FC, ReactElement } from 'react'
import { Navigate } from 'react-router-dom'
import { curretUserToken } from '../../utils/auth-helper'

interface IProtectedRouteProps {
  children: ReactElement
}

export const ProtectedRoute: FC<IProtectedRouteProps> = ({ children }) => {
  const token = curretUserToken()

  return token ? children : <Navigate to="/signin" />
}
