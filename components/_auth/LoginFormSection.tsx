"use client";

import React from 'react';
import { Plane, Mail, Lock, Apple, ArrowRight, Globe2Icon } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLogin } from '@/hooks/useAuth';

export const LoginFormSection = () => {
  const { formData, handleChange, handleSubmit, isPending } = useLogin();

  return (
    <div className="flex w-full flex-col justify-center px-8 sm:px-16 lg:w-[45%] xl:px-24 bg-white relative">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#f43f5e 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
      
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mx-auto w-full max-w-[420px] relative z-10"
      >
        {/* Mobile Logo */}
        <div className="flex lg:hidden items-center gap-3 mb-12">
          <div className="bg-rose-500 p-2 rounded-xl text-white shadow-lg shadow-rose-200">
            <Plane size={24} className="rotate-45" fill="currentColor" />
          </div>
          <span className="text-2xl font-black text-slate-900 tracking-tighter">SunSeeker</span>
        </div>

        {/* Header */}
        <div className="mb-10">
          <h2 className="text-4xl font-black text-slate-900 mb-3 tracking-tight">Welcome back</h2>
          <p className="text-slate-400 font-medium text-lg leading-relaxed">
            Ready to plan your next <span className="text-rose-500 font-bold">escape</span>?
          </p>
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-rose-500 transition-colors" size={20} />
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="alex@traveler.com"
                className="w-full rounded-2xl border border-slate-100 bg-slate-50/50 py-4 pl-12 pr-4 outline-none transition-all focus:bg-white focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 font-bold text-slate-800"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center px-1">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Password</label>
              <a href="#" className="text-[11px] font-black text-rose-500 hover:text-rose-600 uppercase tracking-widest">Forgot?</a>
            </div>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-rose-500 transition-colors" size={20} />
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full rounded-2xl border border-slate-100 bg-slate-50/50 py-4 pl-12 pr-4 outline-none transition-all focus:bg-white focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 font-bold text-slate-800"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-2xl bg-slate-900 py-4.5 font-black text-white text-sm uppercase tracking-[0.2em] shadow-xl shadow-slate-200 hover:bg-rose-500 hover:shadow-rose-200 transition-all active:scale-[0.98] flex items-center justify-center gap-3 group cursor-pointer"
          >
            {isPending ? "Signing In..." : "Sign In"}
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-10 flex items-center">
          <div className="flex-1 border-t border-slate-100"></div>
          <span className="px-4 text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">Social Login</span>
          <div className="flex-1 border-t border-slate-100"></div>
        </div>

        {/* Social Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center gap-3 rounded-2xl border border-slate-100 bg-white py-4 font-black text-xs uppercase tracking-widest text-slate-700 hover:bg-slate-50 transition-all active:scale-95 shadow-sm cursor-pointer">
            <Globe2Icon size={20} className="text-rose-500" />
            Google
          </button>
          <button className="flex items-center justify-center gap-3 rounded-2xl border border-slate-100 bg-white py-4 font-black text-xs uppercase tracking-widest text-slate-700 hover:bg-slate-50 transition-all active:scale-95 shadow-sm cursor-pointer">
            <Apple size={20} className="text-slate-900" />
            Apple
          </button>
        </div>

        {/* Footer Text */}
        <p className="mt-12 text-center text-sm font-bold text-slate-400">
          Don&apos;t have an account?{' '}
          <Link href="/sign-up" className="text-rose-500 hover:text-rose-600 underline-offset-4 hover:underline">
            Start your journey
          </Link>
        </p>
      </motion.div>
    </div>
  );
};
