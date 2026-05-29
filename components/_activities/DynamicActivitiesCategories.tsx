"use client";

import React, { useMemo, useRef } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Zap, Landmark, Trees, Flower2, UtensilsCrossed,
  Waves, Heart, Building2, Star, Timer, Sparkles
} from 'lucide-react';
import Image from "@/components/ui/Image";

// Hooks
import { useAllActivities } from '@/hooks/useActivities';

// Components
import { ActivityCategoryWrapper, ActivityCategoryId } from './ActivityCategoryWrapper';
import { Activity } from '@/types/type';

// ─── Category filter maps ──────────────────────────────────────────────────────

const CATEGORY_FILTER_MAP: Record<ActivityCategoryId, string[]> = {
  adventure: [
    "trekking", "paragliding", "hiking", "camping", "river_rafting", "bungee_jumping",
    "ziplining", "rock_climbing", "caving", "snow_sports", "adventure_park", "canyoning",
    "cycling_tour", "waterfall_trek",
  ],
  cultural: [
    "museum", "historical_site", "monument", "heritage_walk", "cultural_show",
    "historical_palace", "monastery", "art_workshop", "sightseeing",
  ],
  nature: [
    "wildlife_safari", "nature_walk", "botanical_garden", "camping",
    "stargazing", "waterfall_trek",
  ],
  spiritual: [
    "temple", "monastery", "yoga_retreat", "meditation", "wellness",
  ],
  food: [
    "street_food", "market", "food_tour", "cooking_class", "winery_tour",
  ],
  water: [
    "scuba_diving", "river_rafting", "beach_outing", "boating",
    "snorkeling", "kayaking", "surfing",
  ],
  wellness: [
    "spa_wellness", "yoga_retreat", "meditation",
  ],
  urban: [
    "shopping", "theme_park", "cable_car", "adventure_park",
  ],
};

// ─── Category panel metadata ───────────────────────────────────────────────────

const CATEGORY_PANELS: {
  id: ActivityCategoryId;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}[] = [
    {
      id: 'adventure',
      title: "Adrenaline & Peaks",
      subtitle: "Push your limits with high-altitude treks, paragliding, rafting and extreme sports.",
      icon: <Zap size={22} />,
    },
    {
      id: 'cultural',
      title: "Heritage & History",
      subtitle: "Explore ancient palaces, sacred monuments, and living heritage walks.",
      icon: <Landmark size={22} />,
    },
    {
      id: 'nature',
      title: "Wild Nature",
      subtitle: "Immerse in wildlife safaris, stargazing nights, and misty waterfall treks.",
      icon: <Trees size={22} />,
    },
    {
      id: 'spiritual',
      title: "Spiritual & Inner Peace",
      subtitle: "Find serenity in ancient temples, mountain monasteries, and meditation retreats.",
      icon: <Flower2 size={22} />,
    },
    {
      id: 'food',
      title: "Flavours & Markets",
      subtitle: "Devour street food trails, cooking classes, winery tours, and local market strolls.",
      icon: <UtensilsCrossed size={22} />,
    },
    {
      id: 'water',
      title: "Water & Waves",
      subtitle: "Dive deep or ride wild — scuba diving, rafting, kayaking and coastal adventures.",
      icon: <Waves size={22} />,
    },
    {
      id: 'wellness',
      title: "Wellness & Rejuvenation",
      subtitle: "Restore your soul with spa retreats, sunrise yoga, and guided meditation sessions.",
      icon: <Heart size={22} />,
    },
    {
      id: 'urban',
      title: "Urban Explorer",
      subtitle: "Discover cable cars, theme parks, boutique shopping and city skyline experiences.",
      icon: <Building2 size={22} />,
    },
  ];

// ─── Helpers ───────────────────────────────────────────────────────────────────

const formatPrice = (activity: Activity) => {
  if (activity.pricing?.isFree) return "Free";
  if (activity.pricing?.price) {
    return `₹${activity.pricing.price.toLocaleString('en-IN')}`;
  }
  return null;
};

const formatDuration = (minutes?: number) => {
  if (!minutes) return null;
  if (minutes < 60) return `${minutes}m`;
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hrs}h ${mins}m` : `${hrs}h`;
};

const difficultyColor = (level?: string) => {
  switch (level) {
    case 'easy': return 'text-green-500';
    case 'moderate': return 'text-amber-500';
    case 'hard': return 'text-red-500';
    default: return 'text-slate-400';
  }
};

// ─── Card Renderers ────────────────────────────────────────────────────────────

const AdventureCard = ({ activity, onClick }: { activity: Activity; onClick: () => void }) => (
  <motion.div
    onClick={onClick}
    whileHover={{ y: -6, rotateX: 1, rotateY: -1 }}
    style={{ transformStyle: 'preserve-3d' }}
    className="w-[280px] md:w-[320px] h-[360px] shrink-0 relative overflow-hidden rounded-[2rem] border border-orange-500/20 bg-zinc-950 group cursor-pointer shadow-md hover:shadow-2xl hover:shadow-orange-500/15 transition-all duration-300"
  >
    <Image
      src={activity.images?.[0] || "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80"}
      alt={activity.name || ''}
      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-900/20 to-transparent" />
    <div className="absolute top-4 left-4 bg-orange-600/90 text-white text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg border border-orange-400/20">
      Adrenaline
    </div>
    {activity.difficultyLevel && (
      <div className={`absolute top-4 right-4 text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg bg-black/50 border border-white/10 ${difficultyColor(activity.difficultyLevel)}`}>
        {activity.difficultyLevel}
      </div>
    )}
    <div className="absolute bottom-6 left-6 text-white right-6">
      <h4 className="text-lg font-extrabold mb-2 leading-tight group-hover:text-orange-300 transition-colors line-clamp-2">{activity.name}</h4>
      <div className="flex items-center justify-between gap-2">
        {activity.timing?.duration && (
          <span className="flex items-center gap-1 text-[9px] text-zinc-400 font-bold">
            <Timer size={10} /> {formatDuration(activity.timing.duration)}
          </span>
        )}
        {formatPrice(activity) && (
          <span className="text-[9px] bg-orange-500/10 text-orange-400 px-2 py-1 rounded-lg border border-orange-500/20 uppercase font-black">
            {formatPrice(activity)}
          </span>
        )}
        <span className="flex items-center gap-1 text-[10px] font-black text-yellow-400 ml-auto">
          <Star size={10} className="fill-yellow-400" /> {activity.ratings?.average || "4.5"}
        </span>
      </div>
    </div>
  </motion.div>
);

const CulturalCard = ({ activity, onClick }: { activity: Activity; onClick: () => void }) => (
  <motion.div
    onClick={onClick}
    whileHover={{ y: -6, rotateY: 2 }}
    className="w-[280px] md:w-[320px] h-[360px] shrink-0 relative overflow-hidden rounded-[2rem] border border-amber-200/50 bg-amber-50/20 font-serif group cursor-pointer shadow-md hover:shadow-2xl hover:shadow-amber-900/10 transition-all duration-300"
  >
    <Image
      src={activity.images?.[0] || "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&q=80"}
      alt={activity.name || ''}
      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-amber-950/95 via-transparent to-transparent" />
    <div className="absolute top-4 left-4 bg-amber-800 text-white text-[8px] font-black uppercase font-sans tracking-widest px-2.5 py-1 rounded-lg">
      Heritage
    </div>
    <div className="absolute bottom-6 left-6 text-white right-6">
      <span className="text-[9px] font-black uppercase font-sans tracking-widest text-amber-300 block mb-1">
        🕌 {activity.destinationId?.name || "Historic Site"}
      </span>
      <h4 className="text-lg font-bold font-serif mb-2 leading-tight line-clamp-2">{activity.name}</h4>
      <div className="flex items-center justify-between">
        <span className="text-[9px] bg-white/10 text-white px-2 py-1 rounded-lg uppercase font-sans font-black">Archive Verified</span>
        <span className="flex items-center gap-1 text-[10px] font-black text-yellow-400">
          <Star size={10} className="fill-yellow-400" /> {activity.ratings?.average || "4.6"}
        </span>
      </div>
    </div>
  </motion.div>
);

const NatureCard = ({ activity, onClick }: { activity: Activity; onClick: () => void }) => (
  <div
    onClick={onClick}
    className="w-[280px] md:w-[320px] h-[360px] shrink-0 relative overflow-hidden rounded-[2rem] border border-emerald-200 bg-emerald-50/30 group cursor-pointer shadow-md hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500"
  >
    <Image
      src={activity.images?.[0] || 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80'}
      alt={activity.name || ''}
      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-transparent to-transparent" />
    <div className="absolute top-4 left-4 bg-emerald-600 text-white text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg">
      Eco-Wild
    </div>
    <div className="absolute bottom-6 left-6 text-white right-6">
      <span className="text-[9px] font-black uppercase tracking-widest text-emerald-300 block mb-1">
        🌿 {activity.destinationId?.name || "Nature Reserve"}
      </span>
      <h4 className="text-lg font-extrabold mb-2 leading-tight line-clamp-2">{activity.name}</h4>
      <div className="flex items-center justify-between">
        <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-2 py-1 rounded-lg border border-emerald-500/20 uppercase font-black">Wild Forest</span>
        <span className="flex items-center gap-1 text-[10px] font-black text-yellow-400">
          <Star size={10} className="fill-yellow-400" /> {activity.ratings?.average || "4.7"}
        </span>
      </div>
    </div>
  </div>
);

const SpiritualCard = ({ activity, onClick }: { activity: Activity; onClick: () => void }) => (
  <div
    onClick={onClick}
    className="w-[280px] md:w-[320px] h-[360px] shrink-0 relative overflow-hidden rounded-[2rem] border border-indigo-200/50 bg-indigo-50/30 group cursor-pointer shadow-md hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500"
  >
    <Image
      src={activity.images?.[0] || 'https://images.unsplash.com/photo-1486915309851-b0cc1f8a0084?auto=format&fit=crop&q=80'}
      alt={activity.name || ''}
      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-indigo-950 via-transparent to-transparent" />
    <div className="absolute top-4 left-4 bg-indigo-600 text-white text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg">
      Zen Sanctuary
    </div>
    <div className="absolute bottom-6 left-6 text-white right-6">
      <span className="text-[9px] font-black uppercase tracking-widest text-indigo-300 block mb-1">
        🪷 {activity.destinationId?.name || "Sacred Site"}
      </span>
      <h4 className="text-lg font-extrabold mb-2 leading-tight line-clamp-2">{activity.name}</h4>
      <span className="text-[9px] bg-indigo-500/20 text-indigo-300 px-2 py-1 rounded-lg border border-indigo-500/20 uppercase font-black">Monastery</span>
    </div>
  </div>
);

const FoodCard = ({ activity, onClick }: { activity: Activity; onClick: () => void }) => (
  <div
    onClick={onClick}
    className="w-[280px] md:w-[320px] h-[360px] shrink-0 relative overflow-hidden rounded-[2rem] border border-yellow-200 bg-yellow-50/30 group cursor-pointer shadow-md hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-500"
  >
    <Image
      src={activity.images?.[0] || 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80'}
      alt={activity.name || ''}
      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-orange-950 via-transparent to-transparent" />
    <div className="absolute top-4 left-4 bg-orange-600/90 text-white text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg">
      Foodie Trail
    </div>
    <div className="absolute bottom-6 left-6 text-white right-6">
      <span className="text-[9px] font-black uppercase tracking-widest text-yellow-300 block mb-1">
        🍜 {activity.destinationId?.name || "Local Market"}
      </span>
      <h4 className="text-lg font-extrabold mb-2 leading-tight line-clamp-2">{activity.name}</h4>
      <div className="flex items-center justify-between">
        {formatPrice(activity) && (
          <span className="text-[9px] bg-orange-500/20 text-orange-300 px-2 py-1 rounded-lg border border-orange-500/20 uppercase font-black">
            {formatPrice(activity)}
          </span>
        )}
        <span className="flex items-center gap-1 text-[10px] font-black text-yellow-400 ml-auto">
          <Star size={10} className="fill-yellow-400" /> {activity.ratings?.average || "4.5"}
        </span>
      </div>
    </div>
  </div>
);

const WaterCard = ({ activity, onClick }: { activity: Activity; onClick: () => void }) => (
  <div
    onClick={onClick}
    className="w-[280px] md:w-[320px] h-[360px] shrink-0 relative overflow-hidden rounded-[2rem] border border-teal-500/20 bg-slate-900 group cursor-pointer shadow-md hover:shadow-2xl hover:shadow-teal-500/10 transition-all duration-500"
  >
    <Image
      src={activity.images?.[0] || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80'}
      alt={activity.name || ''}
      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-teal-950 via-slate-900/20 to-transparent" />
    <div className="absolute top-4 left-4 bg-teal-600/90 text-white text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg border border-teal-400/20">
      Water Sport
    </div>
    <div className="absolute bottom-6 left-6 text-white right-6">
      <span className="text-[9px] font-black uppercase tracking-widest text-teal-300 block mb-1">
        🌊 {activity.destinationId?.name || "Waterfront"}
      </span>
      <h4 className="text-lg font-extrabold mb-2 leading-tight group-hover:text-teal-300 transition-colors line-clamp-2">{activity.name}</h4>
      <div className="flex items-center justify-between">
        <span className="text-[9px] bg-teal-600/20 text-teal-300 px-2 py-1 rounded-lg border border-teal-500/20 uppercase font-black">Aqua</span>
        <span className="flex items-center gap-1 text-[10px] font-black text-yellow-400">
          <Star size={10} className="fill-yellow-400" /> {activity.ratings?.average || "4.7"}
        </span>
      </div>
    </div>
  </div>
);

const WellnessCard = ({ activity, onClick }: { activity: Activity; onClick: () => void }) => (
  <div
    onClick={onClick}
    className="w-[280px] md:w-[320px] h-[360px] shrink-0 relative overflow-hidden rounded-[2rem] border border-rose-200 bg-rose-50/30 group cursor-pointer shadow-md hover:shadow-2xl hover:shadow-rose-500/10 transition-all duration-500"
  >
    <Image
      src={activity.images?.[0] || 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80'}
      alt={activity.name || ''}
      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-rose-950 via-transparent to-transparent" />
    <div className="absolute top-4 left-4 bg-rose-600 text-white text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg">
      Wellness
    </div>
    <div className="absolute bottom-6 left-6 text-white right-6">
      <span className="text-[9px] font-black uppercase tracking-widest text-rose-300 block mb-1">
        🧘 {activity.destinationId?.name || "Retreat"}
      </span>
      <h4 className="text-lg font-extrabold mb-2 leading-tight line-clamp-2">{activity.name}</h4>
      <span className="text-[9px] bg-rose-500/20 text-rose-300 px-2 py-1 rounded-lg border border-rose-500/20 uppercase font-black font-sans">Soul Retreat</span>
    </div>
  </div>
);

const UrbanCard = ({ activity, onClick }: { activity: Activity; onClick: () => void }) => (
  <div
    onClick={onClick}
    className="w-[280px] md:w-[320px] h-[360px] shrink-0 relative overflow-hidden rounded-[2rem] border border-blue-500/20 bg-slate-900 group cursor-pointer shadow-md hover:shadow-2xl hover:shadow-blue-500/10 hover:border-blue-400/40 transition-all duration-500"
  >
    <Image
      src={activity.images?.[0] || "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&q=80"}
      alt={activity.name || ''}
      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/10 to-transparent" />
    <div className="absolute top-4 left-4 bg-blue-600/90 text-white text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg border border-blue-400/30">
      City Life
    </div>
    <div className="absolute bottom-6 left-6 text-white right-6">
      <span className="text-[9px] font-black uppercase tracking-widest text-cyan-400 block mb-1">
        🏙️ {activity.destinationId?.name || "Urban Hub"}
      </span>
      <h4 className="text-lg font-extrabold mb-2 leading-tight group-hover:text-blue-300 transition-colors line-clamp-2">{activity.name}</h4>
      <div className="flex items-center justify-between">
        <span className="text-[9px] bg-white/10 px-2 py-1 rounded-lg border border-white/10 uppercase font-black text-slate-300">Active</span>
        <span className="flex items-center gap-1 text-[10px] font-black text-yellow-400">
          <Star size={10} className="fill-yellow-400" /> {activity.ratings?.average || "4.8"}
        </span>
      </div>
    </div>
  </div>
);

// ─── Card renderer lookup ──────────────────────────────────────────────────────

const renderActivityCard = (categoryId: ActivityCategoryId, activity: Activity, onClick: () => void, index: number) => {
  const key = activity._id || index;
  switch (categoryId) {
    case 'adventure': return <AdventureCard key={key} activity={activity} onClick={onClick} />;
    case 'cultural': return <CulturalCard key={key} activity={activity} onClick={onClick} />;
    case 'nature': return <NatureCard key={key} activity={activity} onClick={onClick} />;
    case 'spiritual': return <SpiritualCard key={key} activity={activity} onClick={onClick} />;
    case 'food': return <FoodCard key={key} activity={activity} onClick={onClick} />;
    case 'water': return <WaterCard key={key} activity={activity} onClick={onClick} />;
    case 'wellness': return <WellnessCard key={key} activity={activity} onClick={onClick} />;
    case 'urban': return <UrbanCard key={key} activity={activity} onClick={onClick} />;
    default: return null;
  }
};

const getCardType = (activity: Activity): ActivityCategoryId => {
  const cats = activity.category || [];
  for (const [panelId, filterCats] of Object.entries(CATEGORY_FILTER_MAP)) {
    if (cats.some(c => filterCats.includes(c.toLowerCase()))) {
      return panelId as ActivityCategoryId;
    }
  }
  return 'adventure'; // default fallback
};

// ─── Main Component ────────────────────────────────────────────────────────────

export const DynamicActivitiesCategories = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { data: allData, isLoading } = useAllActivities();
  const allActivities: Activity[] = allData?.data || [];

  // Read URL Search Parameters for Active Filtering
  const query = searchParams.get('query') || '';
  const category = searchParams.get('category') || '';
  const subFilter = searchParams.get('subFilter') || '';
  const travelers = searchParams.get('travelers') || '';
  const sort = searchParams.get('sort') || 'rating';

  const isFilterActive = !!(query || category || subFilter || travelers);

  // ── Unified Activities Filter & Sort Pipeline ──
  const filteredActivities = useMemo(() => {
    let result = [...allActivities];

    // 1. Text Query (name, description, or location address match)
    if (query) {
      const q = query.toLowerCase();
      result = result.filter(act => 
        act.name?.toLowerCase().includes(q) ||
        act.shortDescription?.toLowerCase().includes(q) ||
        act.longDescription?.toLowerCase().includes(q) ||
        act.destinationId?.name?.toLowerCase().includes(q) ||
        act.tags?.some(t => t.toLowerCase().includes(q))
      );
    }

    // 2. Category
    if (category) {
      const cat = category.toLowerCase().replace(/ & /g, '_').replace(/ /g, '_');
      result = result.filter(act => 
        act.category?.some(c => 
          c.toLowerCase() === cat || 
          c.toLowerCase() === category.toLowerCase() ||
          c.toLowerCase().includes(cat)
        )
      );
    }

    // 3. Sub Filters
    if (subFilter) {
      const sf = subFilter.toLowerCase();
      if (sf === 'family friendly') {
        result = result.filter(act => 
          act.recommendedFor?.some(s => s.toLowerCase().includes('family') || s.toLowerCase().includes('kids')) ||
          act.tags?.some(t => t.toLowerCase().includes('family'))
        );
      } else if (sf === 'under $50') {
        result = result.filter(act => {
          const price = act.pricing?.price || 0;
          const isFree = act.pricing?.isFree;
          return isFree || price < 50 || price < 4000;
        });
      } else if (sf === 'half day') {
        result = result.filter(act => {
          const dur = act.timing?.duration || 0;
          return dur > 0 && dur <= 240; // 4 hours or less
        });
      } else if (sf === 'full day') {
        result = result.filter(act => {
          const dur = act.timing?.duration || 0;
          return dur > 240; // More than 4 hours
        });
      } else if (sf === 'instant confirmation') {
        result = result.filter(act => 
          (act as any).bookingPolicy?.instantConfirmation !== false
        );
      } else if (sf === 'free cancellation') {
        result = result.filter(act => 
          (act as any).bookingPolicy?.freeCancellation !== false
        );
      }
    }

    // 4. Travelers / Group capacity
    if (travelers) {
      const g = parseInt(travelers, 10);
      if (!isNaN(g)) {
        result = result.filter(act => {
          const maxGroup = (act as any).maxGroupSize || 99;
          return maxGroup >= g;
        });
      }
    }

    // 5. Sorting logic
    if (sort === 'price_asc') {
      result.sort((a, b) => (a.pricing?.price || 0) - (b.pricing?.price || 0));
    } else if (sort === 'price_desc') {
      result.sort((a, b) => (b.pricing?.price || 0) - (a.pricing?.price || 0));
    } else if (sort === 'rating') {
      result.sort((a, b) => (b.ratings?.average || 0) - (a.ratings?.average || 0));
    }

    return result;
  }, [allActivities, query, category, subFilter, travelers, sort]);

  // ── Client-side category filtering ──
  const categorisedActivities = useMemo(() => {
    const result: Record<ActivityCategoryId, Activity[]> = {
      adventure: [], cultural: [], nature: [], spiritual: [],
      food: [], water: [], wellness: [], urban: [],
    };

    allActivities.forEach((activity) => {
      const actCats = activity.category || [];

      (Object.keys(CATEGORY_FILTER_MAP) as ActivityCategoryId[]).forEach((panelId) => {
        const filterCats = CATEGORY_FILTER_MAP[panelId];
        if (actCats.some((c) => filterCats.includes(c))) {
          // Avoid duplicate entries in case of multiple matching categories
          if (!result[panelId].find((a) => a._id === activity._id)) {
            result[panelId].push(activity);
          }
        }
      });
    });

    // Limit each panel to 12 items
    (Object.keys(result) as ActivityCategoryId[]).forEach((k) => {
      result[k] = result[k].slice(0, 12);
    });

    return result;
  }, [allActivities]);

  // ── Scroll refs (one per category) ──
  const scrollRefs = {
    adventure: useRef<HTMLDivElement>(null),
    cultural: useRef<HTMLDivElement>(null),
    nature: useRef<HTMLDivElement>(null),
    spiritual: useRef<HTMLDivElement>(null),
    food: useRef<HTMLDivElement>(null),
    water: useRef<HTMLDivElement>(null),
    wellness: useRef<HTMLDivElement>(null),
    urban: useRef<HTMLDivElement>(null),
  };

  const handleScroll = (id: ActivityCategoryId, direction: 'left' | 'right') => {
    const ref = scrollRefs[id];
    if (ref.current) {
      const { scrollLeft } = ref.current;
      const scrollTo = direction === 'left' ? scrollLeft - 360 : scrollLeft + 360;
      ref.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const handleActivityClick = (slug?: string) => {
    if (slug) router.push(`/activities/${slug}`);
  };

  // ── Loading skeleton ──
  if (isLoading) {
    return (
      <div className="space-y-8 sm:space-y-12 animate-pulse">
        {[1, 2, 3].map((val) => (
          <div key={val} className="bg-slate-100/50 rounded-[1.75rem] sm:rounded-[2.5rem] p-5 sm:p-8 h-64 sm:h-80 flex flex-col justify-between">
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
            <h3 className="text-xl font-bold text-slate-800">Matching Activities</h3>
            <p className="text-sm text-slate-500 mt-1">
              Found <span className="font-extrabold text-rose-500">{filteredActivities.length}</span> curated adventures
            </p>
          </div>
          <button
            onClick={() => router.push(pathname)}
            className="self-start sm:self-auto px-5 py-2.5 bg-white border border-rose-200 hover:bg-rose-50 text-rose-600 rounded-full text-xs font-bold transition-all cursor-pointer"
          >
            Clear All Filters
          </button>
        </div>

        {filteredActivities.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4 justify-items-center">
            {filteredActivities.map((activity, index) =>
              renderActivityCard(
                getCardType(activity),
                activity,
                () => handleActivityClick(activity.slug),
                index
              )
            )}
          </div>
        ) : (
          <div className="text-center py-20 bg-slate-50 rounded-[2.5rem] border border-slate-100 border-dashed max-w-2xl mx-auto px-4 mt-6">
            <Sparkles className="text-rose-500 mx-auto mb-4 animate-bounce" size={40} />
            <h4 className="text-xl font-black text-slate-800">No matching activities found</h4>
            <p className="text-slate-500 mt-2 text-sm max-w-md mx-auto">
              We couldn&apos;t find any adventure activities matching your active queries. Try adjusting your search query or clear filters.
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
    <div className="space-y-10 sm:space-y-14 md:space-y-16">
      {CATEGORY_PANELS.map((panel) => {
        const list = categorisedActivities[panel.id];

        // Only render panels that have activities
        if (!list || list.length === 0) return null;

        return (
          <ActivityCategoryWrapper
            key={panel.id}
            id={panel.id}
            title={panel.title}
            subtitle={panel.subtitle}
            icon={panel.icon}
            onScrollLeft={() => handleScroll(panel.id, 'left')}
            onScrollRight={() => handleScroll(panel.id, 'right')}
          >
            {/* Horizontal scrollable row */}
            <div
              ref={scrollRefs[panel.id]}
              className="flex items-center gap-3 sm:gap-4 md:gap-6 overflow-x-auto pb-4 pt-1 no-scrollbar scroll-smooth flex-nowrap"
            >
              {list.map((activity, index) =>
                renderActivityCard(
                  panel.id,
                  activity,
                  () => handleActivityClick(activity.slug),
                  index
                )
              )}
            </div>
          </ActivityCategoryWrapper>
        );
      })}
    </div>
  );
};
