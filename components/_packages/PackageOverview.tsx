import React from 'react';
import { Info } from 'lucide-react';
import { TourPackage } from '@/types/type';

type PackageOverviewProps = {
  packageDetails: TourPackage;
};

export const PackageOverview = ({ packageDetails }: PackageOverviewProps) => {
  return (
    <section>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">About the Journey</h2>
      {packageDetails.shortDescription && (
        <div className="bg-blue-50 border border-blue-100 rounded-3xl p-6 mb-6">
          <div className="flex gap-3 text-blue-900">
            <Info size={24} className="shrink-0 text-blue-600" />
            <p className="text-sm font-medium leading-relaxed">
              {packageDetails.shortDescription}
            </p>
          </div>
        </div>
      )}
      <p className="text-gray-600 text-sm leading-relaxed">
        {packageDetails.description}
      </p>
    </section>
  );
};
