import React, { Suspense } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Premium Curated Himalayan Tour Packages | MountainMonkey",
  description: "Book tailored Himalayan travel itineraries. All-inclusive luxury trekking, cultural journeys, and adventure holiday packages with expert local guides.",
};

import { PackageFilterHeader } from '@/components/_packages/PackageFilterHeader';
import { FeaturedPackagesSection } from '@/components/_packages/FeaturedPackagesSection';
import { PackagePromoBanner } from '@/components/_packages/PackagePromoBanner';
import { DynamicPackagesCategories } from '@/components/_packages/DynamicPackagesCategories';
import { PopularPackagesSection } from '@/components/_packages/PopularPackagesSection';
import { PackageCustomSections } from '@/components/_packages/PackageCustomSections';

export default function PackagesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-slate-900 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-bold text-slate-500 tracking-wider uppercase">Loading Tour Packages...</p>
        </div>
      </div>
    }>
      <div>
        {/* 1. Category Icons & Sort Filter Bar Header */}
        <PackageFilterHeader />
        
        {/* 2. Main Content Experiential Layout Container */}
        <div className="max-w-7xl mx-auto px-4 py-12 space-y-12 font-sans text-gray-900">
          {/* Renders dynamic themed packages scrolls first for immediate visual feed */}
          <DynamicPackagesCategories />

          {/* Featured, popular packages showcase, and banners moved below dynamic grid */}
          <FeaturedPackagesSection />
          <PopularPackagesSection />
          <PackagePromoBanner />
          <PackageCustomSections />
        </div>
      </div>
    </Suspense>
  );
}