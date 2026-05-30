import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { getPageMetaData } from '@/services/theme.service';
import { mapBackendMetadata } from '@/lib/seo';
import TermsContent from './termsContent';

export async function generateMetadata(): Promise<Metadata> {
  try {
    const res = await getPageMetaData("terms-page");
    if (res?.success && res.data) {
      return mapBackendMetadata(res.data, {
        title: "Terms of Use & Booking Agreements | MountainMonkey",
        description: "Review MountainMonkey's adventure terms of use, expedition booking agreements, cancellation rules, refund options, and traveler safety guidelines.",
      });
    }
  } catch (error) {
    console.error("Failed to generate metadata for terms page:", error);
  }

  return {
    title: "Terms of Use & Booking Agreements | MountainMonkey",
    description: "Review MountainMonkey's adventure terms of use, expedition booking agreements, cancellation rules, refund options, and traveler safety guidelines.",
  };
}

export default function TermsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-slate-900 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-bold text-slate-500 tracking-wider uppercase">Loading Agreements...</p>
        </div>
      </div>
    }>
      <TermsContent />
    </Suspense>
  );
}
