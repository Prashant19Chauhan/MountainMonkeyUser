import { Metadata } from 'next';

export interface NestedSEO {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  canonicalUrl?: string;
  robots?: {
    index?: boolean;
    follow?: boolean;
    noarchive?: boolean;
    nosnippet?: boolean;
    noimageindex?: boolean;
  };
  openGraph?: {
    title?: string;
    description?: string;
    image?: string;
    imageAlt?: string;
    type?: string;
    url?: string;
    siteName?: string;
    locale?: string;
  };
  twitter?: {
    card?: string;
    title?: string;
    description?: string;
    image?: string;
    creator?: string;
  };
}

export function mapBackendMetadata(
  meta: NestedSEO | undefined | null,
  fallback: { title: string; description: string; image?: string }
): Metadata {
  if (!meta) {
    return {
      title: fallback.title,
      description: fallback.description,
      openGraph: fallback.image
        ? {
            title: fallback.title,
            description: fallback.description,
            images: [{ url: fallback.image }],
          }
        : undefined,
    };
  }

  // Construct robots options string for sitemap crawlers
  const robotsString = [
    meta.robots?.index !== false ? "index" : "noindex",
    meta.robots?.follow !== false ? "follow" : "nofollow",
    meta.robots?.noarchive ? "noarchive" : "",
    meta.robots?.nosnippet ? "nosnippet" : "",
    meta.robots?.noimageindex ? "noimageindex" : "",
  ]
    .filter(Boolean)
    .join(", ");

  return {
    title: meta.metaTitle || fallback.title,
    description: meta.metaDescription || fallback.description,
    keywords: meta.keywords && meta.keywords.length > 0 ? meta.keywords : undefined,
    alternates: meta.canonicalUrl ? { canonical: meta.canonicalUrl } : undefined,
    robots: robotsString || undefined,
    openGraph: {
      title: meta.openGraph?.title || meta.metaTitle || fallback.title,
      description: meta.openGraph?.description || meta.metaDescription || fallback.description,
      images: meta.openGraph?.image
        ? [{ url: meta.openGraph.image, alt: meta.openGraph?.imageAlt || meta.metaTitle || fallback.title }]
        : fallback.image
        ? [{ url: fallback.image }]
        : [],
      type: (meta.openGraph?.type as "website" | "article" | "book" | "profile" | "music.song" | "music.album" | "music.playlist" | "music.radio_station" | "video.movie" | "video.episode" | "video.tv_show" | "video.other") || "website",
      url: meta.openGraph?.url || undefined,
      siteName: meta.openGraph?.siteName || "MountainMonkey",
      locale: meta.openGraph?.locale || "en_US",
    },
    twitter: {
      card: (meta.twitter?.card as "summary" | "summary_large_image" | "app" | "player") || "summary_large_image",
      title: meta.twitter?.title || meta.metaTitle || fallback.title,
      description: meta.twitter?.description || meta.metaDescription || fallback.description,
      images: meta.twitter?.image
        ? [meta.twitter.image]
        : fallback.image
        ? [fallback.image]
        : [],
      creator: meta.twitter?.creator || undefined,
    },
  };
}
