import { ChangeEvent, FocusEvent, ReactNode } from 'react'

export interface IFormFieldProps<T> {
  readonly id?: string
  readonly defaultValue?: T
  readonly name?: string
  readonly value?: T
  readonly disabled?: boolean
  readonly error?: string | boolean | null
  readonly hint?: ReactNode
  readonly className?: string
  readonly placeholder?: string
  readonly requiredMarker?: boolean
  readonly onChange?: (value: T | undefined, fieldName?: string, e?: ChangeEvent) => void
  readonly onBlur?: (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  readonly onFocus?: (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  readonly onClick?: () => void
}
