import React from 'react';
import { ActivityDetailClient } from '@/components/_activities/ActivityDetailClient';
import { Metadata } from 'next';
import { getActivityDetails } from '@/services/activities.services';
import { mapBackendMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ activity: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const activityId = resolvedParams.activity;
  
  try {
    const res = await getActivityDetails(activityId);
    if (res?.success && res.data) {
      const activity = res.data;
      return mapBackendMetadata(activity.metaDataId, {
        title: `${activity.name} | MountainMonkey Himalayan Activities`,
        description: activity.shortDescription || activity.longDescription || `Thrilling Himalayan outdoor experience: ${activity.name}.`,
        image: activity.images?.[0],
      });
    }
  } catch (error) {
    console.error("Failed to generate metadata for activity page:", error);
  }
  
  return {
    title: "MountainMonkey - Himalayan Adventure Excursions",
    description: "Explore the most thrilling outdoor paragliding, trekking, and mountain biking across Himalayan heights.",
  };
}

export default async function ActivityDetailPage({ params }: { params: Promise<{ activity: string }> }) {
  const resolvedParams = await params;
  return <ActivityDetailClient activityId={resolvedParams.activity} />;
}