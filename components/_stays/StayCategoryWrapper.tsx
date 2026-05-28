"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export type StayCategoryId = 
  | 'resort'
  | 'villa'
  | 'homestay'
  | 'hostel'
  | 'hotel';

interface StayCategoryWrapperProps {
  id: StayCategoryId;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  onScrollLeft: () => void;
  onScrollRight: () => void;
}

export const StayCategoryWrapper = ({
  id,
  title,
  subtitle,
  icon,
  children,
  onScrollLeft,
  onScrollRight,
}: StayCategoryWrapperProps) => {

  const themeStyles: Record<StayCategoryId, {
    sectionBg: string;
    titleColor: string;
    subColor: string;
    scrollBtnClass: string;
    accentCircle: string;
    iconContainer: string;
  }> = {
    // 🏝️ Premium Resorts — Teal & Emerald tropical breeze
    resort: {
      sectionBg: "relative bg-gradient-to-br from-cyan-50/40 via-teal-50/20 to-emerald-50/30 border border-cyan-100/50 shadow-lg shadow-cyan-950/5 rounded-[1.75rem] md:rounded-[2.5rem] p-5 md:p-8 overflow-hidden",
      titleColor: "text-cyan-950 font-black tracking-tight",
      subColor: "text-slate-500 text-xs font-semibold",
      scrollBtnClass: "border-cyan-200 text-cyan-600 bg-cyan-50/50 hover:bg-cyan-100",
      accentCircle: "absolute -right-20 -bottom-20 w-80 h-80 bg-teal-400/10 blur-[90px] rounded-full pointer-events-none",
      iconContainer: "p-2 bg-cyan-100/60 text-cyan-600 rounded-xl border border-cyan-200/50"
    },

    // 🏰 Luxury Villas — Midnight & Gold premium glow
    villa: {
      sectionBg: "relative bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-blue-500/20 shadow-[0_0_50px_rgba(59,130,246,0.05)] rounded-[1.75rem] md:rounded-[2.5rem] p-5 md:p-8 overflow-hidden",
      titleColor: "text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 font-extrabold tracking-tight",
      subColor: "text-slate-400 text-xs",
      scrollBtnClass: "border-blue-500/20 text-cyan-400 bg-blue-500/5 hover:bg-blue-500/20",
      accentCircle: "absolute -right-32 -top-32 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full pointer-events-none animate-pulse",
      iconContainer: "p-2 bg-blue-500/10 text-cyan-400 rounded-xl border border-blue-500/20"
    },

    // 🏡 Local Homestays — Warm amber rustic cottage home
    homestay: {
      sectionBg: "relative bg-gradient-to-br from-amber-50/50 via-amber-100/10 to-orange-50/30 border border-amber-200/40 shadow-md shadow-amber-950/5 rounded-[1.75rem] md:rounded-[2.5rem] p-5 md:p-8 overflow-hidden font-serif",
      titleColor: "text-amber-950 font-black tracking-tight font-serif",
      subColor: "text-amber-800/70 text-xs italic font-sans font-medium",
      scrollBtnClass: "border-amber-200 text-amber-800 bg-amber-50 hover:bg-amber-100",
      accentCircle: "absolute left-1/2 -top-40 -translate-x-1/2 w-96 h-96 bg-amber-500/5 blur-[100px] rounded-full pointer-events-none",
      iconContainer: "p-2 bg-amber-100 text-amber-800 rounded-xl border border-amber-200/60"
    },

    // 🎒 Social Hostels — Ethereal violet-indigo youth hub
    hostel: {
      sectionBg: "relative bg-gradient-to-br from-violet-50/40 via-indigo-50/20 to-fuchsia-50/30 border border-indigo-100/50 shadow-md shadow-indigo-950/5 rounded-[1.75rem] md:rounded-[2.5rem] p-5 md:p-8 overflow-hidden",
      titleColor: "text-indigo-950 font-black tracking-tight",
      subColor: "text-indigo-800/60 text-xs font-medium",
      scrollBtnClass: "border-indigo-200 text-indigo-700 bg-indigo-50 hover:bg-indigo-100",
      accentCircle: "absolute -left-10 top-1/2 -translate-y-1/2 w-72 h-72 bg-violet-400/10 blur-[90px] rounded-full pointer-events-none",
      iconContainer: "p-2 bg-indigo-100/60 text-indigo-700 rounded-xl border border-indigo-200/50"
    },

    // 🏨 Boutique Hotels — Calm rose garden
    hotel: {
      sectionBg: "relative bg-gradient-to-br from-rose-50/40 via-pink-50/20 to-fuchsia-50/20 border border-rose-200/40 shadow-md shadow-rose-900/5 rounded-[1.75rem] md:rounded-[2.5rem] p-5 md:p-8 overflow-hidden",
      titleColor: "text-rose-950 font-black tracking-tight",
      subColor: "text-rose-700/60 text-xs font-medium",
      scrollBtnClass: "border-rose-200 text-rose-700 bg-rose-50 hover:bg-rose-100",
      accentCircle: "absolute -left-16 -bottom-16 w-72 h-72 bg-rose-400/10 blur-[90px] rounded-full pointer-events-none",
      iconContainer: "p-2 bg-rose-100/70 text-rose-700 rounded-xl border border-rose-200/60"
    }
  };

  const currentTheme = themeStyles[id] || themeStyles.hotel;

  const entranceVariants: any = {
    hidden: { opacity: 0, y: 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={entranceVariants}
      className={currentTheme.sectionBg}
    >
      {/* Background Accent Sphere */}
      <div className={currentTheme.accentCircle} />

      {/* Themed Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 md:mb-8 relative z-10">
        <div className="flex items-center gap-3 md:gap-4">
          <div className={`${currentTheme.iconContainer} shrink-0`}>
            {icon}
          </div>
          <div>
            <h2 className={`text-lg md:text-2xl font-black ${currentTheme.titleColor} leading-tight`}>
              {title}
            </h2>
            <p className={`mt-1 text-[10px] md:text-xs font-semibold ${currentTheme.subColor} leading-snug line-clamp-1 sm:line-clamp-none`}>
              {subtitle}
            </p>
          </div>
        </div>

        {/* Scroll Buttons — hidden on mobile, shown on sm+ */}
        <div className="hidden sm:flex gap-2 relative z-10 shrink-0 self-end sm:self-center">
          <button
            type="button"
            onClick={onScrollLeft}
            className={`p-2 rounded-full border transition-all cursor-pointer ${currentTheme.scrollBtnClass}`}
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            onClick={onScrollRight}
            className={`p-2 rounded-full border transition-all cursor-pointer ${currentTheme.scrollBtnClass}`}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Card Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.section>
  );
};
