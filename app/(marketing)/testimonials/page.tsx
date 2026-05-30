import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { getPageMetaData } from '@/services/theme.service';
import { mapBackendMetadata } from '@/lib/seo';
import TestimonialsContent from './testimonialsContent';

export async function generateMetadata(): Promise<Metadata> {
  try {
    const res = await getPageMetaData("testimonials-page");
    if (res?.success && res.data) {
      return mapBackendMetadata(res.data, {
        title: "Client Testimonials & Reviews | MountainMonkey",
        description: "Read real stories, reviews, and feedback from travelers who explored the high Himalayas with MountainMonkey. Certified explorer ratings.",
      });
    }
  } catch (error) {
    console.error("Failed to generate metadata for testimonials page:", error);
  }

  return {
    title: "Client Testimonials & Reviews | MountainMonkey",
    description: "Read real stories, reviews, and feedback from travelers who explored the high Himalayas with MountainMonkey. Certified explorer ratings.",
  };
}

export default function TestimonialsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-slate-900 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-bold text-slate-500 tracking-wider uppercase">Loading Reviews...</p>
        </div>
      </div>
    }>
      <TestimonialsContent />
    </Suspense>
  );
}
