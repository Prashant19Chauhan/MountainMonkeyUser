'use client';

import React, { useMemo, useState, useEffect } from 'react';
import { Plane, User, LogOut, Sparkles, ChevronDown, Menu, X } from 'lucide-react';
import { tabs } from './navigation-data';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAppSelector, useAppDispatch } from '@/store/store';
import { logout } from '@/store/userSlice';
import { useTheme } from '@/components/theme/ThemeProvider';
import { useLogout } from '@/hooks/useAuth';
import { motion, AnimatePresence } from 'framer-motion';

function Header() {
  const currentRoute = usePathname();
  const dispatch = useAppDispatch();
  
  const [mounted, setMounted] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileMoodsOpen, setIsMobileMoodsOpen] = useState(false);
  
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
      <header className="px-4 md:px-10 py-3 flex items-center justify-between max-w-[1600px] mx-auto relative font-sans">

        {/* Left Side: Brand & Logo */}
        <div className="flex items-center gap-6 min-w-0 md:min-w-[300px]">
          <Link href="/" className="flex items-center gap-2 text-orange-500 font-black text-xl md:text-2xl tracking-tighter shrink-0 cursor-pointer no-underline">
            <div className="bg-orange-500 text-white p-1.5 rounded-xl shadow-lg shadow-orange-200">
              <Plane className="rotate-45" fill="currentColor" size={18} />
            </div>
            <span className="text-slate-950 font-black tracking-tight truncate max-w-[150px] sm:max-w-none">Mountain Monkey</span>
          </Link>
        </div>

        {/* Center: Constant Navigation Tabs (Desktop Only) */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center pointer-events-auto">
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

        {/* Right Side: Mood (Theme) Switcher & Authentication dropdown (Desktop Only) */}
        <div className="hidden md:flex items-center justify-end gap-4 min-w-[300px]">
          
          {/* Himalayan Dynamic Theme Switcher */}
          <div className="relative group">
            <button className="flex items-center gap-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 px-3 py-2 rounded-2xl transition-all cursor-pointer border border-slate-200/50 shadow-2xs">
              <Sparkles size={14} className="text-orange-500 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-wider hidden lg:inline">
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

        {/* Mobile: Hamburger Button and Simple Avatar */}
        <div className="flex md:hidden items-center gap-3">
          {mounted && isAuthenticated && user && (
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-orange-400 to-rose-500 text-white flex items-center justify-center font-black text-[10px] shadow-xs">
              {user.firstName ? user.firstName[0].toUpperCase() : 'U'}
            </div>
          )}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 text-slate-700 hover:text-orange-500 transition-colors bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200/50 cursor-pointer"
          >
            <Menu size={18} />
          </button>
        </div>

      </header>

      {/* Mobile slide-out drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-950/40 backdrop-blur-[4px] z-[100] md:hidden"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed inset-y-0 right-0 w-[280px] h-[100dvh] bg-white z-[110] md:hidden shadow-2xl flex flex-col border-l border-slate-100 font-sans"
            >
              {/* Drawer Header */}
              <div className="p-5 border-b border-slate-50 flex items-center justify-between">
                <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2 text-orange-500 font-black text-lg cursor-pointer no-underline">
                  <div className="bg-orange-500 text-white p-1 rounded-lg">
                    <Plane className="rotate-45" size={14} />
                  </div>
                  <span className="text-slate-950 font-black tracking-tight">Mountain Monkey</span>
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-50 border-0 cursor-pointer bg-transparent"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto p-5 space-y-6">
                {/* 1. Account / Auth Section (Consolidated at the very top of scroll area above the fold) */}
                {mounted && (
                  <div className="pb-5 border-b border-slate-100">
                    {isAuthenticated && user ? (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-400 to-rose-500 text-white flex items-center justify-center font-black text-xs shadow-xs">
                            {user.firstName ? user.firstName[0].toUpperCase() : 'U'}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-black text-slate-800 truncate leading-tight">
                              {user.firstName} {user.lastName || ''}
                            </p>
                            <p className="text-[9px] text-slate-400 truncate mt-0.5">{user.email}</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2">
                          <Link href="/profile" className="no-underline" onClick={() => setIsMobileMenuOpen(false)}>
                            <button className="w-full py-2.5 bg-slate-50 border border-slate-200/60 rounded-xl text-[9px] font-black uppercase tracking-wider text-slate-600 hover:bg-slate-100 cursor-pointer flex items-center justify-center gap-1.5">
                              <User size={12} /> Profile
                            </button>
                          </Link>
                          <button
                            onClick={() => {
                              setIsMobileMenuOpen(false);
                              setIsLogoutModalOpen(true);
                            }}
                            className="w-full py-2.5 bg-rose-50/50 border border-rose-100 rounded-xl text-[9px] font-black uppercase tracking-wider text-rose-500 hover:bg-rose-100/50 cursor-pointer flex items-center justify-center gap-1.5"
                          >
                            <LogOut size={12} /> Log Out
                          </button>
                        </div>
                      </div>
                    ) : (
                      <Link href="/login" className="no-underline" onClick={() => setIsMobileMenuOpen(false)}>
                        <button className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-black text-[10px] uppercase tracking-wider shadow-lg shadow-orange-100 transition-all cursor-pointer border-0">
                          <span>Sign In</span>
                        </button>
                      </Link>
                    )}
                  </div>
                )}

                {/* 2. Navigation Tabs */}
                <div className="space-y-1">
                  <p className="text-[9px] font-black uppercase tracking-wider text-slate-400 mb-3">Expeditions</p>
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = tab.id === '/' ? currentRoute === '/' : routeSegments?.[0] === tab.id;
                    const href = tab.id === '/' ? '/' : `/${tab.id}`;
                    return (
                      <Link href={href} key={tab.id} className="no-underline" onClick={() => setIsMobileMenuOpen(false)}>
                        <button
                          className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all cursor-pointer border-0 text-left ${
                            isActive
                              ? 'bg-rose-50/50 text-rose-500 font-bold'
                              : 'text-slate-600 hover:bg-slate-50 bg-transparent'
                          }`}
                        >
                          <Icon size={16} />
                          <span className="text-[10px] uppercase font-black tracking-wider">{tab.label}</span>
                        </button>
                      </Link>
                    );
                  })}
                </div>

                {/* 3. Mood Switcher */}
                <div className="space-y-1.5">
                  <p className="text-[9px] font-black uppercase tracking-wider text-slate-400 mb-3">Himalayan Moods</p>
                  <button
                    onClick={() => setIsMobileMoodsOpen(!isMobileMoodsOpen)}
                    className="w-full flex items-center justify-between bg-slate-50 hover:bg-slate-100 text-slate-700 px-4 py-2.5 rounded-xl border border-slate-200/50 cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <Sparkles size={13} className="text-orange-500" />
                      <span className="text-[10px] font-black uppercase tracking-wider">
                        {mounted && activeMood ? activeMood.label : 'Classic Mountain'}
                      </span>
                    </div>
                    <ChevronDown size={12} className={`text-slate-400 transition-transform ${isMobileMoodsOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {isMobileMoodsOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden border border-slate-100 rounded-xl divide-y divide-slate-50 mt-1"
                      >
                        {moods.map((mood) => {
                          const isSelected = activeMood?.name === mood.name;
                          return (
                            <button
                              key={mood.name}
                              onClick={() => {
                                changeMood(mood.name);
                                setIsMobileMoodsOpen(false);
                              }}
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
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

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

