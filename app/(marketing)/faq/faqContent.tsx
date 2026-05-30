"use client";

import React, { useState } from 'react';
import { useFaqPageSections } from '@/hooks/useFaq';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, ArrowRight, BookOpen } from 'lucide-react';
import Link from 'next/link';

export default function FAQContent() {
  const { data: pageContent, isLoading } = useFaqPageSections();
  const [activeTabIdx, setActiveTabIdx] = useState(0);
  const [expandedFaqs, setExpandedFaqs] = useState<{ [key: string]: boolean }>({});

  const toggleFaq = (faqIdx: number) => {
    const key = `${activeTabIdx}-${faqIdx}`;
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
          <p className="text-xs font-bold text-slate-500 tracking-wider uppercase">Loading FAQ Content...</p>
        </div>
      </div>
    );
  }

  // Fallback defaults if no backend details yet
  const sections = pageContent?.sections || [
    {
      heading: "Expeditions & Bookings",
      faqs: [
        {
          question: "How do I book a customized Himalayan tour?",
          answer: "You can easily request a customized trek or stay by navigating to our enquiry systems or contacting our basecamp explorers directly.",
          link: {
            text: "Plan Custom Trek",
            url: "/contact"
          }
        }
      ]
    }
  ];

  const activeSection = sections[activeTabIdx] || sections[0] || { heading: '', faqs: [] };

  return (
    <div className="bg-[#f8fafc] min-h-screen font-sans">
      {/* Hero Header Banner */}
      <div className="relative h-[45vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1551829142-d9b812de3d33?q=80&w=2070" 
            alt="Himalayan Basecamp Tents under Peak"
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
            Basecamp Explorer Support
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight"
          >
            Information Center
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-sm sm:text-base md:text-lg font-bold text-slate-200 tracking-wide max-w-2xl mx-auto"
          >
            Find detailed answers to frequently asked questions regarding altitude preparations, booking guides, gear lists, and cancellation policies.
          </motion.p>
        </div>

        {/* Waves divider */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-[#f8fafc] clip-path-wave" style={{ clipPath: "ellipse(60% 100% at 50% 100%)" }} />
      </div>

      {/* Main Content Sections */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-16 space-y-12">
        
        {sections.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-xs max-w-md mx-auto">
            <HelpCircle className="mx-auto text-slate-200" size={40} />
            <p className="text-slate-400 text-sm font-bold uppercase tracking-wider mt-4">No FAQ details added yet</p>
            <p className="text-slate-500 font-medium text-xs mt-2 leading-relaxed">
              We are currently populating and structuring frequently asked questions. Please return shortly for detailed guides!
            </p>
          </div>
        ) : (
          <div className="space-y-10">
            {/* Category tabs navigation row */}
            <div className="flex items-center gap-2 bg-white p-2 border border-slate-100 rounded-[2.25rem] shadow-xs overflow-x-auto no-scrollbar justify-start md:justify-center">
              {sections.map((section: any, idx: number) => {
                const isActive = activeTabIdx === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setActiveTabIdx(idx);
                      setExpandedFaqs({}); // collapse open faqs on tab change
                    }}
                    className={`px-8 py-3 rounded-full text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap border-0 cursor-pointer ${
                      isActive 
                        ? 'bg-slate-900 text-white shadow-md' 
                        : 'text-slate-500 hover:bg-slate-50'
                    }`}
                  >
                    {section.heading}
                  </button>
                );
              })}
            </div>

            {/* FAQs List under the active tab */}
            <div className="max-w-4xl mx-auto space-y-4">
              {(!activeSection.faqs || activeSection.faqs.length === 0) ? (
                <div className="text-center py-16 bg-white rounded-3xl border border-slate-100 font-bold text-slate-400 text-xs uppercase tracking-wider">
                  No FAQs in this category segment yet.
                </div>
              ) : (
                activeSection.faqs.map((faq: any, fIdx: number) => {
                  const isOpen = !!expandedFaqs[`${activeTabIdx}-${fIdx}`];
                  const hasLink = faq.link && faq.link.text && faq.link.url;

                  return (
                    <div 
                      key={fIdx} 
                      className="bg-white border border-slate-100 rounded-[2rem] overflow-hidden shadow-2xs hover:shadow-xs hover:border-slate-200/60 transition-all duration-300"
                    >
                      <button
                        onClick={() => toggleFaq(fIdx)}
                        className="w-full flex items-center justify-between p-6 text-left font-black text-xs md:text-sm text-slate-800 tracking-wide uppercase group cursor-pointer border-0 bg-transparent"
                      >
                        <span className="flex items-center gap-3">
                          <HelpCircle size={16} className="text-indigo-500 shrink-0" />
                          {faq.question}
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
                            <div className="p-6 pt-0 text-slate-500 font-medium text-xs md:text-sm leading-relaxed border-t border-slate-50 bg-slate-50/20 space-y-4">
                              <p className="whitespace-pre-line">{faq.answer}</p>
                              
                              {/* Custom redirect badge link option */}
                              {hasLink && (
                                <div className="pt-2">
                                  <Link href={faq.link.url} className="no-underline inline-block">
                                    <button className="flex items-center gap-2 px-5 py-2.5 bg-indigo-50 hover:bg-rose-500 hover:text-white text-indigo-600 rounded-full font-black text-[9px] md:text-[10px] uppercase tracking-widest border-0 cursor-pointer duration-300 transition-all shadow-2xs hover:shadow-md">
                                      <BookOpen size={12} />
                                      {faq.link.text}
                                      <ArrowRight size={12} />
                                    </button>
                                  </Link>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
