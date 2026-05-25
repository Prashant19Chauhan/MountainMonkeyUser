import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Premium Curated Himalayan Tour Packages | MountainMonkey",
  description: "Book tailored Himalayan travel itineraries. All-inclusive luxury trekking, cultural journeys, and adventure holiday packages with expert local guides.",
};

import { PackageFilterHeader } from '@/components/_packages/PackageFilterHeader';
import { FeaturedPackagesSection } from '@/components/_packages/FeaturedPackagesSection';
import { PackagePromoBanner } from '@/components/_packages/PackagePromoBanner';
import { TropicalPackagesSection } from '@/components/_packages/TropicalPackagesSection';
import { PopularPackagesSection } from '@/components/_packages/PopularPackagesSection';

export default function PackagesPage() {

  return (
    <div>
      {/* 1. Category Icons & Sort Filter Bar Header */}
      <PackageFilterHeader />
      
      {/* 2. Main Content Experiential Layout Container */}
      <div className="max-w-7xl mx-auto px-4 py-12 space-y-12 font-sans text-gray-900">
        <FeaturedPackagesSection />
        <PackagePromoBanner />
        <TropicalPackagesSection />
        <PopularPackagesSection />
      </div>
    </div>
  );
}