"use client"

import React from 'react';
import { Star } from 'lucide-react';
import { useInView } from '@/hooks/useInView';
import { useTravelerStories } from '@/hooks/useHome';
import Link from 'next/link';

interface TravelerStory {
  _id: string;
  title: string;
  images?: string[];
  author?: {
    name?: string;
  };
}

export const TravelerStoriesSection = () => {
  const [storiesRef, storiesInView] = useInView();
  
  // Triggers API call only when scrolled into view
  const { data:travelerStories, isLoading:storiesLoading } = useTravelerStories();

  return (
    <section ref={storiesRef} className="max-w-7xl mx-auto py-16 px-4">
      <div className="flex justify-between items-end mb-8">
        <h2 className="text-2xl font-bold">Traveler Stories</h2>
        <Link 
          href="/stories"
          className="text-rose-500 font-semibold hover:underline"
        >
          See all →
        </Link>
      </div>
      <div className="flex gap-6 overflow-x-auto pb-10 snap-x snap-mandatory no-scrollbar scroll-smooth px-1">
        {storiesLoading ? (
             [1,2,3,4,5,6].map((i) => (
               <div key={i} className="min-w-[280px] aspect-[3/4] bg-slate-100 rounded-2xl animate-pulse" />
             ))
        ) : (travelerStories?.length ?? 0) > 0 ? (
          (travelerStories as TravelerStory[]).map((story: TravelerStory) => (
            <Link href={`/stories/${story._id}`} key={story._id} className='cursor-pointer'>
            <div 
              className="min-w-[280px] aspect-[3/4] bg-slate-200 rounded-2xl relative overflow-hidden group snap-start"
            >
              <img 
                src={story.images?.[0] || "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=400"} 
                alt={story.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <span className="text-[10px] bg-white/20 backdrop-blur-md px-2 py-0.5 rounded flex items-center gap-1 w-fit mb-2">
                  <Star className="w-3 h-3 fill-white" /> STORY
                </span>
                <p className="font-semibold leading-tight">{story.title}</p>
                <p className="text-[10px] opacity-70 mt-1">by {story.author?.name || "Explorer"}</p>
              </div>
            </div>
            </Link>
          ))
        ) : (
          <div className="min-w-full py-12 text-center bg-slate-50 rounded-2xl">
            <p className="text-slate-400 italic">No stories shared yet. Be the first!</p>
          </div>
        )}
      </div>
    </section>
  );
};