import cntl from 'cntl'
import { FC, ReactNode } from 'react'

const classes = {
  container: cntl`
    flex h-screen bg-white
  `,
  content: cntl`
    flex flex-col w-full md:w-3/5 p-4
  `,
  certified: cntl`
    absolute bottom-4 right-4 text-white
  `,
  background: (className?: string): string => cntl`
    hidden md:block w-2/5 shadow-2xl
    ${className ?? ''}
  `,
}

interface IAuthLayoutProps {
  children: ReactNode
  backgroundClassName?: string
}

export const AuthLayout: FC<IAuthLayoutProps> = ({ children, backgroundClassName }) => {
  return (
    <div className={classes.container}>
      <div className={classes.content}>{children}</div>
      <div className={classes.background(backgroundClassName)}>
        <p className={classes.certified}>
          <small>
            &copy;
            {new Date().getFullYear()}
          </small>
        </p>
      </div>
    </div>
  )
}
