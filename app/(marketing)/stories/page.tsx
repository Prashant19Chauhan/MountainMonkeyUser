import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { getPageMetaData } from '@/services/theme.service';
import { mapBackendMetadata } from '@/lib/seo';
import StoriesContent from './StoriesContent';

export async function generateMetadata(): Promise<Metadata> {
  try {
    const res = await getPageMetaData("stories-page");
    if (res?.success && res.data) {
      return mapBackendMetadata(res.data, {
        title: "Traveler Stories & Himalayan Chronicle Adventures | MountainMonkey",
        description: "Read real stories, trek reviews, stays guides, and summit expeditions shared by our global explorer community.",
      });
    }
  } catch (error) {
    console.error("Failed to generate metadata for stories page:", error);
  }

  return {
    title: "Traveler Stories & Himalayan Chronicle Adventures | MountainMonkey",
    description: "Read real stories, trek reviews, stays guides, and summit expeditions shared by our global explorer community.",
  };
}

export default function StoriesLandingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-bold text-slate-500 tracking-wider uppercase">Opening Traveler Journals...</p>
        </div>
      </div>
    }>
      <StoriesContent />
    </Suspense>
  );
}
