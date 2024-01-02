import { createContext, useContext } from 'react'

export interface IDeviceData {
  isMobile: boolean
  isPhone: boolean
  isTablet: boolean
  isDesktop: boolean
  viewportWidth: number
}

export const deviceContextInitialValue: IDeviceData = {
  isMobile: true,
  isPhone: true,
  isTablet: false,
  isDesktop: false,
  viewportWidth: 0,
}

export const DeviceContext = createContext<IDeviceData>(deviceContextInitialValue)

export const useDeviceDetection = () => useContext(DeviceContext)
