import React from 'react'
import AuthRoutesProvider from '@/provider/UnProtectedRouteProvider'

function AuthLayout({children}: {children: React.ReactNode}) {
  return (
    <div className='w-full min-h-screen flex flex-col bg-white'>
      <AuthRoutesProvider>
        {children}
      </AuthRoutesProvider>
    </div>
  )
}

export default AuthLayout