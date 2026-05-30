"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Search, User, Calendar, Tag, ArrowRight, Inbox, BookOpen, Compass } from 'lucide-react';
import { useBlogsUser } from '@/hooks/useBlogs';
import Link from 'next/link';

export default function BlogsContent() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [localSearch, setLocalSearch] = useState("");

  const { data: blogsResponse, isLoading } = useBlogsUser(page, 12, search, category);

  // Debounced search
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearch(localSearch);
      setPage(1);
    }, 500);
    return () => clearTimeout(handler);
  }, [localSearch]);

  const categories = [
    { label: "All Stories", value: "" },
    { label: "Travel Guide", value: "Travel Guide" },
    { label: "Himalayan Tips", value: "Himalayan Tips" },
    { label: "Gear & Equipment", value: "Gear & Equipment" },
    { label: "Logistics & Permits", value: "Logistics & Permits" },
  ];

  const blogs = blogsResponse?.data || [];
  const totalBlogs = blogsResponse?.meta?.total || 0;
  const totalPages = blogsResponse?.meta?.totalPages || 1;

  return (
    <div className="bg-[#f8fafc] min-h-screen font-sans text-slate-800 text-left">
      
      {/* Hero Header Banner */}
      <div className="relative h-[48vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2070" 
            alt="Expedition basecamp tent at sunset in high mountains"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-[2px]" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center px-6 space-y-4">
          <motion.span 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[10px] sm:text-xs font-black text-rose-400 uppercase tracking-[0.3em] block"
          >
            Mountain Monkey Expeditions
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight uppercase"
          >
            Himalayan Chronicles
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-sm sm:text-base md:text-lg font-bold text-slate-200 tracking-wide max-w-2xl mx-auto"
          >
            Deep dive summaries, packing guidelines, peak climbing routes, and local wisdom curated by our professional guides.
          </motion.p>
        </div>

        {/* Curved bottom clip */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-[#f8fafc]" style={{ clipPath: "ellipse(60% 100% at 50% 100%)" }} />
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 space-y-12">
        
        {/* Toolbar: Search and Filter Pills */}
        <div className="space-y-6">
          {/* Search bar */}
          <div className="max-w-xl mx-auto">
            <div className="relative group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
              <input 
                type="text"
                placeholder="Search expeditions, safety lists, local wisdom..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                className="w-full pl-13 pr-6 py-4 bg-white border border-slate-100 rounded-[2rem] text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-slate-900/5 focus:border-slate-300 shadow-sm transition-all placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Categories Horizontal Swipe/List */}
          <div className="flex justify-center">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none max-w-full px-4 no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => {
                    setCategory(cat.value);
                    setPage(1);
                  }}
                  className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all border-0 shrink-0 cursor-pointer ${
                    category === cat.value
                      ? "bg-slate-900 text-white shadow-md shadow-slate-900/10 scale-105"
                      : "bg-white hover:bg-slate-50 border border-slate-200/60 text-slate-500 hover:text-slate-900"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Blogs Feed */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-3">
            <div className="w-10 h-10 border-4 border-slate-900 border-t-transparent rounded-full animate-spin" />
            <p className="text-slate-400 font-black text-[10px] uppercase tracking-widest">Opening Chronicles...</p>
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-2xs max-w-md mx-auto space-y-4">
            <Inbox className="mx-auto text-slate-200" size={44} />
            <p className="text-slate-400 text-xs font-black uppercase tracking-wider">No chronicles documented</p>
            <p className="text-slate-500 font-medium text-xs leading-relaxed">
              We couldn't locate any dynamic articles matching your filters. Write posts in your admin dashboard.
            </p>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Cards Grid */}
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              <AnimatePresence mode="popLayout">
                {blogs.map((blog: any, idx: number) => (
                  <Link href={`/blogs/${blog.slug}`} key={blog._id || idx} className="block group">
                    <motion.article
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden shadow-2xs hover:shadow-md hover:border-slate-200/50 duration-300 transition-all flex flex-col h-full cursor-pointer"
                    >
                      {/* Image section */}
                      <div className="relative aspect-video bg-slate-100 overflow-hidden shrink-0 border-b border-slate-50">
                        {blog.coverImage ? (
                          <img 
                            src={blog.coverImage} 
                            alt={blog.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <BookOpen size={36} className="text-slate-300" />
                          </div>
                        )}
                        <span className="absolute top-4 left-4 bg-white/95 border border-slate-200 text-slate-700 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest shadow-2xs">
                          {blog.category}
                        </span>
                      </div>

                      {/* Content block */}
                      <div className="p-7 flex-1 flex flex-col justify-between space-y-4">
                        <div className="space-y-2">
                          <h3 className="text-base font-black text-slate-900 group-hover:text-blue-600 transition-colors leading-tight line-clamp-2">
                            {blog.title}
                          </h3>
                          <p className="text-slate-500 text-xs font-semibold leading-relaxed line-clamp-3">
                            {blog.shortDescription}
                          </p>
                        </div>

                        {/* Author info */}
                        <div className="border-t border-slate-50 pt-4 flex items-center justify-between text-[10px] font-black text-slate-400 uppercase tracking-tight">
                          <div className="flex items-center gap-1.5">
                            <div className="w-6 h-6 rounded-full bg-slate-50 border border-slate-200/60 flex items-center justify-center text-indigo-500">
                              <User size={10} />
                            </div>
                            <span className="text-slate-600 font-bold truncate max-w-[100px]">{blog.author}</span>
                          </div>

                          <div className="flex items-center gap-1">
                            <Calendar size={11} />
                            <span>{new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                          </div>
                        </div>
                      </div>
                    </motion.article>
                  </Link>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-3 pt-6">
                <button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className="p-2.5 text-slate-400 hover:text-slate-950 hover:bg-white rounded-xl border border-transparent hover:border-slate-200 transition-all disabled:opacity-25 cursor-pointer"
                >
                  <ArrowRight className="rotate-180" size={16} />
                </button>
                <div className="flex items-center gap-1.5">
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setPage(i + 1)}
                      className={`w-9 h-9 flex items-center justify-center rounded-xl text-[10px] font-black transition-all cursor-pointer ${
                        page === i + 1
                          ? 'bg-slate-900 text-white shadow-md'
                          : 'bg-white text-slate-500 border border-slate-200/60 hover:bg-slate-50'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setPage(Math.min(totalPages, page + 1))}
                  disabled={page === totalPages}
                  className="p-2.5 text-slate-400 hover:text-slate-950 hover:bg-white rounded-xl border border-transparent hover:border-slate-200 transition-all disabled:opacity-25 cursor-pointer"
                >
                  <ArrowRight size={16} />
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
