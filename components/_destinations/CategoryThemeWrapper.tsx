"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CategoryId } from '@/hooks/useDestinationPreferences';

interface CategoryThemeWrapperProps {
  id: CategoryId;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  onScrollLeft: () => void;
  onScrollRight: () => void;
}

export const CategoryThemeWrapper = ({
  id,
  title,
  subtitle,
  icon,
  children,
  onScrollLeft,
  onScrollRight
}: CategoryThemeWrapperProps) => {

  // Theme configuration mappings
  const themeStyles = {
    trending: {
      sectionBg: "relative bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-blue-500/20 shadow-[0_0_50px_rgba(59,130,246,0.05)] rounded-[1.75rem] md:rounded-[2.5rem] p-5 md:p-8 overflow-hidden",
      titleColor: "text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 font-extrabold tracking-tight",
      subColor: "text-slate-400 text-xs",
      scrollBtnClass: "border-blue-500/20 text-cyan-400 bg-blue-500/5 hover:bg-blue-500/20",
      accentCircle: "absolute -right-32 -top-32 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full pointer-events-none animate-pulse",
      iconContainer: "p-2 bg-blue-500/10 text-cyan-400 rounded-xl border border-blue-500/20"
    },
    tropical: {
      sectionBg: "relative bg-gradient-to-br from-cyan-50/40 via-teal-50/20 to-emerald-50/30 border border-cyan-100/50 shadow-lg shadow-cyan-950/5 rounded-[1.75rem] md:rounded-[2.5rem] p-5 md:p-8 overflow-hidden",
      titleColor: "text-cyan-850 font-black tracking-tight",
      subColor: "text-slate-500 text-xs font-semibold",
      scrollBtnClass: "border-cyan-200 text-cyan-600 bg-cyan-50/50 hover:bg-cyan-100",
      accentCircle: "absolute -right-20 -bottom-20 w-80 h-80 bg-teal-400/10 blur-[90px] rounded-full pointer-events-none",
      iconContainer: "p-2 bg-cyan-100/60 text-cyan-600 rounded-xl border border-cyan-200/50"
    },
    history: {
      sectionBg: "relative bg-gradient-to-br from-amber-50/50 via-amber-100/10 to-orange-50/30 border border-amber-200/40 shadow-md shadow-amber-950/5 rounded-[1.75rem] md:rounded-[2.5rem] p-5 md:p-8 overflow-hidden font-serif",
      titleColor: "text-amber-950 font-black tracking-tight font-serif",
      subColor: "text-amber-800/70 text-xs italic font-sans font-medium",
      scrollBtnClass: "border-amber-200 text-amber-800 bg-amber-50 hover:bg-amber-100",
      accentCircle: "absolute left-1/2 -top-40 -translate-x-1/2 w-96 h-96 bg-amber-500/5 blur-[100px] rounded-full pointer-events-none",
      iconContainer: "p-2 bg-amber-100 text-amber-800 rounded-xl border border-amber-200/60"
    },
    adventure: {
      sectionBg: "relative bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 border border-orange-500/20 shadow-2xl shadow-orange-950/5 rounded-[1.75rem] md:rounded-[2.5rem] p-5 md:p-8 overflow-hidden",
      titleColor: "text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500 font-extrabold tracking-widest uppercase",
      subColor: "text-zinc-400 text-xs font-bold font-sans",
      scrollBtnClass: "border-orange-500/20 text-orange-400 bg-orange-500/5 hover:bg-orange-500/20",
      accentCircle: "absolute -left-20 -bottom-20 w-80 h-80 bg-orange-600/10 blur-[100px] rounded-full pointer-events-none",
      iconContainer: "p-2 bg-orange-500/10 text-orange-400 rounded-xl border border-orange-500/20 animate-bounce-slow"
    },
    nature: {
      sectionBg: "relative bg-gradient-to-br from-emerald-50/40 via-green-50/20 to-emerald-100/10 border border-emerald-200/40 shadow-lg shadow-emerald-950/5 rounded-[1.75rem] md:rounded-[2.5rem] p-5 md:p-8 overflow-hidden",
      titleColor: "text-emerald-950 font-black tracking-tight",
      subColor: "text-emerald-800/60 text-xs font-medium",
      scrollBtnClass: "border-emerald-200 text-emerald-700 bg-emerald-50 hover:bg-emerald-100",
      accentCircle: "absolute -right-10 top-10 w-64 h-64 bg-emerald-400/10 blur-[80px] rounded-full pointer-events-none",
      iconContainer: "p-2 bg-emerald-100/60 text-emerald-700 rounded-xl border border-emerald-200/50"
    },
    spiritual: {
      sectionBg: "relative bg-gradient-to-br from-violet-50/40 via-indigo-50/20 to-fuchsia-50/30 border border-indigo-100/50 shadow-md shadow-indigo-950/5 rounded-[1.75rem] md:rounded-[2.5rem] p-5 md:p-8 overflow-hidden",
      titleColor: "text-indigo-950 font-black tracking-tight",
      subColor: "text-indigo-800/60 text-xs font-medium",
      scrollBtnClass: "border-indigo-200 text-indigo-700 bg-indigo-50 hover:bg-indigo-100",
      accentCircle: "absolute -left-10 top-1/2 -translate-y-1/2 w-72 h-72 bg-violet-400/10 blur-[90px] rounded-full pointer-events-none",
      iconContainer: "p-2 bg-indigo-100/60 text-indigo-700 rounded-xl border border-indigo-200/50"
    }
  };

  const currentTheme = themeStyles[id] || themeStyles.trending;

  // Animation variants dedicated per theme
  const entranceVariants: any = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6, 
        ease: "easeOut" 
      } 
    }
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={entranceVariants}
      className={currentTheme.sectionBg}
    >
      {/* Background Accent Sphere for visual wow factor */}
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

        {/* Scroll Buttons in the Header */}
        <div className="flex gap-2 relative z-10 shrink-0 self-end sm:self-center">
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

      {/* Child Card Grid rendering themed layout effects */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.section>
  );
};
