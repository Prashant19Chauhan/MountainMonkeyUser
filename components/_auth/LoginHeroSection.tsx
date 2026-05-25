"use client";

import React from 'react';
import { Plane } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export const LoginHeroSection = () => {
  return (
    <div className="relative hidden w-[55%] lg:block overflow-hidden">
      <motion.img
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=2073"
        alt="Coastal Paradise"
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* Animated Overlays */}
      <div className="absolute inset-0 bg-linear-to-br from-rose-500/20 via-transparent to-black/60" />
      <div className="absolute inset-0 backdrop-blur-[2px]" />
    
      {/* Floating Decoration */}
      <motion.div 
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-20 bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-[32px] shadow-2xl"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-500 flex items-center justify-center text-white shadow-lg shadow-rose-500/40">
            <Plane size={24} className="rotate-45" fill="currentColor" />
          </div>
          <div>
            <p className="text-white font-black text-xl tracking-tight">Adventure Awaits</p>
            <p className="text-white/60 text-xs font-bold uppercase tracking-widest">Join 10k+ Travelers</p>
          </div>
        </div>
      </motion.div>

      {/* Hero Bottom Text */}
      <div className="absolute bottom-16 left-16 right-16">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-6xl font-black text-white leading-[1.1] mb-6 tracking-tighter"
        >
          Your next <span className="text-rose-400">masterpiece</span> <br /> 
          starts with a journey.
        </motion.h1>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex items-center gap-4"
        >
          <div className="flex -space-x-3">
            {[1, 2, 3, 4].map((i) => (
              <Image width={40} height={40} key={i} src={"/bg1.jpg"} className="rounded-full border-2 border-white object-cover w-10 h-10" alt="User" />
            ))}
          </div>
          <p className="text-white/80 font-bold text-sm tracking-tight">
            Loved by travelers from <span className="text-white underline decoration-rose-500 decoration-2">50+ countries</span>
          </p>
        </motion.div>
      </div>
    </div>
  );
};
