import cntl from 'cntl'
import { ButtonHTMLAttributes, CSSProperties, FC, MouseEventHandler, ReactNode, useCallback } from 'react'

import { Spin } from './Spin'

const classes = {
  btn: (className?: string, disabled?: boolean): string => cntl`
    text-white
    text-sm
    rounded-3xl
    h-12 px-8 flex items-center justify-center
    w-fit select-none
    hover:opacity-80
    transition-opacity duration-300
    ${disabled ? 'opacity-80 cursor-not-allowed' : ''}
    ${className ?? ''}
  `,
  spin: cntl`
    mr-3
  `,
}

type IButtonProps = ButtonHTMLAttributes<HTMLElement> & {
  readonly onClick?: (e?: React.MouseEvent<HTMLElement, MouseEvent>) => void
  readonly children: ReactNode
  readonly className?: string
  readonly style?: CSSProperties
  readonly disabled?: boolean
  readonly isLoading?: boolean
}

export const Button: FC<IButtonProps> = ({ children, disabled, isLoading, ...props }) => {
  const onClick: MouseEventHandler<HTMLElement> = useCallback(
    (e) => {
      if (disabled) {
        e.preventDefault()
        e.stopPropagation()
        e.nativeEvent?.stopPropagation()
        e.nativeEvent?.stopImmediatePropagation()
        e.nativeEvent?.preventDefault()

        return
      }

      props.onClick?.(e)
    },
    [props.onClick, disabled],
  )

  return (
    <button
      {...props}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={classes.btn(props.className, disabled)}
    >
      {isLoading && <Spin className={classes.spin} />}
      {children}
    </button>
  )
}
