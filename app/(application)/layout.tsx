import React, { Suspense } from 'react'
import Header from '../../components/mainComponents/header'
import Monkey from '../../components/mainComponents/monkey'
import HeroSection from '@/components/mainComponents/heroSection'
import Footer from '../../components/mainComponents/footer'

function ApplicationLayout({
  children
}: {
  children: React.ReactNode
}) {

  return (
    <>
      <div className='w-full min-h-screen flex'>

        <div className='flex flex-col w-full gap-0'>
          <Suspense fallback={<div className="h-16 bg-white border-b border-slate-100" />}>
            <Header />
          </Suspense>
          <div className='flex-1 overflow-y-auto min-h-0'>
            <Suspense fallback={<div className="h-48 bg-slate-50 border-b border-gray-100 animate-pulse" />}>
              <HeroSection />
            </Suspense>
            {children}
            <Footer />
          </div>
        </div>
      </div>

      {/* Floating AI Monkey Assistant Button */}
      <div className='fixed bottom-10 left-10 z-60'>
        <Monkey />
      </div>
    </>
  )
}

export default ApplicationLayout