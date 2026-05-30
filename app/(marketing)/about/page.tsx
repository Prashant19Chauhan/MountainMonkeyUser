import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { getPageMetaData } from '@/services/theme.service';
import { mapBackendMetadata } from '@/lib/seo';
import AboutContent from './aboutContent';

export async function generateMetadata(): Promise<Metadata> {
  try {
    const res = await getPageMetaData("about-page");
    if (res?.success && res.data) {
      return mapBackendMetadata(res.data, {
        title: "About Us | MountainMonkey",
        description: "Embark on an extraordinary Himalayan adventure with MountainMonkey. Discover our team, our mission, and the magic of guided exploration.",
      });
    }
  } catch (error) {
    console.error("Failed to generate metadata for about page:", error);
  }

  return {
    title: "About Us | MountainMonkey",
    description: "Embark on an extraordinary Himalayan adventure with MountainMonkey. Discover our team, our mission, and the magic of guided exploration.",
  };
}

export default function AboutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-slate-900 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-bold text-slate-500 tracking-wider uppercase">Loading About Us...</p>
        </div>
      </div>
    }>
      <AboutContent />
    </Suspense>
  );
}
