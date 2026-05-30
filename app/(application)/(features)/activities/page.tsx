import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { getPageMetaData } from '@/services/theme.service';
import { mapBackendMetadata } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  try {
    const res = await getPageMetaData("activities-page");
    if (res?.success && res.data) {
      return mapBackendMetadata(res.data, {
        title: "Himalayan Outdoor Adventure Activities | MountainMonkey",
        description: "Choose from paragliding, trekking, rafting, mountain biking, and skiing in the majestic Himalayas. Expertly guided extreme sports and nature excursions.",
      });
    }
  } catch (error) {
    console.error("Failed to generate metadata for activities page:", error);
  }

  return {
    title: "Himalayan Outdoor Adventure Activities | MountainMonkey",
    description: "Choose from paragliding, trekking, rafting, mountain biking, and skiing in the majestic Himalayas. Expertly guided extreme sports and nature excursions.",
  };
}

import { ActivityFilterHeader } from '@/components/_activities/ActivityFilterHeader';
import { FeaturedActivitiesSection } from '@/components/_activities/FeaturedActivitiesSection';
import { ActivityPromoBanner } from '@/components/_activities/ActivityPromoBanner';
import { DynamicActivitiesCategories } from '@/components/_activities/DynamicActivitiesCategories';
import { ActivityCustomSections } from '@/components/_activities/ActivityCustomSections';

export default function ActivitiesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-slate-900 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-bold text-slate-500 tracking-wider uppercase">Loading Adventure Hub...</p>
        </div>
      </div>
    }>
      <div>
        {/* 1. Filter Header Grid with Category circles & Sub-filters */}
        <ActivityFilterHeader />
        
        {/* 2. Main Content Experiential Layout Container */}
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-6 sm:py-10 md:py-12 space-y-10 sm:space-y-14 md:space-y-16 font-sans text-gray-900">
          {/* Renders dynamic category panels/filtered grid on top for instant feedback */}
          <DynamicActivitiesCategories />

          {/* Featured experiences and banners moved below dynamic grid */}
          <FeaturedActivitiesSection />
          <ActivityPromoBanner />
          <ActivityCustomSections />
        </div>
      </div>
    </Suspense>
  );
}