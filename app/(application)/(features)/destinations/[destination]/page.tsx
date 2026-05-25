import React from 'react';
import { DestinationDetailClient } from '@/components/_destinations/DestinationDetailClient';
import { Metadata } from 'next';
import { getDestinationDetails } from '@/services/destinations.services';
import { mapBackendMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ destination: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const destinationId = resolvedParams.destination;

  try {
    const destination = await getDestinationDetails(destinationId);
    if (destination) {
      return mapBackendMetadata(destination.metaDataId, {
        title: `${destination.name} | Complete Himalayan Travel Guide`,
        description: destination.shortDescription || destination.description || `Explore tourist spots, local culture, cuisines, and activities in ${destination.name}.`,
        image: destination.images?.[0],
      });
    }
  } catch (error) {
    console.error("Failed to generate metadata for destination page:", error);
  }

  return {
    title: "MountainMonkey - Himalayan Adventure Destinations",
    description: "Plan your trip to majestic Himalayan destinations. Curated eco-travel guides, travel routes, and highlights.",
  };
}

export default async function DestinationDetailPage({ params }: { params: Promise<{ destination: string }> }) {
  const resolvedParams = await params;
  return <DestinationDetailClient destinationId={resolvedParams.destination} />;
}