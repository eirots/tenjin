import type { ReactNode } from 'react'

type EmptyOutputProps = {
  children: ReactNode
}

export function EmptyOutput({ children }: EmptyOutputProps) {
  return <div className="empty-output">{children}</div>
}
