import { FC } from 'react'
import { AuthLayout, SignupForm } from '../components'

const Signup: FC = () => {
  return (
    <AuthLayout backgroundClassName={'bg-signup-gradient'}>
      <SignupForm />
    </AuthLayout>
  )
}

export default Signup
