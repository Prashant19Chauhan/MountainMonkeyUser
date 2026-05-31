import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { getPageMetaData } from '@/services/theme.service';
import { mapBackendMetadata } from '@/lib/seo';
import TransportationRoutesClient from '@/components/_travelRoute/transportationRoutesClient';

export async function generateMetadata(): Promise<Metadata> {
  try {
    const res = await getPageMetaData("travel-routes-page");
    if (res?.success && res.data) {
      return mapBackendMetadata(res.data, {
        title: "MountainMonkey - Premium Himalayan Journeys & Routes",
        description: "Search and book connected travel routes, multi-modal transport, and schedules across Himalayan destinations.",
      });
    }
  } catch (error) {
    console.error("Failed to generate metadata for travel routes page:", error);
  }

  return {
    title: "MountainMonkey - Premium Himalayan Journeys & Routes",
    description: "Search and book connected travel routes, multi-modal transport, and schedules across Himalayan destinations.",
  };
}

export default function TravelRoutesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center dark:bg-slate-950">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-full border-4 border-rose-500/30 border-t-rose-500 animate-spin" />
          <span className="text-xs font-black uppercase tracking-widest text-slate-400">Loading Routes...</span>
        </div>
      </div>
    }>
      <TransportationRoutesClient />
    </Suspense>
  );
}