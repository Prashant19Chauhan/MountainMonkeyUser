"use client"

import React from 'react'
import { tabs } from './navigation-data'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import HeroSearch from './heroSearch'

function HeroSection() {
  const currentRoute = usePathname();
  const activeTab = tabs.find(t => t.id === currentRoute?.split("/")?.[1]) || tabs[0];
  const routeLevel = currentRoute?.split("/")?.length;

  return (
    <div>
      <div className=''>
        {routeLevel === 2 && (
          <div>
            {/* --- Hero Section --- */}
            <section className="w-full pt-10 px-4 relative">
              <div className="max-w-7xl mx-auto pt-20 relative">
                <div className="bg-white/70 backdrop-blur-xl rounded-[40px] shadow-2xl overflow-hidden border border-white/40 relative">

                  {/* --- 1. Top Navigation Tabs --- */}
                  <div className="flex flex-wrap justify-center border-b border-gray-100 bg-white">
                    {tabs.map((tab) => {
                      const Icon = tab.icon;
                      const isActive = activeTab.id === tab.id;
                      const href = tab.id === '/' ? '/' : `/${tab.id}`;
                      return (
                        <Link href={href} key={tab.id}>
                          <button
                            className={`flex flex-col items-center gap-1 px-8 py-4 transition-all relative ${isActive ? 'text-rose-500 font-bold' : 'text-slate-500'
                              }`}
                          >
                            <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                            <span className="text-xs uppercase tracking-wider">{tab.label}</span>
                            {isActive && <div className="absolute bottom-0 left-0 right-0 h-1 bg-rose-500" />}
                          </button>
                        </Link>
                      );
                    })}
                  </div>
                  <HeroSearch />
                </div>
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  )
}

export default HeroSection