import React, { Suspense } from 'react';
import { Metadata } from 'next';
import StoryDetailContent from './StoryDetailContent';
import { fetchApprovedStoryByIdPublic } from '@/services/story.services';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    const story = await fetchApprovedStoryByIdPublic(params.slug);
    if (story) {
      return {
        title: story.metaData?.title ? `${story.metaData.title} | MountainMonkey` : `${story.title} | Traveler Journal`,
        description: story.metaData?.description || story.shortDescription || "Read full Himalayan chronicles, native trek journals, stay feedback, and memories shared by explorer community.",
        keywords: story.metaData?.keywords || (story.tags && story.tags.length > 0 ? story.tags.join(", ") : undefined),
      };
    }
  } catch (error) {
    // Fail silently and return defaults
  }
  return {
    title: "Traveler Story Journal | MountainMonkey",
    description: "Read full Himalayan chronicles, native trek journals, stay feedback, and memories shared by explorer community.",
  };
}

export default function StoryDetailPage({ params }: { params: { slug: string } }) {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-bold text-slate-500 tracking-wider uppercase">Loading Journal details...</p>
        </div>
      </div>
    }>
      <StoryDetailContent slug={params.slug} />
    </Suspense>
  );
}
