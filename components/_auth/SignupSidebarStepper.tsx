"use client";

import React from 'react';
import { Plane, Check, Compass } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSignup } from '@/hooks/useAuth';

export const SignupSidebarStepper = () => {
  const { currentStep } = useSignup();

  const steps = [
    { 
      id: 1, 
      title: 'Welcome', 
      desc: 'Start your adventure', 
      status: currentStep > 1 ? 'complete' : currentStep === 1 ? 'active' : 'upcoming' 
    },
    { 
      id: 2, 
      title: 'Basic Details', 
      desc: 'Account security', 
      status: currentStep > 2 ? 'complete' : currentStep === 2 ? 'active' : 'upcoming' 
    },
    { 
      id: 3, 
      title: 'Travel Experiences', 
      desc: "Where you've been", 
      status: currentStep > 3 ? 'complete' : currentStep === 3 ? 'active' : 'upcoming' 
    },
    { 
      id: 4, 
      title: 'Travel Enthusiasm', 
      desc: 'Your travel style', 
      status: currentStep > 4 ? 'complete' : currentStep === 4 ? 'active' : 'upcoming' 
    },
    { 
      id: 5, 
      title: 'Contact Info', 
      desc: 'Stay connected', 
      status: currentStep > 5 ? 'complete' : currentStep === 5 ? 'active' : 'upcoming' 
    },
  ];

  return (
    <div className="w-[420px] bg-slate-50/80 border-r border-slate-100 p-12 flex flex-col justify-between lg:flex relative overflow-hidden">
      {/* Abstract Background Decoration */}
      <div className="absolute top-[-100px] left-[-100px] w-64 h-64 bg-rose-50 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-[-50px] right-[-50px] w-80 h-80 bg-blue-50 rounded-full blur-3xl opacity-50" />

      <div className="relative z-10">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-16">
          <div className="bg-rose-500 p-2 rounded-xl text-white shadow-lg shadow-rose-200">
            <Plane size={22} className="rotate-45" fill="currentColor" />
          </div>
          <span className="text-2xl font-black text-slate-900 tracking-tighter">SunSeeker</span>
        </div>

        <h2 className="text-4xl font-black text-slate-900 mb-5 leading-tight">
          The world is <span className="text-rose-500 underline decoration-rose-200 decoration-8 underline-offset-4">waiting</span> for you.
        </h2>
        <p className="text-slate-500 font-medium leading-relaxed mb-12">
          SunSeeker helps you discover the most beautiful corners of the planet, tailored to your unique vibe.
        </p>

        {/* Stepper */}
        <div className="space-y-10 relative">
          {steps.map((step, idx) => (
            <div key={step.id} className="relative flex items-start gap-6">
              {idx !== steps.length - 1 && (
                <div className={`absolute left-[17px] top-[40px] w-[2px] h-[calc(100%+12px)] transition-colors duration-500 ${
                  currentStep > step.id ? 'bg-rose-500' : 'bg-slate-200'
                }`} />
              )}
              
              <motion.div 
                animate={{ 
                  scale: step.status === 'active' ? 1.1 : 1,
                  borderColor: step.status === 'upcoming' ? '#e2e8f0' : '#f43f5e'
                }}
                className={`relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 text-sm font-black transition-all ${
                  step.status === 'complete' ? 'bg-rose-500 text-white' :
                  step.status === 'active' ? 'bg-white text-rose-500 shadow-md shadow-rose-100' :
                  'bg-white text-slate-400'
                }`}
              >
                {step.status === 'complete' ? <Check size={18} strokeWidth={4} /> : step.id}
              </motion.div>

              <div>
                <h4 className={`text-sm font-black tracking-tight ${step.status === 'upcoming' ? 'text-slate-400' : 'text-slate-900'}`}>
                  {step.title}
                </h4>
                <p className="text-[11px] text-slate-400 mt-1 font-medium leading-relaxed uppercase tracking-widest">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 flex items-center gap-2 text-xs text-slate-300 font-bold tracking-widest uppercase">
        <Compass size={14} />
        Explore the unknown
      </div>
    </div>
  );
};
