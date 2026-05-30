import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { getPageMetaData } from '@/services/theme.service';
import { mapBackendMetadata } from '@/lib/seo';
import ContactContent from './contactContent';

export async function generateMetadata(): Promise<Metadata> {
  try {
    const res = await getPageMetaData("contact-page");
    if (res?.success && res.data) {
      return mapBackendMetadata(res.data, {
        title: "Contact Us | MountainMonkey Adventures",
        description: "Get in touch with MountainMonkey. Plan your next custom Himalayan adventure, ask questions, or reach out to our support team.",
      });
    }
  } catch (error) {
    console.error("Failed to generate metadata for contact page:", error);
  }

  return {
    title: "Contact Us | MountainMonkey Adventures",
    description: "Get in touch with MountainMonkey. Plan your next custom Himalayan adventure, ask questions, or reach out to our support team.",
  };
}

export default function ContactPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-slate-900 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-bold text-slate-500 tracking-wider uppercase">Loading Contact Us...</p>
        </div>
      </div>
    }>
      <ContactContent />
    </Suspense>
  );
}
