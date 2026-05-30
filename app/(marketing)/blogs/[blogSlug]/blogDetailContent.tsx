"use client";

import React, { useState } from 'react';
import { useBlogDetailUser } from '@/hooks/useBlogs';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Calendar, Clock, ArrowLeft, ChevronDown, 
  ChevronRight, Link as LinkIcon, BookOpen, Compass, 
  HelpCircle, Image as ImageIcon, Sparkles 
} from 'lucide-react';
import Link from 'next/link';
import Image from '@/components/ui/Image';

interface BlogDetailContentProps {
  blogSlug: string;
}

export default function BlogDetailContent({ blogSlug }: BlogDetailContentProps) {
  const { data: detailData, isLoading, error } = useBlogDetailUser(blogSlug);
  
  // Track open FAQ accordion items globally or by section
  const [openFaqs, setOpenFaqs] = useState<{[key: string]: boolean}>({});

  const toggleFaq = (secIdx: number, faqIdx: number) => {
    const key = `${secIdx}-${faqIdx}`;
    setOpenFaqs(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-slate-900 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-bold text-slate-500 tracking-wider uppercase">Unrolling Himalayan Chronicles...</p>
        </div>
      </div>
    );
  }

  if (error || !detailData || !detailData.blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8fafc] p-6 text-center gap-4">
        <div className="bg-rose-50 p-4 rounded-full text-rose-500">
          <Compass size={40} className="animate-pulse" />
        </div>
        <h2 className="text-2xl font-black text-slate-800">Lost in the Snowstorm</h2>
        <p className="text-slate-500 text-sm max-w-sm italic">
          We couldn&apos;t retrieve the specified mountaineering chronicle. The link may have moved or expired.
        </p>
        <Link href="/blogs">
          <button className="px-6 py-3 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-black transition-all flex items-center gap-2 cursor-pointer border-0">
            <ArrowLeft size={14} /> Back to Directory
          </button>
        </Link>
      </div>
    );
  }

  const { blog, relatedBlogs, customSections } = detailData;

  return (
    <div className="bg-[#f8fafc] min-h-screen font-sans text-slate-800 text-left pb-20">
      
      {/* 1. Parallax Blurred Reader Hero Banner */}
      <div className="relative h-[55vh] flex items-end justify-start overflow-hidden pb-12 sm:pb-16 px-4 sm:px-8 md:px-16">
        
        {/* Background image & gradient overlay */}
        <div className="absolute inset-0 z-0 scale-105 filter blur-xs sm:blur-none transition-all duration-700">
          {blog.coverImage ? (
            <img 
              src={blog.coverImage} 
              alt={blog.title} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-linear-to-br from-slate-800 to-slate-950" />
          )}
          {/* Sleek dark gradient overlays */}
          <div className="absolute inset-0 bg-slate-950/70" />
          <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#f8fafc] to-transparent z-10" />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 max-w-4xl space-y-4">
          <Link href="/blogs" className="inline-flex items-center gap-2 text-rose-400 hover:text-rose-300 font-extrabold text-[10px] sm:text-xs uppercase tracking-widest transition-colors mb-2 bg-slate-900/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/5">
            <ArrowLeft size={12} /> Back to Chronicles
          </Link>
          
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-indigo-500/90 text-white px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider">
              {blog.category}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight uppercase">
            {blog.title}
          </h1>

          {/* Author/Date Row */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-300 pt-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-rose-400 border border-white/10 shrink-0">
                <User size={13} />
              </div>
              <span>By {blog.author || "MountainMonkey Guide"}</span>
            </div>

            <div className="h-4 w-[1px] bg-white/15 hidden sm:block" />

            <div className="flex items-center gap-2">
              <Calendar size={14} className="text-slate-400" />
              <span>{new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Reader Layout */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left Column: Primary Blog Core Narrative & Rich CMS Sections */}
        <div className="lg:col-span-2 space-y-12">
          
          {/* Main Core Narrative Block */}
          <article className="bg-white p-8 sm:p-10 rounded-[3rem] border border-slate-100 shadow-xs space-y-6">
            <h2 className="text-xl font-black text-slate-900 uppercase tracking-wide border-b border-slate-50 pb-4">
              Article Chronicle
            </h2>
            <div className="text-slate-600 font-medium text-sm leading-relaxed sm:text-base whitespace-pre-wrap tracking-wide space-y-4">
              {blog.content}
            </div>
          </article>

          {/* 3. Rich Dynamic CMS Sub-sections */}
          {customSections && customSections.length > 0 && (
            <div className="space-y-8 mt-12 border-t border-slate-100 pt-10">
              <div className="flex items-center gap-3">
                <div className="bg-indigo-50 text-indigo-500 p-2.5 rounded-xl border border-indigo-100">
                  <Sparkles size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900 uppercase tracking-wide">Expedition Manuals & Addendums</h3>
                  <p className="text-slate-400 font-bold text-xs">Dynamic check sheets, equipment procedures, and FAQ lists managed by guides.</p>
                </div>
              </div>

              <div className="space-y-8">
                {customSections.map((section: any, sIdx: number) => (
                  <motion.section 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: sIdx * 0.1 }}
                    key={sIdx} 
                    className="bg-white p-8 sm:p-10 rounded-[3rem] border border-slate-100 shadow-2xs space-y-6"
                  >
                    {/* Heading */}
                    <div className="border-b border-slate-50 pb-4 flex items-center gap-2">
                      <div className="w-1.5 h-6 bg-indigo-500 rounded-full" />
                      <h4 className="text-base font-black text-slate-900 uppercase tracking-wide">
                        {section.heading}
                      </h4>
                    </div>

                    {/* Paragraph */}
                    {section.paragraph && (
                      <p className="text-slate-500 text-xs font-semibold leading-relaxed whitespace-pre-wrap">
                        {section.paragraph}
                      </p>
                    )}

                    {/* Visual Galleries Grid */}
                    {section.images && section.images.length > 0 && (
                      <div className="grid grid-cols-2 gap-3 mt-4">
                        {section.images.map((img: string, iIdx: number) => (
                          <div 
                            key={iIdx} 
                            className="relative aspect-video rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-2xs group cursor-pointer"
                          >
                            <img 
                              src={img} 
                              alt={`${section.heading} gallery ${iIdx}`} 
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                            />
                            <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/30 transition-all duration-300" />
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Action Links Badges */}
                    {section.links && section.links.length > 0 && (
                      <div className="flex flex-wrap gap-2.5 mt-4 pt-2">
                        {section.links.map((link: any, lIdx: number) => (
                          <Link 
                            key={lIdx} 
                            href={link.url}
                            className="bg-slate-50 hover:bg-indigo-600 border border-slate-200 text-slate-800 hover:text-white px-4 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-3xs hover:shadow-md transition-all flex items-center gap-2 cursor-pointer duration-300"
                          >
                            <LinkIcon size={12} />
                            <span>{link.text}</span>
                          </Link>
                        ))}
                      </div>
                    )}

                    {/* FAQ Accordion Pairs */}
                    {section.faq && section.faq.length > 0 && (
                      <div className="space-y-2 mt-6 pt-4 border-t border-slate-50">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5 mb-3">
                          <HelpCircle size={12} className="text-indigo-500" /> Q&A Expedition FAQ Pairs
                        </span>
                        
                        <div className="space-y-3">
                          {section.faq.map((faq: any, fIdx: number) => {
                            const isOpen = !!openFaqs[`${sIdx}-${fIdx}`];
                            return (
                              <div 
                                key={fIdx} 
                                className="bg-slate-50/50 border border-slate-100 rounded-2xl overflow-hidden shadow-3xs transition-all duration-300"
                              >
                                <button
                                  type="button"
                                  onClick={() => toggleFaq(sIdx, fIdx)}
                                  className="w-full px-5 py-4 flex items-center justify-between font-extrabold text-xs text-slate-800 text-left bg-transparent border-0 outline-none cursor-pointer hover:bg-slate-50 transition-colors"
                                >
                                  <span>{faq.question}</span>
                                  {isOpen ? (
                                    <ChevronDown size={14} className="text-indigo-500 rotate-180 transition-transform duration-300" />
                                  ) : (
                                    <ChevronRight size={14} className="text-slate-400 transition-transform duration-300" />
                                  )}
                                </button>
                                
                                <AnimatePresence initial={false}>
                                  {isOpen && (
                                    <motion.div
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: "auto", opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      transition={{ duration: 0.25, ease: "easeInOut" }}
                                    >
                                      <div className="px-5 pb-5 pt-1 text-slate-500 font-semibold text-xs leading-relaxed border-t border-slate-50/30 whitespace-pre-wrap">
                                        {faq.answer}
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </motion.section>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Right Column: Sidebar - Related Expeditions & Chronicles */}
        <div className="space-y-8">
          
          {/* Related Articles Panel */}
          <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-xs space-y-6">
            <div>
              <h3 className="text-base font-black text-slate-900 uppercase tracking-wide">Related Chronicles</h3>
              <p className="text-slate-400 font-bold text-[10px] uppercase tracking-wider mt-1">Explore similar Himalayan tracks</p>
            </div>

            {relatedBlogs && relatedBlogs.length > 0 ? (
              <div className="space-y-4">
                {relatedBlogs.map((rel: any, idx: number) => (
                  <Link href={`/blogs/${rel.slug}`} key={rel._id || idx} className="block group">
                    <div className="flex gap-4 p-3 rounded-2xl hover:bg-slate-50 transition-colors cursor-pointer border border-transparent hover:border-slate-100">
                      <div className="w-16 h-12 rounded-xl bg-slate-100 overflow-hidden shrink-0 border border-slate-100 shadow-3xs">
                        {rel.coverImage ? (
                          <img src={rel.coverImage} alt={rel.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                        ) : (
                          <BookOpen size={16} className="w-full h-full p-3 text-slate-300" />
                        )}
                      </div>
                      <div className="min-w-0 text-left space-y-1">
                        <h4 className="text-xs font-black text-slate-800 group-hover:text-blue-600 transition-colors leading-tight truncate">
                          {rel.title}
                        </h4>
                        <div className="flex items-center gap-2 text-[9px] font-bold text-slate-400 uppercase tracking-tighter">
                          <span>{rel.author}</span>
                          <span>•</span>
                          <span>{new Date(rel.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-slate-400 text-xs italic font-medium">No other chronicles currently logged under {blog.category}.</p>
            )}
          </div>

          {/* Quick Informational Box */}
          <div className="bg-slate-900 p-8 rounded-[3rem] text-white space-y-4 shadow-sm relative overflow-hidden text-left">
            <div className="absolute right-0 bottom-0 opacity-15 translate-x-4 translate-y-4 text-indigo-400">
              <Compass size={180} />
            </div>
            
            <span className="text-[8px] font-black uppercase tracking-[0.3em] text-rose-400 block">Expeditions Alert Desk</span>
            <h4 className="text-base font-black uppercase tracking-wide">Altitude & Route Briefing</h4>
            <p className="text-xs font-medium text-slate-300 leading-relaxed max-w-xs relative z-10">
              Expedition parameters and safety lists require thorough review before embarking on peak attempts. Always consult local registered guides at MountainMonkey basecamp centers.
            </p>
            <Link href="/contact" className="inline-block relative z-10 pt-2">
              <span className="text-[10px] font-black text-white hover:text-rose-300 uppercase tracking-widest flex items-center gap-1 cursor-pointer">
                Contact Basecamp <ChevronRight size={12} />
              </span>
            </Link>
          </div>

        </div>

      </div>

    </div>
  );
}
