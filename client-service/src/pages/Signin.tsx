import { FC } from 'react'
import { SigninForm, AuthLayout } from '../components'

const Signin: FC = () => {
  return (
    <AuthLayout backgroundClassName={'bg-signin-gradient'}>
      <SigninForm />
    </AuthLayout>
  )
}

export default Signin
