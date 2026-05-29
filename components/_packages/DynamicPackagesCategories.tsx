"use client";

import React, { useMemo, useRef } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Compass, Heart, Trees, Sparkles, Flower2, Landmark,
  Clock, Star, MapPin
} from 'lucide-react';
import Image from "@/components/ui/Image";

// Hooks
import { useAllPackages } from '@/hooks/usePackages';

// Components
import { PackageCategoryWrapper, PackageCategoryId } from './PackageCategoryWrapper';
import { TourPackage } from '@/types/type';

// ─── Category panel metadata ───────────────────────────────────────────────────

const CATEGORY_PANELS: {
  id: PackageCategoryId;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}[] = [
    {
      id: 'luxury',
      title: "Premium Luxury",
      subtitle: "All-inclusive premium custom tour itineraries curated for maximum comfort and style.",
      icon: <Sparkles size={22} />,
    },
    {
      id: 'adventure',
      title: "Epic Adventures & Treks",
      subtitle: "Conquer massive mountain passes, high altitude rivers, and rugged forest trails.",
      icon: <Compass size={22} />,
    },
    {
      id: 'romantic',
      title: "Romantic Honeymoons",
      subtitle: "Quiet misty valleys, premium cozy candlelit villas, and serene visual escapes.",
      icon: <Heart size={22} />,
    },
    {
      id: 'family',
      title: "Family Getaways",
      subtitle: "Perfectly paced weekend packages designed for multi-generational comfort and joy.",
      icon: <Trees size={22} />,
    },
    {
      id: 'spiritual',
      title: "Spiritual & Wellness",
      subtitle: "Find mindfulness, meditation retreats, and sacred temple trails across the Himalayas.",
      icon: <Flower2 size={22} />,
    },
    {
      id: 'cultural',
      title: "Heritage & Living Culture",
      subtitle: "Explore ancient kingdom archives, local arts, standard folklore, and ancient architectures.",
      icon: <Landmark size={22} />,
    },
  ];

// ─── Card Renderers ────────────────────────────────────────────────────────────

const LuxuryCard = ({ pkg, onClick }: { pkg: TourPackage; onClick: () => void }) => {
  const image = pkg.images?.[0] || "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80";
  const destName = (pkg.destination?.id as any)?.name || (pkg.destination as any)?.name || "Luxury Destination";
  const rating = pkg.ratings?.average || 4.9;
  const price = pkg.pricing?.basePrice || 3500;
  const days = pkg.duration?.days || 5;

  return (
    <div
      onClick={onClick}
      className="w-[280px] md:w-[320px] h-[360px] shrink-0 relative overflow-hidden rounded-[2rem] border border-blue-500/20 bg-slate-900 group cursor-pointer shadow-md hover:shadow-2xl hover:shadow-blue-500/10 hover:border-blue-400/50 transition-all duration-500"
    >
      <Image
        src={image}
        alt={pkg.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/10 to-transparent" />
      <div className="absolute top-4 left-4 bg-blue-600/90 text-white text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg border border-blue-400/30">
        Premium Luxury
      </div>
      <div className="absolute bottom-6 left-6 text-white right-6 font-sans">
        <span className="text-[9px] font-black uppercase tracking-widest text-cyan-400 block mb-1">
          <MapPin size={10} className="inline mr-1" /> {destName}
        </span>
        <h4 className="text-base sm:text-lg font-extrabold mb-2 leading-tight line-clamp-2">{pkg.title}</h4>
        <div className="flex items-center justify-between">
          <span className="text-xs font-black">${price} <span className="text-[9px] font-normal text-slate-400">pkg</span></span>
          <span className="flex items-center gap-1 text-[10px] font-black text-yellow-400">
            <Star size={10} className="fill-yellow-400" /> {rating}
          </span>
        </div>
        <div className="mt-2 text-[9px] text-cyan-300 font-bold flex items-center gap-1">
          <Clock size={10} /> {days} Days
        </div>
      </div>
    </div>
  );
};

const AdventureCard = ({ pkg, onClick }: { pkg: TourPackage; onClick: () => void }) => {
  const image = pkg.images?.[0] || "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80";
  const destName = (pkg.destination?.id as any)?.name || (pkg.destination as any)?.name || "Adventure Summit";
  const rating = pkg.ratings?.average || 4.8;
  const price = pkg.pricing?.basePrice || 1200;
  const days = pkg.duration?.days || 6;

  return (
    <motion.div
      onClick={onClick}
      whileHover={{ y: -6, rotateX: 1, rotateY: -1 }}
      style={{ transformStyle: 'preserve-3d' }}
      className="w-[280px] md:w-[320px] h-[360px] shrink-0 relative overflow-hidden rounded-[2rem] border border-orange-500/20 bg-zinc-950 group cursor-pointer shadow-md hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-300"
    >
      <Image
        src={image}
        alt={pkg.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-slate-900/10 to-transparent" />
      <div className="absolute top-4 left-4 bg-orange-600/90 text-white text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg border border-orange-400/20">
        Epic Expedition
      </div>
      <div className="absolute bottom-6 left-6 text-white right-6 font-sans">
        <span className="text-[9px] font-black uppercase tracking-widest text-orange-400 block mb-1">
          <MapPin size={10} className="inline mr-1" /> {destName}
        </span>
        <h4 className="text-base sm:text-lg font-extrabold mb-2 leading-tight group-hover:text-orange-400 transition-colors line-clamp-2">{pkg.title}</h4>
        <div className="flex items-center justify-between">
          <span className="text-xs font-black">${price} <span className="text-[9px] font-normal text-slate-400">pkg</span></span>
          <span className="flex items-center gap-1 text-[10px] font-black text-yellow-400">
            <Star size={10} className="fill-yellow-400" /> {rating}
          </span>
        </div>
        <div className="mt-2 text-[9px] text-orange-300 font-bold flex items-center gap-1">
          <Clock size={10} /> {days} Days
        </div>
      </div>
    </motion.div>
  );
};

const RomanticCard = ({ pkg, onClick }: { pkg: TourPackage; onClick: () => void }) => {
  const image = pkg.images?.[0] || "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80";
  const destName = (pkg.destination?.id as any)?.name || (pkg.destination as any)?.name || "Honeymoon Escape";
  const rating = pkg.ratings?.average || 4.9;
  const price = pkg.pricing?.basePrice || 2400;
  const days = pkg.duration?.days || 5;

  return (
    <div
      onClick={onClick}
      className="w-[280px] md:w-[320px] h-[360px] shrink-0 relative overflow-hidden rounded-[2rem] border border-rose-200 bg-rose-50/30 group cursor-pointer shadow-md hover:shadow-2xl hover:shadow-rose-500/10 transition-all duration-500"
    >
      <Image
        src={image}
        alt={pkg.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-rose-950 via-transparent to-transparent" />
      <div className="absolute top-4 left-4 bg-rose-600 text-white text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg">
        Sweet Romantic
      </div>
      <div className="absolute bottom-6 left-6 text-white right-6 font-sans">
        <span className="text-[9px] font-black uppercase tracking-widest text-rose-300 block mb-1">
          💕 {destName}
        </span>
        <h4 className="text-base sm:text-lg font-extrabold mb-2 leading-tight line-clamp-2">{pkg.title}</h4>
        <div className="flex items-center justify-between">
          <span className="text-xs font-black">${price} <span className="text-[9px] font-normal text-rose-300">pkg</span></span>
          <span className="flex items-center gap-1 text-[10px] font-black text-yellow-400">
            <Star size={10} className="fill-yellow-400" /> {rating}
          </span>
        </div>
        <div className="mt-2 text-[9px] text-rose-200 font-bold flex items-center gap-1">
          <Clock size={10} /> {days} Days
        </div>
      </div>
    </div>
  );
};

const FamilyCard = ({ pkg, onClick }: { pkg: TourPackage; onClick: () => void }) => {
  const image = pkg.images?.[0] || "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80";
  const destName = (pkg.destination?.id as any)?.name || (pkg.destination as any)?.name || "Family Retreat";
  const rating = pkg.ratings?.average || 4.7;
  const price = pkg.pricing?.basePrice || 1800;
  const days = pkg.duration?.days || 4;

  return (
    <div
      onClick={onClick}
      className="w-[280px] md:w-[320px] h-[360px] shrink-0 relative overflow-hidden rounded-[2rem] border border-emerald-200 bg-emerald-50/30 group cursor-pointer shadow-md hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500"
    >
      <Image
        src={image}
        alt={pkg.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-transparent to-transparent" />
      <div className="absolute top-4 left-4 bg-emerald-600 text-white text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg">
        Family Approved
      </div>
      <div className="absolute bottom-6 left-6 text-white right-6 font-sans">
        <span className="text-[9px] font-black uppercase tracking-widest text-emerald-300 block mb-1">
          🌿 {destName}
        </span>
        <h4 className="text-base sm:text-lg font-extrabold mb-2 leading-tight line-clamp-2">{pkg.title}</h4>
        <div className="flex items-center justify-between">
          <span className="text-xs font-black">${price} <span className="text-[9px] font-normal text-emerald-300">pkg</span></span>
          <span className="flex items-center gap-1 text-[10px] font-black text-yellow-400">
            <Star size={10} className="fill-yellow-400" /> {rating}
          </span>
        </div>
        <div className="mt-2 text-[9px] text-emerald-200 font-bold flex items-center gap-1">
          <Clock size={10} /> {days} Days
        </div>
      </div>
    </div>
  );
};

const SpiritualCard = ({ pkg, onClick }: { pkg: TourPackage; onClick: () => void }) => {
  const image = pkg.images?.[0] || "https://images.unsplash.com/photo-1486915309851-b0cc1f8a0084?auto=format&fit=crop&q=80";
  const destName = (pkg.destination?.id as any)?.name || (pkg.destination as any)?.name || "Zen Pilgrimage";
  const rating = pkg.ratings?.average || 4.8;
  const price = pkg.pricing?.basePrice || 1100;
  const days = pkg.duration?.days || 7;

  return (
    <div
      onClick={onClick}
      className="w-[280px] md:w-[320px] h-[360px] shrink-0 relative overflow-hidden rounded-[2rem] border border-indigo-200/50 bg-indigo-50/30 group cursor-pointer shadow-md hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500"
    >
      <Image
        src={image}
        alt={pkg.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-indigo-950 via-transparent to-transparent" />
      <div className="absolute top-4 left-4 bg-indigo-600 text-white text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg">
        Spiritual Walk
      </div>
      <div className="absolute bottom-6 left-6 text-white right-6 font-sans">
        <span className="text-[9px] font-black uppercase tracking-widest text-indigo-300 block mb-1">
          🪷 {destName}
        </span>
        <h4 className="text-base sm:text-lg font-extrabold mb-2 leading-tight line-clamp-2">{pkg.title}</h4>
        <div className="flex items-center justify-between">
          <span className="text-xs font-black">${price} <span className="text-[9px] font-normal text-indigo-300">pkg</span></span>
          <span className="flex items-center gap-1 text-[10px] font-black text-yellow-400">
            <Star size={10} className="fill-yellow-400" /> {rating}
          </span>
        </div>
        <div className="mt-2 text-[9px] text-indigo-200 font-bold flex items-center gap-1">
          <Clock size={10} /> {days} Days
        </div>
      </div>
    </div>
  );
};

const CulturalCard = ({ pkg, onClick }: { pkg: TourPackage; onClick: () => void }) => {
  const image = pkg.images?.[0] || "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&q=80";
  const destName = (pkg.destination?.id as any)?.name || (pkg.destination as any)?.name || "Cultural Vault";
  const rating = pkg.ratings?.average || 4.8;
  const price = pkg.pricing?.basePrice || 1400;
  const days = pkg.duration?.days || 6;

  return (
    <motion.div
      onClick={onClick}
      whileHover={{ y: -6, rotateY: 2 }}
      className="w-[280px] md:w-[320px] h-[360px] shrink-0 relative overflow-hidden rounded-[2rem] border border-amber-200/50 bg-amber-50/20 font-serif group cursor-pointer shadow-md hover:shadow-2xl hover:shadow-amber-900/10 transition-all duration-300"
    >
      <Image
        src={image}
        alt={pkg.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-amber-950/95 via-transparent to-transparent" />
      <div className="absolute top-4 left-4 bg-amber-800 text-white text-[8px] font-black uppercase font-sans tracking-widest px-2.5 py-1 rounded-lg">
        Historic Vault
      </div>
      <div className="absolute bottom-6 left-6 text-white right-6 font-sans">
        <span className="text-[9px] font-black uppercase font-sans tracking-widest text-amber-300 block mb-1">
          🕌 {destName}
        </span>
        <h4 className="text-base sm:text-lg font-bold font-serif mb-2 leading-tight line-clamp-2">{pkg.title}</h4>
        <div className="flex items-center justify-between">
          <span className="text-xs font-black font-sans">${price} <span className="text-[9px] font-normal text-amber-300/80 font-sans">pkg</span></span>
          <span className="flex items-center gap-1 text-[10px] font-black text-yellow-400 font-sans">
            <Star size={10} className="fill-yellow-400" /> {rating}
          </span>
        </div>
        <div className="mt-2 text-[9px] text-amber-200 font-sans font-bold flex items-center gap-1">
          <Clock size={10} /> {days} Days
        </div>
      </div>
    </motion.div>
  );
};

// ─── Card renderer lookup ──────────────────────────────────────────────────────

const renderPackageCard = (categoryId: PackageCategoryId, pkg: TourPackage, onClick: () => void, index: number) => {
  const key = pkg._id || index;
  switch (categoryId) {
    case 'luxury': return <LuxuryCard key={key} pkg={pkg} onClick={onClick} />;
    case 'adventure': return <AdventureCard key={key} pkg={pkg} onClick={onClick} />;
    case 'romantic': return <RomanticCard key={key} pkg={pkg} onClick={onClick} />;
    case 'family': return <FamilyCard key={key} pkg={pkg} onClick={onClick} />;
    case 'spiritual': return <SpiritualCard key={key} pkg={pkg} onClick={onClick} />;
    case 'cultural': return <CulturalCard key={key} pkg={pkg} onClick={onClick} />;
    default: return null;
  }
};

const getCardType = (pkg: TourPackage): PackageCategoryId => {
  const cats = pkg.categories || [];
  const tags = pkg.aiMetadata?.tags || [];
  if (cats.some(c => c.toLowerCase() === 'luxury') || tags.some(t => t.toLowerCase() === 'luxury')) return 'luxury';
  if (cats.some(c => ['adventure', 'trekking', 'backpacking'].includes(c.toLowerCase()))) return 'adventure';
  if (cats.some(c => ['honeymoon', 'romantic'].includes(c.toLowerCase())) || tags.some(t => t.toLowerCase() === 'romantic')) return 'romantic';
  if (cats.some(c => ['family', 'weekend_getaway'].includes(c.toLowerCase()))) return 'family';
  if (cats.some(c => ['spiritual', 'wellness'].includes(c.toLowerCase()))) return 'spiritual';
  if (cats.some(c => ['cultural', 'heritage'].includes(c.toLowerCase()))) return 'cultural';
  return 'adventure'; // Default fallback
};

// ─── Main Component ────────────────────────────────────────────────────────────

export const DynamicPackagesCategories = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { data: allData, isLoading } = useAllPackages();
  const allPackages: TourPackage[] = allData?.data || [];

  // Read URL Search Parameters for Active Filtering
  const query = searchParams.get('query') || '';
  const from = searchParams.get('from') || '';
  const to = searchParams.get('to') || '';
  const category = searchParams.get('category') || '';
  const duration = searchParams.get('duration') || '';
  const durationRange = searchParams.get('durationRange') || '';
  const budget = searchParams.get('budget') || '';
  const rating = searchParams.get('rating') || '';
  const flights = searchParams.get('flights') === 'true';
  const sort = searchParams.get('sort') || 'recommended';

  const isFilterActive = !!(query || from || to || category || duration || durationRange || budget || rating || flights);

  // ── Unified Packages Filter & Sort Pipeline ──
  const filteredPackages = useMemo(() => {
    let result = [...allPackages];

    // 1. Text Query (Title or Destination name match)
    if (query) {
      const q = query.toLowerCase();
      result = result.filter(pkg => 
        pkg.title?.toLowerCase().includes(q) ||
        (pkg.destination?.id as any)?.name?.toLowerCase().includes(q) ||
        (pkg.destination as any)?.name?.toLowerCase().includes(q) ||
        pkg.categories?.some(c => c.toLowerCase().includes(q))
      );
    }

    // 2. From Departure City
    if (from) {
      const f = from.toLowerCase();
      result = result.filter(pkg => 
        (pkg as any).departureCity?.toLowerCase().includes(f) ||
        pkg.title?.toLowerCase().includes(`from ${f}`)
      );
    }

    // 3. To Destination City
    if (to) {
      const t = to.toLowerCase();
      result = result.filter(pkg => 
        (pkg.destination?.id as any)?.name?.toLowerCase().includes(t) ||
        (pkg.destination as any)?.name?.toLowerCase().includes(t)
      );
    }

    // 4. Category/Theme (from Hero categories or FilterHeader category tabs)
    if (category) {
      const cat = category.toLowerCase();
      result = result.filter(pkg => 
        pkg.categories?.some(c => c.toLowerCase() === cat) ||
        pkg.aiMetadata?.tags?.some(t => t.toLowerCase() === cat) ||
        pkg.title?.toLowerCase().includes(cat)
      );
    }

    // 5. Exact Duration in Days
    if (duration) {
      const days = parseInt(duration, 10);
      if (!isNaN(days)) {
        result = result.filter(pkg => pkg.duration?.days === days);
      }
    }

    // 6. Duration Range
    if (durationRange) {
      result = result.filter(pkg => {
        const days = pkg.duration?.days || 0;
        if (durationRange === 'short') return days < 5;
        if (durationRange === 'mid') return days >= 5 && days <= 8;
        if (durationRange === 'long') return days > 8;
        return true;
      });
    }

    // 7. Budget Range
    if (budget) {
      result = result.filter(pkg => {
        const price = pkg.pricing?.basePrice || 0;
        if (budget === 'low') return price < 1500;
        if (budget === 'mid') return price >= 1500 && price <= 3000;
        if (budget === 'high') return price > 3000;
        return true;
      });
    }

    // 8. Minimum Rating Threshold
    if (rating) {
      const r = parseFloat(rating);
      result = result.filter(pkg => (pkg.ratings?.average || 0) >= r);
    }

    // 9. Includes Flights inclusions matching
    if (flights) {
      result = result.filter(pkg => 
        (pkg as any).includesFlights === true ||
        pkg.inclusions?.some(inc => inc.toLowerCase().includes('flight') || inc.toLowerCase().includes('airfare'))
      );
    }

    // 10. Sorting logic
    if (sort === 'price_asc') {
      result.sort((a, b) => (a.pricing?.basePrice || 0) - (b.pricing?.basePrice || 0));
    } else if (sort === 'price_desc') {
      result.sort((a, b) => (b.pricing?.basePrice || 0) - (a.pricing?.basePrice || 0));
    } else if (sort === 'rating') {
      result.sort((a, b) => (b.ratings?.average || 0) - (a.ratings?.average || 0));
    }

    return result;
  }, [allPackages, query, from, to, category, duration, durationRange, budget, rating, flights, sort]);

  // ── Client-side default category filtering (for scrollable layout) ──
  const categorisedPackages = useMemo(() => {
    const result: Record<PackageCategoryId, TourPackage[]> = {
      luxury: [], adventure: [], romantic: [], family: [], spiritual: [], cultural: [],
    };

    allPackages.forEach((pkg) => {
      const cats = pkg.categories || [];
      const tags = pkg.aiMetadata?.tags || [];

      // Adventure & Trekking
      if (cats.some(c => ['adventure', 'trekking', 'backpacking', 'roadtrip'].includes(c.toLowerCase()))) {
        result.adventure.push(pkg);
      }
      // Romantic & Honeymoon
      if (cats.some(c => ['honeymoon', 'romantic'].includes(c.toLowerCase())) || tags.some(t => t.toLowerCase() === 'romantic')) {
        result.romantic.push(pkg);
      }
      // Family & Weekend getaway
      if (cats.some(c => ['family', 'weekend_getaway'].includes(c.toLowerCase()))) {
        result.family.push(pkg);
      }
      // Luxury
      if (cats.some(c => c.toLowerCase() === 'luxury') || tags.some(t => t.toLowerCase() === 'luxury')) {
        result.luxury.push(pkg);
      }
      // Spiritual & Wellness
      if (cats.some(c => ['spiritual', 'wellness'].includes(c.toLowerCase()))) {
        result.spiritual.push(pkg);
      }
      // Cultural & Heritage
      if (cats.some(c => ['cultural', 'heritage'].includes(c.toLowerCase()))) {
        result.cultural.push(pkg);
      }
    });

    // Deduplicate and limit to 12 items
    (Object.keys(result) as PackageCategoryId[]).forEach((k) => {
      const seen = new Set();
      result[k] = result[k].filter(p => {
        const id = p._id || p.slug;
        if (seen.has(id)) return false;
        seen.add(id);
        return true;
      }).slice(0, 12);
    });

    return result;
  }, [allPackages]);

  // ── Scroll refs (one per category) ──
  const scrollRefs = {
    luxury: useRef<HTMLDivElement>(null),
    adventure: useRef<HTMLDivElement>(null),
    romantic: useRef<HTMLDivElement>(null),
    family: useRef<HTMLDivElement>(null),
    spiritual: useRef<HTMLDivElement>(null),
    cultural: useRef<HTMLDivElement>(null),
  };

  const handleScroll = (id: PackageCategoryId, direction: 'left' | 'right') => {
    const ref = scrollRefs[id];
    if (ref.current) {
      const { scrollLeft } = ref.current;
      const scrollTo = direction === 'left' ? scrollLeft - 360 : scrollLeft + 360;
      ref.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const handlePackageClick = (slug?: string) => {
    if (slug) router.push(`/packages/${slug}`);
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
        {/* Filter results status row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50 border border-slate-100 rounded-3xl p-6 sm:px-8">
          <div>
            <h3 className="text-xl font-bold text-slate-800">Matching Packages</h3>
            <p className="text-sm text-slate-500 mt-1">
              Found <span className="font-extrabold text-rose-500">{filteredPackages.length}</span> custom tour itineraries
            </p>
          </div>
          <button
            onClick={() => router.push(pathname)}
            className="self-start sm:self-auto px-5 py-2.5 bg-white border border-rose-200 hover:bg-rose-50 text-rose-600 rounded-full text-xs font-bold transition-all cursor-pointer"
          >
            Clear All Filters
          </button>
        </div>

        {filteredPackages.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4 justify-items-center">
            {filteredPackages.map((pkg, index) =>
              renderPackageCard(
                getCardType(pkg),
                pkg,
                () => handlePackageClick(pkg.slug),
                index
              )
            )}
          </div>
        ) : (
          <div className="text-center py-20 bg-slate-50 rounded-[2.5rem] border border-slate-100 border-dashed max-w-2xl mx-auto px-4 mt-6">
            <Sparkles className="text-rose-500 mx-auto mb-4 animate-bounce" size={40} />
            <h4 className="text-xl font-black text-slate-800">No matching itineraries found</h4>
            <p className="text-slate-500 mt-2 text-sm max-w-md mx-auto">
              We couldn&apos;t find any tour packages matching your active filters. Try searching for something else or resetting your search parameters.
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
    <div className="space-y-10 sm:space-y-14 md:space-y-16 mb-16 sm:mb-24">
      {CATEGORY_PANELS.map((panel) => {
        const list = categorisedPackages[panel.id];

        // Only render panels that have packages
        if (!list || list.length === 0) return null;

        return (
          <PackageCategoryWrapper
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
              {list.map((pkg, index) =>
                renderPackageCard(
                  panel.id,
                  pkg,
                  () => handlePackageClick(pkg.slug),
                  index
                )
              )}
            </div>
          </PackageCategoryWrapper>
        );
      })}
    </div>
  );
};
