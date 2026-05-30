import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { getPageMetaData } from '@/services/theme.service';
import { mapBackendMetadata } from '@/lib/seo';
import CitiesContent from './citiesContent';

export async function generateMetadata(): Promise<Metadata> {
  try {
    const res = await getPageMetaData("cities-page");
    if (res?.success && res.data) {
      return mapBackendMetadata(res.data, {
        title: "Himalayan Basecamp Cities | Available Locations | MountainMonkey",
        description: "Discover MountainMonkey's operational basecamp cities across the Himalayan region. View active locations, altitudes, local timezones, and dynamic trip packages.",
      });
    }
  } catch (error) {
    console.error("Failed to generate metadata for cities page:", error);
  }

  return {
    title: "Himalayan Basecamp Cities | Available Locations | MountainMonkey",
    description: "Discover MountainMonkey's operational basecamp cities across the Himalayan region. View active locations, altitudes, local timezones, and dynamic trip packages.",
  };
}

export default function CitiesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-slate-900 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-bold text-slate-500 tracking-wider uppercase">Loading Mountain Hubs...</p>
        </div>
      </div>
    }>
      <CitiesContent />
    </Suspense>
  );
}
