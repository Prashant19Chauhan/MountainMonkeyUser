import React, { Suspense } from 'react';
import { Metadata } from 'next';
import TravelRouteDetailClient from '@/components/_travelRoute/TravelRouteDetailClient';
import { mapBackendMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const routeSlug = resolvedParams.slug;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/journeys/route/${routeSlug}`, {
      cache: 'no-store'
    });
    if (res.ok) {
      const json = await res.json();
      if (json?.success && json?.data?.route) {
        const route = json.data.route;
        const sourceCity = route.sourceHubId?.city || "Origin";
        const destCity = route.destinationHubId?.city || "Destination";
        const mode = route.mode || "Transit";
        const operator = route.operatorId?.name || "Standard Carrier";
        
        return mapBackendMetadata(route.metaDataId, {
          title: `${sourceCity} to ${destCity} by ${mode} (${operator}) | MountainMonkey`,
          description: `Book seamless travel from ${sourceCity} to ${destCity} via ${mode} with ${operator}. View schedules, vehicle details, duration and pricing.`,
        });
      }
    }
  } catch (error) {
    console.error("Failed to generate metadata for travel route page:", error);
  }

  return {
    title: "MountainMonkey - Premium Himalayan Journeys & Routes",
    description: "Search and book connected travel routes, multi-modal transport, and schedules across Himalayan destinations.",
  };
}

export default async function TravelRouteDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-full border-4 border-rose-500/30 border-t-rose-500 animate-spin" />
          <span className="text-xs font-black uppercase tracking-widest text-slate-400">Loading Route Details...</span>
        </div>
      </div>
    }>
      <TravelRouteDetailClient routeId={resolvedParams.slug} />
    </Suspense>
  );
}
