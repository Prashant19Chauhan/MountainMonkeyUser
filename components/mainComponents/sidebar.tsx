"use client";

import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  MessageSquare, 
  Compass, 
  Settings, 
  UserCircle, 
  History,
  MoreHorizontal,
  PanelLeftClose,
  PanelLeftOpen,
  Search,
  Zap,
  Menu,
  X,
  LayoutGrid,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CHAT_HISTORY = [
  { title: "Trip to Kyoto & Hakone", date: "Today" },
  { title: "Swiss Alps Itinerary Draft", date: "Today" },
  { title: "Budget for Tuscany Tour", date: "Yesterday" },
  { title: "Iceland Northern Lights", date: "Yesterday" },
  { title: "Top 10 Amalfi Hotels", date: "Last Week" },
  { title: "Japan Visa Requirements", date: "Last Week" }
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Close mobile drawer on resize if screen becomes large
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderSidebarContent = () => (
    <div className="h-full flex flex-col bg-[#0B0F1A] text-slate-300 border-r border-white/5 relative overflow-hidden">
      {/* Visual Ambient Background */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-[-10%] right-[-20%] w-64 h-64 bg-rose-500/20 blur-[100px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-20%] w-64 h-64 bg-blue-500/20 blur-[100px] rounded-full" />
      </div>

      {/* Top Header & Toggle */}
      <div className="relative z-10 flex items-center justify-between p-4 mb-2">
        {!collapsed && (
          <div className="flex items-center gap-2.5 px-2">
            <div className="w-8 h-8 bg-linear-to-tr from-rose-500 to-orange-400 rounded-xl flex items-center justify-center shadow-lg shadow-rose-500/20">
              <Sparkles size={18} className="text-white" />
            </div>
            <span className="font-black text-white tracking-tight text-lg italic">MonkeyAI</span>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`p-2 rounded-xl hover:bg-white/5 transition-all duration-300 text-slate-500 hover:text-white border border-transparent hover:border-white/10 ${collapsed ? "mx-auto" : ""}`}
        >
          {collapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
        </button>
      </div>

      {/* Action Area: New Chat & Search */}
      <div className="relative z-10 px-4 py-2 space-y-3">
        <button className={`w-full flex items-center gap-3 px-4 py-3.5 bg-white text-[#0B0F1A] rounded-[1.25rem] font-black text-xs uppercase tracking-widest transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-2xl shadow-white/10 ${collapsed ? "justify-center px-0" : ""}`}>
          <Plus size={18} strokeWidth={3} />
          {!collapsed && "Start Exploration"}
        </button>
        
        {!collapsed && (
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-rose-400 transition-colors" size={16} />
            <input 
              placeholder="Search conversations..." 
              className="w-full bg-white/5 border border-white/5 rounded-2xl py-3 pl-11 pr-4 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:bg-white/10 transition-all placeholder:text-slate-600"
            />
          </div>
        )}
      </div>

      {/* Main Navigation */}
      <nav className="relative z-10 px-3 py-6 space-y-1">
        <SidebarNavItem icon={<Compass size={20} />} label="Explore Peaks" collapsed={collapsed} active />
        <SidebarNavItem icon={<LayoutGrid size={20} />} label="Dashboard" collapsed={collapsed} />
        <SidebarNavItem icon={<History size={20} />} label="Travel Log" collapsed={collapsed} />
      </nav>

      {/* History Area */}
      <div className="relative z-10 flex-1 overflow-hidden flex flex-col">
        {!collapsed && (
          <div className="px-6 mb-4 flex items-center justify-between">
            <h2 className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">Recent Dossiers</h2>
          </div>
        )}
        
        <div className="flex-1 overflow-y-auto px-3 space-y-0.5 custom-scrollbar pb-6">
          {CHAT_HISTORY.map((chat, index) => (
            <button 
              key={index}
              className={`w-full flex items-center gap-4 px-4 py-3 text-sm rounded-2xl hover:bg-white/5 transition-all group relative border border-transparent hover:border-white/5 ${collapsed ? "justify-center px-0" : ""}`}
            >
              <div className="w-2 h-2 rounded-full bg-rose-500/40 group-hover:bg-rose-500 transition-colors shrink-0" />
              {!collapsed && (
                <>
                  <div className="flex-1 text-left overflow-hidden">
                    <p className="truncate text-slate-300 font-bold group-hover:text-white transition-colors">{chat.title}</p>
                    <p className="text-[9px] text-slate-600 font-black uppercase tracking-tighter mt-0.5">{chat.date}</p>
                  </div>
                  <MoreHorizontal size={14} className="text-slate-700 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0" />
                </>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Footer / User Area */}
      <div className="relative z-10 p-4 mt-auto">
        <div className="bg-white/5 border border-white/5 rounded-[2rem] p-2 space-y-1">
          <SidebarNavItem icon={<Settings size={20} />} label="Preferences" collapsed={collapsed} />
          
          <div className={`flex items-center gap-3 p-2 rounded-[1.5rem] bg-gradient-to-tr from-white/[0.08] to-transparent border border-white/10 ${collapsed ? "justify-center" : ""}`}>
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-500 to-orange-400 p-[2px] shrink-0">
               <div className="w-full h-full bg-[#0B0F1A] rounded-[14px] flex items-center justify-center overflow-hidden">
                  <UserCircle size={24} className="text-white/80" />
               </div>
            </div>

            {!collapsed && (
              <>
                <div className="flex-1 text-left overflow-hidden">
                  <p className="font-black text-white text-xs truncate">Adventurer One</p>
                  <p className="text-[9px] text-rose-400 font-black uppercase tracking-widest mt-0.5">Tier: Elite</p>
                </div>
                <button className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-slate-500">
                  <ChevronRight size={14} />
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Upgrade CTA */}
      {!collapsed && (
        <div className="px-4 pb-6 mt-4">
          <div className="bg-linear-to-br from-rose-500/10 to-orange-500/10 border border-rose-500/20 rounded-2xl p-4 relative overflow-hidden group hover:border-rose-500/40 transition-all cursor-pointer">
            <Zap size={40} className="absolute -right-4 -bottom-4 text-rose-500/10 group-hover:text-rose-500/20 transition-all" />
            <p className="text-[10px] font-black text-rose-400 uppercase tracking-widest mb-1">Monkey AI Pro</p>
            <p className="text-[11px] font-bold text-white leading-tight">Unlock unlimited expeditions & GPT-4o insights.</p>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile Header (Drawer Trigger) */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[#0B0F1A]/80 backdrop-blur-xl border-b border-white/5 z-40 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-linear-to-tr from-rose-500 to-orange-400 rounded-lg flex items-center justify-center">
              <Sparkles size={16} className="text-white" />
            </div>
            <span className="font-black text-white tracking-tight text-sm italic">MonkeyAI</span>
        </div>
        <button 
          onClick={() => setIsMobileOpen(true)}
          className="p-2 text-slate-400 hover:text-white"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Desktop Sidebar (Fixed) */}
      <aside
        className={`hidden md:flex h-screen flex-col sticky top-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
          collapsed ? "w-20" : "w-72"
        }`}
      >
        {renderSidebarContent()}
      </aside>

      {/* Mobile Drawer (Overlay) */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] md:hidden"
            />
            
            {/* Drawer */}
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-[280px] z-[70] md:hidden shadow-2xl"
            >
              <div className="absolute top-4 right-[-50px] z-20">
                <button 
                  onClick={() => setIsMobileOpen(false)}
                  className="p-2 bg-[#0B0F1A] text-white rounded-full border border-white/10"
                >
                  <X size={20} />
                </button>
              </div>
              {renderSidebarContent()}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function SidebarNavItem({ 
  icon, 
  label, 
  collapsed, 
  active = false 
}: { 
  icon: React.ReactNode; 
  label: string; 
  collapsed: boolean;
  active?: boolean;
}) {
  return (
    <button className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 relative group ${
      active 
        ? "bg-white text-[#0B0F1A] shadow-xl shadow-white/5 font-black" 
        : "text-slate-500 hover:text-white hover:bg-white/5 font-bold"
    } ${collapsed ? "justify-center px-0" : ""}`}>
      <span className={`transition-colors duration-300 ${active ? "text-[#0B0F1A]" : "text-slate-500 group-hover:text-rose-400"}`}>
        {icon}
      </span>
      {!collapsed && (
        <span className="text-xs uppercase tracking-[0.15em]">{label}</span>
      )}
      
      {active && !collapsed && (
        <div className="absolute right-4 w-1.5 h-1.5 rounded-full bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.8)]" />
      )}
    </button>
  );
}