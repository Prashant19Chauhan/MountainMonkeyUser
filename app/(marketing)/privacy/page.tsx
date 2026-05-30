import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { getPageMetaData } from '@/services/theme.service';
import { mapBackendMetadata } from '@/lib/seo';
import PrivacyContent from './privacyContent';

export async function generateMetadata(): Promise<Metadata> {
  try {
    const res = await getPageMetaData("privacy-page");
    if (res?.success && res.data) {
      return mapBackendMetadata(res.data, {
        title: "Privacy Policy & Data Security | MountainMonkey",
        description: "Read MountainMonkey's adventure privacy policy regarding user encryption, high-altitude location tracking options, cookie disclosures, and GDPR compliance.",
      });
    }
  } catch (error) {
    console.error("Failed to generate metadata for privacy page:", error);
  }

  return {
    title: "Privacy Policy & Data Security | MountainMonkey",
    description: "Read MountainMonkey's adventure privacy policy regarding user encryption, high-altitude location tracking options, cookie disclosures, and GDPR compliance.",
  };
}

export default function PrivacyPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-slate-900 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-bold text-slate-500 tracking-wider uppercase">Loading Disclosures...</p>
        </div>
      </div>
    }>
      <PrivacyContent />
    </Suspense>
  );
}
