"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Compass, MapPin, Bus, Train, Plane, Navigation, 
  Map, Clock, Plus, Minus, AlertCircle, ShoppingBag,
  ChevronRight, X, User, SlidersHorizontal, Sparkles, Check, Calendar,
  ListFilter
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useJourneys from '@/hooks/useJourneys';
import { useSearchParams } from 'next/navigation';

// ── Types ──
interface Segment {
  mode: "BUS" | "TRAIN" | "FLIGHT" | "CAB" | "WALK" | "AUTO" | "SHUTTLE";
  fromHub: string;
  toHub: string;
  departureTime?: string;
  arrivalTime?: string;
  price: number;
  distanceKm: number;
  durationMin: number;
  operator?: string;
  vehicle?: string;
  type?: string;
}

interface Journey {
  totalCost: number;
  totalDistance: number;
  totalDuration: number;
  segments: Segment[];
}

export default function TransportationRoutesExplorer() {
  // ── 1. CUSTOM HOOK BINDINGS ──
  const {
    locations,
    hubs,
    journeys,
    isLoading,
    isSearching,
    validationErrors,
    searchJourneys
  } = useJourneys();

  // ── Search & Preferences State ──
  const [searchParams, setSearchParams] = useState({
    sourceCityId: "",
    destinationCityId: "",
    travelDate: "2026-06-05",
    passengers: 2
  });

  const [preferences, setPreferences] = useState<{
    sortBy: "CHEAPEST" | "FASTEST" | "RECOMMENDED";
    maxTransfers: number;
  }>({
    sortBy: "RECOMMENDED",
    maxTransfers: 3
  });

  const [selectedJourneyIndex, setSelectedJourneyIndex] = useState<number>(0);
  const [hoveredSegment, setHoveredSegment] = useState<Segment | null>(null);

  // ── Seat Selection Drawer States ──
  const [bookingSegment, setBookingSegment] = useState<Segment | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  // ── Viewport Camera Panning & Zooming ──
  const [pan, setPan] = useState({ x: 20, y: -20 });
  const [zoom, setZoom] = useState(1);

  // ── Active Tab View Toggle (Ticket List vs Mind Map Graph) ──
  const [activeView, setActiveView] = useState<"TICKET_LIST" | "MAP_GRAPH">("TICKET_LIST");

  // ── SCREENSHOT INTERACTIVE FILTERS STATE ──
  const [selectedModeFilter, setSelectedModeFilter] = useState<string>("ALL");
  const [priceRange, setPriceRange] = useState<number>(10000);
  const [selectedTimeFilter, setSelectedTimeFilter] = useState<string>("ALL");
  const [selectedModesList, setSelectedModesList] = useState<string[]>(["FLIGHT", "TRAIN", "BUS", "CAB"]);
  const [selectedStopsFilter, setSelectedStopsFilter] = useState<string>("ALL");
  const [sortByFilter, setSortByFilter] = useState<string>("RECOMMENDED");

  // ── URL Search Synchronization ──
  const urlParams = useSearchParams();
  const urlSourceCityId = urlParams.get("sourceCityId") || "";
  const urlDestinationCityId = urlParams.get("destinationCityId") || "";
  const urlTravelDate = urlParams.get("travelDate") || "2026-06-05";
  const urlPassengers = Number(urlParams.get("passengers")) || 2;

  useEffect(() => {
    if (urlSourceCityId && urlDestinationCityId) {
      setSearchParams({
        sourceCityId: urlSourceCityId,
        destinationCityId: urlDestinationCityId,
        travelDate: urlTravelDate,
        passengers: urlPassengers
      });

      searchJourneys({
        sourceCityId: urlSourceCityId,
        destinationCityId: urlDestinationCityId,
        travelDate: urlTravelDate,
        passengers: urlPassengers,
        preferences
      }, {
        onSuccess: () => {
          setSelectedJourneyIndex(0);
        }
      });
    } else if (locations && locations.length > 0) {
      setSearchParams(prev => ({
        ...prev,
        sourceCityId: locations.find((l: any) => l.name.toLowerCase().includes("delhi"))?._id || locations[0]._id,
        destinationCityId: locations.find((l: any) => l.name.toLowerCase().includes("shimla"))?._id || (locations[1]?._id || locations[0]._id)
      }));
    }
  }, [urlSourceCityId, urlDestinationCityId, urlTravelDate, urlPassengers, locations]);

  // Set maximum price boundary based on computed journeys
  useEffect(() => {
    if (journeys.length > 0) {
      const maxPrice = Math.max(...journeys.map(j => j.totalCost));
      setPriceRange(Math.max(maxPrice, 10000));
    }
  }, [journeys]);

  // ── GEOSPATIAL PROJECTION ENGINE (100% DYNAMIC COORDS) ──
  const nodePositions = useMemo(() => {
    if (!hubs || hubs.length === 0) return {};

    let minLng = Infinity;
    let maxLng = -Infinity;
    let minLat = Infinity;
    let maxLat = -Infinity;

    hubs.forEach((hub: any) => {
      const lng = hub.coordinates[0];
      const lat = hub.coordinates[1];
      if (lng < minLng) minLng = lng;
      if (lng > maxLng) maxLng = lng;
      if (lat < minLat) minLat = lat;
      if (lat > maxLat) maxLat = lat;
    });

    if (minLng === maxLng) { minLng -= 0.5; maxLng += 0.5; }
    if (minLat === maxLat) { minLat -= 0.5; maxLat += 0.5; }

    const lngBuffer = (maxLng - minLng) * 0.1 || 0.1;
    const latBuffer = (maxLat - minLat) * 0.1 || 0.1;
    
    minLng -= lngBuffer;
    maxLng += lngBuffer;
    minLat -= latBuffer;
    maxLat += latBuffer;

    const canvasWidth = 800;
    const canvasHeight = 600;
    const padding = 100;

    const positions: { [hubName: string]: { x: number; y: number } } = {};

    hubs.forEach((hub: any) => {
      const lng = hub.coordinates[0];
      const lat = hub.coordinates[1];

      const x = padding + ((lng - minLng) / (maxLng - minLng)) * (canvasWidth - padding * 2);
      const y = padding + ((maxLat - lat) / (maxLat - minLat)) * (canvasHeight - padding * 2);

      positions[hub.name] = { x, y };
    });

    return positions;
  }, [hubs]);

  const cityClusters = useMemo(() => {
    const clusters: { [cityName: string]: { x: number; y: number; r: number; count: number } } = {};

    hubs.forEach((hub: any) => {
      const pos = nodePositions[hub.name];
      if (!pos) return;

      const cityName = hub.city || "Transit Zone";
      if (!clusters[cityName]) {
        clusters[cityName] = { x: 0, y: 0, r: 60, count: 0 };
      }
      clusters[cityName].x += pos.x;
      clusters[cityName].y += pos.y;
      clusters[cityName].count += 1;
    });

    Object.keys(clusters).forEach(cityName => {
      const cluster = clusters[cityName];
      cluster.x = cluster.x / cluster.count;
      cluster.y = cluster.y / cluster.count;
    });

    return clusters;
  }, [hubs, nodePositions]);

  const activeJourney = useMemo(() => {
    return journeys[selectedJourneyIndex] || journeys[0] || null;
  }, [journeys, selectedJourneyIndex]);

  // ── DYNAMIC SCREENSHOT-BASED JOURNEY FILTERING & SORTING ──
  const filteredJourneys = useMemo(() => {
    let result = [...journeys];

    // 1. Top Mode Capsule Filter Pills
    if (selectedModeFilter !== "ALL") {
      result = result.filter(j => j.segments.some((s: Segment) => s.mode === selectedModeFilter));
    }

    // 2. Price Range Slider
    result = result.filter(j => j.totalCost <= priceRange);

    // 3. Departure Time Buttons
    if (selectedTimeFilter !== "ALL") {
      result = result.filter(j => {
        const firstSeg = j.segments[0];
        if (!firstSeg?.departureTime) return true;
        const depHour = new Date(firstSeg.departureTime).getHours();
        
        if (selectedTimeFilter === "EARLY_MORNING") return depHour >= 0 && depHour < 6;
        if (selectedTimeFilter === "MORNING") return depHour >= 6 && depHour < 12;
        if (selectedTimeFilter === "AFTERNOON") return depHour >= 12 && depHour < 18;
        if (selectedTimeFilter === "EVENING") return depHour >= 18 && depHour < 24;
        return true;
      });
    }

    // 4. Sidebar Checkboxes Mode Filter
    result = result.filter(j => j.segments.some((s: Segment) => {
      let mappedMode = s.mode;
      if (mappedMode === "WALK" || mappedMode === "AUTO" || mappedMode === "SHUTTLE") mappedMode = "CAB";
      return selectedModesList.includes(mappedMode);
    }));

    // 5. Sidebar Stops Filter
    if (selectedStopsFilter !== "ALL") {
      result = result.filter(j => {
        const hopCount = j.segments.length;
        if (selectedStopsFilter === "NON_STOP") return hopCount === 1;
        if (selectedStopsFilter === "ONE_STOP") return hopCount === 2;
        if (selectedStopsFilter === "MULTI_STOP") return hopCount >= 3;
        return true;
      });
    }

    // Sort execution
    if (sortByFilter === "CHEAPEST") {
      result.sort((a, b) => a.totalCost - b.totalCost);
    } else if (sortByFilter === "FASTEST") {
      result.sort((a, b) => a.totalDuration - b.totalDuration);
    } else {
      // RECOMMENDED
      result.sort((a, b) => (a.totalCost * 0.4 + a.totalDuration * 0.6) - (b.totalCost * 0.4 + b.totalDuration * 0.6));
    }

    return result;
  }, [journeys, selectedModeFilter, priceRange, selectedTimeFilter, selectedModesList, selectedStopsFilter, sortByFilter]);

  // Dynamic counts for checkboxes based on loaded results
  const modeCounts = useMemo(() => {
    const counts = { FLIGHT: 0, TRAIN: 0, BUS: 0, CAB: 0 };
    journeys.forEach(j => {
      const uniqueModes = new Set<string>();
      j.segments.forEach((s: Segment) => {
        let m = s.mode;
        if (m === "WALK" || m === "AUTO" || m === "SHUTTLE") m = "CAB";
        uniqueModes.add(m);
      });
      uniqueModes.forEach(m => {
        if (m in counts) {
          counts[m as keyof typeof counts]++;
        }
      });
    });
    return counts;
  }, [journeys]);

  const toggleModeCheckbox = (mode: string) => {
    if (selectedModesList.includes(mode)) {
      setSelectedModesList(prev => prev.filter(m => m !== mode));
    } else {
      setSelectedModesList(prev => [...prev, mode]);
    }
  };

  const getHubCoords = (name: string): [number, number] => {
    const pos = nodePositions[name];
    return pos ? [pos.x, pos.y] : [400, 300];
  };

  const getCurvedPath = (x1: number, y1: number, x2: number, y2: number, index = 0) => {
    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2;
    const dx = x2 - x1;
    const dy = y2 - y1;
    const len = Math.hypot(dx, dy) || 1;
    const nx = -dy / len;
    const ny = dx / len;
    
    const offset = index * 25; 
    const cx = midX + nx * offset;
    const cy = midY + ny * offset;
    
    return `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`;
  };

  const handleBookingStart = (e: React.MouseEvent, segment: Segment) => {
    e.stopPropagation();
    setBookingSegment(segment);
    setSelectedSeats([]);
    setCheckoutComplete(false);
  };

  const toggleSeat = (seatCode: string) => {
    if (selectedSeats.includes(seatCode)) {
      setSelectedSeats(prev => prev.filter(s => s !== seatCode));
    } else {
      if (selectedSeats.length < searchParams.passengers) {
        setSelectedSeats(prev => [...prev, seatCode]);
      }
    }
  };

  // Helper formatting timing
  const formatTime = (isoString?: string) => {
    if (!isoString) return "08:00";
    try {
      const date = new Date(isoString);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    } catch {
      return "08:00";
    }
  };

  return (
    <div className="min-h-screen font-sans overflow-hidden pb-16 relative pt-4 md:pt-8 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">
      
      {/* ── HEADER PANEL ── */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-xs font-bold text-rose-500 mb-2 uppercase tracking-wider">
              <Sparkles size={12} className="animate-spin duration-[8000ms]" />
              Multi-Modal Journey Pathfinder Router
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-none">
              Transportation <span className="bg-gradient-to-r from-rose-500 to-amber-500 bg-clip-text text-transparent">& Routes explorer</span>
            </h1>
          </div>

          {/* View Toggler (Ticket Listings vs Mind Map Graph) */}
          <div className="flex items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-2xl p-1 shadow-sm self-start lg:self-center">
            <button
              onClick={() => setActiveView("TICKET_LIST")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all font-bold text-xs uppercase cursor-pointer border-0 ${
                activeView === "TICKET_LIST"
                  ? 'bg-rose-500 text-white shadow-md'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white bg-transparent'
              }`}
            >
              <ListFilter size={14} /> Ticket List View
            </button>
            <button
              onClick={() => setActiveView("MAP_GRAPH")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all font-bold text-xs uppercase cursor-pointer border-0 ${
                activeView === "MAP_GRAPH"
                  ? 'bg-rose-500 text-white shadow-md'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white bg-transparent'
              }`}
            >
              <Map size={14} /> Mind Map Graph
            </button>
          </div>
        </div>
      </div>

      {/* Stunning Zod Validation Errors Alert */}
      {validationErrors && validationErrors.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 md:px-8 mb-4">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl flex items-start gap-3 text-xs text-rose-600 dark:text-rose-400 font-bold"
          >
            <AlertCircle size={16} className="shrink-0 mt-0.5" />
            <div className="space-y-1">
              <div className="font-extrabold uppercase tracking-wider text-[10px]">Please correct the following:</div>
              <ul className="list-disc list-inside font-medium text-rose-700 dark:text-rose-300">
                {validationErrors.map((err, idx) => (
                  <li key={idx}>{err}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      )}

      {/* ── 1. TICKET LIST VIEW (SCREENSHOT EXACT MATCH) ── */}
      {activeView === "TICKET_LIST" && (
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          {/* Horizontal top filter Capsule bar */}
          <div className="flex flex-wrap items-center gap-3 border-b border-slate-200/60 dark:border-white/5 pb-5 mb-6 text-xs font-bold text-slate-500 dark:text-slate-400">
            <span className="uppercase tracking-widest text-[10px] font-black mr-2">Filter by:</span>
            
            <button
              onClick={() => setSelectedModeFilter("ALL")}
              className={`px-5 py-2.5 rounded-full border transition-all cursor-pointer border-0 font-bold ${
                selectedModeFilter === 'ALL'
                  ? 'bg-rose-500 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setSelectedModeFilter("FLIGHT")}
              className={`flex items-center gap-1.5 px-5 py-2.5 rounded-full border transition-all cursor-pointer border-0 font-bold ${
                selectedModeFilter === 'FLIGHT'
                  ? 'bg-rose-500 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300'
              }`}
            >
              <Plane size={13} /> Flight
            </button>
            <button
              onClick={() => setSelectedModeFilter("TRAIN")}
              className={`flex items-center gap-1.5 px-5 py-2.5 rounded-full border transition-all cursor-pointer border-0 font-bold ${
                selectedModeFilter === 'TRAIN'
                  ? 'bg-rose-500 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300'
              }`}
            >
              <Train size={13} /> Train
            </button>
            <button
              onClick={() => setSelectedModeFilter("BUS")}
              className={`flex items-center gap-1.5 px-5 py-2.5 rounded-full border transition-all cursor-pointer border-0 font-bold ${
                selectedModeFilter === 'BUS'
                  ? 'bg-rose-500 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300'
              }`}
            >
              <Bus size={13} /> Bus
            </button>
            <button
              onClick={() => setSelectedModeFilter("CAB")}
              className={`flex items-center gap-1.5 px-5 py-2.5 rounded-full border transition-all cursor-pointer border-0 font-bold ${
                selectedModeFilter === 'CAB'
                  ? 'bg-rose-500 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300'
              }`}
            >
              <Navigation size={13} className="rotate-45" /> Car / Cab
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT SIDEBAR FILTER PANEL */}
            <div className="lg:col-span-3 space-y-6">
              
              {/* 1. Price Range Slider */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-3xl p-5 shadow-xs">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-4">Price Range</h3>
                <div className="flex justify-between items-center text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">
                  <span>₹0</span>
                  <span className="text-rose-500 font-extrabold text-sm">₹{priceRange.toLocaleString()}</span>
                </div>
                <input 
                  type="range"
                  min="0"
                  max={journeys.length > 0 ? Math.max(...journeys.map(j => j.totalCost), 10000) : 10000}
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full accent-rose-500 cursor-pointer"
                />
              </div>

              {/* 2. Departure Time Buttons Grid */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-3xl p-5 shadow-xs">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-4">Departure Time</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setSelectedTimeFilter(selectedTimeFilter === "EARLY_MORNING" ? "ALL" : "EARLY_MORNING")}
                    className={`flex flex-col items-center gap-1 p-3 rounded-2xl border transition-all cursor-pointer text-center bg-transparent border-slate-200 dark:border-slate-800 ${
                      selectedTimeFilter === "EARLY_MORNING"
                        ? 'border-rose-500 dark:border-rose-500 text-rose-500 dark:text-rose-400 font-black'
                        : 'text-slate-500 hover:border-slate-300'
                    }`}
                  >
                    <span className="text-xs font-extrabold">Early Morning</span>
                    <span className="text-[8px] font-bold text-slate-400 uppercase">12AM - 6AM</span>
                  </button>
                  
                  <button
                    onClick={() => setSelectedTimeFilter(selectedTimeFilter === "MORNING" ? "ALL" : "MORNING")}
                    className={`flex flex-col items-center gap-1 p-3 rounded-2xl border transition-all cursor-pointer text-center bg-transparent border-slate-200 dark:border-slate-800 ${
                      selectedTimeFilter === "MORNING"
                        ? 'border-rose-500 dark:border-rose-500 text-rose-500 dark:text-rose-400 font-black'
                        : 'text-slate-500 hover:border-slate-300'
                    }`}
                  >
                    <span className="text-xs font-extrabold">Morning</span>
                    <span className="text-[8px] font-bold text-slate-400 uppercase">6AM - 12PM</span>
                  </button>

                  <button
                    onClick={() => setSelectedTimeFilter(selectedTimeFilter === "AFTERNOON" ? "ALL" : "AFTERNOON")}
                    className={`flex flex-col items-center gap-1 p-3 rounded-2xl border transition-all cursor-pointer text-center bg-transparent border-slate-200 dark:border-slate-800 ${
                      selectedTimeFilter === "AFTERNOON"
                        ? 'border-rose-500 dark:border-rose-500 text-rose-500 dark:text-rose-400 font-black'
                        : 'text-slate-500 hover:border-slate-300'
                    }`}
                  >
                    <span className="text-xs font-extrabold">Afternoon</span>
                    <span className="text-[8px] font-bold text-slate-400 uppercase">12PM - 6PM</span>
                  </button>

                  <button
                    onClick={() => setSelectedTimeFilter(selectedTimeFilter === "EVENING" ? "ALL" : "EVENING")}
                    className={`flex flex-col items-center gap-1 p-3 rounded-2xl border transition-all cursor-pointer text-center bg-transparent border-slate-200 dark:border-slate-800 ${
                      selectedTimeFilter === "EVENING"
                        ? 'border-rose-500 dark:border-rose-500 text-rose-500 dark:text-rose-400 font-black'
                        : 'text-slate-500 hover:border-slate-300'
                    }`}
                  >
                    <span className="text-xs font-extrabold">Evening</span>
                    <span className="text-[8px] font-bold text-slate-400 uppercase">6PM - 12AM</span>
                  </button>
                </div>
              </div>

              {/* 3. Transport Mode Checkboxes */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-3xl p-5 shadow-xs">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-4">Transport Mode</h3>
                <div className="space-y-3">
                  {[
                    { id: "FLIGHT", label: "Flight", icon: <Plane size={14} />, count: modeCounts.FLIGHT },
                    { id: "TRAIN", label: "Train", icon: <Train size={14} />, count: modeCounts.TRAIN },
                    { id: "BUS", label: "Bus", icon: <Bus size={14} />, count: modeCounts.BUS },
                    { id: "CAB", label: "Car / Cab", icon: <Navigation size={14} className="rotate-45" />, count: modeCounts.CAB }
                  ].map((mode) => (
                    <label key={mode.id} className="flex items-center justify-between cursor-pointer group text-xs font-bold text-slate-600 dark:text-slate-300">
                      <div className="flex items-center gap-2.5">
                        <input
                          type="checkbox"
                          checked={selectedModesList.includes(mode.id)}
                          onChange={() => toggleModeCheckbox(mode.id)}
                          className="accent-rose-500 w-4 h-4 rounded-md cursor-pointer"
                        />
                        <span className="flex items-center gap-1.5 group-hover:text-rose-500 transition-colors">
                          {mode.icon} {mode.label}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400 bg-slate-100 dark:bg-slate-850 px-2 py-0.5 rounded-md font-bold">{mode.count}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 4. Stops Options Radios */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-3xl p-5 shadow-xs">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-4">Stops</h3>
                <div className="space-y-3">
                  {[
                    { id: "ALL", label: "All connections" },
                    { id: "NON_STOP", label: "Non-stop (Direct)" },
                    { id: "ONE_STOP", label: "1 Stop" },
                    { id: "MULTI_STOP", label: "2+ Stops" }
                  ].map((stop) => (
                    <label key={stop.id} className="flex items-center gap-2.5 cursor-pointer text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-rose-500 transition-colors">
                      <input
                        type="radio"
                        name="stopsFilter"
                        checked={selectedStopsFilter === stop.id}
                        onChange={() => setSelectedStopsFilter(stop.id)}
                        className="accent-rose-500 w-4 h-4 cursor-pointer"
                      />
                      <span>{stop.label}</span>
                    </label>
                  ))}
                </div>
              </div>

            </div>

            {/* RIGHT SIDE LISTINGS GRID */}
            <div className="lg:col-span-9 space-y-5">
              
              {/* Header with results count and sort selector */}
              <div className="flex justify-between items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 p-4 rounded-2xl shadow-xs">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                  <span className="text-rose-500 font-extrabold">{filteredJourneys.length}</span> routes found
                </span>

                <div className="flex items-center gap-2 text-xs font-bold relative">
                  <span className="text-slate-400 uppercase text-[10px] tracking-wider font-black">Sort:</span>
                  <select
                    value={sortByFilter}
                    onChange={(e) => setSortByFilter(e.target.value)}
                    className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/5 rounded-xl px-3 py-1.5 text-xs font-black text-slate-800 dark:text-white outline-none cursor-pointer"
                  >
                    <option value="RECOMMENDED">Recommended</option>
                    <option value="CHEAPEST">Price: Low to High</option>
                    <option value="FASTEST">Duration: Shortest</option>
                  </select>
                </div>
              </div>

              {/* Listings */}
              <div className="space-y-5">
                {filteredJourneys.length > 0 ? (
                  filteredJourneys.map((jrn, index) => {
                    const hasTransfers = jrn.segments.length > 1;
                    
                    // Award screenshot-like visual tags based on ranking index
                    let visualTag = "";
                    let tagStyle = "";
                    if (index === 0) {
                      visualTag = "AI RECOMMENDED — BEST VALUE ROUTE";
                      tagStyle = "bg-rose-500 text-white font-black text-[9px] uppercase tracking-wider px-4 py-1.5 rounded-t-3xl border-b border-rose-500/15 flex items-center gap-1.5";
                    } else if (index === 1) {
                      visualTag = "FASTEST CONNECTION";
                      tagStyle = "bg-cyan-500 text-white font-black text-[9px] uppercase tracking-wider px-4 py-1.5 rounded-t-3xl border-b border-cyan-500/15 flex items-center gap-1.5";
                    } else if (index === 2) {
                      visualTag = "BUDGET PICK";
                      tagStyle = "bg-emerald-600 text-white font-black text-[9px] uppercase tracking-wider px-4 py-1.5 rounded-t-3xl border-b border-emerald-500/15 flex items-center gap-1.5";
                    }

                    return (
                      <div
                        key={index}
                        onClick={() => setSelectedJourneyIndex(index)}
                        className={`bg-white dark:bg-slate-900 border rounded-3xl transition-all duration-300 cursor-pointer shadow-xs hover:shadow-md relative overflow-hidden flex flex-col
                          ${index === selectedJourneyIndex 
                            ? 'border-rose-500 shadow-md scale-[1.005]' 
                            : 'border-slate-200 dark:border-white/5 hover:border-slate-300'
                          }`}
                      >
                        {/* Tag Banner */}
                        {visualTag && (
                          <div className={tagStyle}>
                            <Sparkles size={11} className="animate-pulse" /> {visualTag}
                          </div>
                        )}

                        <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                          
                          {/* 1. TIMELINE ROW (Left: Dep, Center: Path, Right: Arr) */}
                          <div className="md:col-span-8 flex items-center justify-between gap-4">
                            
                            {/* Departure Node */}
                            <div className="text-left space-y-1">
                              <span className="text-2xl font-black text-slate-800 dark:text-white leading-none">
                                {formatTime(jrn.segments[0]?.departureTime)}
                              </span>
                              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
                                {jrn.segments[0]?.fromHub.split(' ')[0]}
                              </span>
                            </div>

                            {/* Center Segments Visual Timeline Path */}
                            <div className="flex-1 flex flex-col items-center gap-1 relative px-4">
                              
                              {/* Dotted path line */}
                              <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-[1px] border-b border-dashed border-slate-300 dark:border-slate-700 z-0" />
                              
                              {/* Floating duration badge */}
                              <span className="text-[9px] font-black text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 border border-slate-200/50 dark:border-white/5 px-2 py-0.5 rounded-full flex items-center gap-1 z-10 shadow-3xs mb-2">
                                <Clock size={10} />
                                {Math.floor(jrn.totalDuration / 60)}h {jrn.totalDuration % 60}m
                              </span>

                              {/* Path anchors list */}
                              <div className="flex items-center w-full justify-between relative px-2">
                                {jrn.segments.map((seg: Segment, sIdx: number) => {
                                  return (
                                    <React.Fragment key={sIdx}>
                                      {sIdx === 0 && (
                                        <div className="relative z-10 flex flex-col items-center group">
                                          <span className="w-3 h-3 rounded-full bg-rose-500 border-2 border-white dark:border-slate-900 shadow-sm" />
                                          <span className="text-[8px] font-black text-slate-400 absolute top-4 whitespace-nowrap truncate max-w-[50px]">{seg.fromHub.split(' ')[0]}</span>
                                        </div>
                                      )}
                                      
                                      <div className="relative z-10 flex flex-col items-center group">
                                        <span className="w-3 h-3 rounded-full bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 shadow-sm group-hover:border-rose-500" />
                                        <span className="text-[8px] font-black text-slate-400 absolute top-4 whitespace-nowrap truncate max-w-[50px]">{seg.toHub.split(' ')[0]}</span>
                                      </div>
                                    </React.Fragment>
                                  );
                                })}
                              </div>
                            </div>

                            {/* Arrival Node */}
                            <div className="text-right space-y-1">
                              <span className="text-2xl font-black text-slate-800 dark:text-white leading-none">
                                {formatTime(jrn.segments[jrn.segments.length - 1]?.arrivalTime)}
                              </span>
                              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
                                {jrn.segments[jrn.segments.length - 1]?.toHub.split(' ')[0]}
                              </span>
                            </div>

                          </div>

                          {/* 2. PRICE AND ACTION ROW */}
                          <div className="md:col-span-4 border-t md:border-t-0 md:border-l border-slate-200/60 dark:border-white/5 pt-4 md:pt-0 md:pl-6 flex flex-row md:flex-col justify-between md:justify-center items-center md:items-end gap-3">
                            
                            <div className="text-left md:text-right space-y-0.5">
                              <div className="text-2xl font-black text-slate-900 dark:text-white leading-none">₹{jrn.totalCost.toLocaleString()}</div>
                              <div className="text-[9px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">per passenger</div>
                            </div>

                            <button
                              onClick={(e) => handleBookingStart(e, jrn.segments[0])}
                              className="px-6 py-3.5 bg-rose-500 hover:bg-rose-600 text-white font-black text-xs uppercase tracking-wider rounded-2xl cursor-pointer shadow-md transition-all active:scale-95 border-0"
                            >
                              Select & Book
                            </button>

                          </div>

                        </div>

                        {/* Extra segments details list drawer links */}
                        <div className="px-6 pb-5 border-t border-slate-100 dark:border-white/3 pt-3 flex flex-wrap gap-4 items-center justify-between text-[11px] font-bold text-slate-400 dark:text-slate-500 bg-slate-50/50 dark:bg-slate-950/20 rounded-b-3xl">
                          <div className="flex flex-wrap items-center gap-4">
                            <span className="flex items-center gap-1">
                              🎫 <span className="text-slate-600 dark:text-slate-300">
                                {jrn.segments.map((s: Segment) => s.operator).filter(Boolean).join(' ➔ ') || "Standard Service"}
                              </span>
                            </span>
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-white/10" />
                            <span className="flex items-center gap-1">
                              🛣️ <span className="text-slate-600 dark:text-slate-300">{jrn.totalDistance} km</span>
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            {Array.from(new Set(jrn.segments.map((s: Segment) => s.mode))).map((m: any) => (
                              <span key={m} className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider border
                                ${m === 'FLIGHT' ? 'bg-cyan-500/10 border-cyan-500/20 text-cyan-500' : ''}
                                ${m === 'TRAIN' ? 'bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-500' : ''}
                                ${m === 'BUS' ? 'bg-blue-500/10 border-blue-500/20 text-blue-500' : ''}
                                ${m === 'CAB' ? 'bg-rose-500/10 border-rose-500/20 text-rose-500' : ''}
                              `}>
                                {m}
                              </span>
                            ))}
                          </div>
                        </div>

                      </div>
                    );
                  })
                ) : (
                  <div className="p-12 text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-3xl text-slate-500 italic">
                    <AlertCircle size={24} className="mx-auto text-rose-500 mb-3" />
                    No feasible paths found matching your filter selection. Try adjusting filters or select another city pair.
                  </div>
                )}
              </div>

            </div>

          </div>

        </div>
      )}

      {/* ── 2. MIND MAP GRAPH VIEW ── */}
      {activeView === "MAP_GRAPH" && (
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: MULTI-MODAL TRAVEL ROUTES CARDS */}
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                Journey Engine returned {journeys.length} paths
              </span>
            </div>

            <div className="space-y-4 max-h-[550px] md:max-h-[650px] overflow-y-auto no-scrollbar">
              {journeys.length > 0 ? (
                journeys.map((jrn, index) => {
                  const isActive = index === selectedJourneyIndex;
                  const hasTransfers = jrn.segments.length > 1;
                  const transitTag = index === 0 ? "RECOMMENDED" : jrn.totalCost < 1000 ? "CHEAPEST" : "FASTEST";

                  return (
                    <div
                      key={index}
                      onClick={() => setSelectedJourneyIndex(index)}
                      className={`relative p-5 rounded-[2rem] border transition-all duration-300 cursor-pointer group hover:scale-[1.01]
                        ${isActive 
                          ? 'bg-white dark:bg-slate-900 border-rose-500 dark:border-rose-500 shadow-xl' 
                          : 'bg-white/45 dark:bg-slate-900/45 border-slate-200/60 dark:border-white/5 hover:border-slate-350 dark:hover:border-white/10 hover:bg-white/60 dark:hover:bg-slate-900/60'
                        }`}
                    >
                      {/* Badge & Fare */}
                      <div className="flex justify-between items-start gap-4 mb-4">
                        <div>
                          <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border
                            ${transitTag === 'RECOMMENDED' ? 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20' : ''}
                            ${transitTag === 'FASTEST' ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20' : ''}
                            ${transitTag === 'CHEAPEST' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' : ''}
                          `}>
                            {transitTag}
                          </span>
                          <h3 className="text-sm md:text-base font-black text-slate-800 dark:text-white mt-2 group-hover:text-rose-500 dark:group-hover:text-indigo-350 transition-colors">
                            {hasTransfers ? `Multi-Modal Connection (${jrn.segments.length - 1} transfers)` : "Direct Transit Path"}
                          </h3>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-lg font-black text-slate-800 dark:text-white">₹{jrn.totalCost}</div>
                          <div className="text-[9px] text-slate-450 dark:text-slate-500 font-bold">Total price</div>
                        </div>
                      </div>

                      {/* Core Metrics */}
                      <div className="grid grid-cols-2 gap-4 bg-slate-50 dark:bg-slate-950/60 p-3 rounded-2xl border border-slate-200/50 dark:border-white/5 mb-4 text-xs font-bold text-slate-650 dark:text-slate-300">
                        <div className="flex items-center gap-2">
                          <Clock size={13} className="text-rose-500 dark:text-indigo-400" />
                          <span>{Math.floor(jrn.totalDuration / 60)}h {jrn.totalDuration % 60}m</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Map size={13} className="text-rose-500" />
                          <span>{jrn.totalDistance} Km</span>
                        </div>
                      </div>

                      {/* Segment Details step list */}
                      <div className="space-y-3 relative pl-1.5">
                        <div className="absolute left-[15px] top-2.5 bottom-2.5 w-0.5 border-l border-dashed border-slate-200 dark:border-white/10" />
                        
                        {jrn.segments.map((seg: Segment, sIdx: number) => (
                          <div 
                            key={sIdx} 
                            onMouseEnter={() => setHoveredSegment(seg)}
                            onMouseLeave={() => setHoveredSegment(null)}
                            className="flex items-start gap-3.5 text-[11px] relative z-10"
                          >
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center border text-[10px]
                              ${seg.mode === 'FLIGHT' ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-500 dark:text-cyan-400' : ''}
                              ${seg.mode === 'TRAIN' ? 'bg-amber-500/20 border-amber-500/40 text-amber-655 dark:text-amber-400' : ''}
                              ${seg.mode === 'BUS' ? 'bg-blue-500/20 border-blue-500/40 text-blue-500 dark:text-blue-400' : ''}
                              ${seg.mode === 'CAB' ? 'bg-rose-500/20 border-rose-500/40 text-rose-500 dark:text-rose-400' : ''}
                              ${seg.mode === 'WALK' ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-600 dark:text-emerald-400' : ''}
                              ${seg.mode === 'AUTO' ? 'bg-amber-500/20 border-amber-500/40 text-amber-500 dark:text-amber-400' : ''}
                              ${seg.mode === 'SHUTTLE' ? 'bg-blue-500/20 border-blue-500/40 text-blue-500 dark:text-blue-400' : 'bg-slate-200 dark:bg-slate-800 border-slate-300 dark:border-white/10 text-slate-800 dark:text-white'}
                            `}>
                              {seg.mode === 'FLIGHT' && <Plane size={11} />}
                              {seg.mode === 'TRAIN' && <Train size={11} />}
                              {seg.mode === 'BUS' && <Bus size={11} />}
                              {seg.mode === 'CAB' && <Navigation size={11} />}
                              {seg.mode === 'WALK' && <Check size={11} />}
                              {seg.mode === 'AUTO' && <SlidersHorizontal size={11} />}
                              {seg.mode === 'SHUTTLE' && <Bus size={11} />}
                            </div>

                            <div className="flex-1">
                              <div className="flex justify-between font-extrabold text-slate-800 dark:text-slate-200">
                                <span>{seg.fromHub} ➔ {seg.toHub}</span>
                                <span className="text-slate-500 dark:text-slate-400">₹{seg.price}</span>
                              </div>
                              <div className="text-[10px] text-slate-500 dark:text-slate-455 font-medium mt-0.5 flex flex-wrap items-center gap-2">
                                <span>{seg.mode} | {seg.operator || "Transit Service"}</span>
                                <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-white/10" />
                                <span>{seg.durationMin} mins</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Seat booking drawer triggers */}
                      {isActive && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="mt-5 pt-5 border-t border-slate-200 dark:border-white/5 overflow-hidden"
                        >
                          <div className="flex flex-col gap-2">
                            {jrn.segments.filter((s: Segment) => s.price > 0).map((seg: Segment, sIdx: number) => (
                              <button
                                key={sIdx}
                                onClick={(e) => handleBookingStart(e, seg)}
                                className="flex items-center justify-between w-full px-4 py-3 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-[10px] font-black uppercase tracking-wider rounded-xl cursor-pointer transition-all text-rose-600 dark:text-white dark:bg-indigo-600/20 dark:hover:bg-indigo-600/30 dark:border-indigo-500/20"
                              >
                                <span className="flex items-center gap-1.5">
                                  {seg.mode === 'FLIGHT' && <Plane size={12} />}
                                  {seg.mode === 'TRAIN' && <Train size={12} />}
                                  {seg.mode === 'BUS' && <Bus size={12} />}
                                  {seg.mode === 'CAB' && <Navigation size={12} />}
                                  Book {seg.mode} Seats
                                </span>
                                <ChevronRight size={14} className="text-rose-500 dark:text-indigo-400" />
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}

                    </div>
                  );
                })
              ) : (
                <div className="p-8 text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-[2rem] text-slate-500 italic">
                  <AlertCircle size={24} className="mx-auto text-rose-500 mb-2" />
                  No routes found. Select city search filters above.
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: GRAPH MAP VISUALIZER */}
          <div className="lg:col-span-7 bg-white/70 dark:bg-slate-900/25 border border-slate-200/50 dark:border-white/5 rounded-[3rem] p-6 shadow-xl relative overflow-hidden h-[550px] md:h-[650px] flex flex-col backdrop-blur-xl">
            
            <div className="absolute top-6 left-6 z-10 pointer-events-none space-y-1.5">
              <div className="flex items-center gap-2 bg-white/95 dark:bg-slate-950/80 backdrop-blur-md px-3 py-2 rounded-xl border border-slate-200/50 dark:border-white/5 shadow-md">
                <Map className="text-rose-500 dark:text-indigo-400 animate-pulse" size={14} />
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-300">Geospatial Path Visualizer</span>
              </div>
              <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400">
                Active Himalayan Network Cluster Map
              </div>
            </div>

            <div className="absolute bottom-6 right-6 z-10 flex bg-white/90 dark:bg-slate-950/90 backdrop-blur-md p-1.5 rounded-xl border border-slate-200 dark:border-white/5 shadow-md gap-1">
              <button 
                onClick={() => setZoom(z => Math.min(2, z + 0.15))}
                className="w-8 h-8 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-all border-0 bg-transparent cursor-pointer font-bold"
              >
                +
              </button>
              <button 
                onClick={() => setZoom(z => Math.max(0.6, z - 0.15))}
                className="w-8 h-8 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-all border-0 bg-transparent cursor-pointer font-bold"
              >
                -
              </button>
              <button 
                onClick={() => { setPan({ x: 20, y: -20 }); setZoom(1); }}
                className="w-8 h-8 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-850 dark:hover:text-white transition-all border-0 bg-transparent cursor-pointer"
              >
                ⟲
              </button>
            </div>

            <div className="flex-1 w-full h-full relative overflow-hidden rounded-[2.25rem] bg-slate-50 dark:bg-slate-950/40">
              <svg className="w-full h-full" viewBox="0 0 800 600">
                <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}>
                  
                  {/* 1. DRAW ALL BASELINE GEOSPATIAL EDGES (SILENT LINES) */}
                  {hubs.map((hubA: any, i: number) => {
                    return hubs.slice(i + 1).map((hubB: any) => {
                      const isSegmentActive = activeJourney?.segments.some((s: Segment) => 
                        (s.fromHub === hubA.name && s.toHub === hubB.name) || 
                        (s.fromHub === hubB.name && s.toHub === hubA.name)
                      );
                      if (isSegmentActive) return null;

                      const coordA = getHubCoords(hubA.name);
                      const coordB = getHubCoords(hubB.name);

                      return (
                        <path
                          key={`${hubA._id}-${hubB._id}-base`}
                          d={getCurvedPath(coordA[0], coordA[1], coordB[0], coordB[1], 1)}
                          fill="none"
                          stroke="rgba(148, 163, 184, 0.15)"
                          strokeWidth="1.5"
                          strokeDasharray="4 4"
                        />
                      );
                    });
                  })}

                  {/* 2. DRAW ACTIVE ROUTE EDGES OF THE CHOSEN JOURNEY */}
                  {activeJourney?.segments.map((seg: Segment, index: number) => {
                    const srcCoords = getHubCoords(seg.fromHub);
                    const destCoords = getHubCoords(seg.toHub);
                    
                    const isHovered = hoveredSegment === seg;

                    const path = getCurvedPath(
                      srcCoords[0], srcCoords[1],
                      destCoords[0], destCoords[1],
                      index + 1
                    );

                    let edgeColor = "#3b82f6";
                    if (seg.mode === 'FLIGHT') edgeColor = "#22d3ee";
                    if (seg.mode === 'TRAIN') edgeColor = "#f59e0b";
                    if (seg.mode === 'CAB') edgeColor = "#f43f5e";
                    if (seg.mode === 'WALK') edgeColor = "#10b981";
                    if (seg.mode === 'AUTO') edgeColor = "#eab308";
                    if (seg.mode === 'SHUTTLE') edgeColor = "#3b82f6";

                    return (
                      <g key={index} className="cursor-pointer">
                        {/* Glow halo */}
                        <path
                          d={path}
                          fill="none"
                          stroke={edgeColor}
                          strokeWidth={isHovered ? "8" : "4"}
                          strokeOpacity={isHovered ? "0.4" : "0.15"}
                          className="transition-all duration-300"
                        />

                        {/* Solid line core */}
                        <path
                          d={path}
                          fill="none"
                          stroke={edgeColor}
                          strokeWidth="2.5"
                          className="transition-all duration-300"
                        />

                        {/* Moving travel dotted dashflow */}
                        <path
                          d={path}
                          fill="none"
                          stroke={edgeColor}
                          strokeWidth="4"
                          strokeDasharray="8, 30"
                          className="opacity-75"
                          style={{
                            animation: "dash 4s linear infinite"
                          }}
                        />
                      </g>
                    );
                  })}

                  {/* 3. DRAW ZONE RINGS */}
                  {Object.entries(cityClusters).map(([cityName, cluster]) => {
                    return (
                      <g key={cityName} className="opacity-30">
                        <circle
                          cx={cluster.x}
                          cy={cluster.y}
                          r="60"
                          fill="rgba(99, 102, 241, 0.01)"
                          stroke="rgba(148, 163, 184, 0.2)"
                          strokeWidth="1.5"
                        />
                        <text
                          x={cluster.x}
                          y={cluster.y + 75}
                          textAnchor="middle"
                          fill="rgba(148, 163, 184, 0.5)"
                          className="text-[8px] font-black uppercase tracking-wider pointer-events-none"
                        >
                          {cityName} ZONE
                        </text>
                      </g>
                    );
                  })}

                  {/* 4. DRAW HUB STATIONS */}
                  {hubs.map((hub: any) => {
                    const isHubActive = activeJourney?.segments.some((s: Segment) => s.fromHub === hub.name || s.toHub === hub.name);
                    const coords = getHubCoords(hub.name);

                    return (
                      <g key={hub._id} transform={`translate(${coords[0]}, ${coords[1]})`} className="cursor-pointer">
                        <circle
                          r={isHubActive ? "11" : "8"}
                          fill="var(--background, #ffffff)"
                          stroke={isHubActive ? "#rose-500" : "rgba(148,163,184,0.4)"}
                          strokeWidth={isHubActive ? "2.5" : "1.5"}
                          className="transition-all hover:scale-110 shadow-sm"
                          style={{ stroke: isHubActive ? "var(--foreground, #rose-500)" : undefined }}
                        />
                        <circle
                          r="4"
                          fill={
                            hub.type === 'AIRPORT' ? '#22d3ee' :
                            hub.type === 'RAILWAY_STATION' ? '#f59e0b' :
                            hub.type === 'BUS_STAND' ? '#3b82f6' : '#f43f5e'
                          }
                        />
                        <text
                          y="-15"
                          textAnchor="middle"
                          className={isHubActive ? "fill-slate-900 dark:fill-white font-black text-[8px] uppercase tracking-wider pointer-events-none transition-all" : "fill-slate-400 dark:fill-slate-500 font-bold text-[8px] uppercase tracking-wider pointer-events-none transition-all"}
                        >
                          {hub.name.split(' ')[0]}
                        </text>
                      </g>
                    );
                  })}

                </g>
              </svg>

              {/* Segment info hover overlay */}
              <AnimatePresence>
                {hoveredSegment && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute bottom-6 left-6 right-6 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border border-slate-200 dark:border-white/10 p-4 rounded-2xl shadow-xl flex items-center justify-between text-xs text-slate-800 dark:text-white"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-rose-500/10 dark:bg-indigo-500/10 flex items-center justify-center text-rose-500 dark:text-indigo-400 font-extrabold">
                        {hoveredSegment.mode === 'FLIGHT' && <Plane size={14} />}
                        {hoveredSegment.mode === 'TRAIN' && <Train size={14} />}
                        {hoveredSegment.mode === 'BUS' && <Bus size={14} />}
                        {hoveredSegment.mode === 'CAB' && <Navigation size={14} />}
                      </div>
                      <div>
                        <div className="font-black">{hoveredSegment.operator || "Local Transit"}</div>
                        <div className="text-[10px] text-slate-400 dark:text-slate-500 font-bold">{hoveredSegment.vehicle || hoveredSegment.mode}</div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="font-extrabold">{hoveredSegment.distanceKm} Km | {hoveredSegment.durationMin} mins</div>
                      <div className="text-rose-500 dark:text-indigo-400 font-black">₹{hoveredSegment.price}</div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Dotted path stroke offset styles */}
            <style jsx global>{`
              @keyframes dash {
                to {
                  stroke-dashoffset: -100;
                }
              }
            `}</style>
          </div>

        </div>
      )}

      {/* ── SEAT SELECTOR DRAWER SHEET ── */}
      <AnimatePresence>
        {bookingSegment && (
          <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="w-full max-w-lg bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-white/10 rounded-t-[3rem] shadow-2xl p-6 relative overflow-hidden text-slate-800 dark:text-white"
            >
              <button 
                onClick={() => setBookingSegment(null)}
                className="absolute top-6 right-6 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-950 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white border-0 cursor-pointer"
              >
                <X size={16} />
              </button>

              {!checkoutComplete ? (
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-rose-500/10 dark:bg-indigo-500/10 flex items-center justify-center text-rose-500 dark:text-indigo-400">
                      {bookingSegment.mode === 'FLIGHT' && <Plane size={18} />}
                      {bookingSegment.mode === 'TRAIN' && <Train size={18} />}
                      {bookingSegment.mode === 'BUS' && <Bus size={18} />}
                      {bookingSegment.mode === 'CAB' && <Navigation size={18} />}
                    </div>
                    <div>
                      <h3 className="text-lg font-black">Select {bookingSegment.mode} Seats</h3>
                      <p className="text-[11px] font-bold text-slate-400 dark:text-slate-550 uppercase tracking-widest">{bookingSegment.operator}</p>
                    </div>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-950/50 rounded-2xl border border-slate-200 dark:border-white/5 p-4 mb-6 flex justify-between items-center text-[10px] font-black uppercase tracking-wider text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <span className="w-3.5 h-3.5 bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-white/10 rounded-md inline-block" /> Available
                    </span>
                    <span className="flex items-center gap-1.5 text-rose-500 dark:text-indigo-400">
                      <span className="w-3.5 h-3.5 bg-rose-500 dark:bg-indigo-600 rounded-md inline-block" /> Selected
                    </span>
                    <span className="flex items-center gap-1.5 text-rose-455">
                      <span className="w-3.5 h-3.5 bg-rose-500/20 border border-rose-500/30 rounded-md inline-block" /> Booked
                    </span>
                  </div>

                  <div className="bg-slate-100 dark:bg-slate-950/80 rounded-3xl p-6 border border-slate-200 dark:border-white/5 mb-6 max-h-[220px] overflow-y-auto no-scrollbar flex flex-col items-center">
                    <div className="w-24 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-full text-[8px] font-black tracking-widest text-slate-450 dark:text-slate-500 text-center uppercase mb-6">
                      FRONT (DRIVER)
                    </div>

                    <div className="grid grid-cols-4 gap-3">
                      {Array.from({ length: 16 }).map((_, sIdx) => {
                        const seatCode = `${String.fromCharCode(65 + Math.floor(sIdx / 4))}${sIdx % 4 + 1}`;
                        const isReserved = sIdx === 2 || sIdx === 7 || sIdx === 11;
                        const isSelected = selectedSeats.includes(seatCode);

                        return (
                          <button
                            key={seatCode}
                            disabled={isReserved}
                            onClick={() => toggleSeat(seatCode)}
                            className={`w-10 h-10 rounded-xl font-bold text-xs flex items-center justify-center border cursor-pointer transition-all
                              ${isReserved 
                                ? 'bg-rose-500/10 border-rose-500/20 text-rose-500/30 cursor-not-allowed' 
                                : isSelected
                                  ? 'bg-rose-500 border-rose-500 dark:bg-indigo-600 dark:border-indigo-505 text-white font-black scale-105 shadow-lg shadow-rose-500/20'
                                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-white/5 text-slate-500 hover:border-slate-400 dark:hover:border-slate-700 hover:text-slate-800 dark:hover:text-white'
                              }`}
                          >
                            {seatCode}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-4 bg-slate-50 dark:bg-slate-950 p-5 rounded-[1.75rem] border border-slate-200 dark:border-white/5 mb-6">
                    <div className="flex justify-between text-xs font-bold text-slate-500 dark:text-slate-400">
                      <span>Rate per Passenger</span>
                      <span className="font-extrabold">₹{bookingSegment.price}</span>
                    </div>
                    <div className="flex justify-between text-xs font-bold text-slate-505 dark:text-slate-400">
                      <span>Selected seats count</span>
                      <span className="text-rose-500 dark:text-indigo-400 font-extrabold">{selectedSeats.length} / {searchParams.passengers} selected</span>
                    </div>
                    
                    <div className="h-px bg-slate-200 dark:bg-white/5" />
                    
                    <div className="flex justify-between items-center font-black">
                      <span className="text-sm">Total Ticket Price</span>
                      <span className="text-xl">₹{selectedSeats.length * bookingSegment.price}</span>
                    </div>
                  </div>

                  <button
                    disabled={selectedSeats.length < searchParams.passengers}
                    onClick={() => setCheckoutComplete(true)}
                    className="flex items-center justify-center gap-2.5 w-full py-4 bg-gradient-to-r from-rose-500 to-indigo-500 disabled:from-slate-200 dark:disabled:from-slate-800 disabled:text-slate-400 dark:disabled:text-slate-500 disabled:cursor-not-allowed text-white font-black text-xs uppercase tracking-wider rounded-2xl cursor-pointer transition-all border-0"
                  >
                    <ShoppingBag size={14} /> Confirm & Pay
                  </button>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-650 dark:text-emerald-400 mx-auto mb-6">
                    <Check size={32} className="animate-bounce" />
                  </div>
                  
                  <h3 className="text-2xl font-black">E-Ticket Confirmed!</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 font-medium">
                    Your {bookingSegment.mode} seat reservation on {bookingSegment.operator} has been successfully registered.
                  </p>

                  <div className="bg-slate-50 dark:bg-white text-slate-850 dark:text-slate-950 p-6 rounded-[2rem] shadow-xl max-w-sm mx-auto my-6 text-left relative overflow-hidden font-mono text-[10px]">
                    <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white dark:bg-slate-900" />
                    <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white dark:bg-slate-900" />

                    <div className="flex justify-between items-center border-b border-dashed border-slate-200 dark:border-slate-300 pb-3 mb-3">
                      <div>
                        <div className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">Carrier</div>
                        <div className="font-extrabold text-sm">{bookingSegment.mode} EXPRESS</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[8px] font-bold text-slate-450 uppercase tracking-wider">Date</div>
                        <div className="font-extrabold">{searchParams.travelDate}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">From Hub</div>
                        <div className="font-black text-slate-700">{bookingSegment.fromHub}</div>
                      </div>
                      <div>
                        <div className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">To Hub</div>
                        <div className="font-black text-slate-700">{bookingSegment.toHub}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 border-t border-dashed border-slate-200 dark:border-slate-300 pt-3">
                      <div>
                        <div className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">Seats</div>
                        <div className="font-black text-slate-700">{selectedSeats.join(', ')}</div>
                      </div>
                      <div>
                        <div className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">Rate</div>
                        <div className="font-black text-slate-700">₹{bookingSegment.price}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">Total</div>
                        <div className="font-black text-slate-700 text-xs">₹{selectedSeats.length * bookingSegment.price}</div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setBookingSegment(null)}
                    className="px-8 py-3 bg-slate-800 dark:bg-slate-800 hover:bg-slate-700 text-slate-100 rounded-xl text-xs font-black uppercase tracking-wider cursor-pointer border-0 transition-colors"
                  >
                    Done Explorer
                  </button>
                </div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
