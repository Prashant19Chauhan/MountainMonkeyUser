import React from 'react';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import { TourPackage, PackageActivityInfo, Activity } from '@/types/type';

type PackageActivitiesProps = {
  packageDetails: TourPackage;
  heroImages: string[];
};

export const PackageActivities = ({ packageDetails, heroImages }: PackageActivitiesProps) => {
  if (!packageDetails.activities || packageDetails.activities.length === 0) return null;

  return (
    <section>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Included Activities</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {packageDetails.activities.map((activity: PackageActivityInfo & { id: Activity }, index: number) => (
          <Link 
            href={`/activities/${activity.id?.slug || ''}`}
            key={activity.id?._id || index} 
            className="bg-white border border-gray-100 rounded-2xl p-4 flex items-center gap-4 group cursor-pointer hover:shadow-md transition-all no-underline"
          >
            <img 
              src={heroImages[index % heroImages.length]} 
              className="w-16 h-16 rounded-xl object-cover flex-shrink-0" 
              alt={activity.id?.name || 'Activity image'}
            />
            <div>
              <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Activity</span>
              <h4 className="font-bold text-gray-900 text-sm group-hover:text-blue-600 transition truncate">{activity.id?.name}</h4>
              <p className="text-blue-600 text-[10px] font-bold flex items-center gap-1 mt-1">
                <CheckCircle2 size={12}/> Included
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
