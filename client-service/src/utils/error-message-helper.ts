import { getIn } from 'formik'
import type { FormikErrors, FormikTouched } from 'formik/dist/types'

export const getErrorMessage = <T>(fieldName: string, errors: FormikErrors<T>, touched: FormikTouched<T>) => {
  const errorMsg = getIn(errors, fieldName)

  return errorMsg && getIn(touched, fieldName) ? errorMsg : ''
}
