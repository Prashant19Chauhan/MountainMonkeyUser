"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, Compass, Globe, ArrowLeft, ArrowUpRight, 
  HelpCircle, Inbox, Tag, Calendar, Layers, Map
} from 'lucide-react';
import { useCityRelatedDetails } from '@/hooks/useCities';
import Link from 'next/link';

interface CityDetailContentProps {
  cityId: string;
}

export default function CityDetailContent({ cityId }: CityDetailContentProps) {
  const { data, isLoading, error } = useCityRelatedDetails(cityId);
  const [activeTab, setActiveTab] = useState<'destinations' | 'packages' | 'activities' | 'stays'>('destinations');

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 border-4 border-slate-900 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-black text-slate-500 tracking-wider uppercase">Hydrating Basecamp Intel...</p>
        </div>
      </div>
    );
  }

  if (error || !data?.city) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8fafc] p-6 text-center">
        <div className="w-16 h-16 bg-rose-50 border border-rose-100 rounded-3xl flex items-center justify-center text-rose-500 mb-6 shadow-sm">
          <Inbox size={32} />
        </div>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Intel Fetch Failure</h2>
        <p className="text-slate-500 font-semibold text-sm max-w-sm mt-2 leading-relaxed">
          The requested Himalayan basecamp city data could not be retrieved. It may have been retired or is undergoing maintenance.
        </p>
        <Link 
          href="/cities" 
          className="mt-6 px-6 py-3 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-black transition-all active:scale-95 shadow-lg shadow-slate-900/10"
        >
          Back to Cities
        </Link>
      </div>
    );
  }

  const { city, stays = [], activities = [], destinations = [], packages = [], customSections = [] } = data;

  const tabs = [
    { id: 'destinations', label: 'Curated Destinations', count: destinations.length, icon: Map },
    { id: 'packages', label: 'Tour Packages', count: packages.length, icon: Compass },
    { id: 'activities', label: 'Adventure Guide', count: activities.length, icon: Calendar },
    { id: 'stays', label: 'Premium Stays', count: stays.length, icon: Layers },
  ] as const;

  return (
    <div className="bg-[#f8fafc] min-h-screen font-sans text-slate-800 text-left">
      {/* Parallax Cover Image Banner */}
      <div className="relative h-[40vh] sm:h-[55vh] min-h-[320px] sm:min-h-[400px] flex items-end overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2070"
            alt="Snow capped peak behind deep green cedar hills"
            className="w-full h-full object-cover object-bottom"
          />
          {/* Gradients to blend */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#f8fafc] via-slate-900/40 to-slate-900/60 z-1" />
        </div>

        {/* Floating Back Navigation Button */}
        <div className="absolute top-6 sm:top-8 left-4 md:left-8 z-10">
          <Link 
            href="/cities" 
            className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-white/15 backdrop-blur-md border border-white/20 rounded-xl text-white hover:bg-white hover:text-slate-900 transition-all text-[10px] sm:text-xs font-black uppercase tracking-wider shadow-md"
          >
            <ArrowLeft size={14} className="sm:w-4 sm:h-4" />
            Back to Hubs
          </Link>
        </div>

        {/* Hero Meta Overlay Card */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 md:px-8 pb-8 sm:pb-12">
          <div className="max-w-3xl space-y-3 sm:space-y-4">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <span className="bg-rose-500/90 text-white text-[9px] sm:text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-lg border border-rose-400/20 shadow-md shadow-rose-500/10">
                {city.country || 'India'}
              </span>
              <span className="text-white/50 text-[10px] sm:text-xs">•</span>
              <span className="text-white/95 text-[10px] sm:text-xs font-bold font-sans uppercase tracking-wider">
                {city.state || 'Himalayan Ridge'}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-6xl font-black text-white tracking-tighter leading-none font-sans uppercase">
              {city.name}
            </h1>

            <p className="text-slate-200/90 text-xs sm:text-sm md:text-base font-medium sm:font-bold tracking-wide leading-relaxed max-w-2xl font-sans line-clamp-3 sm:line-clamp-none">
              {city.description || 'Welcome to one of MountainMonkey\'s dynamic basecamp regional headquarters, hosting operational setups and coordinates.'}
            </p>

            {/* Micro Stats Panel */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 pt-1 sm:pt-2">
              {city.altitude && (
                <div className="flex items-center gap-1 sm:gap-1.5 bg-white/10 backdrop-blur-md border border-white/10 text-white px-2.5 py-1 sm:px-3.5 sm:py-2 rounded-xl text-[10px] sm:text-xs font-bold font-sans shadow-sm">
                  <Compass size={12} className="text-rose-400 sm:w-3.5 sm:h-3.5" />
                  <span>Altitude: {city.altitude}m</span>
                </div>
              )}
              {city.timezone && (
                <div className="flex items-center gap-1 sm:gap-1.5 bg-white/10 backdrop-blur-md border border-white/10 text-white px-2.5 py-1 sm:px-3.5 sm:py-2 rounded-xl text-[10px] sm:text-xs font-bold font-sans shadow-sm">
                  <Globe size={12} className="text-rose-400 sm:w-3.5 sm:h-3.5" />
                  <span>Timezone: {city.timezone}</span>
                </div>
              )}
              {city.address && (
                <div className="flex items-center gap-1 sm:gap-1.5 bg-white/10 backdrop-blur-md border border-white/10 text-white px-2.5 py-1 sm:px-3.5 sm:py-2 rounded-xl text-[10px] sm:text-xs font-bold font-sans shadow-sm max-w-[200px] sm:max-w-xs truncate">
                  <MapPin size={12} className="text-rose-400 shrink-0 sm:w-3.5 sm:h-3.5" />
                  <span className="truncate">{city.address}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Tabs switcher */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 sm:py-12 space-y-8 sm:space-y-12">
        <div className="border-b border-slate-100 pb-2">
          {/* Mobile customized scrollable non-wrapping container */}
          <div className="flex flex-nowrap sm:flex-wrap items-center justify-start gap-2 md:gap-4 overflow-x-auto scrollbar-none pb-2 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 sm:gap-2 px-4 py-2.5 sm:px-5 sm:py-3 rounded-2xl text-[10px] sm:text-xs font-black uppercase tracking-wider transition-all duration-300 whitespace-nowrap shrink-0 border-0 cursor-pointer ${
                    isActive 
                      ? 'bg-slate-900 text-white shadow-xl shadow-slate-950/15 scale-[1.02]' 
                      : 'bg-white text-slate-500 hover:text-slate-800 hover:bg-slate-50 border border-slate-100 shadow-sm'
                  }`}
                >
                  <Icon size={12} className="sm:w-3.5 sm:h-3.5" />
                  <span>{tab.label}</span>
                  <span className={`px-1.5 py-0.5 rounded-lg text-[8px] sm:text-[9px] font-black ${
                    isActive ? 'bg-white/25 text-white' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab content slider grid */}
        <div className="min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'destinations' && (
                destinations.length === 0 ? (
                  <EmptyState type="destinations" />
                ) : (
                  /* Premium mobile layout: swipe carousel on mobile, 2-3 col grid on desktop */
                  <div className="flex overflow-x-auto sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pb-4 sm:pb-0 snap-x snap-mandatory scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
                    {destinations.map((dest: any) => (
                      <Link 
                        href={`/destinations/${dest.slug}`}
                        key={dest._id}
                        className="group flex flex-col bg-white border border-slate-100 rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-xl hover:border-slate-200/50 transition-all duration-500 min-w-[280px] xs:min-w-[320px] sm:min-w-0 snap-start shrink-0 sm:shrink"
                      >
                        <div className="relative aspect-[16/10] bg-slate-50 overflow-hidden shrink-0">
                          <img 
                            src={dest.images?.[0] || 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=800'}
                            alt={dest.name}
                            className="w-full h-full object-cover group-hover:scale-110 duration-700 transition-all"
                          />
                          <span className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md text-white text-[8px] sm:text-[9px] font-black tracking-widest px-2.5 py-1 rounded-lg border border-white/10 uppercase">
                            {dest.placeType || 'Explore'}
                          </span>
                        </div>
                        <div className="p-5 sm:p-6 flex flex-col justify-between flex-1 space-y-4">
                          <div className="space-y-1.5 sm:space-y-2 text-left">
                            <h3 className="font-black text-base sm:text-lg text-slate-900 group-hover:text-rose-500 transition-colors uppercase leading-tight">{dest.name}</h3>
                            <p className="text-slate-500 text-[11px] sm:text-xs font-semibold leading-relaxed line-clamp-2">
                              {dest.shortDescription || dest.description}
                            </p>
                          </div>
                          <div className="border-t border-slate-50 pt-4 flex items-center justify-between text-[10px] sm:text-xs font-bold text-slate-400 uppercase">
                            <span>Details</span>
                            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )
              )}

              {activeTab === 'packages' && (
                packages.length === 0 ? (
                  <EmptyState type="tour packages" />
                ) : (
                  <div className="flex overflow-x-auto sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pb-4 sm:pb-0 snap-x snap-mandatory scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
                    {packages.map((pkg: any) => (
                      <Link 
                        href={`/packages/${pkg.slug}`}
                        key={pkg._id}
                        className="group flex flex-col bg-white border border-slate-100 rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-xl hover:border-slate-200/50 transition-all duration-500 min-w-[280px] xs:min-w-[320px] sm:min-w-0 snap-start shrink-0 sm:shrink"
                      >
                        <div className="relative aspect-[16/10] bg-slate-50 overflow-hidden shrink-0">
                          <img 
                            src={pkg.images?.[0] || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800'}
                            alt={pkg.title}
                            className="w-full h-full object-cover group-hover:scale-110 duration-700 transition-all"
                          />
                          <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                            <span className="bg-slate-900/80 backdrop-blur-md text-white text-[8px] sm:text-[9px] font-black tracking-widest px-2.5 py-1 rounded-lg border border-white/10 uppercase">
                              {pkg.duration?.days}D / {pkg.duration?.nights}N
                            </span>
                            {pkg.aiMetadata?.tags?.[0] && (
                              <span className="bg-rose-500/90 text-white text-[8px] sm:text-[9px] font-black tracking-widest px-2.5 py-1 rounded-lg uppercase shadow-sm">
                                {pkg.aiMetadata.tags[0]}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="p-5 sm:p-6 flex flex-col justify-between flex-1 space-y-4">
                          <div className="space-y-1.5 sm:space-y-2 text-left">
                            <h3 className="font-black text-base sm:text-lg text-slate-900 group-hover:text-rose-500 transition-colors uppercase leading-tight">{pkg.title}</h3>
                            <p className="text-slate-500 text-[11px] sm:text-xs font-semibold leading-relaxed line-clamp-2">
                              {pkg.shortDescription || pkg.description}
                            </p>
                          </div>
                          <div className="border-t border-slate-50 pt-4 flex items-center justify-between">
                            <div className="text-left">
                              <span className="text-[8px] sm:text-[9px] text-slate-400 font-black block uppercase tracking-wider">STARTING</span>
                              <span className="font-black text-sm sm:text-base text-slate-900">₹{pkg.pricing?.discountedPrice || pkg.pricing?.basePrice}</span>
                            </div>
                            <ArrowUpRight size={14} className="text-slate-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )
              )}

              {activeTab === 'activities' && (
                activities.length === 0 ? (
                  <EmptyState type="activities" />
                ) : (
                  <div className="flex overflow-x-auto sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pb-4 sm:pb-0 snap-x snap-mandatory scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
                    {activities.map((act: any) => (
                      <Link 
                        href={`/activities/${act.slug}`}
                        key={act._id}
                        className="group flex flex-col bg-white border border-slate-100 rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-xl hover:border-slate-200/50 transition-all duration-500 min-w-[280px] xs:min-w-[320px] sm:min-w-0 snap-start shrink-0 sm:shrink"
                      >
                        <div className="relative aspect-[16/10] bg-slate-50 overflow-hidden shrink-0">
                          <img 
                            src={act.images?.[0] || 'https://images.unsplash.com/photo-1533240332313-0db49b439ad3?auto=format&fit=crop&q=80&w=800'}
                            alt={act.name}
                            className="w-full h-full object-cover group-hover:scale-110 duration-700 transition-all"
                          />
                          <span className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md text-white text-[8px] sm:text-[9px] font-black tracking-widest px-2.5 py-1 rounded-lg border border-white/10 uppercase">
                            {act.difficultyLevel || 'Easy'}
                          </span>
                        </div>
                        <div className="p-5 sm:p-6 flex flex-col justify-between flex-1 space-y-4">
                          <div className="space-y-1.5 sm:space-y-2 text-left">
                            <h3 className="font-black text-base sm:text-lg text-slate-900 group-hover:text-rose-500 transition-colors uppercase leading-tight">{act.name}</h3>
                            <p className="text-slate-500 text-[11px] sm:text-xs font-semibold leading-relaxed line-clamp-2">
                              {act.shortDescription || act.longDescription}
                            </p>
                          </div>
                          <div className="border-t border-slate-50 pt-4 flex items-center justify-between">
                            <div className="text-left">
                              <span className="text-[8px] sm:text-[9px] text-slate-400 font-black block uppercase tracking-wider font-sans">PRICING</span>
                              <span className="font-black text-sm sm:text-base text-slate-900">
                                {act.currentPrice ? `₹${act.currentPrice}` : 'Free'}
                              </span>
                            </div>
                            <ArrowUpRight size={14} className="text-slate-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )
              )}

              {activeTab === 'stays' && (
                stays.length === 0 ? (
                  <EmptyState type="stays" />
                ) : (
                  <div className="flex overflow-x-auto sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pb-4 sm:pb-0 snap-x snap-mandatory scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
                    {stays.map((stay: any) => (
                      <Link 
                        href={`/stays/${stay.slug}`}
                        key={stay._id}
                        className="group flex flex-col bg-white border border-slate-100 rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-xl hover:border-slate-200/50 transition-all duration-500 min-w-[280px] xs:min-w-[320px] sm:min-w-0 snap-start shrink-0 sm:shrink"
                      >
                        <div className="relative aspect-[16/10] bg-slate-50 overflow-hidden shrink-0">
                          <img 
                            src={stay.images?.[0] || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800'}
                            alt={stay.name}
                            className="w-full h-full object-cover group-hover:scale-110 duration-700 transition-all"
                          />
                          <span className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md text-white text-[8px] sm:text-[9px] font-black tracking-widest px-2.5 py-1 rounded-lg border border-white/10 uppercase">
                            {stay.type || 'Stay'}
                          </span>
                        </div>
                        <div className="p-5 sm:p-6 flex flex-col justify-between flex-1 space-y-4">
                          <div className="space-y-1.5 sm:space-y-2 text-left">
                            <h3 className="font-black text-base sm:text-lg text-slate-900 group-hover:text-rose-500 transition-colors uppercase leading-tight">{stay.name}</h3>
                            <p className="text-slate-500 text-[11px] sm:text-xs font-semibold leading-relaxed line-clamp-2">
                              {stay.shortDescription || stay.longDescription}
                            </p>
                          </div>
                          <div className="border-t border-slate-50 pt-4 flex items-center justify-between">
                            <div className="text-left">
                              <span className="text-[8px] sm:text-[9px] text-slate-400 font-black block uppercase tracking-wider font-sans">PER NIGHT</span>
                              <span className="font-black text-sm sm:text-base text-slate-900">
                                {stay.priceRange?.min ? `₹${stay.priceRange.min}` : 'Contact Hub'}
                              </span>
                            </div>
                            <ArrowUpRight size={14} className="text-slate-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Custom Admin CMS Sub-Sections Layout Output */}
        {customSections.length > 0 && (
          <div className="border-t border-slate-100 pt-10 sm:pt-16 space-y-10 sm:space-y-16">
            <div className="max-w-xl text-left space-y-1 sm:space-y-2">
              <span className="text-[8px] sm:text-[9px] font-black text-indigo-500 uppercase tracking-[0.25em] block">Locational Specifications & Logistics</span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-wide">Basecamp Information & Regional Procedures</h2>
              <p className="text-xs font-semibold text-slate-400 leading-relaxed">Review important regional guidelines, high-altitude logistics support, and custom coordination FAQs.</p>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:gap-12">
              {customSections.map((sec: any, idx: number) => (
                <div 
                  key={idx}
                  className="bg-white p-6 sm:p-12 rounded-[2rem] sm:rounded-[3.5rem] border border-slate-100 shadow-sm space-y-6 sm:space-y-8 text-left"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
                    {/* Left side: Heading, Paragraph, Links & Images */}
                    <div className="space-y-5">
                      <div className="space-y-2">
                        <span className="text-[8px] sm:text-[9px] font-black text-rose-500 uppercase tracking-[0.3em] block">Content Block #{idx + 1}</span>
                        <h3 className="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-tight">{sec.heading}</h3>
                        <p className="text-slate-500 text-xs sm:text-sm font-medium leading-relaxed whitespace-pre-line">
                          {sec.paragraph}
                        </p>
                      </div>

                      {/* Dynamic links pills */}
                      {sec.links && sec.links.length > 0 && (
                        <div className="space-y-2">
                          <h5 className="text-[8px] sm:text-[9px] font-black text-slate-400 uppercase tracking-wider">Helpful Resources</h5>
                          <div className="flex flex-wrap gap-1.5 sm:gap-2">
                            {sec.links.map((link: any, lIdx: number) => (
                              <a 
                                key={lIdx}
                                href={link.url}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 hover:text-indigo-950 rounded-xl text-[9px] sm:text-[10px] font-black uppercase tracking-wider transition-all duration-300"
                              >
                                <span>{link.text}</span>
                                <ArrowUpRight size={10} />
                              </a>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Image grids if present */}
                      {sec.images && sec.images.length > 0 && (
                        <div className="space-y-2">
                          <h5 className="text-[8px] sm:text-[9px] font-black text-slate-400 uppercase tracking-wider">Visual Assets</h5>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                            {sec.images.map((img: string, imgIdx: number) => (
                              <div key={imgIdx} className="aspect-video bg-slate-50 rounded-2xl overflow-hidden border border-slate-100">
                                <img src={img} alt="Regional Setup Asset" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Right side: Accordion FAQ pairs */}
                    {sec.faq && sec.faq.length > 0 && (
                      <div className="space-y-3 sm:space-y-4">
                        <div className="flex items-center gap-2 border-b border-slate-50 pb-2 sm:pb-3">
                          <HelpCircle className="text-indigo-500" size={16} />
                          <h4 className="text-[11px] sm:text-xs font-black text-slate-900 uppercase tracking-wider">Frequently Asked Questions</h4>
                        </div>
                        <FaqAccordion items={sec.faq} />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Sub-component Helper: Empty State
function EmptyState({ type }: { type: string }) {
  return (
    <div className="text-center py-12 sm:py-16 bg-white border border-slate-100 rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-8 max-w-sm mx-auto shadow-2xs space-y-4">
      <Inbox size={36} className="mx-auto text-slate-200 animate-bounce" />
      <p className="text-slate-400 text-[10px] sm:text-xs font-black uppercase tracking-widest">No active {type} registered</p>
      <p className="text-slate-500 text-xs font-medium leading-relaxed text-center">
        We are actively setting up operational pipelines for {type} in this mountain city basecamp. Please verify later.
      </p>
    </div>
  );
}

// Sub-component Helper: FAQ Accordion
function FaqAccordion({ items }: { items: { question: string; answer: string }[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <div className="space-y-2 sm:space-y-3">
      {items.map((item, idx) => {
        const isOpen = openIdx === idx;
        return (
          <div key={idx} className="bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden transition-all duration-300 text-left">
            <button
              onClick={() => setOpenIdx(isOpen ? null : idx)}
              className="w-full px-4 py-3 sm:px-5 sm:py-4 flex items-center justify-between text-left font-extrabold text-slate-800 hover:bg-slate-100 transition-colors border-0 bg-transparent cursor-pointer text-[10px] sm:text-xs uppercase tracking-wider"
            >
              <span>{item.question}</span>
              <span className={`text-slate-400 font-bold transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>▼</span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <p className="px-4 pb-4 sm:px-5 sm:pb-5 text-slate-500 text-[11px] sm:text-xs font-medium leading-relaxed">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
