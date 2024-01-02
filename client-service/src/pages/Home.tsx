import { FC, useCallback, useEffect } from 'react'
import { Logo } from '../components/common/Logo'
import cntl from 'cntl'
import { curretUserToken, logoutUser } from '../utils/auth-helper'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/common/Button'
import useAxios from '../hooks/useAxios'
import { Method } from '../types/hooks'

const classes = {
  container: cntl`
    flex h-screen bg-white flex-col w-full
  `,
  logo: cntl`
    flex pt-12 md:px-12 justify-between
  `,
  logoutCta: cntl`
    border !text-black border-gray-200 
    hover:border-gray-500
  `,
  content: cntl`
    text-2xl font-medium text-primary 
    mt-8 mb-12 text-center
  `,
}

const Home: FC = () => {
  const navigate = useNavigate()
  const { exec: getUser, data: signUpData } = useAxios({
    url: '/user',
    method: Method.Get,
  })

  useEffect(() => {
    const token = curretUserToken()
    if (token) {
      getUser()
    }
  }, [])

  const handleLogout = useCallback(async () => {
    await logoutUser()
    navigate('/signin')
  }, [])

  return (
    <div className={classes.container}>
      <div className={classes.logo}>
        <Logo />
        <Button className={classes.logoutCta} onClick={handleLogout}>
          Logout
        </Button>
      </div>

      <div className={classes.content}>Welcome to the Application, {signUpData?.name}!</div>
    </div>
  )
}

export default Home
