"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export type ActivityCategoryId = 
  | 'adventure'
  | 'cultural'
  | 'nature'
  | 'spiritual'
  | 'food'
  | 'water'
  | 'wellness'
  | 'urban';

interface ActivityCategoryWrapperProps {
  id: ActivityCategoryId;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  onScrollLeft: () => void;
  onScrollRight: () => void;
}

export const ActivityCategoryWrapper = ({
  id,
  title,
  subtitle,
  icon,
  children,
  onScrollLeft,
  onScrollRight,
}: ActivityCategoryWrapperProps) => {

  const themeStyles: Record<ActivityCategoryId, {
    sectionBg: string;
    titleColor: string;
    subColor: string;
    scrollBtnClass: string;
    accentCircle: string;
    iconContainer: string;
  }> = {
    // ⚡ Adventure — Dark orange volcanic energy
    adventure: {
      sectionBg: "relative bg-gradient-to-br from-zinc-950 via-orange-950/40 to-zinc-950 border border-orange-500/25 shadow-2xl shadow-orange-950/10 rounded-[1.75rem] md:rounded-[2.5rem] p-5 md:p-8 overflow-hidden",
      titleColor: "text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-red-400 font-extrabold tracking-widest uppercase",
      subColor: "text-zinc-400 text-xs font-bold",
      scrollBtnClass: "border-orange-500/25 text-orange-400 bg-orange-500/5 hover:bg-orange-500/20",
      accentCircle: "absolute -left-24 -bottom-24 w-96 h-96 bg-orange-600/10 blur-[120px] rounded-full pointer-events-none",
      iconContainer: "p-2 bg-orange-500/10 text-orange-400 rounded-xl border border-orange-500/20",
    },

    // 🏛️ Cultural — Warm amber parchment
    cultural: {
      sectionBg: "relative bg-gradient-to-br from-amber-50/50 via-yellow-50/20 to-amber-100/30 border border-amber-200/50 shadow-md shadow-amber-900/5 rounded-[1.75rem] md:rounded-[2.5rem] p-5 md:p-8 overflow-hidden font-serif",
      titleColor: "text-amber-950 font-black tracking-tight font-serif",
      subColor: "text-amber-700/70 text-xs italic font-sans font-medium",
      scrollBtnClass: "border-amber-300 text-amber-800 bg-amber-50 hover:bg-amber-100",
      accentCircle: "absolute left-1/2 -top-40 -translate-x-1/2 w-96 h-96 bg-amber-500/8 blur-[100px] rounded-full pointer-events-none",
      iconContainer: "p-2 bg-amber-100 text-amber-800 rounded-xl border border-amber-200/70",
    },

    // 🌿 Nature — Fresh emerald canopy
    nature: {
      sectionBg: "relative bg-gradient-to-br from-emerald-50/40 via-green-50/20 to-lime-50/20 border border-emerald-200/40 shadow-lg shadow-emerald-950/5 rounded-[1.75rem] md:rounded-[2.5rem] p-5 md:p-8 overflow-hidden",
      titleColor: "text-emerald-950 font-black tracking-tight",
      subColor: "text-emerald-800/60 text-xs font-medium",
      scrollBtnClass: "border-emerald-200 text-emerald-700 bg-emerald-50 hover:bg-emerald-100",
      accentCircle: "absolute -right-16 top-8 w-64 h-64 bg-emerald-400/10 blur-[80px] rounded-full pointer-events-none",
      iconContainer: "p-2 bg-emerald-100/70 text-emerald-700 rounded-xl border border-emerald-200/60",
    },

    // 🪷 Spiritual — Deep violet serenity
    spiritual: {
      sectionBg: "relative bg-gradient-to-br from-violet-50/40 via-indigo-50/20 to-purple-50/30 border border-indigo-100/50 shadow-md shadow-indigo-950/5 rounded-[1.75rem] md:rounded-[2.5rem] p-5 md:p-8 overflow-hidden",
      titleColor: "text-indigo-950 font-black tracking-tight",
      subColor: "text-indigo-700/60 text-xs font-medium",
      scrollBtnClass: "border-indigo-200 text-indigo-700 bg-indigo-50 hover:bg-indigo-100",
      accentCircle: "absolute -left-12 top-1/2 -translate-y-1/2 w-72 h-72 bg-violet-400/10 blur-[90px] rounded-full pointer-events-none",
      iconContainer: "p-2 bg-indigo-100/60 text-indigo-700 rounded-xl border border-indigo-200/50",
    },

    // 🍜 Food — Warm saffron street energy
    food: {
      sectionBg: "relative bg-gradient-to-br from-yellow-50/50 via-orange-50/30 to-red-50/20 border border-yellow-200/50 shadow-md shadow-yellow-900/5 rounded-[1.75rem] md:rounded-[2.5rem] p-5 md:p-8 overflow-hidden",
      titleColor: "text-transparent bg-clip-text bg-gradient-to-r from-yellow-700 via-orange-600 to-red-600 font-black tracking-tight",
      subColor: "text-orange-700/60 text-xs font-semibold",
      scrollBtnClass: "border-orange-200 text-orange-700 bg-orange-50 hover:bg-orange-100",
      accentCircle: "absolute -right-20 -top-20 w-80 h-80 bg-yellow-400/10 blur-[100px] rounded-full pointer-events-none",
      iconContainer: "p-2 bg-orange-100/70 text-orange-600 rounded-xl border border-orange-200/60",
    },

    // 🌊 Water — Oceanic teal depth
    water: {
      sectionBg: "relative bg-gradient-to-br from-slate-950 via-teal-950/50 to-cyan-950/30 border border-teal-500/20 shadow-2xl shadow-teal-950/10 rounded-[1.75rem] md:rounded-[2.5rem] p-5 md:p-8 overflow-hidden",
      titleColor: "text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-300 to-sky-400 font-extrabold tracking-tight",
      subColor: "text-slate-400 text-xs font-semibold",
      scrollBtnClass: "border-teal-500/20 text-teal-400 bg-teal-500/5 hover:bg-teal-500/20",
      accentCircle: "absolute -right-28 -bottom-28 w-96 h-96 bg-teal-500/10 blur-[120px] rounded-full pointer-events-none animate-pulse",
      iconContainer: "p-2 bg-teal-500/10 text-teal-400 rounded-xl border border-teal-500/20",
    },

    // 🧘 Wellness — Soft rose garden
    wellness: {
      sectionBg: "relative bg-gradient-to-br from-rose-50/40 via-pink-50/20 to-fuchsia-50/20 border border-rose-200/40 shadow-md shadow-rose-900/5 rounded-[1.75rem] md:rounded-[2.5rem] p-5 md:p-8 overflow-hidden",
      titleColor: "text-rose-950 font-black tracking-tight",
      subColor: "text-rose-700/60 text-xs font-medium",
      scrollBtnClass: "border-rose-200 text-rose-700 bg-rose-50 hover:bg-rose-100",
      accentCircle: "absolute -left-16 -bottom-16 w-72 h-72 bg-rose-400/10 blur-[90px] rounded-full pointer-events-none",
      iconContainer: "p-2 bg-rose-100/70 text-rose-700 rounded-xl border border-rose-200/60",
    },

    // 🏙️ Urban — Cool slate city vibes
    urban: {
      sectionBg: "relative bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-blue-500/15 shadow-2xl shadow-blue-950/5 rounded-[1.75rem] md:rounded-[2.5rem] p-5 md:p-8 overflow-hidden",
      titleColor: "text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-violet-400 font-extrabold tracking-tight",
      subColor: "text-slate-400 text-xs font-bold",
      scrollBtnClass: "border-blue-500/20 text-blue-400 bg-blue-500/5 hover:bg-blue-500/20",
      accentCircle: "absolute -right-32 -top-32 w-96 h-96 bg-blue-600/8 blur-[120px] rounded-full pointer-events-none",
      iconContainer: "p-2 bg-blue-500/10 text-blue-400 rounded-xl border border-blue-500/20",
    },
  };

  const currentTheme = themeStyles[id] || themeStyles.adventure;

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

        {/* Scroll Buttons */}
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

      {/* Card Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.section>
  );
};
