import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { getBlogDetailUserApi } from '@/services/blogs.services';
import { mapBackendMetadata } from '@/lib/seo';
import BlogDetailContent from './blogDetailContent';

interface PageProps {
  params: Promise<{ blogSlug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const blogSlug = resolvedParams.blogSlug;

  try {
    const data = await getBlogDetailUserApi(blogSlug);
    if (data?.blog) {
      const blog = data.blog;
      return mapBackendMetadata(blog.metaDataId, {
        title: `${blog.title} | Himalayan Chronicles | MountainMonkey`,
        description: blog.shortDescription || `Read ${blog.title} expedition chronicles and trekking guidelines.`,
      });
    }
  } catch (error) {
    console.error("Failed to generate metadata for blog detail page:", error);
  }

  return {
    title: "Himalayan Expedition Guide | MountainMonkey Blog",
    description: "Read mountaineering chronicles, packing safety check guidelines, and peak guides.",
  };
}

export default async function BlogDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-slate-900 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-bold text-slate-500 tracking-wider uppercase">Loading Expedition Intel...</p>
        </div>
      </div>
    }>
      <BlogDetailContent blogSlug={resolvedParams.blogSlug} />
    </Suspense>
  );
}
