import cntl from 'cntl'
import { FC, ReactNode } from 'react'

const classes = {
  passwordHintCheck: cntl`
    flex pb-1 items-center
  `,
  icon: (check?: boolean) => cntl`
    ${check ? 'w-3.5 h-3.5' : 'w-3 h-3'} mr-1
  `,
}

interface IPasswordHintTextProps {
  readonly checkDeterminer: boolean
  readonly children?: ReactNode
}

export const PasswordHintText: FC<IPasswordHintTextProps> = ({ checkDeterminer, children }) => {
  return (
    <li className={classes.passwordHintCheck}>
      {checkDeterminer ? (
        <img src="check.svg" className={classes.icon(true)} />
      ) : (
        <img src="cross.svg" className={classes.icon()} />
      )}
      {children}
    </li>
  )
}
