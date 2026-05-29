"use client";

import React, { useState } from 'react';
import { useStaysPageSections } from '@/hooks/useStays';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowRight, HelpCircle } from 'lucide-react';
import Link from 'next/link';

export const StayCustomSections = () => {
  const { data: pageContent, isLoading } = useStaysPageSections();
  const [expandedFaqs, setExpandedFaqs] = useState<{ [key: string]: boolean }>({});

  const toggleFaq = (sectionIdx: number, faqIdx: number) => {
    const key = `${sectionIdx}-${faqIdx}`;
    setExpandedFaqs(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  if (isLoading || !pageContent || !pageContent.customSections || pageContent.customSections.length === 0) {
    return null;
  }

  const sections = pageContent.customSections;

  return (
    <div className="space-y-24 py-12 bg-transparent overflow-hidden">
      {sections.map((section: any, sIdx: number) => {
        const isEven = sIdx % 2 === 0;
        const hasImages = section.images && section.images.length > 0;
        const imageCount = section.images?.length || 0;

        return (
          <section key={sIdx} className="w-full">
            <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center ${
              isEven ? '' : 'lg:flex-row-reverse'
            }`}>
              
              {/* Text & Content Block (col-span-6 or full if no images) */}
              <div className={`space-y-8 ${
                hasImages ? 'lg:col-span-6' : 'lg:col-span-10 lg:col-start-2 text-center'
              } ${(!isEven && hasImages) ? 'lg:order-2' : ''}`}>
                
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

              {/* Images Block (col-span-6 or hidden if no images) */}
              {hasImages && (
                <div className={`lg:col-span-6 ${(!isEven) ? 'lg:order-1' : ''}`}>
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
      })}
    </div>
  );
};
