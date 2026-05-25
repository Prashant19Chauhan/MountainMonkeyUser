import React from 'react';
import { PackageDetailClient } from '@/components/_packages/PackageDetailClient';
import { Metadata } from 'next';
import { getPackagesDetails } from '@/services/packages.services';
import { mapBackendMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ packageSlug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const packageId = resolvedParams.packageSlug;

  try {
    const res = await getPackagesDetails(packageId);
    if (res?.packageDetails) {
      const packageDetails = res.packageDetails;
      return mapBackendMetadata(packageDetails.metaDataId, {
        title: `${packageDetails.title} | Premium Himalayan Tour Package`,
        description: packageDetails.description || `Experience high-altitude beauty: ${packageDetails.title}. Dynamic customized tour options with MountainMonkey.`,
        image: packageDetails.images?.[0],
      });
    }
  } catch (error) {
    console.error("Failed to generate metadata for package page:", error);
  }

  return {
    title: "MountainMonkey - Premium Himalayan Tour Packages",
    description: "Book custom travel packages in the Himalayas. Curated trekking expeditions, wellness journeys, and family holidays.",
  };
}

export default async function PackageDetailPage({ params }: { params: Promise<{ packageSlug: string }> }) {
  const resolvedParams = await params;
  return <PackageDetailClient packageId={resolvedParams.packageSlug} />;
}