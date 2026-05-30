"use client";

import React from 'react';
import { useApprovedTestimonials } from '@/hooks/useTestimonials';
import { motion } from 'framer-motion';
import { Star, MessageSquare, Award, CheckCircle, Quote } from 'lucide-react';

export default function TestimonialsContent() {
  const { data: testimonials = [], isLoading } = useApprovedTestimonials();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-slate-900 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-bold text-slate-500 tracking-wider uppercase">Loading explorer reviews...</p>
        </div>
      </div>
    );
  }

  // Calculate statistics
  const totalReviews = testimonials.length;
  const averageRating = totalReviews > 0
    ? (testimonials.reduce((acc, t) => acc + t.rating, 0) / totalReviews).toFixed(1)
    : "5.0";
  
  const fiveStarPercentage = totalReviews > 0
    ? Math.round((testimonials.filter(t => t.rating === 5).length / totalReviews) * 100)
    : 100;

  // Stagger animations
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100, damping: 15 } }
  };

  // Helper to render rating stars
  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={14}
            className={i < rating ? "fill-amber-400 text-amber-400" : "text-slate-200"}
          />
        ))}
      </div>
    );
  };

  // Background colors array for user profile initials
  const initialsBg = [
    "bg-indigo-500 text-white",
    "bg-rose-500 text-white",
    "bg-emerald-500 text-white",
    "bg-amber-500 text-white",
    "bg-cyan-500 text-white",
    "bg-purple-500 text-white"
  ];

  const getInitialsBg = (index: number) => initialsBg[index % initialsBg.length];

  return (
    <div className="bg-[#f8fafc] min-h-screen font-sans">
      {/* Hero Header Banner */}
      <div className="relative h-[45vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2078" 
            alt="Explorers Trekking Himalayas Peak"
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
            Explorer Logbooks & Feedback
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight"
          >
            Voiced by Explorers
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-sm sm:text-base md:text-lg font-bold text-slate-200 tracking-wide max-w-2xl mx-auto"
          >
            Discover real feedback, stories, and verified trekking reviews from members of our adventure community who explored the high mountain peaks with us.
          </motion.p>
        </div>

        {/* Waves divider */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-[#f8fafc] clip-path-wave" style={{ clipPath: "ellipse(60% 100% at 50% 100%)" }} />
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 space-y-12">
        {/* Statistics Metric Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {/* Total reviews */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white border border-slate-100 p-6 rounded-3xl shadow-xs text-center space-y-1"
          >
            <div className="w-10 h-10 bg-indigo-50 text-indigo-500 rounded-full flex items-center justify-center mx-auto">
              <MessageSquare size={18} />
            </div>
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block pt-2">Total Reviews</span>
            <span className="text-3xl font-black text-slate-900 block">{totalReviews}</span>
          </motion.div>

          {/* Average rating */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-white border border-slate-100 p-6 rounded-3xl shadow-xs text-center space-y-1"
          >
            <div className="w-10 h-10 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mx-auto">
              <Star size={18} className="fill-amber-400 text-amber-400" />
            </div>
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block pt-2">Satisfaction Score</span>
            <span className="text-3xl font-black text-slate-900 block">{averageRating} / 5.0</span>
          </motion.div>

          {/* Five star percentage */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-white border border-slate-100 p-6 rounded-3xl shadow-xs text-center space-y-1"
          >
            <div className="w-10 h-10 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto">
              <Award size={18} />
            </div>
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block pt-2">5-Star Feedback</span>
            <span className="text-3xl font-black text-slate-900 block">{fiveStarPercentage}%</span>
          </motion.div>
        </div>

        {/* Testimonials grid list */}
        {testimonials.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-xs max-w-md mx-auto">
            <Quote className="mx-auto text-slate-200" size={40} />
            <p className="text-slate-400 text-sm font-bold uppercase tracking-wider mt-4">No reviews submitted yet</p>
            <p className="text-slate-500 font-medium text-xs mt-2 leading-relaxed">
              We are currently preparing and curating explorer feedback. Please return shortly to read our travelers stories!
            </p>
          </div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {testimonials.map((testimonial, idx) => {
              const userName = testimonial.user?.name || "Anonymous Traveler";
              const userInitial = userName.charAt(0).toUpperCase();
              const isFeatured = !!testimonial.isFeatured;

              return (
                <motion.div
                  key={testimonial._id}
                  variants={itemVariants}
                  className={`border p-8 rounded-[2.5rem] shadow-xs flex flex-col justify-between hover:shadow-md transition-all duration-300 relative group overflow-hidden ${
                    isFeatured 
                      ? 'bg-slate-900 border-slate-800 text-white shadow-lg' 
                      : 'bg-white border-slate-100 text-slate-700'
                  }`}
                >
                  {/* Decorative quotes background icon */}
                  <Quote 
                    className={`absolute -right-2 -bottom-2 select-none pointer-events-none opacity-[0.03] scale-150 rotate-12 ${
                      isFeatured ? 'text-white' : 'text-slate-900'
                    }`} 
                    size={110} 
                  />

                  {/* Header info */}
                  <div className="space-y-4 relative z-10">
                    <div className="flex justify-between items-center">
                      {renderStars(testimonial.rating)}
                      
                      {isFeatured && (
                        <span className="bg-rose-500 text-white text-[8px] font-black uppercase px-2 py-0.5 rounded-md tracking-wider">
                          Featured Explorer
                        </span>
                      )}
                    </div>

                    <p className={`text-xs md:text-sm font-bold leading-relaxed italic ${
                      isFeatured ? 'text-slate-100 font-medium' : 'text-slate-600'
                    }`}>
                      &ldquo;{testimonial.message}&rdquo;
                    </p>
                  </div>

                  {/* Traveler info footer */}
                  <div className="flex items-center gap-3 mt-6 pt-6 border-t relative z-10 border-slate-100/10">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-xs shadow-sm shrink-0 ${
                      isFeatured ? 'bg-slate-800 text-white border border-slate-700' : getInitialsBg(idx)
                    }`}>
                      {userInitial}
                    </div>
                    
                    <div className="space-y-0.5">
                      <div className={`font-black text-xs flex items-center gap-1 ${
                        isFeatured ? 'text-white' : 'text-slate-900'
                      }`}>
                        {userName}
                        <span title="Verified Explorer" className="flex items-center">
                          <CheckCircle size={12} className="text-emerald-500" />
                        </span>
                      </div>
                      <span className={`text-[8px] font-black uppercase tracking-wider block ${
                        isFeatured ? 'text-slate-400' : 'text-slate-400'
                      }`}>
                        Verified Trekker &bull; {new Date(testimonial.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </div>
  );
}
