"use client";

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { 
  Bus, Train, Plane, Navigation, 
  Map, Clock, AlertCircle,
  ChevronRight, SlidersHorizontal, Sparkles, Check,
  ListFilter, MapPin, Calendar, UserCircle
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
  routeId?: string;
  slug?: string;
}

// ── Inner component that safely uses useSearchParams() ──
function TransportationRoutesExplorerInner() {
  const {
    locations,
    hubs,
    journeys,
    isLoading,
    isSearching,
    validationErrors,
    searchJourneys
  } = useJourneys();

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

  const [pan, setPan] = useState({ x: 20, y: -20 });
  const [zoom, setZoom] = useState(1);

  const [activeView, setActiveView] = useState<"TICKET_LIST" | "MAP_GRAPH">("TICKET_LIST");

  const [selectedModeFilter, setSelectedModeFilter] = useState<string>("ALL");
  const [priceRange, setPriceRange] = useState<number>(10000);
  const [selectedTimeFilter, setSelectedTimeFilter] = useState<string>("ALL");
  const [selectedModesList, setSelectedModesList] = useState<string[]>(["FLIGHT", "TRAIN", "BUS", "CAB"]);
  const [selectedStopsFilter, setSelectedStopsFilter] = useState<string>("ALL");
  const [sortByFilter, setSortByFilter] = useState<string>("RECOMMENDED");

  // ── useSearchParams is safe here because this component is wrapped in <Suspense> ──
  const urlParams = useSearchParams();
  const urlSourceCityId = urlParams.get("sourceCityId") || "";
  const urlDestinationCityId = urlParams.get("destinationCityId") || "";
  const urlTravelDate = urlParams.get("travelDate") || "2026-06-05";
  const urlPassengers = Number(urlParams.get("passengers")) || 2;
  const hasSearchParams = !!urlSourceCityId && !!urlDestinationCityId;

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

  useEffect(() => {
    if (journeys.length > 0) {
      const maxPrice = Math.max(...journeys.map((j: any) => j.totalCost));
      setPriceRange(Math.max(maxPrice, 10000));
    }
  }, [journeys]);

  const delhiCity = locations.find((l: any) => l.name.toLowerCase().includes("delhi"));
  const shimlaCity = locations.find((l: any) => l.name.toLowerCase().includes("shimla"));
  const chdCity = locations.find((l: any) => l.name.toLowerCase().includes("chandigarh"));

  const triggerQuickSearch = (fromId: string, toId: string) => {
    if (!fromId || !toId) return;

    setSearchParams(prev => ({
      ...prev,
      sourceCityId: fromId,
      destinationCityId: toId
    }));

    const params = new URLSearchParams();
    params.set("sourceCityId", fromId);
    params.set("destinationCityId", toId);
    params.set("travelDate", searchParams.travelDate);
    params.set("passengers", String(searchParams.passengers));
    window.history.pushState({}, "", `${window.location.pathname}?${params.toString()}`);

    searchJourneys({
      sourceCityId: fromId,
      destinationCityId: toId,
      travelDate: searchParams.travelDate,
      passengers: searchParams.passengers,
      preferences
    });
  };

  const handleInlineSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchParams.sourceCityId || !searchParams.destinationCityId) return;

    const params = new URLSearchParams();
    params.set("sourceCityId", searchParams.sourceCityId);
    params.set("destinationCityId", searchParams.destinationCityId);
    params.set("travelDate", searchParams.travelDate);
    params.set("passengers", String(searchParams.passengers));
    window.history.pushState({}, "", `${window.location.pathname}?${params.toString()}`);

    searchJourneys({
      sourceCityId: searchParams.sourceCityId,
      destinationCityId: searchParams.destinationCityId,
      travelDate: searchParams.travelDate,
      passengers: searchParams.passengers,
      preferences
    });
  };

  const renderWelcomeDashboard = () => {
    const delhiId = delhiCity?._id || "";
    const shimlaId = shimlaCity?._id || "";
    const chdId = chdCity?._id || "";

    return (
      <div className="py-12 px-4 text-center max-w-4xl mx-auto space-y-12 animate-fadeIn">
        {/* Animated Hero Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="w-20 h-20 mx-auto rounded-full bg-rose-500/10 flex items-center justify-center text-rose-500 shadow-inner mb-6 relative">
            <Map className="animate-pulse" size={32} />
            <div className="absolute inset-0 rounded-full border border-rose-500/30 animate-ping" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-none bg-gradient-to-r from-rose-500 via-amber-500 to-rose-600 bg-clip-text text-transparent">
            Himalayan Network Pathfinder
          </h2>
          <p className="text-sm font-semibold text-slate-400 uppercase tracking-widest max-w-xl mx-auto leading-relaxed">
            Discover and calculate seamless multi-modal transit networks, high-altitude schedules, and cost estimates across northern passes.
          </p>
        </motion.div>

        {/* Dynamic Shortcut Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          
          {/* Card 1: Delhi to Shimla */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => triggerQuickSearch(delhiId, shimlaId)}
            className="p-6 bg-white/70 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200/50 dark:border-white/5 rounded-[2rem] shadow-md hover:shadow-xl transition-all cursor-pointer text-left space-y-4 group relative overflow-hidden"
          >
            <div className="absolute -right-10 -bottom-10 opacity-[0.03] group-hover:scale-110 transition-transform">
              <Bus size={150} />
            </div>
            
            <div className="flex justify-between items-center">
              <span className="px-3 py-1 bg-rose-500/10 text-rose-500 text-[10px] font-black uppercase rounded-full border border-rose-500/20">Flagship Route</span>
              <span className="text-[10px] font-black uppercase text-slate-400">8h 00m commute</span>
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-black text-slate-800 dark:text-white flex items-center gap-2">
                Delhi <span className="text-rose-500">➔</span> Shimla
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Calculate routes using comfortable brand buses and regional commuter flight connections.
              </p>
            </div>

            <div className="text-[10px] font-black uppercase tracking-wider text-rose-500 group-hover:translate-x-1.5 transition-transform flex items-center gap-1.5 pt-2">
              Explore Network ➔
            </div>
          </motion.div>

          {/* Card 2: Chandigarh to Shimla */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => triggerQuickSearch(chdId, shimlaId)}
            className="p-6 bg-white/70 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200/50 dark:border-white/5 rounded-[2rem] shadow-md hover:shadow-xl transition-all cursor-pointer text-left space-y-4 group relative overflow-hidden"
          >
            <div className="absolute -right-10 -bottom-10 opacity-[0.03] group-hover:scale-110 transition-transform">
              <Train size={150} />
            </div>
            
            <div className="flex justify-between items-center">
              <span className="px-3 py-1 bg-amber-500/10 text-amber-500 text-[10px] font-black uppercase rounded-full border border-amber-500/20">Scenic Rail</span>
              <span className="text-[10px] font-black uppercase text-slate-400">3h 00m commute</span>
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-black text-slate-800 dark:text-white flex items-center gap-2">
                Chandigarh <span className="text-rose-500">➔</span> Shimla
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Traverse pine slopes using high-altitude scenic toy train rails and regional local cabs.
              </p>
            </div>

            <div className="text-[10px] font-black uppercase tracking-wider text-rose-500 group-hover:translate-x-1.5 transition-transform flex items-center gap-1.5 pt-2">
              Explore Network ➔
            </div>
          </motion.div>

        </div>

        {/* Explanatory banner */}
        <div className="p-5 bg-rose-500/5 border border-rose-500/10 rounded-2xl max-w-2xl mx-auto flex items-start gap-3.5 text-xs text-slate-500 dark:text-slate-400 font-semibold leading-relaxed">
          <Sparkles className="text-rose-500 shrink-0 mt-0.5" size={18} />
          <p className="text-left">
            <strong>Pathfinder Pro-Tip:</strong> The routing engine automatically factors in schedule timelines, waiting buffers, available capacities, and local transfer costs (e.g. walk or cab transfers between hubs). Define your destinations in the header discovery bar to trigger calculations.
          </p>
        </div>
      </div>
    );
  };

  const nodePositions = useMemo(() => {
    if (!hubs || hubs.length === 0) return {};

    let minLng = Infinity, maxLng = -Infinity;
    let minLat = Infinity, maxLat = -Infinity;

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
    minLng -= lngBuffer; maxLng += lngBuffer;
    minLat -= latBuffer; maxLat += latBuffer;

    const canvasWidth = 800, canvasHeight = 600, padding = 100;
    const positions: { [hubName: string]: { x: number; y: number } } = {};

    hubs.forEach((hub: any) => {
      const x = padding + ((hub.coordinates[0] - minLng) / (maxLng - minLng)) * (canvasWidth - padding * 2);
      const y = padding + ((maxLat - hub.coordinates[1]) / (maxLat - minLat)) * (canvasHeight - padding * 2);
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
      if (!clusters[cityName]) clusters[cityName] = { x: 0, y: 0, r: 60, count: 0 };
      clusters[cityName].x += pos.x;
      clusters[cityName].y += pos.y;
      clusters[cityName].count += 1;
    });
    Object.keys(clusters).forEach(c => {
      clusters[c].x /= clusters[c].count;
      clusters[c].y /= clusters[c].count;
    });
    return clusters;
  }, [hubs, nodePositions]);

  const activeJourney = useMemo(() => {
    return journeys[selectedJourneyIndex] || journeys[0] || null;
  }, [journeys, selectedJourneyIndex]);

  const filteredJourneys = useMemo(() => {
    let result = [...journeys];

    if (selectedModeFilter !== "ALL") {
      result = result.filter((j: any) => j.segments.some((s: Segment) => s.mode === selectedModeFilter));
    }

    result = result.filter((j: any) => j.totalCost <= priceRange);

    if (selectedTimeFilter !== "ALL") {
      result = result.filter((j: any) => {
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

    result = result.filter((j: any) => j.segments.some((s: Segment) => {
      let mappedMode: string = s.mode;
      if (mappedMode === "WALK" || mappedMode === "AUTO" || mappedMode === "SHUTTLE") mappedMode = "CAB";
      return selectedModesList.includes(mappedMode);
    }));

    if (selectedStopsFilter !== "ALL") {
      result = result.filter((j: any) => {
        const hopCount = j.segments.length;
        if (selectedStopsFilter === "NON_STOP") return hopCount === 1;
        if (selectedStopsFilter === "ONE_STOP") return hopCount === 2;
        if (selectedStopsFilter === "MULTI_STOP") return hopCount >= 3;
        return true;
      });
    }

    if (sortByFilter === "CHEAPEST") result.sort((a: any, b: any) => a.totalCost - b.totalCost);
    else if (sortByFilter === "FASTEST") result.sort((a: any, b: any) => a.totalDuration - b.totalDuration);
    else result.sort((a: any, b: any) => (a.totalCost * 0.4 + a.totalDuration * 0.6) - (b.totalCost * 0.4 + b.totalDuration * 0.6));

    return result;
  }, [journeys, selectedModeFilter, priceRange, selectedTimeFilter, selectedModesList, selectedStopsFilter, sortByFilter]);

  const modeCounts = useMemo(() => {
    const counts = { FLIGHT: 0, TRAIN: 0, BUS: 0, CAB: 0 };
    journeys.forEach((j: any) => {
      const uniqueModes = new Set<string>();
      j.segments.forEach((s: Segment) => {
        let m: string = s.mode;
        if (m === "WALK" || m === "AUTO" || m === "SHUTTLE") m = "CAB";
        uniqueModes.add(m);
      });
      uniqueModes.forEach(m => {
        if (m in counts) counts[m as keyof typeof counts]++;
      });
    });
    return counts;
  }, [journeys]);

  const toggleModeCheckbox = (mode: string) => {
    setSelectedModesList(prev =>
      prev.includes(mode) ? prev.filter(m => m !== mode) : [...prev, mode]
    );
  };

  const getHubCoords = (name: string): [number, number] => {
    const pos = nodePositions[name];
    return pos ? [pos.x, pos.y] : [400, 300];
  };

  const getCurvedPath = (x1: number, y1: number, x2: number, y2: number, index = 0) => {
    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2;
    const dx = x2 - x1, dy = y2 - y1;
    const len = Math.hypot(dx, dy) || 1;
    const nx = -dy / len, ny = dx / len;
    const offset = index * 25;
    return `M ${x1} ${y1} Q ${midX + nx * offset} ${midY + ny * offset} ${x2} ${y2}`;
  };

  const formatTime = (isoString?: string) => {
    if (!isoString) return "08:00";
    try {
      return new Date(isoString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    } catch { return "08:00"; }
  };

  return (
    <div className="min-h-screen font-sans overflow-hidden pb-16 relative pt-4 md:pt-8 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">

      {/* ── HEADER ── */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-end gap-4">

          <div className="flex items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-2xl p-1 shadow-sm self-start lg:self-center">
            <button
              onClick={() => setActiveView("TICKET_LIST")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all font-bold text-xs uppercase cursor-pointer border-0 ${
                activeView === "TICKET_LIST" ? 'bg-rose-500 text-white shadow-md' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white bg-transparent'
              }`}
            >
              <ListFilter size={14} /> Ticket List View
            </button>
            <button
              onClick={() => setActiveView("MAP_GRAPH")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all font-bold text-xs uppercase cursor-pointer border-0 ${
                activeView === "MAP_GRAPH" ? 'bg-rose-500 text-white shadow-md' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white bg-transparent'
              }`}
            >
              <Map size={14} /> Mind Map Graph
            </button>
          </div>
        </div>
      </div>



      {/* ── VALIDATION ERRORS ── */}
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
                {validationErrors.map((err: string, idx: number) => <li key={idx}>{err}</li>)}
              </ul>
            </div>
          </motion.div>
        </div>
      )}

      {/* ── TICKET LIST VIEW ── */}
      {activeView === "TICKET_LIST" && (
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {!hasSearchParams ? (
            renderWelcomeDashboard()
          ) : (
            <>

          {/* Top Mode Filter Pills */}
          <div className="flex flex-wrap items-center gap-3 border-b border-slate-200/60 dark:border-white/5 pb-5 mb-6 text-xs font-bold text-slate-500 dark:text-slate-400">
            <span className="uppercase tracking-widest text-[10px] font-black mr-2">Filter by:</span>
            {[
              { id: "ALL", label: "All", icon: null },
              { id: "FLIGHT", label: "Flight", icon: <Plane size={13} /> },
              { id: "TRAIN", label: "Train", icon: <Train size={13} /> },
              { id: "BUS", label: "Bus", icon: <Bus size={13} /> },
              { id: "CAB", label: "Car / Cab", icon: <Navigation size={13} className="rotate-45" /> },
            ].map(({ id, label, icon }) => (
              <button
                key={id}
                onClick={() => setSelectedModeFilter(id)}
                className={`flex items-center gap-1.5 px-5 py-2.5 rounded-full transition-all cursor-pointer border-0 font-bold ${
                  selectedModeFilter === id ? 'bg-rose-500 text-white shadow-sm' : 'bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 hover:text-slate-800'
                }`}
              >
                {icon} {label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* LEFT SIDEBAR */}
            <div className="lg:col-span-3 space-y-6">

              {/* Price Range */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-3xl p-5 shadow-xs">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-4">Price Range</h3>
                <div className="flex justify-between items-center text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">
                  <span>₹0</span>
                  <span className="text-rose-500 font-extrabold text-sm">₹{priceRange.toLocaleString()}</span>
                </div>
                <input
                  type="range" min="0"
                  max={journeys.length > 0 ? Math.max(...journeys.map((j: any) => j.totalCost), 10000) : 10000}
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full accent-rose-500 cursor-pointer"
                />
              </div>

              {/* Departure Time */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-3xl p-5 shadow-xs">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-4">Departure Time</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: "EARLY_MORNING", label: "Early Morning", sub: "12AM - 6AM" },
                    { id: "MORNING", label: "Morning", sub: "6AM - 12PM" },
                    { id: "AFTERNOON", label: "Afternoon", sub: "12PM - 6PM" },
                    { id: "EVENING", label: "Evening", sub: "6PM - 12AM" },
                  ].map(({ id, label, sub }) => (
                    <button
                      key={id}
                      onClick={() => setSelectedTimeFilter(selectedTimeFilter === id ? "ALL" : id)}
                      className={`flex flex-col items-center gap-1 p-3 rounded-2xl border transition-all cursor-pointer text-center bg-transparent ${
                        selectedTimeFilter === id
                          ? 'border-rose-500 text-rose-500 font-black'
                          : 'border-slate-200 dark:border-slate-800 text-slate-500 hover:border-slate-300'
                      }`}
                    >
                      <span className="text-xs font-extrabold">{label}</span>
                      <span className="text-[8px] font-bold text-slate-400 uppercase">{sub}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Transport Mode */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-3xl p-5 shadow-xs">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-4">Transport Mode</h3>
                <div className="space-y-3">
                  {[
                    { id: "FLIGHT", label: "Flight", icon: <Plane size={14} />, count: modeCounts.FLIGHT },
                    { id: "TRAIN", label: "Train", icon: <Train size={14} />, count: modeCounts.TRAIN },
                    { id: "BUS", label: "Bus", icon: <Bus size={14} />, count: modeCounts.BUS },
                    { id: "CAB", label: "Car / Cab", icon: <Navigation size={14} className="rotate-45" />, count: modeCounts.CAB },
                  ].map((mode) => (
                    <label key={mode.id} className="flex items-center justify-between cursor-pointer group text-xs font-bold text-slate-600 dark:text-slate-300">
                      <div className="flex items-center gap-2.5">
                        <input type="checkbox" checked={selectedModesList.includes(mode.id)} onChange={() => toggleModeCheckbox(mode.id)} className="accent-rose-500 w-4 h-4 cursor-pointer" />
                        <span className="flex items-center gap-1.5 group-hover:text-rose-500 transition-colors">{mode.icon} {mode.label}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md font-bold">{mode.count}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Stops */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-3xl p-5 shadow-xs">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-4">Stops</h3>
                <div className="space-y-3">
                  {[
                    { id: "ALL", label: "All connections" },
                    { id: "NON_STOP", label: "Non-stop (Direct)" },
                    { id: "ONE_STOP", label: "1 Stop" },
                    { id: "MULTI_STOP", label: "2+ Stops" },
                  ].map((stop) => (
                    <label key={stop.id} className="flex items-center gap-2.5 cursor-pointer text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-rose-500 transition-colors">
                      <input type="radio" name="stopsFilter" checked={selectedStopsFilter === stop.id} onChange={() => setSelectedStopsFilter(stop.id)} className="accent-rose-500 w-4 h-4 cursor-pointer" />
                      <span>{stop.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT LISTINGS */}
            <div className="lg:col-span-9 space-y-5">

              <div className="flex justify-between items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 p-4 rounded-2xl shadow-xs">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                  <span className="text-rose-500 font-extrabold">{filteredJourneys.length}</span> routes found
                </span>
                <div className="flex items-center gap-2">
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

              <div className="space-y-5">
                {isSearching ? (
                  <div className="space-y-5">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-white/5 rounded-3xl p-6 animate-pulse relative overflow-hidden flex flex-col gap-6">
                        <div className="flex justify-between items-center pb-2">
                          <div className="w-24 h-4 bg-slate-200 dark:bg-slate-800 rounded-lg" />
                          <div className="w-16 h-6 bg-slate-200 dark:bg-slate-800 rounded-lg" />
                        </div>
                        <div className="flex items-center justify-between gap-4">
                          <div className="space-y-2">
                            <div className="w-16 h-6 bg-slate-200 dark:bg-slate-800 rounded-lg" />
                            <div className="w-10 h-3 bg-slate-200 dark:bg-slate-800 rounded-lg" />
                          </div>
                          <div className="flex-1 flex flex-col items-center gap-2">
                            <div className="w-32 h-4 bg-slate-200 dark:bg-slate-800 rounded-lg" />
                            <div className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-full" />
                          </div>
                          <div className="space-y-2 text-right">
                            <div className="w-16 h-6 bg-slate-200 dark:bg-slate-800 rounded-lg" />
                            <div className="w-10 h-3 bg-slate-200 dark:bg-slate-800 rounded-lg" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : filteredJourneys.length > 0 ? (
                  filteredJourneys.map((jrn: any, index: number) => {
                    const tagConfigs = [
                      { label: "AI RECOMMENDED — BEST VALUE ROUTE", style: "bg-rose-500" },
                      { label: "FASTEST CONNECTION", style: "bg-cyan-500" },
                      { label: "BUDGET PICK", style: "bg-emerald-600" },
                    ];
                    const tag = tagConfigs[index];

                    return (
                      <div
                        key={index}
                        onClick={() => setSelectedJourneyIndex(index)}
                        className={`bg-white dark:bg-slate-900 border rounded-3xl transition-all duration-300 cursor-pointer shadow-xs hover:shadow-md relative overflow-hidden flex flex-col ${
                          index === selectedJourneyIndex ? 'border-rose-500 shadow-md scale-[1.005]' : 'border-slate-200 dark:border-white/5 hover:border-slate-300'
                        }`}
                      >
                        {tag && (
                          <div className={`${tag.style} text-white font-black text-[9px] uppercase tracking-wider px-4 py-1.5 rounded-t-3xl flex items-center gap-1.5`}>
                            <Sparkles size={11} className="animate-pulse" /> {tag.label}
                          </div>
                        )}

                        <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                          <div className="md:col-span-8 flex items-center justify-between gap-4">
                            <div className="text-left space-y-1">
                              <span className="text-2xl font-black text-slate-800 dark:text-white leading-none">{formatTime(jrn.segments[0]?.departureTime)}</span>
                              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">{jrn.segments[0]?.fromHub.split(' ')[0]}</span>
                            </div>

                            <div className="flex-1 flex flex-col items-center gap-1 relative px-4">
                              <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-[1px] border-b border-dashed border-slate-300 dark:border-slate-700 z-0" />
                              <span className="text-[9px] font-black text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 border border-slate-200/50 dark:border-white/5 px-2 py-0.5 rounded-full flex items-center gap-1 z-10 mb-2">
                                <Clock size={10} /> {Math.floor(jrn.totalDuration / 60)}h {jrn.totalDuration % 60}m
                              </span>
                              <div className="flex items-center w-full justify-between relative px-2">
                                {jrn.segments.map((seg: Segment, sIdx: number) => (
                                  <React.Fragment key={sIdx}>
                                    {sIdx === 0 && (
                                      <div className="relative z-10 flex flex-col items-center">
                                        <span className="w-3 h-3 rounded-full bg-rose-500 border-2 border-white dark:border-slate-900 shadow-sm" />
                                        <span className="text-[8px] font-black text-slate-400 absolute top-4 whitespace-nowrap truncate max-w-[50px]">{seg.fromHub.split(' ')[0]}</span>
                                      </div>
                                    )}
                                    <div className="relative z-10 flex flex-col items-center">
                                      <span className="w-3 h-3 rounded-full bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 shadow-sm" />
                                      <span className="text-[8px] font-black text-slate-400 absolute top-4 whitespace-nowrap truncate max-w-[50px]">{seg.toHub.split(' ')[0]}</span>
                                    </div>
                                  </React.Fragment>
                                ))}
                              </div>
                            </div>

                            <div className="text-right space-y-1">
                              <span className="text-2xl font-black text-slate-800 dark:text-white leading-none">{formatTime(jrn.segments[jrn.segments.length - 1]?.arrivalTime)}</span>
                              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">{jrn.segments[jrn.segments.length - 1]?.toHub.split(' ')[0]}</span>
                            </div>
                          </div>

                          <div className="md:col-span-4 border-t md:border-t-0 md:border-l border-slate-200/60 dark:border-white/5 pt-4 md:pt-0 md:pl-6 flex flex-row md:flex-col justify-between md:justify-center items-center md:items-end gap-3">
                            <div className="text-left md:text-right space-y-0.5">
                              <div className="text-2xl font-black text-slate-900 dark:text-white leading-none">₹{jrn.totalCost.toLocaleString()}</div>
                              <div className="text-[9px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">per passenger</div>
                            </div>
                            {(() => {
                              const segmentRouteIds = jrn.segments.map((s: Segment) => s.routeId).filter(Boolean);
                              const firstSeg = jrn.segments[0];
                              const firstSegSlug = firstSeg?.slug || firstSeg?.routeId;
                              const detailsUrl = `/travel-routes/${firstSegSlug || ""}?segments=${segmentRouteIds.join(',')}`;
                              return (
                                <a
                                  href={detailsUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="px-6 py-3.5 bg-rose-500 hover:bg-rose-600 text-white font-black text-xs uppercase tracking-wider rounded-2xl cursor-pointer shadow-md transition-all active:scale-95 border-0 no-underline text-center"
                                >
                                  Select & Book
                                </a>
                              );
                            })()}
                          </div>
                        </div>

                        <div className="px-6 pb-5 border-t border-slate-100 dark:border-white/5 pt-3 flex flex-wrap gap-4 items-center justify-between text-[11px] font-bold text-slate-400 dark:text-slate-500 bg-slate-50/50 dark:bg-slate-950/20 rounded-b-3xl">
                          <div className="flex flex-wrap items-center gap-4">
                            <span className="flex items-center gap-1">
                              🎫 <span className="text-slate-600 dark:text-slate-300">{jrn.segments.map((s: Segment) => s.operator).filter(Boolean).join(' ➔ ') || "Standard Service"}</span>
                            </span>
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-white/10" />
                            <span className="flex items-center gap-1">🛣️ <span className="text-slate-600 dark:text-slate-300">{jrn.totalDistance} km</span></span>
                          </div>



                          <div className="flex items-center gap-2">
                            {Array.from(new Set(jrn.segments.map((s: Segment) => s.mode))).map((m: any) => (
                              <span key={m} className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider border
                                ${m === 'FLIGHT' ? 'bg-cyan-500/10 border-cyan-500/20 text-cyan-500' : ''}
                                ${m === 'TRAIN' ? 'bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-500' : ''}
                                ${m === 'BUS' ? 'bg-blue-500/10 border-blue-500/20 text-blue-500' : ''}
                                ${m === 'CAB' ? 'bg-rose-500/10 border-rose-500/20 text-rose-500' : ''}
                              `}>{m}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-8 md:p-12 text-center bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200 dark:border-white/5 rounded-[2.5rem] shadow-xl relative overflow-hidden"
                  >
                    <div className="absolute -right-20 -top-20 w-48 h-48 rounded-full bg-rose-500/5 blur-3xl" />
                    <div className="absolute -left-20 -bottom-20 w-48 h-48 rounded-full bg-indigo-500/5 blur-3xl" />
                    
                    <div className="w-16 h-16 mx-auto rounded-full bg-rose-500/10 flex items-center justify-center text-rose-500 shadow-inner mb-6 relative">
                      <AlertCircle className="animate-bounce" size={28} />
                      <div className="absolute inset-0 rounded-full border border-rose-500/20 animate-ping" />
                    </div>
                    
                    <h3 className="text-xl font-black text-slate-800 dark:text-white mb-2">
                      No Feasible Paths Found
                    </h3>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-6">
                      matching your active filter selection
                    </p>
                    
                    <div className="max-w-md mx-auto bg-slate-50 dark:bg-slate-950/40 border border-slate-200/60 dark:border-white/5 rounded-2xl p-5 mb-8 text-left space-y-4 text-xs font-bold text-slate-600 dark:text-slate-300">
                      <p className="leading-relaxed">
                        We scanned all Himalayan flight routes, toy trains, local bus systems, and auto transfers, but couldn't find a path matching your filters.
                      </p>
                      
                      {/* Interactive Transfers Pill Bar inside empty state */}
                      <div className="space-y-2 border-t border-slate-200/50 dark:border-white/5 pt-3">
                        <label className="text-[10px] text-slate-400 uppercase tracking-wider block font-black">
                          Try increasing In-between Stops (Max Transfers)
                        </label>
                        <div className="flex gap-2">
                          {[1, 2, 3, 4].map((hops) => {
                            const isSelected = preferences.maxTransfers === hops;
                            return (
                              <button
                                key={hops}
                                type="button"
                                onClick={() => {
                                  setPreferences(prev => ({ ...prev, maxTransfers: hops }));
                                  searchJourneys({
                                    sourceCityId: searchParams.sourceCityId,
                                    destinationCityId: searchParams.destinationCityId,
                                    travelDate: searchParams.travelDate,
                                    passengers: searchParams.passengers,
                                    preferences: { ...preferences, maxTransfers: hops }
                                  });
                                }}
                                className={`px-4 py-2 text-xs font-black rounded-xl border transition-all cursor-pointer ${
                                  isSelected
                                    ? 'bg-rose-500 text-white border-rose-500 shadow-md'
                                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-500 hover:border-rose-500'
                                }`}
                              >
                                {hops} {hops === 1 ? 'Stop' : 'stops'}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Popular shortcut recommendations */}
                    <div className="space-y-4">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
                        Or jump to an active Corridor network in 1-Click
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
                        <button
                          type="button"
                          onClick={() => triggerQuickSearch(delhiCity?._id || "", shimlaCity?._id || "")}
                          className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 hover:border-rose-500 rounded-2xl text-left cursor-pointer transition-all flex flex-col gap-1.5 shadow-sm group border-0 bg-transparent"
                        >
                          <span className="text-xs font-black text-slate-800 dark:text-white flex items-center gap-1.5 group-hover:text-rose-500">
                            Delhi <Bus size={12} className="text-rose-500" /> Shimla
                          </span>
                          <span className="text-[9px] font-bold text-slate-400">Volvo Buses & Air Commuters</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => triggerQuickSearch(chdCity?._id || "", shimlaCity?._id || "")}
                          className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 hover:border-rose-500 rounded-2xl text-left cursor-pointer transition-all flex flex-col gap-1.5 shadow-sm group border-0 bg-transparent"
                        >
                          <span className="text-xs font-black text-slate-800 dark:text-white flex items-center gap-1.5 group-hover:text-rose-500">
                            Chandigarh <Train size={12} className="text-amber-500" /> Shimla
                          </span>
                          <span className="text-[9px] font-bold text-slate-400">High-Altitude Toy Train Rail</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )}

      {/* ── MAP GRAPH VIEW ── */}
      {activeView === "MAP_GRAPH" && (
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {!hasSearchParams ? (
            renderWelcomeDashboard()
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          <div className="lg:col-span-5 space-y-5">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
              Journey Engine returned {journeys.length} paths
            </span>

            <div className="space-y-4 max-h-[650px] overflow-y-auto">
              {journeys.length > 0 ? (
                journeys.map((jrn: any, index: number) => {
                  const isActive = index === selectedJourneyIndex;
                  const transitTag = index === 0 ? "RECOMMENDED" : jrn.totalCost < 1000 ? "CHEAPEST" : "FASTEST";

                  return (
                    <div
                      key={index}
                      onClick={() => setSelectedJourneyIndex(index)}
                      className={`relative p-5 rounded-[2rem] border transition-all duration-300 cursor-pointer group hover:scale-[1.01] ${
                        isActive ? 'bg-white dark:bg-slate-900 border-rose-500 shadow-xl' : 'bg-white/45 dark:bg-slate-900/45 border-slate-200/60 dark:border-white/5'
                      }`}
                    >
                      <div className="flex justify-between items-start gap-4 mb-4">
                        <div>
                          <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border
                            ${transitTag === 'RECOMMENDED' ? 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20' : ''}
                            ${transitTag === 'FASTEST' ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20' : ''}
                            ${transitTag === 'CHEAPEST' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' : ''}
                          `}>{transitTag}</span>
                          <h3 className="text-sm font-black text-slate-800 dark:text-white mt-2 group-hover:text-rose-500 transition-colors">
                            {jrn.segments.length > 1 ? `Multi-Modal Connection (${jrn.segments.length - 1} transfers)` : "Direct Transit Path"}
                          </h3>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-black text-slate-800 dark:text-white">₹{jrn.totalCost}</div>
                          <div className="text-[9px] text-slate-500 font-bold">Total price</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 bg-slate-50 dark:bg-slate-950/60 p-3 rounded-2xl border border-slate-200/50 dark:border-white/5 mb-4 text-xs font-bold text-slate-600 dark:text-slate-300">
                        <div className="flex items-center gap-2"><Clock size={13} className="text-rose-500" /><span>{Math.floor(jrn.totalDuration / 60)}h {jrn.totalDuration % 60}m</span></div>
                        <div className="flex items-center gap-2"><Map size={13} className="text-rose-500" /><span>{jrn.totalDistance} Km</span></div>
                      </div>

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
                              ${seg.mode === 'FLIGHT' ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-500' : ''}
                              ${seg.mode === 'TRAIN' ? 'bg-amber-500/20 border-amber-500/40 text-amber-500' : ''}
                              ${seg.mode === 'BUS' ? 'bg-blue-500/20 border-blue-500/40 text-blue-500' : ''}
                              ${seg.mode === 'CAB' ? 'bg-rose-500/20 border-rose-500/40 text-rose-500' : ''}
                              ${seg.mode === 'WALK' ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-600' : ''}
                              ${seg.mode === 'AUTO' ? 'bg-amber-500/20 border-amber-500/40 text-amber-500' : ''}
                              ${seg.mode === 'SHUTTLE' ? 'bg-blue-500/20 border-blue-500/40 text-blue-500' : ''}
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
                                <span className="text-slate-500">₹{seg.price}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="mt-5 pt-5 border-t border-slate-200 dark:border-white/5 overflow-hidden"
                        >
                          <div className="flex flex-col gap-2">
                            {(() => {
                              const segmentRouteIds = jrn.segments.map((s: Segment) => s.routeId).filter(Boolean);
                              const firstSeg = jrn.segments[0];
                              const firstSegSlug = firstSeg?.slug || firstSeg?.routeId;
                              if (!firstSegSlug) return null;
                              return (
                                <a
                                  href={`/travel-routes/${firstSegSlug}?segments=${segmentRouteIds.join(',')}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="flex items-center justify-between w-full px-5 py-4 bg-gradient-to-r from-rose-500 to-indigo-600 hover:from-rose-600 hover:to-indigo-700 border-0 text-[11px] font-black uppercase tracking-widest rounded-2xl cursor-pointer transition-all text-white shadow-md hover:shadow-lg no-underline"
                                >
                                  <span className="flex items-center gap-2">
                                    <Sparkles size={14} className="animate-pulse" />
                                    View Journey Details & Book
                                  </span>
                                  <ChevronRight size={14} className="text-white" />
                                </a>
                              );
                            })()}
                          </div>
                        </motion.div>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="p-8 text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-[2rem] text-slate-500 italic space-y-4">
                  <AlertCircle size={24} className="mx-auto text-rose-500 mb-2" />
                  <div className="font-extrabold text-slate-800 dark:text-white">No active paths loaded.</div>
                  <div className="text-xs text-slate-400 font-medium">Use the inline search panel above or try our popular intercity networks.</div>
                  
                  <div className="flex flex-col gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => triggerQuickSearch(delhiCity?._id || "", shimlaCity?._id || "")}
                      className="w-full py-3.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/5 rounded-xl text-[10px] font-black uppercase tracking-wider text-rose-500 hover:bg-rose-50 cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Bus size={12} /> Delhi ➔ Shimla Corridor
                    </button>
                    <button
                      type="button"
                      onClick={() => triggerQuickSearch(chdCity?._id || "", shimlaCity?._id || "")}
                      className="w-full py-3.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/5 rounded-xl text-[10px] font-black uppercase tracking-wider text-amber-500 hover:bg-amber-50 cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Train size={12} /> Chandigarh ➔ Shimla Corridor
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* SVG MAP */}
          <div className="lg:col-span-7 bg-white/70 dark:bg-slate-900/25 border border-slate-200/50 dark:border-white/5 rounded-[3rem] p-6 shadow-xl relative overflow-hidden h-[650px] flex flex-col backdrop-blur-xl">
            <div className="absolute top-6 left-6 z-10 pointer-events-none space-y-1.5">
              <div className="flex items-center gap-2 bg-white/95 dark:bg-slate-950/80 backdrop-blur-md px-3 py-2 rounded-xl border border-slate-200/50 dark:border-white/5 shadow-md">
                <Map className="text-rose-500 animate-pulse" size={14} />
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-300">Geospatial Path Visualizer</span>
              </div>
              <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400">Active Himalayan Network Cluster Map</div>
            </div>

            <div className="absolute bottom-6 right-6 z-10 flex bg-white/90 dark:bg-slate-950/90 backdrop-blur-md p-1.5 rounded-xl border border-slate-200 dark:border-white/5 shadow-md gap-1">
              <button onClick={() => setZoom(z => Math.min(2, z + 0.15))} className="w-8 h-8 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500 dark:text-slate-400 transition-all border-0 bg-transparent cursor-pointer font-bold">+</button>
              <button onClick={() => setZoom(z => Math.max(0.6, z - 0.15))} className="w-8 h-8 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500 dark:text-slate-400 transition-all border-0 bg-transparent cursor-pointer font-bold">-</button>
              <button onClick={() => { setPan({ x: 20, y: -20 }); setZoom(1); }} className="w-8 h-8 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500 dark:text-slate-400 transition-all border-0 bg-transparent cursor-pointer">⟲</button>
            </div>

            <div className="flex-1 w-full h-full relative overflow-hidden rounded-[2.25rem] bg-slate-50 dark:bg-slate-950/40">
              <svg className="w-full h-full" viewBox="0 0 800 600">
                <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}>
                  {hubs.map((hubA: any, i: number) =>
                    hubs.slice(i + 1).map((hubB: any) => {
                      const isActive = activeJourney?.segments.some((s: Segment) =>
                        (s.fromHub === hubA.name && s.toHub === hubB.name) ||
                        (s.fromHub === hubB.name && s.toHub === hubA.name)
                      );
                      if (isActive) return null;
                      const [ax, ay] = getHubCoords(hubA.name);
                      const [bx, by] = getHubCoords(hubB.name);
                      return (
                        <path key={`${hubA._id}-${hubB._id}-base`} d={getCurvedPath(ax, ay, bx, by, 1)}
                          fill="none" stroke="rgba(148,163,184,0.15)" strokeWidth="1.5" strokeDasharray="4 4" />
                      );
                    })
                  )}

                  {activeJourney?.segments.map((seg: Segment, index: number) => {
                    const [sx, sy] = getHubCoords(seg.fromHub);
                    const [dx, dy] = getHubCoords(seg.toHub);
                    const isHovered = hoveredSegment === seg;
                    const path = getCurvedPath(sx, sy, dx, dy, index + 1);
                    const colors: Record<string, string> = { FLIGHT: "#22d3ee", TRAIN: "#f59e0b", CAB: "#f43f5e", WALK: "#10b981", AUTO: "#eab308", SHUTTLE: "#3b82f6", BUS: "#3b82f6" };
                    const edgeColor = colors[seg.mode] || "#3b82f6";
                    return (
                      <g key={index} className="cursor-pointer">
                        <path d={path} fill="none" stroke={edgeColor} strokeWidth={isHovered ? "8" : "4"} strokeOpacity={isHovered ? "0.4" : "0.15"} className="transition-all duration-300" />
                        <path d={path} fill="none" stroke={edgeColor} strokeWidth="2.5" />
                        <path d={path} fill="none" stroke={edgeColor} strokeWidth="4" strokeDasharray="8,30" className="opacity-75" style={{ animation: "dash 4s linear infinite" }} />
                      </g>
                    );
                  })}

                  {Object.entries(cityClusters).map(([cityName, cluster]) => (
                    <g key={cityName} className="opacity-30">
                      <circle cx={cluster.x} cy={cluster.y} r="60" fill="rgba(99,102,241,0.01)" stroke="rgba(148,163,184,0.2)" strokeWidth="1.5" />
                      <text x={cluster.x} y={cluster.y + 75} textAnchor="middle" fill="rgba(148,163,184,0.5)" fontSize="8" fontWeight="900">
                        {cityName} ZONE
                      </text>
                    </g>
                  ))}

                  {hubs.map((hub: any) => {
                    const isHubActive = activeJourney?.segments.some((s: Segment) => s.fromHub === hub.name || s.toHub === hub.name);
                    const [cx, cy] = getHubCoords(hub.name);
                    const dotColors: Record<string, string> = { AIRPORT: '#22d3ee', RAILWAY_STATION: '#f59e0b', BUS_STAND: '#3b82f6' };
                    return (
                      <g key={hub._id} transform={`translate(${cx}, ${cy})`} className="cursor-pointer">
                        <circle r={isHubActive ? "11" : "8"} fill="white" stroke={isHubActive ? "#f43f5e" : "rgba(148,163,184,0.4)"} strokeWidth={isHubActive ? "2.5" : "1.5"} className="transition-all" />
                        <circle r="4" fill={dotColors[hub.type] || '#f43f5e'} />
                        <text y="-15" textAnchor="middle" fontSize="8" fontWeight={isHubActive ? "900" : "600"} fill={isHubActive ? "#0f172a" : "#94a3b8"} className="pointer-events-none uppercase">
                          {hub.name.split(' ')[0]}
                        </text>
                      </g>
                    );
                  })}
                </g>
              </svg>

              <AnimatePresence>
                {hoveredSegment && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="absolute bottom-6 left-6 right-6 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border border-slate-200 dark:border-white/10 p-4 rounded-2xl shadow-xl flex items-center justify-between text-xs text-slate-800 dark:text-white"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-500">
                        {hoveredSegment.mode === 'FLIGHT' && <Plane size={14} />}
                        {hoveredSegment.mode === 'TRAIN' && <Train size={14} />}
                        {hoveredSegment.mode === 'BUS' && <Bus size={14} />}
                        {hoveredSegment.mode === 'CAB' && <Navigation size={14} />}
                      </div>
                      <div>
                        <div className="font-black">{hoveredSegment.operator || "Local Transit"}</div>
                        <div className="text-[10px] text-slate-400 font-bold">{hoveredSegment.vehicle || hoveredSegment.mode}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-extrabold">{hoveredSegment.distanceKm} Km | {hoveredSegment.durationMin} mins</div>
                      <div className="text-rose-500 font-black">₹{hoveredSegment.price}</div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <style jsx global>{`@keyframes dash { to { stroke-dashoffset: -100; } }`}</style>
          </div>
        </div>
      )}
    </div>
  )}


    </div>
  );
}

// ── Default export wraps inner component in Suspense for useSearchParams() ──
export default function TransportationRoutesExplorer() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center dark:bg-slate-950">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-full border-4 border-rose-500/30 border-t-rose-500 animate-spin" />
          <span className="text-xs font-black uppercase tracking-widest text-slate-400">Loading Routes...</span>
        </div>
      </div>
    }>
      <TransportationRoutesExplorerInner />
    </Suspense>
  );
}