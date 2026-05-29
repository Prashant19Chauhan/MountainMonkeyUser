"use client";

import React, { useState } from 'react';
import { useStayDetails, useStayLocalInfo } from '@/hooks/useStays';
import { AlertCircle } from 'lucide-react';

import { StayHeader } from './StayHeader';
import { StayPhotoMesh } from './StayPhotoMesh';
import { StayOverview } from './StayOverview';
import { StayRoomSelector } from './StayRoomSelector';
import { StayAmenities } from './StayAmenities';
import { StayConnectivity } from './StayConnectivity';
import { StayLocalTabInsight } from './StayLocalTabInsight';
import { StayBookingLedger } from './StayBookingLedger';

export function StayDetailClient({ stayId }: { stayId: string }) {
  const { data: detailsRes, isLoading: detailsLoading, error: detailsError } = useStayDetails(stayId);
  const stay = detailsRes?.success ? detailsRes.data : null;
  const { data: localInfoRes } = useStayLocalInfo(stay?.destinationId || '');

  const [selectedRoomIndex, setSelectedRoomIndex] = useState(0);

  const localInfo = localInfoRes?.success && (localInfoRes.data?.length ?? 0) > 0 ? localInfoRes.data[0] : null;
  const roomsList = stay?.rooms || [];
  const selectedRoom = roomsList[selectedRoomIndex] || null;

  if (detailsLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-bold text-slate-400 tracking-wider uppercase">Fetching Ghumakkad Go Haven Grid...</p>
        </div>
      </div>
    );
  }

  if (detailsError || !stay) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="max-w-md text-center space-y-4 bg-slate-50 p-8 rounded-2xl border border-slate-200">
          <AlertCircle className="w-12 h-12 text-rose-500 mx-auto" />
          <h3 className="text-lg font-black text-slate-900">Lodging Unavailable</h3>
          <p className="text-xs text-slate-500 leading-relaxed">The active matrix configuration identifier requested cannot be resolved inside our database grids.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-slate-800 antialiased font-sans pt-20">
      
      {/* BRAND & HEADER RADIAL INFO */}
      <StayHeader stay={stay} />

      {/* PHOTO GRID MESH */}
      <StayPhotoMesh stay={stay} />

      {/* DETAILED CONTENT SPLIT */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* LEFT COLUMN CONTENT PACK */}
        <div className="lg:col-span-7 space-y-10">
          {/* AI Verified scorecard / long description */}
          <StayOverview stay={stay} />

          <hr className="border-slate-100" />

          {/* RESORT WIDE AMENITIES */}
          <StayAmenities stay={stay} />

          <hr className="border-slate-100" />

          {/* HUB INFRASTRUCTURE LOGISTICS */}
          <StayConnectivity stay={stay} />

          {/* DESTINATION LOCALINFO TAB CONTAINER */}
          {localInfo && <StayLocalTabInsight localInfo={localInfo} />}

        </div>

        {/* RIGHT COLUMN STICKY LEDGER */}
        <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
          {/* ROOM CARD MATRIX SELECTOR */}
          <StayRoomSelector 
            roomsList={roomsList} 
            selectedRoomIndex={selectedRoomIndex} 
            setSelectedRoomIndex={setSelectedRoomIndex} 
          />

          {selectedRoom && (
            <StayBookingLedger stay={stay} selectedRoom={selectedRoom} />
          )}
        </div>

      </div>
    </div>
  );
}
