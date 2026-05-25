import React from 'react';
import { Utensils } from 'lucide-react';

type DestinationCuisineProps = {
  localInfo: any;
};

export const DestinationCuisine = ({ localInfo }: DestinationCuisineProps) => {
  if (!localInfo?.famousFood || localInfo.famousFood.length === 0) return null;

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-black text-slate-900">🍜 Local Cuisine</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {localInfo.famousFood.map((food: any, index: any) => (
          <div key={index} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-2xs hover:shadow-md transition">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center shrink-0">
                <Utensils size={20} className="text-orange-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-bold text-slate-900">{food.name}</h4>
                  <span className={`text-[9px] px-2 py-0.5 rounded uppercase font-bold ${
                    food.type === 'veg' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {food.type}
                  </span>
                </div>
                <p className="text-xs text-slate-500">{food.description}</p>
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
