import { clsx } from 'clsx'
import { HTMLAttributes } from 'react'

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  narrow?: boolean
}

export default function Container({ narrow = false, className, children, ...props }: ContainerProps) {
  return (
    <div
      className={clsx(
        'mx-auto w-full px-4 xs:px-6 lg:px-8',
        narrow ? 'max-w-3xl' : 'max-w-7xl',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
