"use client";

import React, { useMemo, useRef } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  TrendingUp, Sun, Landmark, Compass, Trees, Flower,
  MapPin, Star, Sparkles
} from 'lucide-react';
import Image from "@/components/ui/Image";

// Hooks
import {
  useTrendingDestinations,
  useTropicalDestinations,
  useHistoryDestinations,
  useAllDestinations
} from '@/hooks/useDestinations';

// Components
import { CategoryThemeWrapper } from './CategoryThemeWrapper';
import { Destination } from '@/types/type';
import { CategoryId } from '@/hooks/useDestinationPreferences';

// ─── Main Component ────────────────────────────────────────────────────────────

export const DynamicDestinationsCategories = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 1. Fetching Category Specific Queries
  const { data: trendingData, isLoading: loadingTrending } = useTrendingDestinations();
  const { data: tropicalData, isLoading: loadingTropical } = useTropicalDestinations();
  const { data: historyData, isLoading: loadingHistory } = useHistoryDestinations();
  const { data: allData, isLoading: loadingAll } = useAllDestinations();

  const trendingList = trendingData?.data || [];
  const tropicalList = tropicalData?.data || [];
  const historyList = historyData?.data || [];
  const allDestinations: Destination[] = allData?.data || [];

  // Read URL Search Parameters for Active Filtering
  const query = searchParams.get('query') || '';
  const category = searchParams.get('category') || '';
  const sort = searchParams.get('sort') || 'recommended';

  const isFilterActive = !!(query || (category && category.toLowerCase() !== 'all'));

  // ── Unified Destinations Filter & Sort Pipeline ──
  const filteredDestinations = useMemo(() => {
    let result = [...allDestinations];

    // 1. Text Query (matches name or location address)
    if (query) {
      const q = query.toLowerCase();
      result = result.filter(dest => 
        dest.name?.toLowerCase().includes(q) ||
        dest.location?.address?.toLowerCase().includes(q) ||
        dest.categories?.some(c => c.toLowerCase().includes(q))
      );
    }

    // 2. Category matching
    if (category && category.toLowerCase() !== 'all') {
      const cat = category.toLowerCase();
      result = result.filter(dest =>
        dest.categories?.some(c => c.toLowerCase() === cat)
      );
    }

    // 3. Sorting logic
    if (sort === 'rating') {
      result.sort((a, b) => (b.ratings?.average || 0) - (a.ratings?.average || 0));
    } else if (sort === 'alphabetical') {
      result.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
    }

    return result;
  }, [allDestinations, query, category, sort]);

  // 2. Client Side Filtering for Enriched Categories (Nature, Adventure, Spiritual)
  const adventureList = useMemo(() => {
    return allDestinations.filter((dest: any) =>
      dest.categories?.some((c: string) =>
        ['Adventure', 'Trekking', 'Backpacking', 'Road_Trip'].includes(c)
      )
    ).slice(0, 10); // Limit to 10 for scroll list
  }, [allDestinations]);

  const natureList = useMemo(() => {
    return allDestinations.filter((dest: any) =>
      dest.categories?.some((c: string) =>
        ['Nature', 'Wildlife', 'Offbeat', 'Riverside', 'Snow_Destination', 'Hill_Station'].includes(c)
      )
    ).slice(0, 10);
  }, [allDestinations]);

  const spiritualList = useMemo(() => {
    return allDestinations.filter((dest: any) =>
      dest.categories?.some((c: string) =>
        ['Spiritual', 'Wellness', 'Pilgrimage', 'Cultural', 'Heritage'].includes(c)
      )
    ).slice(0, 10);
  }, [allDestinations]);

  // 3. Scroll references for horizontal flex rows
  const scrollRefs = {
    trending: useRef<HTMLDivElement>(null),
    tropical: useRef<HTMLDivElement>(null),
    history: useRef<HTMLDivElement>(null),
    adventure: useRef<HTMLDivElement>(null),
    nature: useRef<HTMLDivElement>(null),
    spiritual: useRef<HTMLDivElement>(null),
  };

  const handleScroll = (id: CategoryId, direction: 'left' | 'right') => {
    const ref = scrollRefs[id];
    if (ref.current) {
      const { scrollLeft } = ref.current;
      const scrollTo = direction === 'left' ? scrollLeft - 360 : scrollLeft + 360;
      ref.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const handleDestinationClick = (slug: string) => {
    router.push(`/destinations/${slug}`);
  };

  const isLoading = loadingTrending || loadingTropical || loadingHistory || loadingAll;

  // Fixed Category Panel Listing Order for current phase
  const categoriesList: { id: CategoryId; title: string; subtitle: string; icon: React.ReactNode; list: Destination[] }[] = [
    {
      id: 'trending',
      title: "Trending Spotlight",
      subtitle: "The most popular Himalayan hubs travelers are booking right now.",
      icon: <TrendingUp size={22} />,
      list: trendingList
    },
    {
      id: 'adventure',
      title: "Adventure & Peaks",
      subtitle: "Conquer dramatic passes, high altitude trails, and snowy peaks.",
      icon: <Compass size={22} />,
      list: adventureList
    },
    {
      id: 'history',
      title: "Historical Kingdoms",
      subtitle: "Wander down ancient stone alleyways, sacred temples, and heritage sites.",
      icon: <Landmark size={22} />,
      list: historyList
    },
    {
      id: 'tropical',
      title: "Tropical Paradises",
      subtitle: "Escape to majestic lakeside retreats, warm riversides, and hidden valleys.",
      icon: <Sun size={22} />,
      list: tropicalList
    },
    {
      id: 'nature',
      title: "Nature & Wilderness",
      subtitle: "Lose yourself in mossy forests, pine valleys, and raw wildlife parks.",
      icon: <Trees size={22} />,
      list: natureList
    },
    {
      id: 'spiritual',
      title: "Spiritual & Zen Retreats",
      subtitle: "Find serenity, wellness, and reflection in monasteries and valleys.",
      icon: <Flower size={22} />,
      list: spiritualList
    }
  ];

  // Helper card type resolver
  const getCardType = (dest: Destination): CategoryId => {
    const cats = dest.categories || [];
    if (cats.some(c => ['Adventure', 'Trekking', 'Backpacking'].includes(c))) return 'adventure';
    if (cats.some(c => ['Historical', 'Cultural', 'Heritage', 'Pilgrimage'].includes(c))) return 'history';
    if (cats.some(c => ['Tropical', 'Lakeside', 'Beach'].includes(c))) return 'tropical';
    if (cats.some(c => ['Nature', 'Wildlife', 'Forest'].includes(c))) return 'nature';
    if (cats.some(c => ['Spiritual', 'Wellness'].includes(c))) return 'spiritual';
    return 'trending';
  };

  const renderCard = (catId: CategoryId, dest: Destination, onClick: () => void, index: number) => {
    const regionName = dest.location?.address?.split(',').pop()?.trim() || "Himalayan Region";
    const rating = dest.ratings?.average || 4.8;
    const key = dest._id || index;

    switch (catId) {
      case 'trending':
        return (
          <div
            key={key}
            onClick={onClick}
            className="w-[280px] md:w-[320px] h-[360px] shrink-0 relative overflow-hidden rounded-[2rem] border border-blue-500/20 bg-slate-900 group cursor-pointer shadow-md hover:shadow-2xl hover:shadow-blue-500/10 hover:border-blue-400/50 transition-all duration-500"
          >
            <Image
              src={dest.images?.[0] || "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80"}
              alt={dest.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/10 to-transparent" />
            <div className="absolute top-4 left-4 bg-blue-600/90 text-white text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg border border-blue-400/30">
              Spotlight
            </div>
            <div className="absolute bottom-6 left-6 text-white right-6">
              <span className="text-[9px] font-black uppercase tracking-widest text-cyan-400 block mb-1">
                {regionName}
              </span>
              <h4 className="text-xl font-extrabold mb-2 leading-tight line-clamp-2 break-words">{dest.name}</h4>
              <div className="flex items-center justify-between">
                <span className="text-[9px] bg-white/10 px-2 py-1 rounded-lg border border-white/10 uppercase font-black text-slate-300">Active</span>
                <span className="flex items-center gap-1 text-[10px] font-black text-yellow-400">
                  <Star size={11} className="fill-yellow-400" /> {rating}
                </span>
              </div>
            </div>
          </div>
        );

      case 'adventure':
        return (
          <motion.div
            key={key}
            onClick={onClick}
            whileHover={{ y: -6, rotateX: 1, rotateY: -1 }}
            style={{ transformStyle: 'preserve-3d' }}
            className="w-[280px] md:w-[320px] h-[360px] shrink-0 relative overflow-hidden rounded-[2rem] border border-orange-500/20 bg-zinc-950 group cursor-pointer shadow-md hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-300"
          >
            <Image
              src={dest.images?.[0] || "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80"}
              alt={dest.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-slate-900/10 to-transparent" />
            <div className="absolute top-4 left-4 bg-orange-600/90 text-white text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg border border-orange-400/20">
              Pass Guide
            </div>
            <div className="absolute bottom-6 left-6 text-white right-6">
              <span className="text-[9px] font-black uppercase tracking-widest text-orange-400 block mb-1">
                {regionName}
              </span>
              <h4 className="text-xl font-extrabold mb-2 leading-tight group-hover:text-orange-400 transition-colors line-clamp-2 break-words">{dest.name}</h4>
              <span className="text-[9px] bg-orange-500/10 text-orange-400 px-2 py-1 rounded-lg border border-orange-500/20 uppercase font-black">Peak Trek</span>
            </div>
          </motion.div>
        );

      case 'history':
        return (
          <motion.div
            key={key}
            onClick={onClick}
            whileHover={{ y: -6, rotateY: 2 }}
            className="w-[280px] md:w-[320px] h-[360px] shrink-0 relative overflow-hidden rounded-[2rem] border border-amber-200/50 bg-amber-50/20 font-serif group cursor-pointer shadow-md hover:shadow-2xl hover:shadow-amber-900/10 transition-all duration-300"
          >
            <Image
              src={dest.images?.[0] || "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&q=80"}
              alt={dest.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-amber-950/95 via-transparent to-transparent" />
            <div className="absolute top-4 left-4 bg-amber-800 text-white text-[8px] font-black uppercase font-sans tracking-widest px-2.5 py-1 rounded-lg">
              Heritage
            </div>
            <div className="absolute bottom-6 left-6 text-white right-6">
              <span className="text-[9px] font-black uppercase font-sans tracking-widest text-amber-300 block mb-1">
                🕌 {regionName}
              </span>
              <h4 className="text-xl font-bold font-serif mb-2 leading-tight line-clamp-2 break-words">{dest.name}</h4>
              <span className="text-[9px] bg-white/10 text-white px-2 py-1 rounded-lg uppercase font-sans font-black">Archive Verified</span>
            </div>
          </motion.div>
        );

      case 'tropical':
        return (
          <div
            key={key}
            onClick={onClick}
            className="w-[280px] md:w-[320px] h-[360px] shrink-0 relative overflow-hidden rounded-[2rem] border border-cyan-200 bg-cyan-50/30 group cursor-pointer shadow-md hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-500"
          >
            <Image
              src={dest.images?.[0] || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80'}
              alt={dest.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-cyan-950 via-transparent to-transparent" />
            <div className="absolute top-4 left-4 bg-cyan-600/90 text-white text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg">
              Sunny Spot
            </div>
            <div className="absolute bottom-6 left-6 text-white right-6">
              <span className="text-[9px] font-black uppercase tracking-widest text-cyan-300 block mb-1">
                {regionName}
              </span>
              <h4 className="text-xl font-extrabold mb-2 leading-tight line-clamp-2 break-words">{dest.name}</h4>
              <span className="text-[9px] bg-cyan-600/20 text-cyan-300 px-2 py-1 rounded-lg border border-cyan-500/20 uppercase font-black">Lake / Coastal</span>
            </div>
          </div>
        );

      case 'nature':
        return (
          <div
            key={key}
            onClick={onClick}
            className="w-[280px] md:w-[320px] h-[360px] shrink-0 relative overflow-hidden rounded-[2rem] border border-emerald-200 bg-emerald-50/30 group cursor-pointer shadow-md hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500"
          >
            <Image
              src={dest.images?.[0] || 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80'}
              alt={dest.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-transparent to-transparent" />
            <div className="absolute top-4 left-4 bg-emerald-600 text-white text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg">
              Eco-Reserve
            </div>
            <div className="absolute bottom-6 left-6 text-white right-6">
              <span className="text-[9px] font-black uppercase tracking-widest text-emerald-300 block mb-1">
                🌿 {regionName}
              </span>
              <h4 className="text-xl font-extrabold mb-2 leading-tight line-clamp-2 break-words">{dest.name}</h4>
              <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-2 py-1 rounded-lg border border-emerald-500/20 uppercase font-black font-sans">Wild Forest</span>
            </div>
          </div>
        );

      case 'spiritual':
        return (
          <div
            key={key}
            onClick={onClick}
            className="w-[280px] md:w-[320px] h-[360px] shrink-0 relative overflow-hidden rounded-[2rem] border border-indigo-200/50 bg-indigo-50/30 group cursor-pointer shadow-md hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500"
          >
            <Image
              src={dest.images?.[0] || 'https://images.unsplash.com/photo-1486915309851-b0cc1f8a0084?auto=format&fit=crop&q=80'}
              alt={dest.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-indigo-950 via-transparent to-transparent" />
            <div className="absolute top-4 left-4 bg-indigo-600 text-white text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg">
              Zen Sanctuary
            </div>
            <div className="absolute bottom-6 left-6 text-white right-6">
              <span className="text-[9px] font-black uppercase tracking-widest text-indigo-300 block mb-1">
                Lotus {regionName}
              </span>
              <h4 className="text-xl font-extrabold mb-2 leading-tight line-clamp-2 break-words">{dest.name}</h4>
              <span className="text-[9px] bg-indigo-500/20 text-indigo-300 px-2 py-1 rounded-lg border border-indigo-500/20 uppercase font-black">Monastery</span>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-12 animate-pulse">
        {[1, 2, 3].map((val) => (
          <div key={val} className="bg-slate-100/50 rounded-[2.5rem] p-8 h-80 flex flex-col justify-between">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-gray-200 rounded-xl" />
              <div className="space-y-2">
                <div className="w-48 h-6 bg-gray-200 rounded" />
                <div className="w-32 h-4 bg-gray-200 rounded" />
              </div>
            </div>
            <div className="flex gap-6 h-48 overflow-hidden">
              {[1, 2, 3, 4].map((card) => (
                <div key={card} className="bg-gray-200 rounded-[2rem] w-64 shrink-0 h-full" />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  // ── Active Filters Dynamic Grid View ──
  if (isFilterActive) {
    return (
      <div className="space-y-8 min-h-[400px]">
        {/* Results Info Panel */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50 border border-slate-100 rounded-3xl p-6 sm:px-8">
          <div>
            <h3 className="text-xl font-bold text-slate-800">Matching Destinations</h3>
            <p className="text-sm text-slate-500 mt-1">
              Found <span className="font-extrabold text-rose-500">{filteredDestinations.length}</span> curated Himalayan destinations
            </p>
          </div>
          <button
            onClick={() => router.push(pathname)}
            className="self-start sm:self-auto px-5 py-2.5 bg-white border border-rose-200 hover:bg-rose-50 text-rose-600 rounded-full text-xs font-bold transition-all cursor-pointer"
          >
            Clear All Filters
          </button>
        </div>

        {filteredDestinations.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4 justify-items-center">
            {filteredDestinations.map((dest, index) =>
              renderCard(
                getCardType(dest),
                dest,
                () => handleDestinationClick(dest.slug),
                index
              )
            )}
          </div>
        ) : (
          <div className="text-center py-20 bg-slate-50 rounded-[2.5rem] border border-slate-100 border-dashed max-w-2xl mx-auto px-4 mt-6">
            <Sparkles className="text-rose-500 mx-auto mb-4 animate-bounce" size={40} />
            <h4 className="text-xl font-black text-slate-800">No destinations found</h4>
            <p className="text-slate-500 mt-2 text-sm max-w-md mx-auto">
              We couldn&apos;t find any destinations matching your active query or selected category. Try another filter or reset.
            </p>
            <button
              onClick={() => router.push(pathname)}
              className="mt-6 px-6 py-2.5 bg-rose-500 hover:bg-rose-600 text-white rounded-full text-sm font-bold shadow-lg shadow-rose-200 transition-all cursor-pointer border-0"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    );
  }

  // ── Standard Categorized Scrolls Layout (Default View) ──
  return (
    <div className="space-y-16">
      {categoriesList.map((cat) => {
        // Data-driven conditional rendering: Only render if destinations exist for that category
        if (cat.list.length === 0) return null;

        return (
          <CategoryThemeWrapper
            key={cat.id}
            id={cat.id}
            title={cat.title}
            subtitle={cat.subtitle}
            icon={cat.icon}
            onScrollLeft={() => handleScroll(cat.id, 'left')}
            onScrollRight={() => handleScroll(cat.id, 'right')}
          >
            {/* Horizontal scrollable flex row */}
            <div
              ref={scrollRefs[cat.id]}
              className="flex items-center gap-4 sm:gap-6 overflow-x-auto pb-4 pt-1 no-scrollbar scroll-smooth flex-nowrap"
            >
              {cat.list.map((dest: Destination, index: number) => 
                renderCard(cat.id, dest, () => handleDestinationClick(dest.slug), index)
              )}
            </div>
          </CategoryThemeWrapper>
        );
      })}
    </div>
  );
};
