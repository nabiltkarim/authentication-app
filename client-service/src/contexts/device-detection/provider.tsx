import type { FC, ReactNode } from 'react'
import { useEffect, useState } from 'react'

import type { IDeviceData } from '.'
import { DeviceContext, deviceContextInitialValue } from '.'

const TABLET_BREAKPOINT = 768
const MOBILE_BREAKPOINT = 480
const DESKTOP_BREAKPOINT = 1024

const isTablet = (width: number) => width >= TABLET_BREAKPOINT && width <= DESKTOP_BREAKPOINT
const isMobile = (width: number) => width <= TABLET_BREAKPOINT
const isPhone = (width: number) => width <= MOBILE_BREAKPOINT
const isDesktop = (width: number) => width >= DESKTOP_BREAKPOINT

interface IDeviceDetectionProviderProps {
  deviceData?: Partial<IDeviceData>
  children: ReactNode
}

export const DeviceDetectionProvider: FC<IDeviceDetectionProviderProps> = ({ children, deviceData }) => {
  const [contextValue, setContextValue] = useState<IDeviceData>({ ...deviceContextInitialValue, ...deviceData })

  useEffect(() => {
    const setDeviceContextValue = () => {
      setContextValue({
        isTablet: isTablet(window.innerWidth),
        isMobile: isMobile(window.innerWidth),
        isPhone: isPhone(window.innerWidth),
        isDesktop: isDesktop(window.innerWidth),
        viewportWidth: window.innerWidth,
      })
    }

    setDeviceContextValue()

    const handleResize = () => {
      setDeviceContextValue()
    }

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return <DeviceContext.Provider value={contextValue}>{children}</DeviceContext.Provider>
}
