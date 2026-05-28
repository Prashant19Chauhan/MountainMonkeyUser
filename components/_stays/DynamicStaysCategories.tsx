"use client";

import React, { useMemo, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Palmtree, Castle, Home, Backpack, Hotel,
  Star, Heart, MapPin
} from 'lucide-react';
import Image from "@/components/ui/Image";

// Hooks
import { useAllStays } from '@/hooks/useStays';

// Components
import { StayCategoryWrapper, StayCategoryId } from './StayCategoryWrapper';
import { Stay } from '@/types/type';

// ─── Category panel metadata ───────────────────────────────────────────────────

const CATEGORY_PANELS: {
  id: StayCategoryId;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}[] = [
  {
    id: 'resort',
    title: "Premium Resorts",
    subtitle: "Immerse yourself in premium luxury eco-resorts with scenic panoramic vistas.",
    icon: <Palmtree size={22} />,
  },
  {
    id: 'villa',
    title: "Luxury Villas",
    subtitle: "Exclusive private escapes featuring premium bespoke designs and private pools.",
    icon: <Castle size={22} />,
  },
  {
    id: 'homestay',
    title: "Charming Homestays",
    subtitle: "Experience classic local hospitality in cozy wooden rustic mountain cottages.",
    icon: <Home size={22} />,
  },
  {
    id: 'hostel',
    title: "Social Hostels & Co-living",
    subtitle: "Vibrant community backer hubs, perfect for digital nomads and group travels.",
    icon: <Backpack size={22} />,
  },
  {
    id: 'hotel',
    title: "Boutique Hotels",
    subtitle: "Artisan hotels offering tailored contemporary comfort and unmatched services.",
    icon: <Hotel size={22} />,
  },
];

// ─── Card Renderers ────────────────────────────────────────────────────────────

const ResortCard = ({ stay, onClick }: { stay: Stay; onClick: () => void }) => {
  const image = stay.images?.[0] || 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80';
  const locationName = stay.destinationId?.name || stay.location?.address?.split(',').pop()?.trim() || "Resort";
  const rating = stay.ratings?.average || 4.7;
  const price = stay.priceRange?.min || 2500;

  return (
    <div
      onClick={onClick}
      className="w-[200px] sm:w-[250px] md:w-[300px] lg:w-[320px] h-[300px] sm:h-[330px] md:h-[360px] shrink-0 relative overflow-hidden rounded-[1.5rem] md:rounded-[2rem] border border-cyan-200 bg-cyan-50/30 group cursor-pointer shadow-md hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-500"
    >
      <Image
        src={image}
        alt={stay.name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-cyan-950 via-transparent to-transparent" />
      <div className="absolute top-4 left-4 bg-cyan-600/90 text-white text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg">
        Premium Resort
      </div>
      <div className="absolute bottom-6 left-6 text-white right-6 font-sans">
        <span className="text-[9px] font-black uppercase tracking-widest text-cyan-300 block mb-1">
          <MapPin size={10} className="inline mr-1" /> {locationName}
        </span>
        <h4 className="text-base sm:text-lg font-extrabold mb-2 leading-tight line-clamp-2">{stay.name}</h4>
        <div className="flex items-center justify-between">
          <span className="text-xs font-black">₹{price} <span className="text-[9px] font-normal text-cyan-300">night</span></span>
          <span className="flex items-center gap-1 text-[10px] font-black text-yellow-400">
            <Star size={10} className="fill-yellow-400" /> {rating}
          </span>
        </div>
      </div>
    </div>
  );
};

const VillaCard = ({ stay, onClick }: { stay: Stay; onClick: () => void }) => {
  const image = stay.images?.[0] || 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80';
  const locationName = stay.destinationId?.name || stay.location?.address?.split(',').pop()?.trim() || "Villa";
  const rating = stay.ratings?.average || 4.8;
  const price = stay.priceRange?.min || 5000;

  return (
    <motion.div
      onClick={onClick}
      whileHover={{ y: -6, rotateX: 1, rotateY: -1 }}
      style={{ transformStyle: 'preserve-3d' }}
      className="w-[200px] sm:w-[250px] md:w-[300px] lg:w-[320px] h-[300px] sm:h-[330px] md:h-[360px] shrink-0 relative overflow-hidden rounded-[1.5rem] md:rounded-[2rem] border border-blue-500/20 bg-zinc-950 group cursor-pointer shadow-md hover:shadow-2xl hover:shadow-blue-500/15 transition-all duration-300"
    >
      <Image
        src={image}
        alt={stay.name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-900/20 to-transparent" />
      <div className="absolute top-4 left-4 bg-blue-600/90 text-white text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg border border-blue-400/20">
        Bespoke Villa
      </div>
      <div className="absolute bottom-6 left-6 text-white right-6 font-sans">
        <span className="text-[9px] font-black uppercase tracking-widest text-cyan-400 block mb-1">
          <MapPin size={10} className="inline mr-1" /> {locationName}
        </span>
        <h4 className="text-base sm:text-lg font-extrabold mb-2 leading-tight group-hover:text-blue-300 transition-colors line-clamp-2">{stay.name}</h4>
        <div className="flex items-center justify-between">
          <span className="text-xs font-black">₹{price} <span className="text-[9px] font-normal text-slate-400">night</span></span>
          <span className="flex items-center gap-1 text-[10px] font-black text-yellow-400">
            <Star size={10} className="fill-yellow-400" /> {rating}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

const HomestayCard = ({ stay, onClick }: { stay: Stay; onClick: () => void }) => {
  const image = stay.images?.[0] || 'https://images.unsplash.com/photo-1508253730651-e5ace80a7025?auto=format&fit=crop&q=80';
  const locationName = stay.destinationId?.name || stay.location?.address?.split(',').pop()?.trim() || "Homestay";
  const rating = stay.ratings?.average || 4.6;
  const price = stay.priceRange?.min || 1200;

  return (
    <motion.div
      onClick={onClick}
      whileHover={{ y: -6, rotateY: 2 }}
      className="w-[200px] sm:w-[250px] md:w-[300px] lg:w-[320px] h-[300px] sm:h-[330px] md:h-[360px] shrink-0 relative overflow-hidden rounded-[1.5rem] md:rounded-[2rem] border border-amber-200/50 bg-amber-50/20 font-serif group cursor-pointer shadow-md hover:shadow-2xl hover:shadow-amber-900/10 transition-all duration-300"
    >
      <Image
        src={image}
        alt={stay.name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-amber-950/95 via-transparent to-transparent" />
      <div className="absolute top-4 left-4 bg-amber-800 text-white text-[8px] font-black uppercase font-sans tracking-widest px-2.5 py-1 rounded-lg">
        Local Host
      </div>
      <div className="absolute bottom-6 left-6 text-white right-6 font-sans">
        <span className="text-[9px] font-black uppercase font-sans tracking-widest text-amber-300 block mb-1">
          🏡 {locationName}
        </span>
        <h4 className="text-base sm:text-lg font-bold font-serif mb-2 leading-tight line-clamp-2">{stay.name}</h4>
        <div className="flex items-center justify-between">
          <span className="text-xs font-black font-sans">₹{price} <span className="text-[9px] font-normal text-amber-300/80">night</span></span>
          <span className="flex items-center gap-1 text-[10px] font-black text-yellow-400 font-sans">
            <Star size={10} className="fill-yellow-400" /> {rating}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

const HostelCard = ({ stay, onClick }: { stay: Stay; onClick: () => void }) => {
  const image = stay.images?.[0] || 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80';
  const locationName = stay.destinationId?.name || stay.location?.address?.split(',').pop()?.trim() || "Hostel";
  const rating = stay.ratings?.average || 4.5;
  const price = stay.priceRange?.min || 500;

  return (
    <div
      onClick={onClick}
      className="w-[200px] sm:w-[250px] md:w-[300px] lg:w-[320px] h-[300px] sm:h-[330px] md:h-[360px] shrink-0 relative overflow-hidden rounded-[1.5rem] md:rounded-[2rem] border border-indigo-200/50 bg-indigo-50/30 group cursor-pointer shadow-md hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500"
    >
      <Image
        src={image}
        alt={stay.name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-indigo-950 via-transparent to-transparent" />
      <div className="absolute top-4 left-4 bg-indigo-600 text-white text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg">
        Co-Living Hub
      </div>
      <div className="absolute bottom-6 left-6 text-white right-6 font-sans">
        <span className="text-[9px] font-black uppercase tracking-widest text-indigo-300 block mb-1">
          🎒 {locationName}
        </span>
        <h4 className="text-base sm:text-lg font-extrabold mb-2 leading-tight line-clamp-2">{stay.name}</h4>
        <div className="flex items-center justify-between">
          <span className="text-xs font-black">₹{price} <span className="text-[9px] font-normal text-indigo-300">night</span></span>
          <span className="flex items-center gap-1 text-[10px] font-black text-yellow-400">
            <Star size={10} className="fill-yellow-400" /> {rating}
          </span>
        </div>
      </div>
    </div>
  );
};

const HotelCard = ({ stay, onClick }: { stay: Stay; onClick: () => void }) => {
  const image = stay.images?.[0] || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80';
  const locationName = stay.destinationId?.name || stay.location?.address?.split(',').pop()?.trim() || "Hotel";
  const rating = stay.ratings?.average || 4.7;
  const price = stay.priceRange?.min || 1800;

  return (
    <div
      onClick={onClick}
      className="w-[200px] sm:w-[250px] md:w-[300px] lg:w-[320px] h-[300px] sm:h-[330px] md:h-[360px] shrink-0 relative overflow-hidden rounded-[1.5rem] md:rounded-[2rem] border border-rose-200 bg-rose-50/30 group cursor-pointer shadow-md hover:shadow-2xl hover:shadow-rose-500/10 transition-all duration-500"
    >
      <Image
        src={image}
        alt={stay.name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-rose-950 via-transparent to-transparent" />
      <div className="absolute top-4 left-4 bg-rose-600 text-white text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg">
        Boutique Hotel
      </div>
      <div className="absolute bottom-6 left-6 text-white right-6 font-sans">
        <span className="text-[9px] font-black uppercase tracking-widest text-rose-300 block mb-1">
          🏢 {locationName}
        </span>
        <h4 className="text-base sm:text-lg font-extrabold mb-2 leading-tight line-clamp-2">{stay.name}</h4>
        <div className="flex items-center justify-between">
          <span className="text-xs font-black">₹{price} <span className="text-[9px] font-normal text-rose-300">night</span></span>
          <span className="flex items-center gap-1 text-[10px] font-black text-yellow-400">
            <Star size={10} className="fill-yellow-400" /> {rating}
          </span>
        </div>
      </div>
    </div>
  );
};

// ─── Card renderer lookup ──────────────────────────────────────────────────────

const renderStayCard = (categoryId: StayCategoryId, stay: Stay, onClick: () => void, index: number) => {
  const key = stay._id || index;
  switch (categoryId) {
    case 'resort':   return <ResortCard key={key} stay={stay} onClick={onClick} />;
    case 'villa':    return <VillaCard key={key} stay={stay} onClick={onClick} />;
    case 'homestay': return <HomestayCard key={key} stay={stay} onClick={onClick} />;
    case 'hostel':   return <HostelCard key={key} stay={stay} onClick={onClick} />;
    case 'hotel':    return <HotelCard key={key} stay={stay} onClick={onClick} />;
    default: return null;
  }
};

// ─── Main Component ────────────────────────────────────────────────────────────

export const DynamicStaysCategories = () => {
  const router = useRouter();

  const { data: staysData, isLoading } = useAllStays();
  const allStays: Stay[] = staysData?.data || [];

  // ── Client-side category filtering ──
  const categorisedStays = useMemo(() => {
    const result: Record<StayCategoryId, Stay[]> = {
      resort: [], villa: [], homestay: [], hostel: [], hotel: [],
    };

    allStays.forEach((stay) => {
      const type = stay.type?.toLowerCase();
      if (type && type in result) {
        result[type as StayCategoryId].push(stay);
      }
    });

    // Limit each panel to 12 items
    (Object.keys(result) as StayCategoryId[]).forEach((k) => {
      result[k] = result[k].slice(0, 12);
    });

    return result;
  }, [allStays]);

  // ── Scroll refs (one per category) ──
  const scrollRefs = {
    resort:   useRef<HTMLDivElement>(null),
    villa:    useRef<HTMLDivElement>(null),
    homestay: useRef<HTMLDivElement>(null),
    hostel:   useRef<HTMLDivElement>(null),
    hotel:    useRef<HTMLDivElement>(null),
  };

  const handleScroll = (id: StayCategoryId, direction: 'left' | 'right') => {
    const ref = scrollRefs[id];
    if (ref.current) {
      const { scrollLeft } = ref.current;
      const scrollTo = direction === 'left' ? scrollLeft - 360 : scrollLeft + 360;
      ref.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const handleStayClick = (slug?: string) => {
    if (slug) router.push(`/stays/${slug}`);
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

  return (
    <div className="space-y-10 sm:space-y-14 md:space-y-16 mb-16 sm:mb-24">
      {CATEGORY_PANELS.map((panel) => {
        const list = categorisedStays[panel.id];

        // Only render panels that have stays
        if (!list || list.length === 0) return null;

        return (
          <StayCategoryWrapper
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
              {list.map((stay, index) =>
                renderStayCard(
                  panel.id,
                  stay,
                  () => handleStayClick(stay.slug || stay._id),
                  index
                )
              )}
            </div>
          </StayCategoryWrapper>
        );
      })}
    </div>
  );
};
