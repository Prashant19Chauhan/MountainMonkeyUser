import React from 'react';
import { Sparkles, Compass, Clock, Calendar, Users, MessageSquare, Star } from 'lucide-react';
import { Activity } from '@/types/type';

type DetailOverviewProps = {
  activity: Activity;
};

export const DetailOverview = ({ activity }: DetailOverviewProps) => {
  return (
    <div className="space-y-8">
      {/* Experience Description */}
      <section className="bg-white p-6 rounded-2xl border border-slate-100 shadow-2xs space-y-4">
        <h3 className="text-lg font-black text-slate-900">Experience Overview</h3>
        <p className="text-slate-600 leading-relaxed text-sm text-justify font-medium">
          {activity.longDescription || activity.shortDescription}
        </p>
        
        {/* AI Insight Summary */}
        {activity.aiSummary && (
          <div className="bg-amber-50/40 border border-amber-100/50 p-4 rounded-xl space-y-1.5">
            <span className="text-[9px] font-black text-amber-800 uppercase tracking-widest flex items-center gap-1">
              <Sparkles size={11} className="text-amber-600 animate-pulse" /> Explorer's Insight
            </span>
            <p className="text-xs text-amber-900 leading-relaxed font-semibold italic">
              "{activity.aiSummary}"
            </p>
          </div>
        )}
      </section>

      {/* AI TRAVEL INTENT BADGES */}
      {((activity.tags && activity.tags.length > 0) || (activity.recommendedFor && activity.recommendedFor.length > 0)) && (
        <div className="space-y-3 font-sans">
          <div className="flex items-center gap-1.5 text-xs font-black text-slate-900 uppercase tracking-widest">
            <Compass className="w-4 h-4 text-orange-500 animate-spin-slow" /> Experience Badges
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            {activity.type && (
              <span className="bg-blue-50 text-blue-600 border border-blue-100/50 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                🎯 {activity.type.replace('_', ' ')}
              </span>
            )}
            {activity.tags?.map((tag) => (
              <span key={tag} className="bg-rose-50 text-rose-600 border border-rose-100/50 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                🏷️ {tag.replace('_', ' ')}
              </span>
            ))}
            {activity.recommendedFor?.map((rec) => (
              <span key={rec} className="bg-emerald-50 text-emerald-600 border border-emerald-100/50 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                👥 {rec.replace('_', ' ')}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* DYNAMIC AI ASSESSMENT */}
      {activity.aiScore && (
        <div className="bg-white border border-slate-100 p-6 rounded-2xl space-y-4 shadow-2xs">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-600" />
            <h4 className="text-sm font-black uppercase tracking-wider text-slate-900">Ghumakkad Go Intelligent Assessment</h4>
          </div>
          <div className="grid sm:grid-cols-2 gap-x-6 gap-y-4">
            {Object.entries(activity.aiScore).map(([key, val]) => (
              <div key={key} className="space-y-1">
                <div className="flex justify-between text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <span>{key.replace(/([A-Z])/g, ' $1')}</span>
                  <span className="text-slate-900 font-extrabold">{String(val)}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-600 h-full rounded-full" style={{ width: `${String(val)}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TIME PREFERENCES & OPERATIONAL HOURS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Operating Hours */}
        {activity.timing && (activity.timing.openingTime || activity.timing.closingTime) && (
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-2xs space-y-2">
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Operating Hours</span>
            <div className="text-sm font-black text-slate-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-500" />
              <span>{activity.timing.openingTime || 'Sunrise'} - {activity.timing.closingTime || 'Sunset'}</span>
            </div>
            <span className="text-[10px] text-slate-500 font-medium block">Advisable timing bracket for best experiences</span>
          </div>
        )}

        {/* Best time to visit */}
        {activity.bestTimeToVisit && (
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-2xs space-y-2">
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Best Time to Visit</span>
            <div className="text-sm font-black text-slate-900 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-500" />
              <span className="capitalize">{activity.bestTimeToVisit.replace('_', ' ')}</span>
            </div>
            <span className="text-[10px] text-slate-500 font-medium block">Optimal weather conditions or hours</span>
          </div>
        )}
      </div>

      {/* EXPERIENCE OPERATORS & PROVIDERS */}
      {activity.providers && activity.providers.length > 0 && (
        <div className="space-y-4 font-sans">
          <div className="flex items-center gap-1.5 text-xs font-black text-slate-900 uppercase tracking-widest">
            <Users className="w-4 h-4 text-slate-400" /> Local Certified Operators
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {activity.providers.map((prov, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-100 p-4 rounded-xl space-y-2">
                <div className="flex justify-between items-start">
                  <div className="text-xs font-black text-slate-800">{prov.name || 'Certified Guide'}</div>
                  <span className="bg-blue-100 text-blue-800 text-[8px] font-bold px-1.5 py-0.5 rounded tracking-wide uppercase">Certified</span>
                </div>
                <div className="text-[10px] text-slate-500 font-medium space-y-0.5">
                  {prov.contact && <div className="truncate">📞 {prov.contact}</div>}
                  {prov.website && <div className="truncate text-blue-600 underline">🌐 {prov.website}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* GUEST REVIEWS */}
      <div className="space-y-6 font-sans">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-slate-100 pb-3">
          <h3 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-slate-400" /> Explorer Reviews
          </h3>
          <span className="text-xs font-black text-slate-400 uppercase tracking-wider">
            Average Rating: {activity.ratings?.average || '0.0'} ★ ({activity.ratings?.count || 0} reviews)
          </span>
        </div>

        {activity.reviews && activity.reviews.length > 0 ? (
          <div className="space-y-4">
            {activity.reviews.map((rev, idx) => (
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
            <p className="text-[11px] text-slate-400 mt-1 font-medium italic">Be the first to share your experience with other mountain monkeys!</p>
          </div>
        )}
      </div>
    </div>
  );
};
