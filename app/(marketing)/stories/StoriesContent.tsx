"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Clock, Calendar, Star, BookOpen, User, Inbox, ArrowRight } from 'lucide-react';
import { useApprovedStories } from '@/hooks/useStories';
import Link from 'next/link';

export default function StoriesContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: stories, isLoading } = useApprovedStories();

  const filteredStories = (stories || []).filter((story: any) =>
    story.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    story.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    story.destination?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-[#f8fafc] min-h-screen font-sans text-slate-800 text-left">
      {/* Hero Header Banner */}
      <div className="relative h-[48vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070" 
            alt="Traveler standing on edge of rock looking at majestic mountain peaks"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px]" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center px-6 space-y-4">
          <motion.span 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[10px] sm:text-xs font-black text-orange-400 uppercase tracking-[0.3em] block"
          >
            Mountain Monkey Community
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight uppercase"
          >
            Traveler Stories
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-sm sm:text-base md:text-lg font-bold text-slate-200 tracking-wide max-w-2xl mx-auto"
          >
            Real Himalayan chronicles, mountain trek journals, native stay feedback, and experiences shared by fellow explorers.
          </motion.p>
        </div>

        {/* Curved bottom clip */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-[#f8fafc]" style={{ clipPath: "ellipse(60% 100% at 50% 100%)" }} />
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 space-y-12">
        {/* Search Bar */}
        <div className="max-w-xl mx-auto">
          <div className="relative group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-colors" size={18} />
            <input 
              type="text"
              placeholder="Search stories by title, destination, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-13 pr-6 py-4 bg-white border border-slate-100 rounded-[2rem] text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-slate-900/5 focus:border-slate-300 shadow-xs transition-all placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Stories Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="aspect-3/4 rounded-[2.5rem] bg-white border border-slate-100 shadow-xs animate-pulse h-96" />
            ))}
          </div>
        ) : filteredStories.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-xs max-w-md mx-auto space-y-4">
            <Inbox className="mx-auto text-slate-300" size={44} />
            <p className="text-slate-400 text-xs font-black uppercase tracking-wider">No journals discovered</p>
            <p className="text-slate-500 font-medium text-xs leading-relaxed">
              We couldn&apos;t find any traveler stories matching your search. Be the first to share your adventure in your profile!
            </p>
          </div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredStories.map((story: any) => (
                <Link href={`/stories/${story.slug || story._id}`} key={story._id} className="block group">
                  <motion.article
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden shadow-xs hover:shadow-md hover:border-slate-200/50 duration-300 transition-all flex flex-col h-full cursor-pointer"
                  >
                    {/* Image section */}
                    <div className="relative aspect-video bg-slate-100 overflow-hidden shrink-0 border-b border-slate-50">
                      <img 
                        src={story.coverImage || story.images?.[0] || "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=400"} 
                        alt={story.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-4 left-4 bg-white/95 border border-slate-200 text-orange-600 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest shadow-xs flex items-center gap-1">
                        <Star className="w-2.5 h-2.5 fill-orange-500 text-orange-500" /> Story
                      </span>
                    </div>

                    {/* Content block */}
                    <div className="p-7 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <h3 className="text-base font-extrabold text-slate-800 group-hover:text-orange-500 transition-colors leading-tight line-clamp-2">
                          {story.title}
                        </h3>
                        <p className="text-slate-500 text-xs font-semibold leading-relaxed line-clamp-3">
                          {story.shortDescription || story.content}
                        </p>
                      </div>

                      {/* Travel meta (Location, Duration) */}
                      <div className="flex flex-wrap gap-3 text-xs text-slate-400 font-bold">
                        {story.location && (
                          <span className="flex items-center gap-1">
                            <MapPin size={12} className="text-slate-300" />
                            {story.location}
                          </span>
                        )}
                        {story.tripDuration && (
                          <span className="flex items-center gap-1">
                            <Clock size={12} className="text-slate-300" />
                            {story.tripDuration}
                          </span>
                        )}
                      </div>

                      {/* Author info */}
                      <div className="border-t border-slate-100 pt-4 flex items-center justify-between text-[10px] font-black text-slate-400 uppercase tracking-tight">
                        <div className="flex items-center gap-1.5">
                          <div className="w-6 h-6 rounded-full bg-slate-50 border border-slate-200/60 flex items-center justify-center text-orange-500">
                            <User size={10} />
                          </div>
                          <span className="text-slate-600 font-bold truncate max-w-[100px]">{story.author?.name || 'Explorer'}</span>
                        </div>

                        <div className="flex items-center gap-1">
                          <Calendar size={11} />
                          <span>{new Date(story.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}</span>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                </Link>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}
