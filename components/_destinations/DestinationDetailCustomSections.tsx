"use client";

import React, { useState } from 'react';
import { useDestinationDetailSections } from '@/hooks/useDestinations';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowRight, HelpCircle } from 'lucide-react';
import Link from 'next/link';

type Props = {
  destinationSlug: string;
};

export const DestinationDetailCustomSections = ({ destinationSlug }: Props) => {
  const { data: sectionsData, isLoading } = useDestinationDetailSections(destinationSlug);
  const [expandedFaqs, setExpandedFaqs] = useState<{ [key: string]: boolean }>({});

  const toggleFaq = (sIdx: number, fIdx: number) => {
    const key = `${sIdx}-${fIdx}`;
    setExpandedFaqs(prev => ({ ...prev, [key]: !prev[key] }));
  };

  if (isLoading || !sectionsData || !sectionsData.customSections || sectionsData.customSections.length === 0) {
    return null;
  }

  const sections = sectionsData.customSections;

  return (
    <section className="max-w-8xl mx-auto px-4 md:px-8 lg:px-16 pb-16 space-y-24">
      {sections.map((section: any, sIdx: number) => {
        const isEven = sIdx % 2 === 0;
        const hasImages = section.images && section.images.length > 0;
        const imageCount = section.images?.length || 0;

        return (
          <div key={sIdx} className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center`}>
            
            {/* Text & Content Block */}
            <div className={`space-y-8 ${hasImages ? 'lg:col-span-6' : 'lg:col-span-10 lg:col-start-2 text-center'} ${(!isEven && hasImages) ? 'lg:order-2' : ''}`}>
              <div className="space-y-4">
                <motion.h2
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight"
                >
                  {section.heading}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className={`text-slate-500 font-medium text-sm md:text-base leading-relaxed ${hasImages ? 'max-w-xl' : 'max-w-3xl mx-auto'}`}
                >
                  {section.paragraph}
                </motion.p>
              </div>

              {/* FAQ Accordion */}
              {section.faq && section.faq.length > 0 && (
                <div className={`space-y-3 ${!hasImages ? 'max-w-3xl mx-auto text-left' : ''}`}>
                  {section.faq.map((item: any, fIdx: number) => {
                    const isOpen = !!expandedFaqs[`${sIdx}-${fIdx}`];
                    return (
                      <div key={fIdx} className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all">
                        <button
                          onClick={() => toggleFaq(sIdx, fIdx)}
                          className="w-full flex items-center justify-between p-5 text-left font-black text-xs md:text-sm text-slate-800 uppercase tracking-wide group cursor-pointer border-0 bg-transparent"
                        >
                          <span className="flex items-center gap-3">
                            <HelpCircle size={15} className="text-blue-500 shrink-0" />
                            {item.question}
                          </span>
                          <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }} className="text-slate-400 shrink-0">
                            <ChevronDown size={18} />
                          </motion.div>
                        </button>
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}>
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

              {/* Action Links */}
              {section.links && section.links.length > 0 && (
                <div className={`flex flex-wrap gap-4 pt-2 ${!hasImages ? 'justify-center' : ''}`}>
                  {section.links.map((link: any, lIdx: number) => (
                    <Link key={lIdx} href={link.url} className="no-underline">
                      <button className="flex items-center gap-2 px-6 py-3.5 bg-slate-900 hover:bg-blue-600 text-white rounded-full font-black text-[10px] md:text-xs uppercase tracking-widest transition-all hover:shadow-lg hover:shadow-blue-100 border-0 cursor-pointer duration-300">
                        {link.text}
                        <ArrowRight size={13} />
                      </button>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Images Block */}
            {hasImages && (
              <div className={`lg:col-span-6 ${(!isEven) ? 'lg:order-1' : ''}`}>
                {imageCount === 1 ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="aspect-4/3 sm:aspect-16/10 rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden shadow-2xl border border-slate-100/50 group/img bg-slate-100"
                  >
                    <img src={section.images[0]} alt={section.heading} className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-700" />
                  </motion.div>
                ) : (
                  <div className="grid grid-cols-2 gap-4 md:gap-6">
                    {section.images.slice(0, 4).map((img: string, iIdx: number) => {
                      const isOdd = iIdx % 2 !== 0;
                      return (
                        <motion.div
                          key={iIdx}
                          initial={{ opacity: 0, y: isOdd ? 20 : -20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: iIdx * 0.1 }}
                          className={`aspect-square rounded-[2rem] overflow-hidden shadow-lg border border-slate-100 group/sub bg-slate-100 ${isOdd ? 'translate-y-6 md:translate-y-8' : ''}`}
                        >
                          <img src={img} alt={section.heading} className="w-full h-full object-cover group-hover/sub:scale-105 transition-transform duration-500" />
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

          </div>
        );
      })}
    </section>
  );
};
