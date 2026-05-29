import React from 'react';
import { Sparkles, ShieldAlert, ClipboardList, MessageSquare, Star, Compass } from 'lucide-react';
import { Stay } from '@/types/type';

type StayOverviewProps = {
  stay: Stay;
};

export const StayOverview = ({ stay }: StayOverviewProps) => {
  return (
    <div className="space-y-10">
      
      {/* AI Scorecard Parameters Metrics */}
      {stay.aiScore && (
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100/85 space-y-4 font-sans">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 font-black text-xs text-slate-900 uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-blue-600 animate-pulse" /> Ghumakkad Go Verified Audit
            </div>
            <span className="bg-blue-600 text-white font-bold text-[9px] px-2.5 py-1 rounded-lg uppercase tracking-wider shadow-sm">AI Scorecard</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {Object.entries(stay.aiScore).map(([key, val]) => (
              <div key={key} className="bg-white p-3.5 rounded-xl border border-slate-100 shadow-2xs">
                <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider truncate">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </span>
                <span className="text-lg font-black text-slate-800 block mt-0.5">{String(val)}%</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AI TRAVEL INTENT BADGES */}
      {stay.aiMetaData && (
        <div className="space-y-3 font-sans">
          <div className="flex items-center gap-1.5 text-xs font-black text-slate-900 uppercase tracking-widest">
            <Compass className="w-4 h-4 text-orange-500" /> Travel Intent Tags
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            {stay.aiMetaData.stayType?.map((tag) => (
              <span key={tag} className="bg-indigo-50 text-indigo-600 border border-indigo-100/50 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                🏠 {tag.replace('_', ' ')}
              </span>
            ))}
            {stay.aiMetaData.tags?.map((tag) => (
              <span key={tag} className="bg-rose-50 text-rose-600 border border-rose-100/50 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                🏷️ {tag.replace('_', ' ')}
              </span>
            ))}
            {stay.aiMetaData.suitableFor?.map((tag) => (
              <span key={tag} className="bg-emerald-50 text-emerald-600 border border-emerald-100/50 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                👥 {tag.replace('_', ' ')}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* About Stay */}
      <div className="space-y-4 font-sans">
        <h3 className="text-xl font-bold text-slate-900">About the Experience</h3>
        <p className="text-slate-600 leading-relaxed text-sm md:text-base text-justify font-medium">
          {stay.longDescription || stay.shortDescription}
        </p>
      </div>

      {/* SAFETY MEASURES RATINGS */}
      {stay.safetyMeasuresRatings && (
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-4 font-sans">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 font-black text-xs text-slate-900 uppercase tracking-wider">
              <ShieldAlert className="w-4 h-4 text-emerald-600 animate-pulse" /> Safety & Sanitization Audits
            </div>
            <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 font-bold text-[9px] px-2.5 py-1 rounded-lg uppercase tracking-wider shadow-2xs">Verified Audit</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
            {Object.entries(stay.safetyMeasuresRatings).map(([key, val]) => (
              <div key={key} className="space-y-1.5">
                <div className="flex justify-between items-center text-[10px] font-bold text-slate-600 uppercase tracking-wider">
                  <span>{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                  <span className="text-slate-900 font-black">{val}/5</span>
                </div>
                <div className="w-full bg-slate-200/55 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-emerald-500 h-full rounded-full transition-all duration-500" 
                    style={{ width: `${(Number(val) / 5) * 100}%` }} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STAY POLICIES & CANCELLATION GUIDELINES */}
      {((stay.policies && stay.policies.length > 0) || (stay.cancellationPolicy && stay.cancellationPolicy.length > 0)) && (
        <div className="space-y-6 font-sans">
          <h3 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-slate-400" /> Ground Rules & Guidelines
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* General policies */}
            {stay.policies && stay.policies.length > 0 && (
              <div className="space-y-3.5">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">Resort Guidelines</h4>
                <div className="space-y-3">
                  {stay.policies.map((policy, idx) => (
                    <div key={idx} className="bg-slate-50 border border-slate-100 p-3.5 rounded-xl space-y-1.5">
                      <div className="text-xs font-black text-slate-800">{policy.policyName}</div>
                      <div className="text-[11px] text-slate-500 leading-relaxed font-medium">{policy.policyDescription}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Cancellation policies */}
            {stay.cancellationPolicy && stay.cancellationPolicy.length > 0 && (
              <div className="space-y-3.5">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">Refund & Cancellations</h4>
                <div className="space-y-3">
                  {stay.cancellationPolicy.map((policy, idx) => (
                    <div key={idx} className="bg-rose-50/30 border border-rose-100/30 p-3.5 rounded-xl space-y-1.5">
                      <div className="text-xs font-black text-rose-800">{policy.policyName}</div>
                      <div className="text-[11px] text-rose-600/80 leading-relaxed font-medium">{policy.policyDescription}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* GUEST REVIEWS */}
      <div className="space-y-6 font-sans">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-slate-100 pb-3">
          <h3 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-slate-400" /> Guest Reviews
          </h3>
          <span className="text-xs font-black text-slate-400 uppercase tracking-wider">
            Average Rating: {stay.ratings?.average || '0.0'} ★ ({stay.ratings?.count || 0} reviews)
          </span>
        </div>

        {stay.reviews && stay.reviews.length > 0 ? (
          <div className="space-y-4">
            {stay.reviews.map((rev, idx) => (
              <div key={idx} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    {/* User Avatar Capsule */}
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-400 to-rose-500 text-white flex items-center justify-center font-black text-xs shadow-xs">
                      {rev.userId ? 'U' : 'E'}
                    </div>
                    <div>
                      <span className="text-xs font-black text-slate-800 block">Explorer Guest</span>
                      <span className="text-[9px] text-slate-400 font-bold block uppercase tracking-wider mt-0.5">
                        {rev.createdAt ? new Date(rev.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Verified Guest'}
                      </span>
                    </div>
                  </div>

                  {/* Rating Stars */}
                  <div className="flex items-center gap-0.5 bg-amber-50 px-2 py-1 rounded-lg border border-amber-100 text-[10px] font-black text-amber-700">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500 shrink-0" />
                    <span>{rev.rating || 5} / 5</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed font-medium italic pl-1">
                  "{rev.comment}"
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-slate-50 border border-slate-100 p-8 rounded-2xl text-center">
            <Star className="w-8 h-8 text-slate-300 mx-auto mb-2 animate-pulse" />
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">No reviews posted yet</span>
            <p className="text-[11px] text-slate-400 mt-1 font-medium italic">Be one of the first travelers to explore this haven and write a review!</p>
          </div>
        )}
      </div>

    </div>
  );
};
