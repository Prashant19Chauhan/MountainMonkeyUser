import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { getPageMetaData } from '@/services/theme.service';
import { mapBackendMetadata } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  try {
    const res = await getPageMetaData("destinations-page");
    if (res?.success && res.data) {
      return mapBackendMetadata(res.data, {
        title: "Bespoke Himalayan Travel Destinations | MountainMonkey",
        description: "Explore mystical cities, alpine peaks, and hidden valleys of the Himalayas. Discover curated travel guides, historical spots, and tropical hill stations.",
      });
    }
  } catch (error) {
    console.error("Failed to generate metadata for destinations page:", error);
  }

  return {
    title: "Bespoke Himalayan Travel Destinations | MountainMonkey",
    description: "Explore mystical cities, alpine peaks, and hidden valleys of the Himalayas. Discover curated travel guides, historical spots, and tropical hill stations.",
  };
}

import { DestinationFilterHeader } from '@/components/_destinations/DestinationFilterHeader';
import { DestinationPromoBanner } from '@/components/_destinations/DestinationPromoBanner';
import { DynamicDestinationsCategories } from '@/components/_destinations/DynamicDestinationsCategories';
import { DestinationCustomSections } from '@/components/_destinations/DestinationCustomSections';

export default function DestinationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-slate-900 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-bold text-slate-500 tracking-wider uppercase">Loading Destinations...</p>
        </div>
      </div>
    }>
      <div>
        {/* 1. Filter & Category Top Header Row */}
        <DestinationFilterHeader />

        {/* 2. Main Content Experiential Layout Container */}
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-6 sm:py-10 md:py-12 space-y-10 sm:space-y-14 md:space-y-16 font-sans text-gray-900">
          <DynamicDestinationsCategories />
          <DestinationPromoBanner />
          <DestinationCustomSections />
        </div>
      </div>
    </Suspense>
  );
}