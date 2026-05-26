"use client"

import Link from 'next/link';
import { PackageCard } from "../cards/PackageCard";
import { useCuratedPackages } from '@/hooks/useHome';

type PackageType = {
  _id: string;
  title: string;
  slug: string;
  destination?: {
    id?: {
      name?: string;
    };
  };
  pricing?: {
    basePrice?: number;
  };
  duration?: {
    days?: number;
    nights?: number;
  };
  categories?: string[];
  images?: string[];
};

export const CuratedPackagesSection = () => {

  const {
    data: curatedPackages,
    isLoading: packagesLoading,
    isFetching: packagesFetching,
  } = useCuratedPackages();


  const hasPackages =
    curatedPackages && curatedPackages.length > 0;

  return (
    <section className="max-w-7xl mx-auto py-16 px-4 overflow-hidden">

      {/* HEADER */}
      <div className="flex justify-between items-end mb-10 px-2">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-foreground text-dynamic-shadow">
            Curated Packages
          </h2>

          <p className="text-foreground/60 mt-2 font-medium">
            Hand-picked complete itineraries for your next holiday.
          </p>
        </div>

        <Link
          href="/packages"
          className="text-rose-500 font-bold flex items-center gap-2 hover:gap-3 transition-all"
        >
          See all <span className="text-xl">→</span>
        </Link>
      </div>

      {/* CONTENT */}
      <div className="flex gap-6 overflow-x-auto pb-10 snap-x snap-mandatory no-scrollbar scroll-smooth">

        {/* INITIAL LOADING ONLY */}
        {packagesLoading && !hasPackages ? (

          <div className="w-full text-center py-24 bg-slate-50 rounded-[40px] border-2 border-dashed border-slate-200">

            <div className="animate-pulse flex flex-col items-center">

              <div className="w-12 h-12 bg-slate-200 rounded-full mb-4"></div>

              <p className="text-slate-400 font-bold tracking-widest text-xs uppercase">
                Discovering magic...
              </p>

            </div>

          </div>

        ) : hasPackages ? (

          <>
            {curatedPackages.map((pkg: PackageType) => (
              <PackageCard
                key={pkg._id}
                slug={pkg.slug}
                title={pkg.title}
                location={
                  pkg.destination?.id?.name ||
                  "Multiple Locations"
                }
                price={pkg.pricing?.basePrice || 0}
                duration={`${pkg.duration?.days || 0}D/${pkg.duration?.nights || 0}N`}
                tag={
                  pkg.categories?.[0]?.toUpperCase() ||
                  "FEATURED"
                }
                image={pkg.images?.[0] || ""}
              />
            ))}

            {/* OPTIONAL BACKGROUND REFRESH INDICATOR */}
            {packagesFetching && (
              <div className="flex items-center px-4">
                <div className="w-5 h-5 border-2 border-rose-500 border-t-transparent rounded-full animate-spin" />
              </div>
            )}
          </>

        ) : (

          <div className="w-full text-center py-20 bg-slate-50 rounded-[40px]">

            <p className="text-slate-400 font-bold italic">
              No featured packages found at the moment.
            </p>

          </div>

        )}

      </div>
    </section>
  );
};