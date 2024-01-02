import cntl from 'cntl'
import { FC, ReactNode } from 'react'

const classes = {
  fieldHint: (className?: string): string => cntl`
    absolute right-0 md:right-auto md:mr-4 
    bg-white px-4 py-3 border rounded shadow-lg text-xs z-10
    h-fit text-gray-700
    ${className ?? ''}
  `,
}

interface IFieldHintProps {
  readonly children?: ReactNode
  readonly className?: string
}

export const FieldHint: FC<IFieldHintProps> = ({ children, className }) => {
  return children ? <div className={classes.fieldHint(className)}>{children}</div> : null
}
