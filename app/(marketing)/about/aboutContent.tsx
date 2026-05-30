"use client";

import React, { useState } from 'react';
import { useAboutPageSections } from '@/hooks/useAbout';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowRight, HelpCircle } from 'lucide-react';
import Link from 'next/link';

export default function AboutContent() {
  const { data: pageContent, isLoading } = useAboutPageSections();
  const [expandedFaqs, setExpandedFaqs] = useState<{ [key: string]: boolean }>({});

  const toggleFaq = (sectionIdx: number, faqIdx: number) => {
    const key = `${sectionIdx}-${faqIdx}`;
    setExpandedFaqs(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-slate-900 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-bold text-slate-500 tracking-wider uppercase">Loading Content...</p>
        </div>
      </div>
    );
  }

  // Fallback defaults if no database entries yet
  const hero = pageContent?.hero || {
    title: "About Us",
    tagline: "Embark on an extraordinary Himalayan adventure with MountainMonkey.",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070"
  };

  const sections = pageContent?.customSections || [];

  return (
    <div className="bg-[#f8fafc] min-h-screen font-sans">
      {/* Hero Section */}
      <div className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={hero.image || "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070"} 
            alt={hero.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px]" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center px-6 space-y-6">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl sm:text-5xl md:text-7xl font-black text-white tracking-tight leading-tight"
          >
            {hero.title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-base sm:text-lg md:text-xl font-bold text-slate-200 tracking-wide max-w-2xl mx-auto"
          >
            {hero.tagline}
          </motion.p>
        </div>

        {/* Waves divider */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-[#f8fafc] clip-path-wave" style={{ clipPath: "ellipse(60% 100% at 50% 100%)" }} />
      </div>

      {/* Main Content Sections */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24 space-y-24 md:space-y-36">
        {sections.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-xs max-w-md mx-auto">
            <p className="text-slate-400 text-sm font-bold uppercase tracking-wider">Welcome to MountainMonkey</p>
            <p className="text-slate-500 font-medium text-xs mt-2">Content is currently being prepared. Check back shortly for our stories!</p>
          </div>
        ) : (
          sections.map((section: any, sIdx: number) => {
            const isEven = sIdx % 2 === 0;
            const hasImages = section.images && section.images.length > 0;
            const imageCount = section.images?.length || 0;

            return (
              <section key={sIdx} className="w-full">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
                  
                  {/* Text & Content Block */}
                  <div className={`space-y-8 lg:col-span-6 ${
                    (!isEven && hasImages) ? 'lg:order-2' : ''
                  } ${!hasImages ? 'lg:col-span-10 lg:col-start-2 text-center mx-auto' : ''}`}>
                    
                    {/* Heading & Paragraph */}
                    <div className="space-y-4">
                      <motion.h2 
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight"
                      >
                        {section.heading}
                      </motion.h2>
                      <motion.p 
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className={`text-slate-500 font-medium text-sm md:text-base leading-relaxed ${
                          hasImages ? 'max-w-xl' : 'max-w-3xl mx-auto'
                        }`}
                      >
                        {section.paragraph}
                      </motion.p>
                    </div>

                    {/* FAQ Accordions */}
                    {section.faq && section.faq.length > 0 && (
                      <div className={`space-y-3 pt-2 ${!hasImages ? 'max-w-3xl mx-auto text-left' : ''}`}>
                        {section.faq.map((item: any, fIdx: number) => {
                          const isOpen = !!expandedFaqs[`${sIdx}-${fIdx}`];
                          return (
                            <div 
                              key={fIdx} 
                              className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300"
                            >
                              <button
                                onClick={() => toggleFaq(sIdx, fIdx)}
                                className="w-full flex items-center justify-between p-5 text-left font-black text-xs md:text-sm text-slate-800 tracking-wide uppercase group cursor-pointer border-0 bg-transparent"
                              >
                                <span className="flex items-center gap-3">
                                  <HelpCircle size={16} className="text-indigo-500 shrink-0" />
                                  {item.question}
                                </span>
                                <motion.div
                                  animate={{ rotate: isOpen ? 180 : 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="text-slate-400 group-hover:text-slate-600 shrink-0"
                                >
                                  <ChevronDown size={18} />
                                </motion.div>
                              </button>
                              
                              <AnimatePresence initial={false}>
                                {isOpen && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                                  >
                                    <div className="p-5 pt-0 text-slate-500 font-medium text-xs md:text-sm leading-relaxed border-t border-slate-50 bg-slate-50/20">
                                      {item.answer}
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Links / Action Buttons */}
                    {section.links && section.links.length > 0 && (
                      <div className={`flex flex-wrap gap-4 pt-4 ${!hasImages ? 'justify-center' : ''}`}>
                        {section.links.map((link: any, lIdx: number) => (
                          <Link key={lIdx} href={link.url} className="no-underline">
                            <button className="flex items-center gap-2 px-6 py-3.5 bg-slate-900 hover:bg-rose-500 text-white rounded-full font-black text-[10px] md:text-xs uppercase tracking-widest transition-all hover:shadow-lg hover:shadow-rose-100 border-0 cursor-pointer duration-300">
                              {link.text}
                              <ArrowRight size={14} />
                            </button>
                          </Link>
                        ))}
                      </div>
                    )}

                  </div>

                  {/* Images Block */}
                  {hasImages && (
                    <div className={`lg:col-span-6 ${
                      (!isEven) ? 'lg:order-1' : ''
                    }`}>
                      {imageCount === 1 ? (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.95 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6 }}
                          className="aspect-4/3 sm:aspect-16/10 lg:aspect-square bg-slate-100 rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden shadow-2xl border border-slate-100/50 group/img"
                        >
                          <img 
                            src={section.images[0]} 
                            alt={section.heading} 
                            className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-700" 
                          />
                        </motion.div>
                      ) : (
                        <div className="grid grid-cols-2 gap-4 md:gap-6">
                          {section.images.slice(0, 4).map((img: string, iIdx: number) => {
                            const isOddImg = iIdx % 2 !== 0;
                            return (
                              <motion.div
                                key={iIdx}
                                initial={{ opacity: 0, y: isOddImg ? 20 : -20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: iIdx * 0.1 }}
                                className={`aspect-square rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-lg border border-slate-100 group/subimg ${
                                  isOddImg ? 'translate-y-6 md:translate-y-8' : ''
                                }`}
                              >
                                <img 
                                  src={img} 
                                  alt={`${section.heading} - ${iIdx}`} 
                                  className="w-full h-full object-cover group-hover/subimg:scale-105 transition-transform duration-500" 
                                />
                              </motion.div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}

                </div>
              </section>
            );
          })
        )}
      </div>
    </div>
  );
}
