import { FC } from 'react'
import { useDeviceDetection } from '../../contexts/device-detection'

export const Logo: FC = () => {
  const { isMobile } = useDeviceDetection()

  return <img src={`${isMobile ? 'logo-mobile.svg' : 'logo.svg'}`} alt="logo-default" />
}
