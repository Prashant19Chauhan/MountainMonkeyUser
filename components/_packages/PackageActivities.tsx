import React from 'react';
import { CheckCircle2 } from 'lucide-react';

type PackageActivitiesProps = {
  packageDetails: any;
  heroImages: string[];
};

export const PackageActivities = ({ packageDetails, heroImages }: PackageActivitiesProps) => {
  if (!packageDetails.activities || packageDetails.activities.length === 0) return null;

  return (
    <section>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Included Activities</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {packageDetails.activities.map((activity: any, index: any) => (
          <div key={activity._id} className="bg-white border border-gray-100 rounded-2xl p-4 flex items-center gap-4 group cursor-pointer hover:shadow-md transition-all">
            <img 
              src={heroImages[index % heroImages.length]} 
              className="w-16 h-16 rounded-xl object-cover" 
              alt={activity.id.name}
            />
            <div>
              <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Activity</span>
              <h4 className="font-bold text-gray-900 text-sm">{activity.id.name}</h4>
              <p className="text-blue-600 text-[10px] font-bold flex items-center gap-1 mt-1">
                <CheckCircle2 size={12}/> Included
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
