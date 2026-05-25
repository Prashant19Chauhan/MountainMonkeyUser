import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Bespoke Himalayan Travel Destinations | MountainMonkey",
  description: "Explore mystical cities, alpine peaks, and hidden valleys of the Himalayas. Discover curated travel guides, historical spots, and tropical hill stations.",
};

import { DestinationFilterHeader } from '@/components/_destinations/DestinationFilterHeader';
import { TrendingDestinationsSection } from '@/components/_destinations/TrendingDestinationsSection';
import { DestinationPromoBanner } from '@/components/_destinations/DestinationPromoBanner';
import { TropicalDestinationsSection } from '@/components/_destinations/TropicalDestinationsSection';
import { HistoricalDestinationsSection } from '@/components/_destinations/HistoricalDestinationsSection';

export default function DestinationPage() {
  return (
    <div>
      {/* 1. Filter & Category Top Header Row */}
      <DestinationFilterHeader />
      
      {/* 2. Main Content Experiential Layout Container */}
      <div className="max-w-7xl mx-auto px-4 py-12 space-y-16 font-sans text-gray-900">
        <TrendingDestinationsSection />
        <DestinationPromoBanner />
        <TropicalDestinationsSection />
        <HistoricalDestinationsSection />
      </div>
    </div>
  );
}