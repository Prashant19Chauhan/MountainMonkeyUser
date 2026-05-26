import React from 'react';
import { Utensils } from 'lucide-react';
import { LocalInfo, LocalFoodItem } from '@/types/type';

type PackageCuisineProps = {
  localInfo: LocalInfo;
};

export const PackageCuisine = ({ localInfo }: PackageCuisineProps) => {
  if (!localInfo?.famousFood || localInfo.famousFood.length === 0) return null;

  return (
    <section>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Local Cuisine to Try</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {localInfo.famousFood.map((food: LocalFoodItem, index: number) => (
          <div key={index} className="bg-white border border-gray-100 rounded-2xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center shrink-0">
                <Utensils size={20} className="text-orange-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-bold text-gray-900">{food.name}</h4>
                  <span className={`text-[9px] px-2 py-0.5 rounded ${food.type === 'veg' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {food?.type?.toUpperCase()}
                  </span>
                </div>
                <p className="text-xs text-gray-500">{food.description}</p>
                {food.bestPlaces && food.bestPlaces.length > 0 && (
                  <p className="text-[10px] text-blue-600 mt-2 font-medium">
                    Try at: {food.bestPlaces[0].name}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
