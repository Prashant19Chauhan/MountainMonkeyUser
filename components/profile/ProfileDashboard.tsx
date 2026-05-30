'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  User, FileText, BookOpen, MessageSquare, Star, HelpCircle, Menu, X, LogOut,
  ChevronRight, ArrowLeft
} from 'lucide-react';
import ProfileSettings from './tabs/ProfileSettings';
import MyEnquiries from './tabs/MyEnquiries';
import MyStories from './tabs/MyStories';
import MyTestimony from './tabs/MyTestimony';
import MyReviews from './tabs/MyReviews';
import HelpSupport from './tabs/HelpSupport';
import { useAppSelector } from '@/store/store';
import { useLogout } from '@/hooks/useAuth';

const TABS = [
  { id: 'profile',   label: 'Profile & Settings', icon: User },
  { id: 'enquiries', label: 'My Enquiries',        icon: FileText },
  { id: 'stories',   label: 'Traveler Stories',    icon: BookOpen },
  { id: 'testimony', label: 'My Testimony',        icon: MessageSquare },
  { id: 'reviews',   label: 'Reviews',             icon: Star },
  { id: 'help',      label: 'Help & Support',      icon: HelpCircle },
];

const TabContent = ({ activeTab }: { activeTab: string }) => {
  switch (activeTab) {
    case 'profile':   return <ProfileSettings />;
    case 'enquiries': return <MyEnquiries />;
    case 'stories':   return <MyStories />;
    case 'testimony': return <MyTestimony />;
    case 'reviews':   return <MyReviews />;
    case 'help':      return <HelpSupport />;
    default:          return <ProfileSettings />;
  }
};

export default function ProfileDashboard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'profile');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const user = useAppSelector((state) => state.user.user);
  const { handleLogout, isLogoutPending } = useLogout();

  const activeTabData = TABS.find((t) => t.id === activeTab);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-['Inter',sans-serif]">
      {/* Mobile Header Bar */}
      <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-slate-100 shadow-xs">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-100 cursor-pointer"
          aria-label="Toggle menu"
        >
          {sidebarOpen ? <X size={18} className="text-slate-600" /> : <Menu size={18} className="text-slate-600" />}
        </button>
        <div className="flex items-center gap-2">
          {activeTabData && <activeTabData.icon size={16} className="text-orange-500" />}
          <span className="font-semibold text-sm text-slate-900">{activeTabData?.label}</span>
        </div>
        <button
          onClick={() => router.back()}
          className="p-2 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-100 cursor-pointer text-slate-600 flex items-center gap-1 text-xs font-bold uppercase tracking-wider"
          title="Go Back"
        >
          <ArrowLeft size={14} />
          <span>Back</span>
        </button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`
            fixed inset-y-0 left-0 z-40 w-72 bg-white border-r border-slate-100 
            flex flex-col transform transition-transform duration-300 ease-in-out
            lg:static lg:translate-x-0 lg:w-72 lg:min-h-screen
            shadow-[20px_0_40px_-20px_rgba(0,0,0,0.02)]
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          `}
        >
          {/* Back Button for Desktop */}
          <div className="px-6 pt-6">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-500 hover:text-orange-500 transition-colors bg-slate-50 hover:bg-orange-50 border border-slate-100 hover:border-orange-100 px-4 py-2.5 rounded-xl cursor-pointer w-full justify-center"
            >
              <ArrowLeft size={14} />
              <span>Go Back</span>
            </button>
          </div>

          {/* Sidebar Header */}
          <div className="p-6 border-b border-slate-100">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-400 to-rose-500 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-orange-500/20 flex-shrink-0">
                {user?.firstName?.[0]?.toUpperCase() || 'U'}
              </div>
              <div className="min-w-0">
                <p className="font-bold text-slate-900 truncate">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs text-slate-400 truncate font-medium">{user?.email}</p>
                <span className="inline-flex items-center gap-1 mt-1 px-2.5 py-0.5 rounded-full bg-orange-50 text-orange-600 text-[10px] font-bold uppercase tracking-wider capitalize border border-orange-100">
                  {user?.role || 'Explorer'}
                </span>
              </div>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    const param = new URLSearchParams(window.location.search);
                    param.set('tab', tab.id);
                    router.push(`?${param.toString()}`);
                    setSidebarOpen(false);
                  }}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider
                    transition-all duration-200 group text-left cursor-pointer border
                    ${isActive
                      ? 'bg-orange-500 text-white border-orange-500 shadow-md shadow-orange-500/10'
                      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50 border-transparent bg-transparent'
                    }
                  `}
                >
                  <Icon size={16} className={isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-600'} />
                  <span className="flex-1">{tab.label}</span>
                  {isActive && <ChevronRight size={14} className="text-white" />}
                </button>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-slate-100 bg-slate-50/50">
            <button
              onClick={() => handleLogout()}
              disabled={isLogoutPending}
              className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl text-xs font-black uppercase tracking-widest text-rose-500 hover:text-white bg-transparent hover:bg-rose-500 border border-rose-200 hover:border-rose-500 transition-all duration-300 cursor-pointer"
            >
              <LogOut size={16} />
              <span>{isLogoutPending ? 'Logging out...' : 'Sign Out'}</span>
            </button>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-slate-950/40 backdrop-blur-sm lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-10">
          <div className="max-w-4xl mx-auto">
            <TabContent activeTab={activeTab} />
          </div>
        </main>
      </div>
    </div>
  );
}
