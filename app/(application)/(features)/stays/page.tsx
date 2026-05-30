import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { getPageMetaData } from '@/services/theme.service';
import { mapBackendMetadata } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  try {
    const res = await getPageMetaData("stays-page");
    if (res?.success && res.data) {
      return mapBackendMetadata(res.data, {
        title: "Curated Himalayan Eco-Stays & Boutique Luxury Hotels | MountainMonkey",
        description: "Discover premier boutique hotels, mountain villas, and premium rustic eco-lodges in the Himalayas. Experience premium comfort in nature.",
      });
    }
  } catch (error) {
    console.error("Failed to generate metadata for stays page:", error);
  }

  return {
    title: "Curated Himalayan Eco-Stays & Boutique Luxury Hotels | MountainMonkey",
    description: "Discover premier boutique hotels, mountain villas, and premium rustic eco-lodges in the Himalayas. Experience premium comfort in nature.",
  };
}

import { StayFilterHeader } from '@/components/_stays/StayFilterHeader';
import { StayMapPreview } from '@/components/_stays/StayMapPreview';
import { DynamicStaysCategories } from '@/components/_stays/DynamicStaysCategories';
import { StayListingsSection } from '@/components/_stays/StayListingsSection';
import { StayPromoBanner } from '@/components/_stays/StayPromoBanner';
import { StayCustomSections } from '@/components/_stays/StayCustomSections';

export default function StayPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-slate-900 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-bold text-slate-500 tracking-wider uppercase">Loading Eco-Stays...</p>
        </div>
      </div>
    }>
      <div>
        {/* 1. Category Icons & Sort Filter Bar Header */}
        <StayFilterHeader />
        
        {/* 2. Main Content Experiential Layout Container */}
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-6 sm:py-8 font-sans space-y-12">
          {/* Dynamic themed categorised panels on top for direct filter feedback */}
          <DynamicStaysCategories />

          {/* Complete Stays Listings */}
          <StayListingsSection />
          
          {/* Map and Promo Banner moved below dynamic listings */}
          <StayMapPreview />
          <StayPromoBanner />
          <StayCustomSections />
        </div>
      </div>
    </Suspense>
  );
}