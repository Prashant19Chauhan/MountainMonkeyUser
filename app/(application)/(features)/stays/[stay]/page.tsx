import React from 'react';
import { StayDetailClient } from '@/components/_stays/StayDetailClient';
import { Metadata } from 'next';
import { getStayDetails } from '@/services/stays.services';
import { mapBackendMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ stay: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const stayId = resolvedParams.stay;

  try {
    const res = await getStayDetails({ stayId });
    if (res?.success && res.data) {
      const stay = res.data;
      return mapBackendMetadata(stay.metaDataId, {
        title: `${stay.name} | Premium Himalayan Stay | MountainMonkey`,
        description: stay.description || stay.shortCatchphrase || `Book premium Himalayan boutique luxury mountain lodging at ${stay.name}.`,
        image: stay.images?.[0],
      });
    }
  } catch (error) {
    console.error("Failed to generate metadata for stay page:", error);
  }

  return {
    title: "MountainMonkey - Premium Himalayan Eco-Stays",
    description: "Book curated mountain boutique stays, premium wooden chalets, and nature eco-lodges in the Himalayas.",
  };
}

export default async function StayDetailPage({ params }: { params: Promise<{ stay: string }> }) {
  const resolvedParams = await params;
  return <StayDetailClient stayId={resolvedParams.stay} />;
}