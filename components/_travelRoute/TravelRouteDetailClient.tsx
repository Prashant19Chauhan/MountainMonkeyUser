"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { 
  Bus, Train, Plane, Navigation, Clock, Map, Sparkles, Calendar,
  ShieldCheck, HelpCircle, User, Users, Info, ChevronRight, MapPin, ArrowRight,
  Minus, Plus
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { getRouteDetailApi } from '@/services/journeys.services';
import { useAppSelector } from '@/store/store';
import { EnquiryModal } from '@/components/cards/EnquiryModal';
import { motion } from 'framer-motion';

interface TravelRouteDetailClientProps {
  routeId: string;
}

export default function TravelRouteDetailClient({ routeId }: TravelRouteDetailClientProps) {
  const { user } = useAppSelector((state) => state.user);
  const searchParams = useSearchParams();
  const segmentsParam = searchParams.get("segments") || "";

  // Parse segments to render all legs of the dynamic journey
  const segmentIds = useMemo(() => {
    if (!segmentsParam) {
      return [routeId];
    }
    return segmentsParam.split(",").filter(Boolean);
  }, [segmentsParam, routeId]);

  // Parallel Fetching for all segments in the journey using React Query
  const { data: routesData = [], isLoading, isError } = useQuery({
    queryKey: ["multi-routes-details", segmentIds],
    queryFn: async () => {
      const promises = segmentIds.map(id => getRouteDetailApi(id));
      const results = await Promise.all(promises);
      return results.filter(Boolean); // filter out any null results
    },
    enabled: segmentIds.length > 0
  });

  const [passengers, setPassengers] = useState<number>(2);
  
  // Holds selected schedule per segment index: Record<segmentIdx, selectedScheduleDoc>
  const [selectedSchedules, setSelectedSchedules] = useState<Record<number, any>>({});
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState<boolean>(false);

  // Helper to find intermediate terminal transfers
  const findTransferBetween = (idx: number) => {
    if (idx >= routesData.length - 1) return null;
    const hubAId = routesData[idx]?.route?.destinationHubId?._id;
    const hubBId = routesData[idx + 1]?.route?.sourceHubId?._id;
    if (!hubAId || !hubBId || hubAId === hubBId) return null;

    const allTransfers = routesData[0]?.transfers || [];
    const match = allTransfers.find((t: any) => 
      (t.sourceHubId === hubAId && t.destinationHubId === hubBId) ||
      (t.sourceHubId?._id === hubAId && t.destinationHubId?._id === hubBId)
    );
    if (match) return match;
    
    // Virtual fallback transfer
    return {
      transferMode: "CAB",
      distanceKm: 3.5,
      durationMin: 15,
      estimatedCost: 100,
      sourceHubId: routesData[idx]?.route?.destinationHubId,
      destinationHubId: routesData[idx + 1]?.route?.sourceHubId
    };
  };

  const handleSelectSchedule = (segmentIdx: number, schedule: any) => {
    setSelectedSchedules(prev => {
      const next = { ...prev, [segmentIdx]: schedule };
      
      // Cascade schedule validation rules
      let lastArrival = new Date(schedule.arrivalTime);
      for (let idx = segmentIdx + 1; idx < routesData.length; idx++) {
        const transfer = findTransferBetween(idx - 1);
        const transferDuration = transfer ? transfer.durationMin : 0;
        const minDepTime = new Date(lastArrival.getTime() + transferDuration * 60 * 1000);
        
        const currentSched = next[idx];
        if (currentSched) {
          if (new Date(currentSched.departureTime) < minDepTime) {
            // Reset to the first valid schedule departing after minDepTime
            const scheds = routesData[idx]?.schedules || [];
            const validSched = scheds.find((s: any) => new Date(s.departureTime) >= minDepTime);
            next[idx] = validSched || null;
          }
          if (next[idx]) {
            lastArrival = new Date(next[idx].arrivalTime);
          } else {
            break; // Stop cascading if timeline is broken
          }
        }
      }
      return next;
    });
  };

  // Initialize selected schedules on load
  useEffect(() => {
    if (routesData.length > 0) {
      const initial: Record<number, any> = {};
      let lastArrival: Date | null = null;
      routesData.forEach((data: any, idx: number) => {
        const scheds = data.schedules || [];
        if (idx === 0) {
          initial[idx] = scheds[0] || null;
          if (initial[idx]) {
            lastArrival = new Date(initial[idx].arrivalTime);
          }
        } else {
          if (lastArrival) {
            const transfer = findTransferBetween(idx - 1);
            const transferDuration = transfer ? transfer.durationMin : 0;
            const minDepTime = new Date(lastArrival.getTime() + transferDuration * 60 * 1000);
            
            const validSched = scheds.find((s: any) => new Date(s.departureTime) >= minDepTime);
            initial[idx] = validSched || null;
            if (initial[idx]) {
              lastArrival = new Date(initial[idx].arrivalTime);
            }
          } else {
            initial[idx] = scheds[0] || null;
            if (initial[idx]) {
              lastArrival = new Date(initial[idx].arrivalTime);
            }
          }
        }
      });
      setSelectedSchedules(initial);
    }
  }, [routesData]);

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-rose-500/20 border-t-rose-500 rounded-full animate-spin mx-auto" />
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest animate-pulse">Assembling Journey Route Network...</p>
        </div>
      </div>
    );
  }

  if (isError || routesData.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <div className="bg-rose-500/10 border border-rose-500/20 p-6 rounded-3xl text-center max-w-md">
          <HelpCircle size={40} className="text-rose-500 mx-auto mb-3" />
          <h3 className="text-lg font-black text-rose-600 dark:text-rose-400">Failed to Load Journey</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 font-medium">
            We couldn't retrieve the transit hubs or operational schedules for this traveler connection. Please verify the URL or try searching again.
          </p>
        </div>
      </div>
    );
  }

  const modeIcons = {
    BUS: <Bus size={18} className="text-blue-500" />,
    TRAIN: <Train size={18} className="text-amber-500" />,
    FLIGHT: <Plane size={18} className="text-cyan-500" />,
    METRO: <Navigation size={18} className="text-rose-500 rotate-45" />,
    CAB: <Navigation size={18} className="text-rose-500 rotate-45" />,
    WALK: <User size={18} className="text-emerald-500" />,
    AUTO: <Navigation size={18} className="text-amber-500" />,
    SHUTTLE: <Bus size={18} className="text-blue-500" />
  };

  const getFormattedDate = (isoString?: string) => {
    if (!isoString) return "";
    try {
      return new Date(isoString).toLocaleDateString([], { weekday: 'short', day: 'numeric', month: 'short' });
    } catch { return ""; }
  };

  const getFormattedTime = (isoString?: string) => {
    if (!isoString) return "";
    try {
      return new Date(isoString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    } catch { return ""; }
  };

  // Extract source and destination summaries
  const firstRoute = routesData[0]?.route;
  const lastRoute = routesData[routesData.length - 1]?.route;
  const sourceCity = firstRoute?.sourceHubId?.city || "Origin";
  const destCity = lastRoute?.destinationHubId?.city || "Destination";
  const sourceHubName = firstRoute?.sourceHubId?.name || "Start Hub";
  const destHubName = lastRoute?.destinationHubId?.name || "End Hub";

  const totalDistance = routesData.reduce((acc, curr) => acc + (curr?.route?.distanceKm || 0), 0);
  const totalDuration = routesData.reduce((acc, curr) => acc + (curr?.route?.durationMin || 0), 0);

  // Dynamic cost calculations based on selected schedules
  const perPassengerRate = routesData.reduce((acc, curr, idx) => {
    const selectedSched = selectedSchedules[idx];
    const segmentPrice = selectedSched ? (selectedSched.price || curr.route.currentPrice) : curr.route.currentPrice;
    
    // Add transfer price if applicable
    const transfer = findTransferBetween(idx);
    const transferPrice = transfer ? (transfer.estimatedCost || 0) : 0;

    return acc + segmentPrice + transferPrice;
  }, 0);

  const totalCost = perPassengerRate * passengers;

  // Build the rich details package for the Enquiry submission
  const enquiryData = {
    enquiryType: 'route' as any,
    itemId: firstRoute?._id, // References first route segment for schema compatibility
    itemTitle: `${sourceCity} to ${destCity} Multi-Modal Path (${routesData.map(d => d.route.mode).join(' ➔ ')})`,
    checkInDate: selectedSchedules[0]?.departureTime || new Date().toISOString(),
    checkOutDate: selectedSchedules[routesData.length - 1]?.arrivalTime || new Date().toISOString(),
    numberOfGuests: passengers,
    roomType: routesData.map(d => `${d.route.mode}: ${d.route.vehicleId?.vehicleName || 'Standard'}`).join(' | ').slice(0, 150),
    message: `Hi MountainMonkey, I would like to book this complete multi-modal route from ${sourceCity} to ${destCity} for ${passengers} traveler(s). Please verify schedule seat availability and contact me regarding payment and bookings.`,
    scheduleDetails: (() => {
      let desc = `=== SELECTED SCHEDULE & FLEET DETAILS ===\n`;
      routesData.forEach((data: any, idx: number) => {
        const r = data.route;
        const s = selectedSchedules[idx];
        desc += `${idx + 1}. Mode: ${r.mode} | ${r.sourceHubId?.name} ➔ ${r.destinationHubId?.name}\n`;
        desc += `   Provider: ${r.operatorId?.name || "Standard Carrier"}\n`;
        desc += `   Vehicle: ${r.vehicleId?.vehicleName || "VIP Fleet Class"} (${r.vehicleId?.vehicleNumber || "VIP Fleet"})\n`;
        if (s) {
          desc += `   Selected Schedule: ${getFormattedDate(s.departureTime)}, ${getFormattedTime(s.departureTime)} - ${getFormattedTime(s.arrivalTime)}\n`;
          desc += `   Leg price: ₹${s.price || r.currentPrice}\n`;
        } else {
          desc += `   Selected Schedule: Flexible / Standard Timetable\n`;
          desc += `   Leg price: ₹${r.currentPrice}\n`;
        }

        const transfer = findTransferBetween(idx);
        if (transfer) {
          desc += `   [Transfer] Connecting Mode: ${transfer.transferMode} | ${transfer.sourceHubId?.name || "Hub A"} ➔ ${transfer.destinationHubId?.name || "Hub B"}\n`;
          desc += `   Transfer Fare: ₹${transfer.estimatedCost} (${transfer.distanceKm} Km, ${transfer.durationMin} mins)\n`;
        }
        desc += `\n`;
      });
      desc += `Total Calculated Price: ₹${totalCost.toLocaleString()}`;
      return desc;
    })()
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 font-sans space-y-12">
      
      {/* ── 1. MAIN HERO BANNER GLASS CARD ── */}
      <div className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200/50 dark:border-white/10 rounded-[2.5rem] shadow-xl p-8 flex flex-col lg:flex-row items-center justify-between gap-8 text-slate-800 dark:text-white">
        <div className="space-y-4 flex-1">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-xs font-black uppercase text-rose-500">
            <Sparkles size={12} className="animate-spin duration-[8000ms]" /> Complete Multi-Modal Journey
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight flex flex-wrap items-center gap-3">
            <span>{sourceCity}</span>
            <ArrowRight className="text-rose-500 shrink-0" size={28} />
            <span>{destCity}</span>
          </h2>
          <p className="text-xs sm:text-sm font-semibold text-slate-400 uppercase tracking-widest flex flex-wrap items-center gap-3">
            <span>🌆 {sourceHubName}</span>
            <span className="text-rose-500 font-extrabold">➔</span>
            <span>🏔️ {destHubName}</span>
          </p>

          <div className="grid grid-cols-2 gap-4 max-w-sm pt-2">
            <div className="bg-slate-50 dark:bg-slate-950/60 p-4 rounded-2xl border border-slate-200/50 dark:border-white/5 flex items-center gap-3">
              <Map size={18} className="text-rose-500 animate-pulse" />
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Total Distance</span>
                <span className="text-sm font-extrabold text-slate-800 dark:text-white">{totalDistance} Km</span>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-950/60 p-4 rounded-2xl border border-slate-200/50 dark:border-white/5 flex items-center gap-3">
              <Clock size={18} className="text-rose-500 animate-pulse" />
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Transit Time</span>
                <span className="text-sm font-extrabold text-slate-800 dark:text-white">{Math.floor(totalDuration / 60)}h {totalDuration % 60}m</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Timeline Mode Badge Ribbon */}
        <div className="flex flex-wrap items-center justify-center gap-2 bg-slate-50 dark:bg-slate-950/40 border border-slate-200/50 dark:border-white/5 rounded-3xl p-5 w-full lg:w-fit shrink-0 relative overflow-hidden">
          <span className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest block w-full text-center mb-2">Transit Steps</span>
          <div className="flex items-center gap-3">
            {routesData.map((data: any, idx: number) => (
              <React.Fragment key={idx}>
                {idx > 0 && <span className="text-slate-300 dark:text-slate-700 font-extrabold">➔</span>}
                <div className="flex flex-col items-center gap-1.5 p-3.5 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-white/5 rounded-2xl shadow-xs">
                  <div className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
                    {modeIcons[data.route.mode as keyof typeof modeIcons]}
                  </div>
                  <span className="text-[9px] font-black uppercase text-slate-600 dark:text-slate-300">{data.route.mode}</span>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* ── 2. METADATA SPECIFICATIONS ROW ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: MULTI-MODAL SEGMENTS TIMELINE & SCHEDULE SELECTORS */}
        <div className="lg:col-span-8 space-y-8">
          
          <h3 className="text-xl font-black tracking-tight text-slate-800 dark:text-white pl-1 flex items-center gap-2">
            🧭 Operational Segments & Timetable Schedule Configurator
          </h3>

          <div className="space-y-6 relative pl-6 border-l border-dashed border-slate-200 dark:border-white/10 ml-4">
            {routesData.map((data: any, idx: number) => {
              const route = data.route;
              const scheds = data.schedules || [];
              const selectedSched = selectedSchedules[idx];
              const operatorName = route.operatorId?.name || "Standard Carrier";
              const vehicleName = route.vehicleId?.vehicleName || "VIP Class Fleet";
              const vehicleNum = route.vehicleId?.vehicleNumber || "VIP Fleet";
              const transfer = findTransferBetween(idx);

              return (
                <React.Fragment key={route._id}>
                  {/* Segment Card */}
                  <div className="relative z-10 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-white/5 rounded-[2rem] p-6 shadow-sm flex flex-col gap-6 transition-all duration-300 hover:border-rose-500/20">
                    {/* Timeline bullet tag */}
                    <div className="absolute -left-[37px] top-6 w-5 h-5 rounded-full bg-rose-500 border-4 border-white dark:border-slate-950 flex items-center justify-center shadow-xs" />

                    {/* Header Segment Metadata */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 dark:border-white/5 pb-4">
                      <div className="space-y-1">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/50 dark:border-white/5 text-[9px] font-black uppercase text-slate-500 tracking-wider">
                          {modeIcons[route.mode as keyof typeof modeIcons]} Segment {idx + 1}: {route.mode}
                        </div>
                        <h4 className="text-sm font-black text-slate-800 dark:text-white mt-2">
                          {route.sourceHubId?.name} ➔ {route.destinationHubId?.name}
                        </h4>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                          🛣️ {route.distanceKm} Km | ⏱️ {route.durationMin} mins
                        </p>
                      </div>

                      <div className="text-left sm:text-right space-y-1">
                        <span className="text-[10px] font-bold text-slate-400 uppercase block">Provider & Fleet specs</span>
                        <span className="text-xs font-extrabold text-slate-700 dark:text-slate-300 block">{operatorName}</span>
                        <span className="text-[10px] text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md font-bold inline-block">{vehicleName} ({vehicleNum})</span>
                      </div>
                    </div>

                    {/* Schedule Selector for this Segment */}
                    <div className="space-y-3">
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Choose leg departure timetable:</span>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {scheds.length > 0 ? (
                          scheds.map((s: any) => {
                            const isSelected = selectedSched?._id === s._id;
                            
                            // Timing constraint checks relative to previous leg's selected schedule and connection transfer
                            let isTimingDisabled = false;
                            let minDepTimeToShow = null;
                            if (idx > 0) {
                              const prevSched = selectedSchedules[idx - 1];
                              if (prevSched) {
                                const prevTransfer = findTransferBetween(idx - 1);
                                const prevTransferDuration = prevTransfer ? prevTransfer.durationMin : 0;
                                minDepTimeToShow = new Date(new Date(prevSched.arrivalTime).getTime() + prevTransferDuration * 60 * 1000);
                                isTimingDisabled = new Date(s.departureTime) < minDepTimeToShow;
                              }
                            }

                            return (
                              <button
                                key={s._id}
                                type="button"
                                disabled={isTimingDisabled}
                                onClick={() => handleSelectSchedule(idx, s)}
                                className={`p-3.5 rounded-2xl border transition-all text-left flex flex-col gap-1.5 bg-transparent relative overflow-hidden ${
                                  isSelected
                                    ? 'border-rose-500 bg-rose-500/5 dark:bg-rose-500/10 cursor-default'
                                    : isTimingDisabled
                                      ? 'border-slate-200/40 dark:border-slate-800/40 text-slate-400/55 opacity-45 cursor-not-allowed'
                                      : 'border-slate-200 dark:border-slate-800 text-slate-500 hover:border-slate-300 cursor-pointer'
                                }`}
                              >
                                <div className="flex items-center justify-between w-full">
                                  <span className={`text-[10px] font-black ${isTimingDisabled ? 'text-slate-400/50' : 'text-rose-500'}`}>{getFormattedDate(s.departureTime)}</span>
                                  <span className="text-[10px] font-black text-slate-700 dark:text-slate-300">₹{(s.price || route.currentPrice).toLocaleString()}</span>
                                </div>
                                <div className={`text-xs font-extrabold ${isTimingDisabled ? 'text-slate-400/50' : 'text-slate-800 dark:text-slate-100'}`}>
                                  {getFormattedTime(s.departureTime)} ➔ {getFormattedTime(s.arrivalTime)}
                                </div>
                                {isTimingDisabled ? (
                                  <span className="text-[8px] text-rose-500 font-extrabold uppercase tracking-widest bg-rose-500/10 px-2 py-0.5 rounded-md inline-block mt-1 w-fit">
                                    ⚠️ Connection Conflict
                                  </span>
                                ) : (
                                  <span className="text-[8px] text-slate-400 font-bold uppercase tracking-widest">{s.availableSeats ?? 40} Seats left</span>
                                )}
                              </button>
                            );
                          })
                        ) : (
                          <div className="sm:col-span-2 p-5 text-center bg-slate-50 dark:bg-slate-950/40 border border-slate-200/50 dark:border-white/5 rounded-2xl text-[10px] font-bold text-slate-400 italic">
                            No timetables configured today. Standard rate applied (₹{route.currentPrice.toLocaleString()}).
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Connecting Transfer Card (if there is a hub transfer after this segment) */}
                  {transfer && (
                    <div className="relative z-10 my-4 ml-6 mr-2 p-5 bg-gradient-to-r from-slate-50 to-slate-100/50 dark:from-slate-950/60 dark:to-slate-900/40 border border-slate-200/50 dark:border-white/5 rounded-3xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-inner">
                      {/* Timeline connecting indicator dot */}
                      <div className="absolute -left-[37px] top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-indigo-500 border-4 border-white dark:border-slate-950 flex items-center justify-center shadow-xs" />
                      
                      <div className="flex items-center gap-3.5">
                        <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 dark:bg-indigo-500/25 flex items-center justify-center text-indigo-500">
                          {modeIcons[transfer.transferMode as keyof typeof modeIcons] || <Navigation size={18} />}
                        </div>
                        <div>
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-indigo-500/10 text-indigo-500 text-[8px] font-black uppercase tracking-wider border border-indigo-500/25">
                            Terminal Connection
                          </span>
                          <p className="text-xs font-black text-slate-800 dark:text-slate-200 mt-1">
                            {transfer.transferMode} Transfer: <span className="text-indigo-500 font-extrabold">{transfer.sourceHubId?.name || "Hub A"}</span> ➔ <span className="text-indigo-500 font-extrabold">{transfer.destinationHubId?.name || "Hub B"}</span>
                          </p>
                        </div>
                      </div>
                      
                      <div className="text-left sm:text-right space-y-0.5 self-stretch sm:self-auto border-t sm:border-0 border-slate-200/50 dark:border-white/5 pt-3 sm:pt-0">
                        <span className="text-[9px] font-bold text-slate-400 uppercase block">Transfer Fare & Time</span>
                        <span className="text-sm font-black text-rose-500">₹{transfer.estimatedCost}</span>
                        <span className="text-[10px] text-slate-400 block font-semibold">{transfer.distanceKm} Km | {transfer.durationMin} mins</span>
                      </div>
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: CONSOLIDATED TICKET BOOKING LEDGER & ENQUIRY TRIGGER */}
        <div className="lg:col-span-4 bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200/50 dark:border-white/10 rounded-[2rem] p-6 text-slate-800 dark:text-white space-y-6 shadow-xl relative sticky top-24">
          <div className="space-y-1">
            <h3 className="text-base font-black uppercase tracking-wider flex items-center gap-1.5">
              🎫 Journey Booking Ledger
            </h3>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Confirm passengers & place request</p>
          </div>

          <div className="space-y-4">
            
            {/* Passengers Selector */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5 pl-0.5">
                <Users size={12} className="text-rose-500 animate-pulse" /> Travelers Count
              </label>
              <div className="flex items-center bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-white/5 rounded-2xl p-1.5 justify-between">
                <button 
                  onClick={() => setPassengers(prev => Math.max(1, prev - 1))}
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 text-slate-500 hover:text-rose-500 dark:hover:text-white cursor-pointer hover:shadow-xs border-0 bg-transparent"
                >
                  <Minus size={14} />
                </button>
                <span className="text-sm font-black w-8 text-center text-slate-800 dark:text-white">{passengers} Passengers</span>
                <button 
                  onClick={() => setPassengers(prev => Math.min(8, prev + 1))}
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 text-slate-500 hover:text-rose-500 dark:hover:text-white cursor-pointer hover:shadow-xs border-0 bg-transparent"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* Travel Path Journey Summary */}
            <div className="p-4 bg-slate-50 dark:bg-slate-950/40 rounded-2xl border border-slate-200/50 dark:border-white/5 space-y-3 text-xs font-bold text-slate-500 dark:text-slate-400">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block border-b border-slate-200 dark:border-white/5 pb-1 mb-2">CONSOLIDATED JOURNEY SPEC</span>
              
              <div className="flex justify-between items-center text-slate-700 dark:text-slate-200">
                <span>Start Hub</span>
                <span className="text-slate-800 dark:text-white font-extrabold">{sourceCity}</span>
              </div>
              <div className="flex justify-between items-center text-slate-700 dark:text-slate-200">
                <span>End Hub</span>
                <span className="text-slate-800 dark:text-white font-extrabold">{destCity}</span>
              </div>
              <div className="flex justify-between items-center text-slate-700 dark:text-slate-200">
                <span>Distance</span>
                <span>{totalDistance} Km</span>
              </div>
              <div className="flex justify-between items-center text-slate-700 dark:text-slate-200">
                <span>Travel Legs</span>
                <span className="text-rose-500 font-extrabold">{routesData.length} stages</span>
              </div>
            </div>

            {/* Price Calculations */}
            <div className="space-y-3 p-4 bg-rose-500/5 dark:bg-indigo-500/5 border border-rose-500/10 dark:border-indigo-500/10 rounded-2xl">
              <div className="flex justify-between text-xs font-bold text-slate-500 dark:text-slate-400">
                <span>Combined Seat Rate</span>
                <span className="text-slate-800 dark:text-slate-200 font-extrabold">₹{perPassengerRate.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-xs font-bold text-slate-500 dark:text-slate-400">
                <span>Passengers count</span>
                <span className="text-slate-800 dark:text-slate-200 font-extrabold">{passengers}</span>
              </div>
              
              <div className="h-px bg-slate-200 dark:bg-white/10" />

              <div className="flex justify-between items-center font-black">
                <span className="text-sm">Total Booking Price</span>
                <span className="text-xl text-rose-500">₹{totalCost.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={() => setIsEnquiryModalOpen(true)}
              className="w-full py-4 bg-gradient-to-r from-rose-500 to-indigo-500 text-white font-black text-xs uppercase tracking-wider rounded-2xl cursor-pointer hover:shadow-lg hover:shadow-rose-500/15 transition-all active:scale-[0.98] border-0 flex items-center justify-center gap-2"
            >
              <ShieldCheck size={16} /> Book Complete Route All Vehicle
            </button>
          </div>

          <EnquiryModal 
            isOpen={isEnquiryModalOpen}
            onClose={() => setIsEnquiryModalOpen(false)}
            user={user}
            enquiryData={enquiryData || {}}
          />
        </div>
      </div>
    </div>
  );
}
