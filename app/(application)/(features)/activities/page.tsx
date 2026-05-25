import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Himalayan Outdoor Adventure Activities | MountainMonkey",
  description: "Choose from paragliding, trekking, rafting, mountain biking, and skiing in the majestic Himalayas. Expertly guided extreme sports and nature excursions.",
};

import { ActivityFilterHeader } from '@/components/_activities/ActivityFilterHeader';
import { FeaturedActivitiesSection } from '@/components/_activities/FeaturedActivitiesSection';
import { ActivityPromoBanner } from '@/components/_activities/ActivityPromoBanner';
import { PopularActivitiesSection } from '@/components/_activities/PopularActivitiesSection';
import { ExploreActivitiesSection } from '@/components/_activities/ExploreActivitiesSection';

export default function ActivitiesPage() {
  return (
    <div>
      {/* 1. Filter Header Grid with Category circles & Sub-filters */}
      <ActivityFilterHeader />
      
      {/* 2. Main Content Experiential Layout Container */}
      <div className="max-w-7xl mx-auto px-4 py-12 space-y-16 font-sans text-gray-900">
        <FeaturedActivitiesSection />
        <ActivityPromoBanner />
        <PopularActivitiesSection />
        <ExploreActivitiesSection />
      </div>
    </div>
  );
}