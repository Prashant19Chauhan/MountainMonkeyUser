import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Himalayan Outdoor Adventure Activities | MountainMonkey",
  description: "Choose from paragliding, trekking, rafting, mountain biking, and skiing in the majestic Himalayas. Expertly guided extreme sports and nature excursions.",
};

import { ActivityFilterHeader } from '@/components/_activities/ActivityFilterHeader';
import { FeaturedActivitiesSection } from '@/components/_activities/FeaturedActivitiesSection';
import { ActivityPromoBanner } from '@/components/_activities/ActivityPromoBanner';
import { DynamicActivitiesCategories } from '@/components/_activities/DynamicActivitiesCategories';

export default function ActivitiesPage() {
  return (
    <div>
      {/* 1. Filter Header Grid with Category circles & Sub-filters */}
      <ActivityFilterHeader />
      
      {/* 2. Main Content Experiential Layout Container */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-6 sm:py-10 md:py-12 space-y-10 sm:space-y-14 md:space-y-16 font-sans text-gray-900">
        <FeaturedActivitiesSection />
        <ActivityPromoBanner />

        {/* 3. Dynamic Category Panels — conditionally renders categories with data */}
        <DynamicActivitiesCategories />
      </div>
    </div>
  );
}