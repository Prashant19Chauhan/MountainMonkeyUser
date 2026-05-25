import React from 'react';
import { MessageCircle } from 'lucide-react';

type PackageCTAProps = {
  heroImages: string[];
};

export const PackageCTA = ({ heroImages }: PackageCTAProps) => {
  return (
    <div className="relative py-24 bg-gray-900 text-center flex flex-col items-center justify-center px-4 overflow-hidden">
      <div className="absolute inset-0 opacity-40">
        <img src={heroImages[0]} className="w-full h-full object-cover mix-blend-overlay" alt="CTA Background"/>
      </div>
      <div className="relative z-10 max-w-xl">
        <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">Ready for your next adventure?</h2>
        <p className="text-white/80 mb-10 text-lg">Book this package today and secure your dates before they fill up. Flexible cancellation available.</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button type="button" className="w-full sm:w-auto bg-blue-600 text-white px-8 py-4 rounded-full font-bold shadow-lg hover:bg-blue-700 transition-colors cursor-pointer">
            Book Package Now
          </button>
          <button type="button" className="w-full sm:w-auto bg-white text-gray-900 px-8 py-4 rounded-full font-bold shadow-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 cursor-pointer">
            <MessageCircle size={18} /> Talk to an Expert
          </button>
        </div>
      </div>
    </div>
  );
};
