import { Suspense } from 'react';
import TransportationRoutesClient from '@/components/_travelRoute/transportationRoutesClient';

export default function TravelRoutesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center dark:bg-slate-950">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-full border-4 border-rose-500/30 border-t-rose-500 animate-spin" />
          <span className="text-xs font-black uppercase tracking-widest text-slate-400">Loading Routes...</span>
        </div>
      </div>
    }>
      <TransportationRoutesClient />
    </Suspense>
  );
}