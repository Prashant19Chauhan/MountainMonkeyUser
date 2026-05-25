import { Metadata } from 'next';

export function mapBackendMetadata(
  meta: any,
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
      type: (meta.openGraph?.type as any) || "website",
      url: meta.openGraph?.url || undefined,
      siteName: meta.openGraph?.siteName || "MountainMonkey",
      locale: meta.openGraph?.locale || "en_US",
    },
    twitter: {
      card: (meta.twitter?.card as any) || "summary_large_image",
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
