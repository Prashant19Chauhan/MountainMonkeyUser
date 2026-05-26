import Image from "@/components/ui/Image";
import React from 'react';
import { Users } from 'lucide-react';
import { LocalInfo, UsefulPhrase } from '@/types/type';

type PackageCultureProps = {
  localInfo: LocalInfo;
  heroImages: string[];
};

export const PackageCulture = ({ localInfo, heroImages }: PackageCultureProps) => {
  if (!localInfo?.culture) return null;

  return (
    <section className="bg-gray-900 rounded-[2rem] p-8 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <Image src={heroImages[0]} className="w-full h-full object-cover mix-blend-overlay" alt="Texture"/>
      </div>
      <div className="relative z-10">
        <span className="bg-white/10 backdrop-blur border border-white/20 text-[10px] font-bold px-3 py-1 rounded uppercase tracking-wider mb-4 inline-block">
          Cultural Insights
        </span>
        <h2 className="text-3xl font-black mb-8">Experience Local Culture</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
          {localInfo.culture.traditions?.slice(0, 3).map((tradition: string, index: number) => (
            <div key={index} className="bg-white/10 backdrop-blur border border-white/10 rounded-2xl p-5">
              <div className="w-8 h-8 bg-orange-50 rounded-full flex items-center justify-center mb-3">
                <Users size={14} className="text-white"/>
              </div>
              <h3 className="font-bold text-white mb-2">Tradition</h3>
              <p className="text-xs text-white/70">{tradition}</p>
            </div>
          ))}
        </div>

        {localInfo.phrases && localInfo.phrases.length > 0 && (
          <div className="bg-white/10 backdrop-blur border border-white/10 rounded-2xl p-5">
            <h4 className="font-bold text-white mb-3 text-sm">Useful Phrases:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {localInfo.phrases.slice(0, 4).map((phrase: UsefulPhrase, idx: number) => (
                <div key={phrase.local || idx} className="text-xs">
                  <span className="text-white/90 font-medium">{phrase.local}</span>
                  <span className="text-white/60"> - {phrase.english}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
