import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { getPageMetaData } from '@/services/theme.service';
import { mapBackendMetadata } from '@/lib/seo';
import FAQContent from './faqContent';

export async function generateMetadata(): Promise<Metadata> {
  try {
    const res = await getPageMetaData("faq-page");
    if (res?.success && res.data) {
      return mapBackendMetadata(res.data, {
        title: "Frequently Asked Questions | MountainMonkey",
        description: "Find answers to frequently asked questions about booking treks, cancellation policies, gear checklists, and safety guidelines with MountainMonkey.",
      });
    }
  } catch (error) {
    console.error("Failed to generate metadata for FAQ page:", error);
  }

  return {
    title: "Frequently Asked Questions | MountainMonkey",
    description: "Find answers to frequently asked questions about booking treks, cancellation policies, gear checklists, and safety guidelines with MountainMonkey.",
  };
}

export default function FAQPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-slate-900 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-bold text-slate-500 tracking-wider uppercase">Loading FAQ...</p>
        </div>
      </div>
    }>
      <FAQContent />
    </Suspense>
  );
}
