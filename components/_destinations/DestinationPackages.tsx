import Image from "@/components/ui/Image";
import React from 'react';
import Link from 'next/link';
import { Clock, ArrowRight, Package } from 'lucide-react';
import { TourPackage } from '@/types/type';

type DestinationPackagesProps = {
  packages: TourPackage[];
  destinationImages: string[];
};

export const DestinationPackages = ({ packages, destinationImages }: DestinationPackagesProps) => {
  if (packages.length === 0) return null;

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
          <Package className="text-orange-500 w-6 h-6 shrink-0" /> Premium Tour Packages
        </h2>
        <p className="text-slate-400 text-xs">All-inclusive multi-day guided travel itineraries</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {packages.map((pkg: TourPackage) => (
          <Link 
            href={`/packages/${pkg.slug}`}
            key={pkg._id} 
            className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-2xs hover:shadow-md transition flex flex-col group no-underline cursor-pointer"
          >
            <div className="h-44 relative overflow-hidden">
              <Image 
                src={destinationImages[0]} 
                alt={pkg.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
              />
              {pkg.categories && pkg.categories[0] && (
                <span className="absolute top-3 left-3 bg-blue-600 text-white font-bold text-[10px] uppercase px-2 py-0.5 rounded tracking-wide capitalize">
                  {pkg.categories[0]}
                </span>
              )}
              <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-lg text-[11px] font-bold text-white flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-blue-400" /> {pkg.duration?.days || 0}D / {pkg.duration?.nights || 0}N
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-1">
                <h3 className="font-extrabold text-slate-800 text-base group-hover:text-blue-600 transition truncate">
                  {pkg.title}
                </h3>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-slate-100">
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">Starts at</span>
                  <span className="text-lg font-black text-slate-900">₹{(pkg.pricing?.basePrice || 0).toLocaleString('en-IN')}</span>
                </div>
                <div className="bg-slate-900 group-hover:bg-blue-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition flex items-center gap-1">
                  View Details <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
