'use client';

import React, { useMemo, useState, useEffect } from 'react';
import { Plane, User, LogOut, Sparkles, ChevronDown } from 'lucide-react';
import { tabs } from './navigation-data';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAppSelector, useAppDispatch } from '@/store/store';
import { logout } from '@/store/userSlice';
import { useTheme } from '@/components/theme/ThemeProvider';
import { useLogout } from '@/hooks/useAuth';

function Header() {
  const currentRoute = usePathname();
  const dispatch = useAppDispatch();
  
  const [mounted, setMounted] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  
  const { handleLogout, isLogoutPending } = useLogout();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);
  
  // React-Redux authentication selectors
  const { user, isAuthenticated } = useAppSelector((state) => state.user);
  
  // Theme selectors
  const { moods, activeMood, changeMood } = useTheme();

  const routeSegments = useMemo(() => {
    return currentRoute
      ?.split("/")
      .filter(Boolean);
  }, [currentRoute]);

  return (
    <div className="w-full h-fit fixed top-0 z-50 bg-white/15 backdrop-blur-[10px] border-b border-slate-100 shadow-xs p-1">
      <header className="px-10 py-3 flex items-center justify-between max-w-[1600px] mx-auto relative font-sans">

        {/* Left Side: Brand & Logo */}
        <div className="flex items-center gap-6 min-w-[300px]">
          <Link href="/" className="flex items-center gap-2.5 text-orange-500 font-black text-2xl tracking-tighter shrink-0 cursor-pointer no-underline">
            <div className="bg-orange-500 text-white p-1.5 rounded-xl shadow-lg shadow-orange-200">
              <Plane className="rotate-45" fill="currentColor" size={20} />
            </div>
            <span className="text-slate-950 font-black tracking-tight">Mountain Monkey</span>
          </Link>
        </div>

        {/* Center: Constant Navigation Tabs */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center pointer-events-auto">
          <div className="flex items-center gap-1 bg-slate-100/80 p-1 rounded-2xl">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = tab.id === '/' ? currentRoute === '/' : routeSegments?.[0] === tab.id;
              const href = tab.id === '/' ? '/' : `/${tab.id}`;
              return (
                <Link href={href} key={tab.id} className="no-underline">
                  <button
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all cursor-pointer border-0 ${
                      isActive
                        ? 'bg-white text-rose-500 shadow-xs font-bold'
                        : 'text-slate-500 hover:text-slate-900 bg-transparent'
                    }`}
                  >
                    <Icon size={16} />
                    <span className="text-[10px] uppercase font-black tracking-wider whitespace-nowrap">{tab.label}</span>
                  </button>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Right Side: Mood (Theme) Switcher & Authentication dropdown */}
        <div className="flex items-center justify-end gap-4 min-w-[300px]">
          
          {/* Himalayan Dynamic Theme Switcher */}
          <div className="relative group">
            <button className="flex items-center gap-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 px-3 py-2 rounded-2xl transition-all cursor-pointer border border-slate-200/50 shadow-2xs">
              <Sparkles size={14} className="text-orange-500 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-wider hidden md:inline">
                {mounted && activeMood ? activeMood.label : 'Classic Mountain'}
              </span>
              <ChevronDown size={12} className="text-slate-400" />
            </button>
            
            {/* Custom Theme Dropdown menu */}
            <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-slate-100 rounded-2xl shadow-xl py-2 hidden group-hover:block transition-all z-50">
              <div className="px-4 py-2 border-b border-slate-50">
                <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">Himalayan Moods</p>
              </div>
              <div className="max-h-60 overflow-y-auto py-1">
                {moods.map((mood) => {
                  const isSelected = activeMood?.name === mood.name;
                  return (
                    <button
                      key={mood.name}
                      onClick={() => changeMood(mood.name)}
                      className={`w-full text-left px-4 py-2 text-xs font-bold transition-all flex items-center justify-between cursor-pointer border-0 ${
                        isSelected 
                          ? 'text-orange-500 bg-orange-50/50' 
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 bg-transparent'
                      }`}
                    >
                      <span>{mood.label}</span>
                      <div 
                        className="w-3.5 h-3.5 rounded-full border border-slate-200 shadow-2xs" 
                        style={{ backgroundColor: mood.bgColor }} 
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Authentication Action controls */}
          {mounted && isAuthenticated && user ? (
            <div className="relative group">
              <button className="flex items-center gap-2 bg-slate-50 hover:bg-slate-100 px-3.5 py-2 rounded-2xl transition-all cursor-pointer border border-slate-200/50 shadow-2xs">
                <div className="w-6 h-6 rounded-xl bg-gradient-to-br from-orange-400 to-rose-500 text-white flex items-center justify-center font-black text-xs shadow-xs">
                  {user.firstName ? user.firstName[0].toUpperCase() : 'U'}
                </div>
                <span className="text-[10px] uppercase font-black tracking-wider text-slate-800 hidden sm:inline">
                  {user.firstName || 'Explorer'}
                </span>
                <ChevronDown size={12} className="text-slate-400" />
              </button>
              
              {/* Profile dropdown actions */}
              <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-slate-100 rounded-2xl shadow-xl py-2 hidden group-hover:block transition-all z-50">
                <div className="px-4 py-2 border-b border-slate-50">
                  <p className="text-xs font-black text-slate-800 truncate">
                    {user.firstName} {user.lastName || ''}
                  </p>
                  <p className="text-[10px] text-slate-400 truncate">{user.email}</p>
                </div>
                
                <Link href="/profile" className="no-underline">
                  <button className="w-full text-left px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all flex items-center gap-2 cursor-pointer border-0 bg-transparent">
                    <User size={14} className="text-slate-400" />
                    <span>My Profile</span>
                  </button>
                </Link>
                
                <button 
                  onClick={() => setIsLogoutModalOpen(true)}
                  className="w-full text-left px-4 py-2.5 text-xs font-bold text-rose-500 hover:bg-rose-50/50 transition-all flex items-center gap-2 cursor-pointer border-0 bg-transparent border-t border-slate-50"
                >
                  <LogOut size={14} className="text-rose-400" />
                  <span>Log Out</span>
                </button>
              </div>
            </div>
          ) : (
            <Link href="/login" className="no-underline">
              <button className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-2xl font-black text-[10px] uppercase tracking-wider shadow-lg shadow-orange-200 transition-all cursor-pointer border-0">
                <span>Sign In</span>
              </button>
            </Link>
          )}

        </div>

      </header>

      {/* Logout Confirmation Modal Overlay */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/40 backdrop-blur-[4px] transition-all">
          <div className="bg-white rounded-[24px] p-8 max-w-md w-full mx-4 shadow-2xl border border-slate-100/85 flex flex-col items-center text-center space-y-6 animate-in fade-in zoom-in duration-300">
            {/* Animated Icon Ring */}
            <div className="w-16 h-16 rounded-full bg-rose-50 flex items-center justify-center text-rose-500 shadow-inner">
              <LogOut size={26} className="text-rose-500" />
            </div>
            
            {/* Modal Text Narrative */}
            <div className="space-y-2">
              <h3 className="text-base font-black text-slate-800 tracking-tight">Active Session Termination</h3>
              <p className="text-xs text-slate-400 leading-relaxed px-4">
                Are you sure you want to end your active MountainMonkey session? This will securely clear your local credentials and invalidate your database token.
              </p>
            </div>

            {/* Buttons Grid */}
            <div className="flex items-center gap-3 w-full pt-2">
              <button 
                disabled={isLogoutPending}
                onClick={() => setIsLogoutModalOpen(false)}
                className="flex-1 py-3 px-4 bg-slate-100 hover:bg-slate-200 active:scale-[0.98] text-slate-700 text-[10px] font-black uppercase tracking-wider rounded-[16px] transition-all cursor-pointer border-0 disabled:opacity-50"
              >
                Cancel
              </button>
              <button 
                disabled={isLogoutPending}
                onClick={async () => {
                  await handleLogout();
                  setIsLogoutModalOpen(false);
                }}
                className="flex-1 py-3 px-4 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 active:scale-[0.98] text-white text-[10px] font-black uppercase tracking-wider rounded-[16px] shadow-lg shadow-rose-200 transition-all cursor-pointer border-0 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isLogoutPending ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <span>Confirm Log Out</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
