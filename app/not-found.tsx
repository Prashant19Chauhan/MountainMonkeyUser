"use client";

import React from 'react';
import Link from 'next/link';
import { Compass, Home, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
      
      {/* Background Visual Effects */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-96 h-96 bg-orange-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-rose-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-xl w-full z-10 text-center space-y-8">
        
        {/* Animated Compass Icon */}
        <div className="flex justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-24 h-24 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-orange-500 shadow-2xl backdrop-blur-md"
          >
            <Compass size={48} strokeWidth={1.5} className="animate-pulse" />
          </motion.div>
        </div>

        {/* 404 Header Text */}
        <div className="space-y-3">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-8xl font-black tracking-tighter bg-gradient-to-r from-orange-500 via-rose-500 to-purple-500 bg-clip-text text-transparent"
          >
            404
          </motion.h1>
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-2xl md:text-3xl font-black text-white tracking-tight"
          >
            Lost in the Peaks
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-sm md:text-base text-slate-400 leading-relaxed max-w-md mx-auto"
          >
            It seems you&apos;ve wandered off the trail. Even the most seasoned explorers take a wrong turn sometimes. Let&apos;s get you back to basecamp safely.
          </motion.p>
        </div>

        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
        >
          <Link href="/" className="no-underline w-full sm:w-auto">
            <button className="w-full bg-linear-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white font-black text-xs uppercase tracking-widest px-8 py-4 rounded-2xl shadow-xl shadow-orange-500/10 hover:shadow-rose-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer border-0 flex items-center justify-center gap-2">
              <Home size={14} /> Back to Basecamp
            </button>
          </Link>
          <Link href="/destinations" className="no-underline w-full sm:w-auto">
            <button className="w-full bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 font-black text-xs uppercase tracking-widest px-8 py-4 rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2">
              <MapPin size={14} className="text-orange-500" /> Explore Peaks
            </button>
          </Link>
        </motion.div>
        
      </div>
    </div>
  );
}
