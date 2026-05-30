import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { getCityRelatedDetails } from '@/services/cities.services';
import { mapBackendMetadata } from '@/lib/seo';
import CityDetailContent from './cityDetailContent';

interface PageProps {
  params: Promise<{ cityId: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const cityId = resolvedParams.cityId;

  try {
    const data = await getCityRelatedDetails(cityId);
    if (data?.city) {
      const city = data.city;
      return mapBackendMetadata(city.metaDataId, {
        title: `${city.name} Travel Guide | Available Basecamp Cities | MountainMonkey`,
        description: city.description || `Explore ${city.name} basecamp geographical location, active tour inventory, stays, and activities.`,
      });
    }
  } catch (error) {
    console.error("Failed to generate metadata for city details page:", error);
  }

  return {
    title: "Mountain Hub Detail Guide | MountainMonkey",
    description: "Explore operational details, stays, packages, activities, and geographical parameters of our basecamp cities.",
  };
}

export default async function CityDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-slate-900 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-bold text-slate-500 tracking-wider uppercase">Loading Basecamp Intel...</p>
        </div>
      </div>
    }>
      <CityDetailContent cityId={resolvedParams.cityId} />
    </Suspense>
  );
}
