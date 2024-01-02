import cntl from 'cntl'
import { CSSProperties, FC } from 'react'

const extraStyles: CSSProperties = {
  verticalAlign: '-0.125em',
  border: '0.15em solid',
  borderRightColor: 'transparent',
}

const classes = {
  spin: (className?: string): string => cntl`
    animate-spin inline-block w-4 h-4 rounded-full
    ${className ?? ''}
  `,
}

interface ISpinProps {
  readonly className?: string
}

export const Spin: FC<ISpinProps> = ({ className }) => {
  return <div className={classes.spin(className)} style={extraStyles} />
}
