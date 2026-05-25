import React from 'react'
import AuthRoutesProvider from '@/provider/UnProtectedRouteProvider'

function AuthLayout({children}: {children: React.ReactNode}) {
  return (
    <div className='flex items-center justify-center h-screen'>
      <AuthRoutesProvider>
        {children}
      </AuthRoutesProvider>
    </div>
  )
}

export default AuthLayout