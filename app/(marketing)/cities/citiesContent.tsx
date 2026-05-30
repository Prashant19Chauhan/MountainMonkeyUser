"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Compass, Search, Globe, Inbox, ShieldCheck, CheckCircle } from 'lucide-react';
import { useActiveLocations, useCitiesPageSections } from '@/hooks/useCities';
import Link from 'next/link';

export default function CitiesContent() {
  const { data: locations, isLoading: locationsLoading } = useActiveLocations();
  const { data: pageCMS, isLoading: cmsLoading } = useCitiesPageSections();
  const [searchQuery, setSearchQuery] = useState("");

  const pageTitle = pageCMS?.title || "Operational Cities";
  const pageDescription = pageCMS?.description || "Discover MountainMonkey's active operational cities and basecamps across the Himalayan regions.";
  const cmsSections = pageCMS?.sections || [];

  const filteredLocations = (locations || []).filter((loc: any) => {
    const q = searchQuery.toLowerCase();
    return (
      loc.name?.toLowerCase().includes(q) ||
      loc.city?.toLowerCase().includes(q) ||
      loc.state?.toLowerCase().includes(q) ||
      loc.country?.toLowerCase().includes(q) ||
      loc.address?.toLowerCase().includes(q)
    );
  });

  if (locationsLoading || cmsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-slate-900 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-bold text-slate-500 tracking-wider uppercase">Loading Basecamp Hubs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f8fafc] min-h-screen font-sans">
      {/* Hero Header Parallax Banner */}
      <div className="relative h-[45vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=2070" 
            alt="Himalayan valley view with mountain village"
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
            Mountain Monkey Basecamp Operations
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight"
          >
            {pageTitle}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-sm sm:text-base md:text-lg font-bold text-slate-200 tracking-wide max-w-2xl mx-auto"
          >
            {pageDescription}
          </motion.p>
        </div>

        {/* Waves divider */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-[#f8fafc] clip-path-wave" style={{ clipPath: "ellipse(60% 100% at 50% 100%)" }} />
      </div>

      {/* Main Workspace Layout */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 space-y-16">
        
        {/* Search Bar section */}
        <div className="max-w-xl mx-auto">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
            <input 
              type="text"
              placeholder="Search cities by name, state, or country..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-6 py-4 bg-white border border-slate-100 rounded-[2rem] text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-slate-900/5 focus:border-slate-300 shadow-sm transition-all placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Cities Card Grid */}
        {filteredLocations.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-xs max-w-md mx-auto space-y-4">
            <Inbox className="mx-auto text-slate-200" size={44} />
            <p className="text-slate-400 text-xs font-black uppercase tracking-wider">No basecamp cities found</p>
            <p className="text-slate-500 font-medium text-xs leading-relaxed">
              We couldn't locate any dynamic cities matching "{searchQuery}". Please check spelling or search broad countries.
            </p>
          </div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {filteredLocations.map((loc: any, idx: number) => (
                <Link
                  href={`/cities/${loc.slug || loc._id}`}
                  key={loc._id || idx}
                  className="block"
                >
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-2xs hover:shadow-xs hover:border-slate-200/60 duration-300 transition-all space-y-6 flex flex-col justify-between group cursor-pointer h-full"
                  >
                    <div className="space-y-4">
                      {/* Header: Map Pin & City */}
                      <div className="flex items-center gap-3">
                        <div className="bg-indigo-50 text-indigo-500 p-3 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                          <MapPin size={20} />
                        </div>
                        <div className="text-left">
                          <h3 className="text-base font-black text-slate-900 uppercase tracking-wide leading-none">{loc.name}</h3>
                          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mt-1">
                            {loc.state ? `${loc.state}, ` : ''}{loc.country || 'Himalayas'}
                          </span>
                        </div>
                      </div>

                      {/* Address details */}
                      {loc.address && (
                        <p className="text-xs font-bold text-slate-500 leading-relaxed border-t border-slate-50 pt-4 text-left">
                          {loc.address}
                        </p>
                      )}
                    </div>

                    {/* Badges footer info */}
                    <div className="border-t border-slate-50 pt-4 flex flex-wrap items-center justify-between gap-3">
                      {loc.altitude ? (
                        <div className="flex items-center gap-1.5 bg-rose-50 text-rose-600 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider">
                          <Compass size={12} />
                          <span>{loc.altitude}m Alt</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 bg-rose-50 text-rose-600 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider">
                          <Compass size={12} />
                          <span>Basecamp</span>
                        </div>
                      )}

                      {loc.timezone && (
                        <div className="flex items-center gap-1 bg-slate-50 text-slate-500 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider">
                          <Globe size={12} />
                          <span>{loc.timezone}</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </Link>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Dynamic CMS Custom Layout Sections Below */}
        {cmsSections.length > 0 && (
          <div className="border-t border-slate-100 pt-16 space-y-12">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="text-[9px] font-black text-indigo-500 uppercase tracking-[0.25em] block">Basecamp Resource Guidelines</span>
              <h2 className="text-2xl font-black text-slate-900 uppercase tracking-wide">Operational Guidelines & Logistics</h2>
              <p className="text-xs font-semibold text-slate-400 leading-relaxed">Review important regional procedures, high-altitude support frameworks, and dynamic dispatch logistics.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              {cmsSections.map((sec: any, idx: number) => {
                const paragraphs = (sec.content || "").split('\n\n').filter(Boolean);
                return (
                  <div 
                    key={idx}
                    className="bg-white p-8 sm:p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-4"
                  >
                    <div className="flex items-center gap-2 pb-2 border-b border-slate-50">
                      <div className="bg-indigo-50 text-indigo-500 p-2 rounded-xl">
                        <CheckCircle size={16} />
                      </div>
                      <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide">{sec.heading}</h3>
                    </div>

                    <div className="space-y-3 text-xs font-medium text-slate-500 leading-relaxed pt-2">
                      {paragraphs.map((p: string, pIdx: number) => (
                        <p key={pIdx} className="whitespace-pre-line">{p}</p>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
