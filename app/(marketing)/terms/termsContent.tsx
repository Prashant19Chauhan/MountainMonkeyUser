"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Compass, ShieldAlert, BadgeAlert, ArrowUpRight, Scale, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import { useTermsPageSections } from '@/hooks/useTerms';

export default function TermsContent() {
  const { data: pageContent, isLoading } = useTermsPageSections();
  const [activeSection, setActiveSection] = useState('terms-section-0');

  // Fallback defaults if no backend details yet
  const dynamicSections = pageContent?.sections || [
    {
      heading: "Scope of Services",
      content: "Mountain Monkey Adventures (\"we\", \"us\", or \"our\") provides travelers, explorers, and adventure seekers with premium, high-altitude curated itineraries, experiential activity planning, local accommodation arrangements (\"stays\"), and ecological guided expeditions.\n\nAll bookings, itineraries, and reservations displayed on our platform are processed dynamically through our ecological and weather assessment systems. While we make every attempt to ensure scheduling accuracy, all travel sequences are subject to changes based on high-altitude weather patterns, road conditions, and safety protocols."
    },
    {
      heading: "Booking Agreements",
      content: "To secure reservations for our customized tour packages, stays, or alpine activities, travelers must complete the required checkout details, provide accurate personal identification, and submit the designated booking deposit as displayed in the confirmation metrics.\n\nPhysical Fitness & Health Certifications\nExpeditions exceeding altitudes of 3,000 meters above sea level strictly require travelers to submit a certified physical fitness card or self-declaration medical clearance. Mountain Monkey reserves the absolute right to refuse trek participation to any explorer failing health checks on day-one of basecamp briefings."
    },
    {
      heading: "Cancellation & Refunds",
      content: "Our cancellation guidelines protect our native communities, eco-stay owners, and local guides whose livelihoods depend on reservation slots.\n\n30+ Days Before Departure: 100% Refund (Less Processing Fees)\n15 - 29 Days Before Departure: 50% Refund\nLess than 15 Days Before Departure: 0% Refund / Non-refundable\n\nWeather-induced rescheduling: In cases of severe cloudbursts, avalanches, or local government travel bans, bookings will be rescheduled into general digital travel vouchers valid for 365 days. Cash refunds are not applicable for weather cancellations."
    },
    {
      heading: "Liability Disclosures",
      content: "High-altitude adventure travel in mountainous regions involves inherent hazards, including temperature changes, sudden blizzards, challenging terrain, physical exhaustion, and acute mountain sickness (AMS).\n\nBy booking a package or experiential trek with us, you explicitly acknowledge and assume these risk elements. Mountain Monkey, its owners, and its certified guide leads are not responsible for any personal injuries, loss of items, or emergency medical evacuations resulting from traveler negligence or extreme environmental occurrences.\n\nTravelers are strongly advised to secure comprehensive travel and medical insurance policies covering mountain rescue and high-altitude emergency assistance."
    },
    {
      heading: "Ecological Conduct",
      content: "Mountain Monkey is fundamentally committed to the preservation of high-altitude ecology, clean streams, and native mountain cultures.\n\nLeave-No-Trace & Waste Protocols\nTravelers must strictly adhere to our guide directions regarding refuse waste. Carry back all plastics, single-use wrappers, and non-biodegradable waste to the designated recycling drop-offs at our lower basecamps.\n\nExplorers must respect native cultural customs, village rules, historic shrines, and wildlife habitats along all paths. Littering or disruptive behavior will lead to an immediate dismissal from the tour package without any refund options."
    }
  ];

  const icons = [Compass, FileText, BadgeAlert, ShieldAlert, Scale];
  const colorMap = [
    { bg: 'bg-indigo-50', text: 'text-indigo-500' },
    { bg: 'bg-rose-50', text: 'text-rose-500' },
    { bg: 'bg-emerald-50', text: 'text-emerald-500' },
    { bg: 'bg-amber-50', text: 'text-amber-500' },
    { bg: 'bg-emerald-50', text: 'text-emerald-500' },
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
        const id = `terms-section-${idx}`;
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
    if (text.includes("Physical Fitness & Health")) {
      return (
        <div key={text} className="bg-rose-50/30 border border-rose-100/50 p-5 rounded-2xl space-y-2 mt-4">
          <span className="text-[9px] font-black text-rose-600 uppercase tracking-widest block">⚠ Physical Fitness & Health Certifications</span>
          <p className="text-[11px] leading-relaxed text-slate-500 font-medium">
            Expeditions exceeding altitudes of 3,000 meters above sea level strictly require travelers to submit a certified physical fitness card or self-declaration medical clearance. Mountain Monkey reserves the absolute right to refuse trek participation to any explorer failing health checks on day-one of basecamp briefings.
          </p>
        </div>
      );
    }

    if (text.includes("Leave-No-Trace")) {
      return (
        <div key={text} className="bg-emerald-50/30 border border-emerald-100/50 p-5 rounded-2xl space-y-2 mt-4">
          <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest block">🍀 Leave-No-Trace & Waste Protocols</span>
          <p className="text-[11px] leading-relaxed text-slate-500 font-medium">
            Travelers must strictly adhere to our guide directions regarding refuse waste. Carry back all plastics, single-use wrappers, and non-biodegradable waste to the designated recycling drop-offs at our lower basecamps.
          </p>
        </div>
      );
    }

    if (text.includes("30+ Days Before Departure") || text.includes("15 - 29 Days")) {
      return (
        <div key={text} className="border border-slate-100 rounded-2xl overflow-hidden mt-4">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 font-black uppercase text-slate-400 tracking-wider border-b border-slate-100">
                <th className="p-3.5 pl-5">Timeframe prior to Trek</th>
                <th className="p-3.5 text-center">Refund Percentage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-slate-600 font-semibold">
              <tr>
                <td className="p-3.5 pl-5">30+ Days Before Departure</td>
                <td className="p-3.5 text-center text-emerald-600">100% Refund (Less Processing Fees)</td>
              </tr>
              <tr>
                <td className="p-3.5 pl-5">15 - 29 Days Before Departure</td>
                <td className="p-3.5 text-center text-amber-600">50% Refund</td>
              </tr>
              <tr>
                <td className="p-3.5 pl-5">Less than 15 Days Before Departure</td>
                <td className="p-3.5 text-center text-rose-600">0% Refund / Non-refundable</td>
              </tr>
            </tbody>
          </table>
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
          <p className="text-xs font-bold text-slate-500 tracking-wider uppercase">Loading Agreements...</p>
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
            src="https://images.unsplash.com/photo-1486915309851-b0cc1f8a0084?q=80&w=2070" 
            alt="Snow-capped Himalayan Summit peak"
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
            Mountain Monkey Legal Framework
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight"
          >
            Terms of Use
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-sm sm:text-base md:text-lg font-bold text-slate-200 tracking-wide max-w-2xl mx-auto"
          >
            Please read these booking agreements, liability disclosures, and high-altitude ecological protocols before scheduling your bespoke Himalayan expedition.
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
                  const Icon = icons[idx % icons.length] || HelpCircle;
                  const sectionId = `terms-section-${idx}`;
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
            <div className="bg-rose-50/50 border border-rose-100/50 p-6 rounded-[2rem] text-slate-600 text-xs font-semibold leading-relaxed space-y-3">
              <p className="font-extrabold text-slate-800">Need legal assistance?</p>
              <p className="text-[11px] font-medium text-slate-500">For specific custom itinerary contracts or institutional exploration agreements, please contact our basecamp coordinators directly.</p>
              <Link href="/contact" className="no-underline inline-block pt-1">
                <button className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-rose-600 bg-transparent border-0 cursor-pointer p-0 hover:text-rose-700">
                  Contact HQ <ArrowUpRight size={14} />
                </button>
              </Link>
            </div>
          </div>

          {/* Column 2: Policies Detailed Panels */}
          <div className="lg:col-span-8 space-y-12">
            
            {dynamicSections.map((section: any, idx: number) => {
              const Icon = icons[idx % icons.length] || HelpCircle;
              const colors = colorMap[idx % colorMap.length] || { bg: 'bg-slate-50', text: 'text-slate-500' };
              const sectionId = `terms-section-${idx}`;
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
