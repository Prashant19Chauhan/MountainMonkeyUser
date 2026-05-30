"use client";

import React from 'react';
import { 
  useActivityDetails, 
  useActivityLocalInfo 
} from '@/hooks/useActivities';
import { AlertTriangle } from 'lucide-react';

import { DetailPhotoVault } from './DetailPhotoVault';
import { DetailCoreHeader } from './DetailCoreHeader';
import { DetailLogistics } from './DetailLogistics';
import { DetailOverview } from './DetailOverview';
import { DetailChecklists } from './DetailChecklists';
import { DetailInsightMatrix } from './DetailInsightMatrix';
import { DetailBookingLedger } from './DetailBookingLedger';
import { ActivityDetailCustomSections } from './ActivityDetailCustomSections';

type ActivityDetailClientProps = {
  activityId: string;
};

export const ActivityDetailClient = ({ activityId }: ActivityDetailClientProps) => {
  // 1. DYNAMIC API INTEGRATION VIA TANSTACK REACT QUERY HOOKS
  const { data: detailsRes, isLoading: detailsLoading, error: detailsError } = useActivityDetails(activityId);
  const { data: localInfoRes, isLoading: localInfoLoading } = useActivityLocalInfo(detailsRes?.data?.destinationId);

  // Extract pure objects from custom API response envelopes
  const activity = detailsRes?.success ? detailsRes.data : null;
  // Your destination endpoint returns an array matching your .find() schema method
  const localInfo = localInfoRes?.success && (localInfoRes.data?.length ?? 0) > 0 ? localInfoRes.data[0] : null;

  // Calculated properties linked directly to reactive pricing parameters
  const basePrice = activity?.pricing?.price || 0;

  // =========================================================================
  // CONDITIONAL VIEWPORT RENDER STATES (LOADING & EXCEPTION ERRORS)
  // =========================================================================
  if (detailsLoading) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center pt-20">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-bold text-slate-500 tracking-wider uppercase">Loading Ghumakkad Go Experience Hub...</p>
        </div>
      </div>
    );
  }

  if (detailsError || !activity) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center px-4 pt-20">
        <div className="max-w-md bg-white p-8 rounded-2xl border border-slate-200 text-center space-y-4 shadow-sm">
          <AlertTriangle className="w-12 h-12 text-rose-500 mx-auto" />
          <h2 className="text-xl font-black text-slate-900">Activity Not Available</h2>
          <p className="text-xs text-slate-500 leading-relaxed">The active matrix configuration identifier requested cannot be resolved inside our database grids.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-slate-800 antialiased font-sans pt-20">
      
      {/* PHOTO VAULT MEDIA MESH */}
      <DetailPhotoVault activity={activity} />

      {/* CORE INFO HEADER */}
      <DetailCoreHeader activity={activity} />

      {/* TRIP LOGISTICS METRICS BLOCK */}
      <DetailLogistics activity={activity} />

      {/* MAIN TWO-COLUMN SPLIT MARKETPLACE LAYOUT */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT PRIMARY PANEL CONTAINER */}
        <div className="lg:col-span-7 space-y-8">
          {/* Experience Description and AI Score */}
          <DetailOverview activity={activity} />

          {/* Operational Checklists / Logistics Equipment arrays */}
          <DetailChecklists activity={activity} />

          {/* Destination Insight Matrix */}
          {localInfo && <DetailInsightMatrix localInfo={localInfo} />}
        </div>

        {/* RIGHT LEDGER SIDEBAR TRANSACT ENGINE */}
        <div className="lg:col-span-4 lg:sticky lg:top-8">
          <DetailBookingLedger basePrice={basePrice} activity={activity} />
        </div>
      </div>

      {/* CMS DYNAMIC SECTIONS */}
      <div className="mt-16">
        <ActivityDetailCustomSections activitySlug={activity.slug} />
      </div>
    </div>
  );
};
