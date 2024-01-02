import cntl from 'cntl'
import { FC, ReactNode } from 'react'

const classes = {
  fieldError: (className?: string): string => cntl`
    text-xs text-red-500 mt-1 pl-3 scroll-mt-48 bold
    ${className}
  `,
}

interface IFieldErrorProps {
  readonly children?: ReactNode
  readonly className?: string
  readonly id?: string
}

export const FieldError: FC<IFieldErrorProps> = ({ children, className, id }) => {
  return children ? (
    <div id={id} className={classes.fieldError(className)}>
      {children}
    </div>
  ) : null
}
