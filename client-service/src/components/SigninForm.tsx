import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { InputField } from './common/InputField'
import { Button } from './common/Button'
import cntl from 'cntl'
import type { FormikHelpers } from 'formik'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { emailRegex, passwordRegex } from '../utils/constants'
import { getErrorMessage } from '../utils/error-message-helper'
import { useNavigate } from 'react-router-dom'
import { Logo } from './common/Logo'
import { curretUserToken, setUserToken } from '../utils/auth-helper'
import useAxios from '../hooks/useAxios'
import { Method, Status } from '../types/hooks'
import { FieldError } from './common/FieldError'

const classes = {
  header: cntl`
    flex justify-between pt-12 
    md:justify-between md:px-12
  `,
  headerCtaContainer: cntl`
    flex flex-col md:flex-row items-center
  `,
  headerCtaLabel: cntl`
    text-gray-500 text-xs mb-2 md:text-sm md:mr-4
  `,
  headerCta: cntl`
    border !text-black border-gray-200 
    hover:border-gray-500
  `,
  formContainer: cntl`
    flex flex-col justify-center 
    mt-12 mx-auto mb-0 max-w-sm
  `,
  formTitle: cntl`
    text-2xl font-medium text-primary 
    mt-4 mb-12 text-center
  `,
  cta: cntl`
    w-full bg-signin-gradient border border-blue 
    focus:outline-none focus:border-indigo-500
    text-lg mt-4
  `,
}

interface IMainSigninFormValues {
  readonly email: string
  readonly password: string
}

export const SigninForm: FC = () => {
  const navigate = useNavigate()
  const [serverError, setServerError] = useState<string>()
  const {
    exec: signIn,
    errors: signInError,
    data: signInData,
    status: signInStatus,
  } = useAxios({
    url: '/auth/signin',
    method: Method.Post,
  })

  const initialValues: IMainSigninFormValues = useMemo(
    () => ({
      email: '',
      password: '',
    }),
    [],
  )

  const validationSchema = useMemo(
    () =>
      Yup.object().shape({
        email: Yup.string().required('Email is required').matches(emailRegex, 'Invalid email format'),
        password: Yup.string()
          .min(6, 'Password must be at least 8 characters')
          .matches(passwordRegex, `Invalid password structure`)
          .required('Password is required'),
      }),
    [],
  )

  const onSubmit = useCallback(
    async (values: IMainSigninFormValues, { setSubmitting }: FormikHelpers<IMainSigninFormValues>) => {
      setSubmitting(true)

      await signIn({
        email: values.email,
        password: values.password,
      })

      setSubmitting(false)
    },
    [],
  )

  const { values, errors, setFieldValue, handleSubmit, isSubmitting, touched, handleBlur } = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  })

  const handleChange = useCallback(
    (fieldValue?: string, fieldName?: string) => {
      if (fieldName) {
        setFieldValue(fieldName, fieldValue)
        setServerError(undefined)
      }
    },
    [setFieldValue],
  )

  const handleSignup = useCallback(() => {
    navigate('/signup')
  }, [])

  useEffect(() => {
    const token = curretUserToken()
    if (token) {
      navigate('/')
    } else if (signInStatus === Status.Success && signInData) {
      setUserToken(signInData.access_token)
      navigate('/')
    } else if (signInStatus === Status.Failed && signInError) {
      setServerError(signInError)
    }
  }, [signInError, signInData, signInStatus])

  return (
    <div>
      <div className={classes.header}>
        <Logo />
        <div className={classes.headerCtaContainer}>
          <p className={classes.headerCtaLabel}>Don't have an account?</p>
          <Button className={classes.headerCta} onClick={handleSignup}>
            Sign up
          </Button>
        </div>
      </div>
      <div className={classes.formContainer}>
        <h1 className={classes.formTitle}>Welcome back</h1>
        <InputField
          placeholder={'Your Email'}
          name="email"
          onChange={handleChange}
          onBlur={handleBlur}
          autoComplete="email"
          value={values.email}
          clearable
          type="email"
          error={getErrorMessage<IMainSigninFormValues>('email', errors, touched)}
        />
        <InputField
          placeholder={'Your Password'}
          name="password"
          onChange={handleChange}
          onBlur={handleBlur}
          error={getErrorMessage<IMainSigninFormValues>('password', errors, touched)}
          value={values.password}
          type="password"
        />

        <Button
          className={classes.cta}
          type="submit"
          isLoading={isSubmitting}
          onClick={(e) => handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>)}
        >
          Sign in
        </Button>
        <FieldError>{serverError}</FieldError>
      </div>
    </div>
  )
}
