import cntl from 'cntl'
import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { Button } from './common/Button'
import { InputField } from './common/InputField'
import { useFormik, type FormikHelpers } from 'formik'
import { emailRegex, passwordRegex } from '../utils/constants'
import { getErrorMessage } from '../utils/error-message-helper'
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
    w-full bg-signup-gradient border border-green 
    focus:outline-none focus:border-green-900
    text-lg my-4
  `,
}

interface IMainSignupFormValues {
  readonly email: string
  readonly name: string
  readonly password: string
  readonly passwordConfirmation: string
}

export const SignupForm: FC = () => {
  const navigate = useNavigate()
  const [serverError, setServerError] = useState<string>()
  const {
    exec: signUp,
    errors: signUpError,
    data: signUpData,
    status: signUpStatus,
  } = useAxios({
    url: '/user/signup',
    method: Method.Post,
  })

  const initialValues: IMainSignupFormValues = useMemo(
    () => ({
      email: '',
      name: '',
      password: '',
      passwordConfirmation: '',
    }),
    [],
  )

  const validationSchema = useMemo(
    () =>
      Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().required('Email is required').matches(emailRegex, 'Invalid email format'),
        password: Yup.string()
          .required('Password is required')
          .min(6, 'Password must be at least 8 characters')
          .matches(passwordRegex, `Invalid password structure`),
        passwordConfirmation: Yup.string()
          .required('Password Confirmation is required')
          .oneOf([Yup.ref('password'), ''], 'Passwords do not match'),
      }),
    [],
  )

  const onSubmit = useCallback(
    async (values: IMainSignupFormValues, { setSubmitting }: FormikHelpers<IMainSignupFormValues>) => {
      setSubmitting(true)

      await signUp({
        email: values.email,
        password: values.password,
        name: values.name,
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

  const handleSignin = useCallback(() => {
    navigate('/')
  }, [])

  useEffect(() => {
    const token = curretUserToken()
    if (token) {
      navigate('/')
    } else if (signUpStatus === Status.Success && signUpData) {
      setUserToken(signUpData.access_token)
      navigate('/')
    } else if (signUpStatus === Status.Failed && signUpError) {
      setServerError(signUpError)
    }
  }, [signUpError, signUpData, signUpStatus])

  return (
    <div>
      <div className={classes.header}>
        <Logo />
        <div className={classes.headerCtaContainer}>
          <p className={classes.headerCtaLabel}>Already have an account?</p>
          <Button className={classes.headerCta} onClick={handleSignin}>
            Sign in
          </Button>
        </div>
      </div>

      <div className={classes.formContainer}>
        <h1 className={classes.formTitle}>Start your journey</h1>
        <InputField
          placeholder={'Your Email'}
          name="email"
          onChange={handleChange}
          onBlur={handleBlur}
          autoComplete="email"
          value={values.email}
          clearable
          type="email"
          error={getErrorMessage<IMainSignupFormValues>('email', errors, touched)}
        />
        <InputField
          placeholder={'Your Name'}
          name="name"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.name}
          clearable
          type="text"
          error={getErrorMessage<IMainSignupFormValues>('name', errors, touched)}
        />
        <InputField
          placeholder={'Your Password'}
          name="password"
          onChange={handleChange}
          onBlur={handleBlur}
          error={getErrorMessage<IMainSignupFormValues>('password', errors, touched)}
          value={values.password}
          type="password"
          initiatePasswordHint
        />
        <InputField
          placeholder={'Confirm Your Password'}
          name="passwordConfirmation"
          onChange={handleChange}
          onBlur={handleBlur}
          error={getErrorMessage<IMainSignupFormValues>('passwordConfirmation', errors, touched)}
          value={values.passwordConfirmation}
          type="password"
        />

        <Button
          className={classes.cta}
          type="submit"
          isLoading={isSubmitting}
          onClick={(e) => handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>)}
        >
          Sign up
        </Button>
        <FieldError>{serverError}</FieldError>
      </div>
    </div>
  )
}
