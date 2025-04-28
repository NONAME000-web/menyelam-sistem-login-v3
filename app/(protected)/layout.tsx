import React, { ReactNode } from 'react'
import { SessionProvider } from 'next-auth/react'

const Layout = ({children}: {children: ReactNode}) => {
  return (
    <SessionProvider>
        <div>{children}</div>
    </SessionProvider>
  )
}

export default Layout