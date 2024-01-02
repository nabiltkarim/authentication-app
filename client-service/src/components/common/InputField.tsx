import cntl from 'cntl'
import {
  ChangeEvent,
  CSSProperties,
  FC,
  HTMLInputTypeAttribute,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'

import { IFormFieldProps } from '../../types/components'
import { FieldError } from './FieldError'
import { FieldHint } from './FieldHint'
import { PasswordHintText } from './PasswordHintText'

const TYPE_PASSWORD = 'password'
const TYPE_TEXT = 'text'

const classes = {
  wrapper: (className?: string): string => cntl`
    mb-4
    ${className ?? ''}
  `,
  inputWrapper: cntl`
    relative flex items-center
  `,
  inputContainer: cntl`
    relative w-full
  `,
  suffix: cntl`
    ml-2 text-gray-700
  `,
  input: (hasError?: boolean, isPassword?: boolean, disabled?: boolean): string => cntl`
    border border-gray-300 text-gray-900 text-sm rounded-lg
    focus:ring-gray-400
    block w-full p-2.5 outline-0
    ${isPassword ? 'pr-11' : ''}
    ${hasError ? '!border-primary-red' : 'focus:border-blue-500'}
    ${disabled ? 'bg-gray-100' : ''}
  `,
  postfixIconWrapper: cntl`
    absolute right-0 top-0 flex items-center w-10 h-full p-3
    cursor-pointer z-10 opacity-60
    hover:opacity-80
`,
  postfixIcon: cntl`
    text-white w-full h-full
`,
  diagonal: cntl`
    w-full h-px bg-gray-800 absolute z-10
  `,
  passwordHintTitle: cntl`
    text-gray-600 font-bold pb-2
  `,
}

const diagonalStyles: CSSProperties = {
  top: 21,
  left: 11,
  width: 18,
  transform: 'rotate(45deg)',
}

type InputFieldValue = string

interface IInputField extends IFormFieldProps<InputFieldValue> {
  readonly type?: HTMLInputTypeAttribute
  readonly autoComplete?: string
  readonly size?: number
  readonly disabled?: boolean
  readonly clearable?: boolean
  readonly initiatePasswordHint?: boolean
}

export const InputField: FC<IInputField> = ({
  error,
  className,
  name: fieldName,
  onClick,
  clearable,
  id,
  hint,
  size,
  initiatePasswordHint,
  ...props
}) => {
  const isPassword = useMemo(() => props.type === TYPE_PASSWORD, [])
  const [type, setType] = useState<HTMLInputTypeAttribute>(props.type || (TYPE_TEXT as HTMLInputTypeAttribute))
  const [value, setValue] = useState('')
  const [passwordRequirements, setPasswordRequirements] = useState({
    minChar: false,
    number: false,
    letter: false,
    specialChar: false,
  })
  const [showPasswordHint, setShowPasswordHint] = useState<boolean>(false)

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newValue: InputFieldValue | undefined = e.target.value

      setValue(newValue)

      props.onChange?.(newValue, fieldName, e)
    },
    [props.onChange, fieldName, isPassword],
  )

  const onClear = useCallback(() => {
    setValue('')
    props.onChange?.('', fieldName)
  }, [props.onChange, fieldName])

  const onFocus = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      if (isPassword) {
        setShowPasswordHint(true)
      }
      props.onFocus && props.onFocus(e)
    },
    [props.onFocus, type],
  )

  const onBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      if (isPassword) {
        setShowPasswordHint(false)
      }
      props.onBlur && props.onBlur(e)
    },
    [props.onBlur, type],
  )

  const toggleType = useCallback(() => {
    setType(type === TYPE_PASSWORD ? TYPE_TEXT : TYPE_PASSWORD)
  }, [type])

  const passwordHint = useMemo(
    () =>
      isPassword && initiatePasswordHint && showPasswordHint ? (
        <div>
          <p className={classes.passwordHintTitle}>Password requirements:</p>
          <ul>
            <PasswordHintText checkDeterminer={passwordRequirements.minChar}>At least 8 characters</PasswordHintText>
            <PasswordHintText checkDeterminer={passwordRequirements.number}>At least 1 number</PasswordHintText>
            <PasswordHintText checkDeterminer={passwordRequirements.letter}>At least 1 letter</PasswordHintText>
            <PasswordHintText checkDeterminer={passwordRequirements.specialChar}>
              At least 1 special character
            </PasswordHintText>
          </ul>
        </div>
      ) : null,
    [isPassword, passwordRequirements, showPasswordHint, initiatePasswordHint],
  )

  useEffect(() => {
    if (isPassword) {
      setPasswordRequirements({
        minChar: value.length >= 10,
        number: /\d/.test(value),
        letter: /[a-zA-Z]/.test(value),
        specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(value),
      })
    }
  }, [value, isPassword])

  return (
    <div className={classes.wrapper(className)} id={id}>
      <div className={classes.inputWrapper}>
        <div className={classes.inputContainer}>
          <input
            name={fieldName}
            size={size}
            className={classes.input(!!error, isPassword || clearable, props.disabled)}
            {...props}
            onChange={onChange}
            type={type}
            value={value}
            disabled={props.disabled}
            onFocus={onFocus}
            onBlur={onBlur}
            onClick={onClick}
          />
          {isPassword && value && (
            <div onClick={toggleType} className={classes.postfixIconWrapper}>
              {type === TYPE_TEXT && <span style={diagonalStyles} className={classes.diagonal} />}
              <img src="eye.svg" className={classes.postfixIcon} />
            </div>
          )}
          {clearable && value && (
            <div onClick={onClear} className={classes.postfixIconWrapper}>
              <img src="close.svg" className={classes.postfixIcon} />
            </div>
          )}
        </div>
      </div>
      <FieldError>{error}</FieldError>
      <FieldHint>{isPassword ? passwordHint : hint}</FieldHint>
    </div>
  )
}
