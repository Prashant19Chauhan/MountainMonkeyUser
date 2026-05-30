"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, MapPin, Calendar, Clock, Star, 
  User, Tag, Compass, Heart, Share2, Sparkles 
} from 'lucide-react';
import { useApprovedStory } from '@/hooks/useStories';
import { toast } from 'sonner';

export default function StoryDetailContent({ slug }: { slug: string }) {
  const router = useRouter();
  const { data: story, isLoading, error } = useApprovedStory(slug);

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-bold text-slate-500 tracking-wider uppercase">Loading Journal Details...</p>
        </div>
      </div>
    );
  }

  if (error || !story) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] px-6">
        <div className="text-center space-y-4 max-w-md bg-white border border-slate-100 p-8 rounded-[2.5rem] shadow-xs">
          <h2 className="text-xl font-bold text-slate-800 uppercase tracking-wider">Story Not Found</h2>
          <p className="text-xs text-slate-500 font-medium leading-relaxed">
            The traveler story you are trying to view does not exist or has not been approved by moderation yet.
          </p>
          <button
            onClick={() => router.push('/stories')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold uppercase tracking-wider transition-all border-0 mx-auto cursor-pointer shadow-md shadow-orange-500/10"
          >
            <ArrowLeft size={14} /> Back to Stories
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f8fafc] min-h-screen font-sans text-slate-800 text-left">
      {/* Parallax Hero Banner */}
      <div className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={story.coverImage || story.images?.[0] || "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070"} 
            alt={story.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px]" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto text-center px-6 space-y-5">
          {/* Back button overlay */}
          <div className="absolute top-[-30%] left-6 z-20">
            <button
              onClick={() => router.push('/stories')}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/10 backdrop-blur-md text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
            >
              <ArrowLeft size={14} />
              <span>Back</span>
            </button>
          </div>

          <div className="flex justify-center">
            <span className="bg-white/20 border border-white/20 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-md flex items-center gap-1">
              <Star className="w-3 h-3 fill-orange-500 text-orange-500" /> Traveler Story
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-6xl font-black text-white tracking-tight leading-tight uppercase max-w-4xl mx-auto">
            {story.title}
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-bold text-slate-200">
            <span className="flex items-center gap-1.5 px-3 py-1 bg-white/5 rounded-full">
              <User size={12} className="text-orange-400" />
              By {story.author?.name || 'Explorer'}
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 bg-white/5 rounded-full">
              <MapPin size={12} className="text-orange-400" />
              {story.location}
            </span>
          </div>
        </div>

        {/* Curved bottom clip */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-[#f8fafc]" style={{ clipPath: "ellipse(60% 100% at 50% 100%)" }} />
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-start">
          {/* Left Column: Full narrative */}
          <div className="lg:col-span-8 space-y-8 bg-white p-6 md:p-10 rounded-[2.5rem] border border-slate-100 shadow-xs">
            {/* Short Teaser Description */}
            {story.shortDescription && (
              <p className="text-base md:text-lg font-bold text-slate-900 leading-relaxed italic border-l-4 border-orange-500 pl-4 py-1">
                &ldquo;{story.shortDescription}&rdquo;
              </p>
            )}

            {/* Main story content */}
            <div className="space-y-4">
              <h3 className="text-lg font-black text-slate-800 uppercase tracking-wider mb-2">My Journey</h3>
              <p className="text-xs md:text-sm text-slate-600 leading-relaxed font-medium whitespace-pre-wrap">
                {story.content}
              </p>
            </div>

            {/* Trip details narrative */}
            {story.storyAboutTrip && (
              <div className="space-y-4 pt-4 border-t border-slate-50">
                <h3 className="text-lg font-black text-slate-800 uppercase tracking-wider mb-2">Moments & Highlights</h3>
                <p className="text-xs md:text-sm text-slate-600 leading-relaxed font-medium whitespace-pre-wrap">
                  {story.storyAboutTrip}
                </p>
              </div>
            )}

            {/* Trip Experience details */}
            {story.tripExperience && (
              <div className="space-y-4 pt-4 border-t border-slate-50">
                <h3 className="text-lg font-black text-slate-800 uppercase tracking-wider mb-2">My Experience</h3>
                <p className="text-xs md:text-sm text-slate-600 leading-relaxed font-medium whitespace-pre-wrap">
                  {story.tripExperience}
                </p>
              </div>
            )}

            {/* Images visual gallery */}
            {story.images && story.images.length > 0 && (
              <div className="space-y-4 pt-6 border-t border-slate-50">
                <h3 className="text-lg font-black text-slate-800 uppercase tracking-wider mb-4">Chronicle Visuals</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {story.images.map((img: string, idx: number) => (
                    <div key={idx} className="aspect-video w-full rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 group">
                      <img 
                        src={img} 
                        alt={`${story.title} - Visual ${idx + 1}`} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Sidebar statistics / details */}
          <div className="lg:col-span-4 space-y-6">
            {/* Quick Trip stats */}
            <div className="bg-white rounded-[2.5rem] border border-slate-100 p-6 md:p-8 shadow-xs space-y-5">
              <h3 className="font-extrabold text-slate-900 text-sm uppercase tracking-wider pb-3 border-b border-slate-50 flex items-center gap-2">
                <Compass className="text-orange-500" size={18} />
                Trip Specifications
              </h3>

              <div className="space-y-4">
                {story.destination && (
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center text-orange-500 flex-shrink-0">
                      <Compass size={14} />
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Destination</p>
                      <p className="text-xs text-slate-800 font-extrabold">{story.destination}</p>
                    </div>
                  </div>
                )}

                {story.location && (
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center text-orange-500 flex-shrink-0">
                      <MapPin size={14} />
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Location</p>
                      <p className="text-xs text-slate-800 font-extrabold">{story.location}</p>
                    </div>
                  </div>
                )}

                {story.tripDuration && (
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center text-orange-500 flex-shrink-0">
                      <Clock size={14} />
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Trip Duration</p>
                      <p className="text-xs text-slate-800 font-extrabold">{story.tripDuration}</p>
                    </div>
                  </div>
                )}

                {story.tripDate && (
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center text-orange-500 flex-shrink-0">
                      <Calendar size={14} />
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Date of trip</p>
                      <p className="text-xs text-slate-800 font-extrabold">
                        {new Date(story.tripDate).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
                      </p>
                    </div>
                  </div>
                )}

                {story.rating && (
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center text-orange-500 flex-shrink-0">
                      <Star size={14} />
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Traveler rating</p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-xs text-slate-800 font-extrabold">{story.rating}/5</span>
                        <div className="flex gap-0.5">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star 
                              key={s} size={11} 
                              className={s <= story.rating ? "fill-amber-400 text-amber-400" : "text-slate-200"} 
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Social Share Box */}
            <div className="bg-white rounded-[2.5rem] border border-slate-100 p-6 md:p-8 shadow-xs flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Heart size={16} className="text-[#f43f5e]" />
                <span className="text-xs font-black uppercase text-slate-700 tracking-wider">Share Story</span>
              </div>
              <button
                onClick={handleShare}
                className="p-2.5 bg-slate-50 border border-slate-200/60 rounded-xl hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all cursor-pointer text-slate-600"
                title="Copy share link"
              >
                <Share2 size={16} />
              </button>
            </div>

            {/* Tags section */}
            {story.tags && story.tags.length > 0 && (
              <div className="bg-white rounded-[2.5rem] border border-slate-100 p-6 md:p-8 shadow-xs space-y-4">
                <h3 className="font-extrabold text-slate-900 text-sm uppercase tracking-wider pb-1.5 border-b border-slate-50 flex items-center gap-2">
                  <Tag size={16} className="text-orange-500" />
                  Chronicle Tags
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {story.tags.map((tag: string) => (
                    <span key={tag} className="flex items-center gap-1 px-3 py-1 rounded-full bg-slate-50 border border-slate-100 text-slate-500 text-[10px] font-bold">
                      <Sparkles size={10} className="text-orange-400" />
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
