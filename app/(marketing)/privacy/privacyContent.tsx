"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Key, Heart, ShieldAlert, ArrowUpRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { usePrivacyPageSections } from '@/hooks/usePrivacy';

export default function PrivacyContent() {
  const { data: pageContent, isLoading } = usePrivacyPageSections();
  const [activeSection, setActiveSection] = useState('privacy-section-0');

  // Fallback defaults if no backend details yet
  const dynamicSections = pageContent?.sections || [
    {
      heading: "Data We Collect",
      content: "Mountain Monkey Adventures (\"we\", \"us\", or \"our\") respects client security. We collect email coordinates, physical identification cards (for high-altitude emergency safety logs), contact parameters, and transaction details upon package reservations.\n\nPhysical fitness certifications and emergency medical reports are processed only when travelers enroll in active expeditions exceeding altitudes of 3,000 meters above sea level."
    },
    {
      heading: "Purpose of Processing",
      content: "All client coordinates are processed to ensure booking logistics, secure stay accommodations, confirm local guide allocations, and dispatch vital high-altitude climate updates.\n\nImportant Security Notices\nWe encrypt traveler details utilizing SHA-256 standard protocols. Location indicators and satellite tracking metrics are only leveraged during high-altitude operations to track basecamp vectors and ensure emergency coordinate rescues."
    },
    {
      heading: "Third-Party Integrations",
      content: "We never distribute traveler details to third-party brokers. Coordinates are only transferred to certified forest clearance departments, native basecamp rescue divisions, or regional transport partners strictly to facilitate permissions and ensure safety.\n\nCookie Protocols\nOur platforms employ secure cookies to remember user authentication. You can choose to disable tracking within browser controls, which will restrict dynamic itinerary scheduling features."
    }
  ];

  const icons = [Shield, Lock, Eye, Key, Heart];
  const colorMap = [
    { bg: 'bg-indigo-50', text: 'text-indigo-500' },
    { bg: 'bg-rose-50', text: 'text-rose-500' },
    { bg: 'bg-emerald-50', text: 'text-emerald-500' },
    { bg: 'bg-amber-50', text: 'text-amber-500' },
    { bg: 'bg-indigo-50', text: 'text-indigo-500' },
  ];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 90;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      setActiveSection(id);
    }
  };

  useEffect(() => {
    if (dynamicSections.length === 0) return;
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;
      for (let idx = 0; idx < dynamicSections.length; idx++) {
        const id = `privacy-section-${idx}`;
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [dynamicSections]);

  const renderParagraph = (text: string) => {
    if (text.includes("Important Security Notices") || text.includes("Important Security")) {
      return (
        <div key={text} className="bg-rose-50/30 border border-rose-100/50 p-5 rounded-2xl space-y-2 mt-4">
          <span className="text-[9px] font-black text-rose-600 uppercase tracking-widest block">⚠ Important Security Disclosures</span>
          <p className="text-[11px] leading-relaxed text-slate-500 font-medium">
            We encrypt traveler details utilizing SHA-256 standard protocols. Location indicators and satellite tracking metrics are only leveraged during high-altitude operations to track basecamp vectors and ensure emergency coordinate rescues.
          </p>
        </div>
      );
    }

    if (text.includes("Cookie Protocols")) {
      return (
        <div key={text} className="bg-indigo-50/30 border border-indigo-100/50 p-5 rounded-2xl space-y-2 mt-4">
          <span className="text-[9px] font-black text-indigo-600 uppercase tracking-widest block">🍪 Cookie Consent & Browser Preferences</span>
          <p className="text-[11px] leading-relaxed text-slate-500 font-medium">
            Our platforms employ secure cookies to remember user authentication. You can choose to disable tracking within browser controls, which will restrict dynamic itinerary scheduling features.
          </p>
        </div>
      );
    }

    if (text.includes("Physical fitness certifications") || text.includes("fitness card")) {
      return (
        <div key={text} className="bg-emerald-50/30 border border-emerald-100/50 p-5 rounded-2xl space-y-2 mt-4">
          <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest block">🍀 Alpine Safety Medical Records</span>
          <p className="text-[11px] leading-relaxed text-slate-500 font-medium">
            Physical fitness certifications and emergency medical reports are processed only when travelers enroll in active expeditions exceeding altitudes of 3,000 meters above sea level to secure appropriate emergency basecamp permissions.
          </p>
        </div>
      );
    }

    return (
      <p key={text} className="whitespace-pre-line">
        {text}
      </p>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-slate-900 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-bold text-slate-500 tracking-wider uppercase">Loading Disclosures...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f8fafc] min-h-screen font-sans">
      {/* Hero Header Banner */}
      <div className="relative h-[45vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069" 
            alt="Secure snowy peak camp visual"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/65 backdrop-blur-[2px]" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center px-6 space-y-4">
          <motion.span 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[10px] sm:text-xs font-black text-rose-400 uppercase tracking-[0.3em] block"
          >
            Mountain Monkey Security Infrastructure
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight"
          >
            Privacy Policy
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-sm sm:text-base md:text-lg font-bold text-slate-200 tracking-wide max-w-2xl mx-auto"
          >
            Review our data encryption directives, alpine satellite navigation logs, and guidelines on how we protect traveler coordinates.
          </motion.p>
        </div>

        {/* Waves divider */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-[#f8fafc] clip-path-wave" style={{ clipPath: "ellipse(60% 100% at 50% 100%)" }} />
      </div>

      {/* Main Workspace Layout */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Column 1: Sticky Navigation TOC */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
            <div className="bg-white border border-slate-100 p-6 rounded-[2rem] shadow-xs">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-4 px-2">Table of Contents</span>
              
              <div className="space-y-1.5">
                {dynamicSections.map((section: any, idx: number) => {
                  const Icon = icons[idx % icons.length] || Shield;
                  const sectionId = `privacy-section-${idx}`;
                  const isActive = activeSection === sectionId;
                  
                  return (
                    <button
                      key={idx}
                      onClick={() => scrollTo(sectionId)}
                      className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-3 cursor-pointer border-0 ${
                        isActive
                          ? 'bg-slate-900 text-white shadow-md'
                          : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800 bg-transparent'
                      }`}
                    >
                      <Icon size={14} className={isActive ? 'text-rose-400' : 'text-slate-400'} />
                      <span className="truncate">{section.heading}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick basecamp support alert */}
            <div className="bg-indigo-50/50 border border-indigo-100/50 p-6 rounded-[2rem] text-slate-600 text-xs font-semibold leading-relaxed space-y-3">
              <p className="font-extrabold text-slate-800">Your privacy matters</p>
              <p className="text-[11px] font-medium text-slate-500">For immediate personal data deletion requests or complete traveler coordinates removal, please contact our coordinator team.</p>
              <Link href="/contact" className="no-underline inline-block pt-1">
                <button className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-indigo-600 bg-transparent border-0 cursor-pointer p-0 hover:text-indigo-700">
                  Submit Request <ArrowUpRight size={14} />
                </button>
              </Link>
            </div>
          </div>

          {/* Column 2: Policies Detailed Panels */}
          <div className="lg:col-span-8 space-y-12">
            
            {dynamicSections.map((section: any, idx: number) => {
              const Icon = icons[idx % icons.length] || Shield;
              const colors = colorMap[idx % colorMap.length] || { bg: 'bg-slate-50', text: 'text-slate-500' };
              const sectionId = `privacy-section-${idx}`;
              const paragraphs = section.content.split('\n\n').filter(Boolean);

              return (
                <div 
                  key={idx}
                  id={sectionId} 
                  className="bg-white p-8 sm:p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-6 scroll-mt-24"
                >
                  <div className="flex items-center gap-3 pb-4 border-b border-slate-50">
                    <div className={`${colors.bg} ${colors.text} p-3 rounded-2xl`}>
                      <Icon size={22} />
                    </div>
                    <div>
                      <span className={`${colors.text} text-[9px] font-black uppercase tracking-widest block`}>Section 0{idx + 1}</span>
                      <h3 className="text-xl font-black text-slate-900 uppercase tracking-wide">{section.heading}</h3>
                    </div>
                  </div>

                  <div className="space-y-4 text-xs sm:text-sm font-medium text-slate-500 leading-relaxed">
                    {paragraphs.map((p: string) => renderParagraph(p))}
                  </div>
                </div>
              );
            })}

          </div>

        </div>
      </div>
    </div>
  );
}
