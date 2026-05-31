"use client";
import React from 'react';
import { UserCircle, Calendar, Route, MapPin, Activity, Package, Hotel, Sparkles, Bus } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useHeroContent, useSearchState } from '@/hooks/useHome';
import { useQuery } from '@tanstack/react-query';
import { getActiveLocations } from '@/services/cities.services';

interface SearchComponentProps {
  searchData: any;
  setSearchData: any;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleSearchSubmit: (e: React.FormEvent) => void;
  router: any;
  pathname: string;
  currentHero?: any;
}

// ─── Sub-Components moved outside to prevent re-creation & focus loss ───────────

// AI Search Bar for home page
const AISearchBar = ({ searchData, setSearchData, handleSearchChange, handleSearchSubmit, router, currentHero }: SearchComponentProps) => (
  <div className="max-w-4xl mx-auto p-4 sm:p-8">
    <div className="text-center mb-6 sm:mb-8">
      <h1 className="text-2xl sm:text-3xl md:text-5xl font-black text-slate-800 mb-3 sm:mb-4">
        {currentHero?.title || "Where would you like to go?"}
      </h1>
      <p className="text-sm sm:text-base md:text-lg text-slate-600">
        {currentHero?.tagline || "Ask anything - we'll help you plan the perfect trip"}
      </p>
    </div>

    <div className="relative">
      <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 bg-white border border-gray-200 sm:border-2 rounded-3xl sm:rounded-full p-3 sm:p-4 shadow-2xl hover:border-rose-500 transition-all">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <Sparkles className="text-rose-500 ml-1 shrink-0 hidden sm:block" size={20} />
          <input
            type="text"
            name="query"
            value={searchData.query}
            onChange={handleSearchChange}
            placeholder={currentHero?.searchBarPrompt || "Try: 'Beach destinations in Thailand under $1000' or 'Weekend getaway from Delhi'"}
            className="flex-1 text-base sm:text-lg outline-none text-slate-700 placeholder:text-slate-400 min-w-0 bg-transparent border-0 focus:ring-0"
          />
        </div>
        <button
          type="submit"
          className="bg-linear-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white px-6 sm:px-8 py-3 rounded-full font-bold shadow-lg transition-all active:scale-95 text-sm sm:text-base cursor-pointer shrink-0 border-0"
        >
          Ask AI
        </button>
      </form>
    </div>

    {/* Quick suggestions */}
    <div className="mt-6 flex flex-wrap justify-center gap-3">
      <span className="text-xs font-bold text-slate-400 uppercase self-center">Popular:</span>
      {(currentHero?.categories || ['Beaches', 'Mountains', 'Adventure', 'Romantic', 'Family Trip']).map((tag: string) => (
        <button
          key={tag}
          type="button"
          onClick={() => {
            setSearchData((prev: any) => ({ ...prev, query: tag }));
            const params = new URLSearchParams();
            params.set("query", tag);
            router.push(`/packages?${params.toString()}`);
          }}
          className="px-4 py-2 bg-slate-100 hover:bg-rose-50 hover:text-rose-600 rounded-full text-sm font-semibold text-slate-600 transition-all cursor-pointer border-0"
        >
          {tag}
        </button>
      ))}
    </div>
  </div>
);

// Destinations Search
const DestinationsSearch = ({ searchData, setSearchData, handleSearchChange, handleSearchSubmit, router, pathname }: SearchComponentProps) => (
  <div className="p-4 sm:p-8">
    <h2 className="text-2xl sm:text-3xl font-black text-slate-800 mb-6 flex items-center gap-3">
      <MapPin className="text-rose-500 shrink-0" size={24} /> Explore Destinations
    </h2>

    <form onSubmit={handleSearchSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-4 border border-gray-200 rounded-2xl mb-6 bg-white overflow-hidden shadow-sm">
        {/* DESTINATION */}
        <div className="p-4 border-b md:border-b-0 md:border-r border-gray-200 hover:bg-slate-50 transition-colors flex flex-col justify-between min-h-[96px]">
          <label className="text-xs font-bold text-slate-400 uppercase block mb-1">Destination</label>
          <input
            type="text"
            name="query"
            value={searchData.query}
            onChange={handleSearchChange}
            placeholder="City, country, or region"
            className="w-full text-xl sm:text-2xl font-black text-slate-800 bg-transparent border-0 outline-none p-0 focus:ring-0 placeholder:text-slate-300"
          />
          <p className="text-[10px] text-slate-400 mt-1">Where to explore</p>
        </div>

        {/* TRAVEL DATES */}
        <div className="p-4 border-b md:border-b-0 md:border-r border-gray-200 hover:bg-slate-50 transition-colors flex flex-col justify-between min-h-[96px]">
          <label className="text-xs font-bold text-slate-400 uppercase flex items-center gap-1 mb-1">When <Calendar size={12} /></label>
          <input
            type="text"
            name="date"
            value={searchData.date}
            onChange={handleSearchChange}
            placeholder="Flexible / Dates"
            className="w-full text-xl sm:text-2xl font-black text-slate-800 bg-transparent border-0 outline-none p-0 focus:ring-0 placeholder:text-slate-300"
          />
          <p className="text-[10px] text-slate-400 mt-1">Choose travel season</p>
        </div>

        {/* DURATION */}
        <div className="p-4 border-b md:border-b-0 md:border-r border-gray-200 hover:bg-slate-50 transition-colors flex flex-col justify-between min-h-[96px]">
          <label className="text-xs font-bold text-slate-400 uppercase block mb-1">Duration</label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              name="duration"
              value={searchData.duration}
              onChange={handleSearchChange}
              placeholder="7"
              className="w-full text-xl sm:text-2xl font-black text-slate-800 bg-transparent border-0 outline-none p-0 focus:ring-0 placeholder:text-slate-300"
            />
            <span className="text-lg font-bold text-slate-800 shrink-0">Days</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1">Adjust trip duration</p>
        </div>

        {/* TRAVELERS */}
        <div className="p-4 hover:bg-slate-50 transition-colors flex flex-col justify-between min-h-[96px]">
          <label className="text-xs font-bold text-slate-400 uppercase flex items-center gap-1 mb-1">Travelers <UserCircle size={12} /></label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              name="travelers"
              min="1"
              max="20"
              value={searchData.travelers}
              onChange={handleSearchChange}
              placeholder="2"
              className="w-full text-xl sm:text-2xl font-black text-slate-800 bg-transparent border-0 outline-none p-0 focus:ring-0 placeholder:text-slate-300"
            />
            <span className="text-lg font-bold text-slate-800 shrink-0">Adults</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1">Add guest count</p>
        </div>
      </div>

      {/* Destination Type */}
      <div className="flex flex-wrap items-center gap-3 mb-8">
        <span className="text-[10px] font-black text-slate-500 uppercase mr-1">I&apos;m looking for</span>
        {['Beach', 'Mountains', 'City', 'Wildlife', 'Heritage', 'Adventure'].map((type) => {
          const isActive = searchData.category?.toLowerCase() === type.toLowerCase();
          return (
            <button
              key={type}
              type="button"
              onClick={() => {
                const nextCategory = isActive ? "" : type;
                setSearchData((prev: any) => ({ ...prev, category: nextCategory }));
                const params = new URLSearchParams(window.location.search);
                if (nextCategory) params.set("category", nextCategory);
                else params.delete("category");
                router.push(`${pathname}?${params.toString()}`);
              }}
              className={`px-4 py-2 border rounded-lg text-xs font-bold transition-all cursor-pointer ${
                isActive
                  ? 'bg-rose-500 text-white border-rose-500 shadow-md shadow-rose-200'
                  : 'bg-white text-slate-600 border-gray-200 hover:border-rose-500 hover:bg-rose-50'
              }`}
            >
              {type}
            </button>
          );
        })}
      </div>

      <div className="flex justify-center">
        <button type="submit" className="bg-linear-to-r from-blue-500 to-blue-600 hover:from-rose-500 hover:to-rose-600 text-white px-8 sm:px-20 py-3 sm:py-4 rounded-full text-lg sm:text-2xl font-black shadow-xl transition-all active:scale-95 uppercase tracking-widest cursor-pointer border-0">
          Explore
        </button>
      </div>
    </form>
  </div>
);

// Activities Search
const ActivitiesSearch = ({ searchData, setSearchData, handleSearchChange, handleSearchSubmit, router, pathname }: SearchComponentProps) => (
  <div className="p-4 sm:p-8">
    <h2 className="text-2xl sm:text-3xl font-black text-slate-800 mb-6 flex items-center gap-3">
      <Activity className="text-rose-500 shrink-0" size={24} /> Find Activities
    </h2>

    <form onSubmit={handleSearchSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-4 border border-gray-200 rounded-2xl mb-6 bg-white overflow-hidden shadow-sm">
        {/* LOCATION */}
        <div className="p-4 border-b md:border-b-0 md:border-r border-gray-200 hover:bg-slate-50 transition-colors flex flex-col justify-between min-h-[96px]">
          <label className="text-xs font-bold text-slate-400 uppercase block mb-1">Location</label>
          <input
            type="text"
            name="query"
            value={searchData.query}
            onChange={handleSearchChange}
            placeholder="Choose City"
            className="w-full text-xl sm:text-2xl font-black text-slate-800 bg-transparent border-0 outline-none p-0 focus:ring-0 placeholder:text-slate-300"
          />
          <p className="text-[10px] text-slate-400 mt-1">Where to explore</p>
        </div>

        {/* ACTIVITY TYPE */}
        <div className="p-4 border-b md:border-b-0 md:border-r border-gray-200 hover:bg-slate-50 transition-colors flex flex-col justify-between min-h-[96px]">
          <label className="text-xs font-bold text-slate-400 uppercase block mb-1">Activity</label>
          <input
            type="text"
            name="category"
            value={searchData.category}
            onChange={handleSearchChange}
            placeholder="All Types"
            className="w-full text-xl sm:text-2xl font-black text-slate-800 bg-transparent border-0 outline-none p-0 focus:ring-0 placeholder:text-slate-300"
          />
          <p className="text-[10px] text-slate-400 mt-1">Tours, experiences, etc.</p>
        </div>

        {/* DATE */}
        <div className="p-4 border-b md:border-b-0 md:border-r border-gray-200 hover:bg-slate-50 transition-colors flex flex-col justify-between min-h-[96px]">
          <label className="text-xs font-bold text-slate-400 uppercase flex items-center gap-1 mb-1">Date <Calendar size={12} /></label>
          <input
            type="text"
            name="date"
            value={searchData.date}
            onChange={handleSearchChange}
            placeholder="Select date"
            className="w-full text-xl sm:text-2xl font-black text-slate-800 bg-transparent border-0 outline-none p-0 focus:ring-0 placeholder:text-slate-300"
          />
          <p className="text-[10px] text-slate-400 mt-1">Activity date</p>
        </div>

        {/* GUESTS */}
        <div className="p-4 hover:bg-slate-50 transition-colors flex flex-col justify-between min-h-[96px]">
          <label className="text-xs font-bold text-slate-400 uppercase flex items-center gap-1 mb-1">Guests <UserCircle size={12} /></label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              name="travelers"
              min="1"
              max="20"
              value={searchData.travelers}
              onChange={handleSearchChange}
              placeholder="1"
              className="w-full text-xl sm:text-2xl font-black text-slate-800 bg-transparent border-0 outline-none p-0 focus:ring-0 placeholder:text-slate-300"
            />
            <span className="text-lg font-bold text-slate-800 shrink-0">People</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1">Add more guests</p>
        </div>
      </div>

      {/* Activity Categories */}
      <div className="flex flex-wrap items-center gap-3 mb-8">
        <span className="text-[10px] font-black text-slate-500 uppercase mr-1">Categories</span>
        {['Adventure', 'Culture', 'Food & Drink', 'Water Sports', 'Sightseeing', 'Wellness'].map((category) => {
          const isActive = searchData.category?.toLowerCase() === category.toLowerCase();
          return (
            <button
              key={category}
              type="button"
              onClick={() => {
                const nextCategory = isActive ? "" : category;
                setSearchData((prev: any) => ({ ...prev, category: nextCategory }));
                const params = new URLSearchParams(window.location.search);
                if (nextCategory) params.set("category", nextCategory);
                else params.delete("category");
                router.push(`${pathname}?${params.toString()}`);
              }}
              className={`px-4 py-2 border rounded-lg text-xs font-bold transition-all cursor-pointer ${
                isActive
                  ? 'bg-rose-500 text-white border-rose-500 shadow-md shadow-rose-200'
                  : 'bg-white text-slate-600 border-gray-200 hover:border-rose-500 hover:bg-rose-50'
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      <div className="flex justify-center">
        <button type="submit" className="bg-linear-to-r from-blue-500 to-blue-600 hover:from-rose-500 hover:to-rose-600 text-white px-8 sm:px-20 py-3 sm:py-4 rounded-full text-lg sm:text-2xl font-black shadow-xl transition-all active:scale-95 uppercase tracking-widest cursor-pointer border-0">
          Search Activities
        </button>
      </div>
    </form>
  </div>
);

// Packages Search
const PackagesSearch = ({ searchData, setSearchData, handleSearchChange, handleSearchSubmit, router, pathname }: SearchComponentProps) => (
  <div className="p-4 sm:p-8">
    <h2 className="text-2xl sm:text-3xl font-black text-slate-800 mb-6 flex items-center gap-3">
      <Package className="text-rose-500 shrink-0" size={24} /> Browse Packages
    </h2>

    <form onSubmit={handleSearchSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-5 border border-gray-200 rounded-2xl mb-6 bg-white overflow-hidden shadow-sm">
        {/* FROM */}
        <div className="p-4 border-b md:border-b-0 md:border-r border-gray-200 hover:bg-slate-50 transition-colors flex flex-col justify-between min-h-[96px]">
          <label className="text-xs font-bold text-slate-400 uppercase block mb-1">From</label>
          <input
            type="text"
            name="from"
            value={searchData.from}
            onChange={handleSearchChange}
            placeholder="Your City"
            className="w-full text-xl sm:text-2xl font-black text-slate-800 bg-transparent border-0 outline-none p-0 focus:ring-0 placeholder:text-slate-300"
          />
          <p className="text-[10px] text-slate-400 mt-1">Departure city</p>
        </div>

        {/* TO */}
        <div className="p-4 border-b md:border-b-0 md:border-r border-gray-200 hover:bg-slate-50 transition-colors flex flex-col justify-between min-h-[96px]">
          <label className="text-xs font-bold text-slate-400 uppercase block mb-1">To</label>
          <input
            type="text"
            name="query"
            value={searchData.query}
            onChange={handleSearchChange}
            placeholder="Destination"
            className="w-full text-xl sm:text-2xl font-black text-slate-800 bg-transparent border-0 outline-none p-0 focus:ring-0 placeholder:text-slate-300"
          />
          <p className="text-[10px] text-slate-400 mt-1">Package destination</p>
        </div>

        {/* DEPARTURE DATE */}
        <div className="p-4 border-b md:border-b-0 md:border-r border-gray-200 hover:bg-slate-50 transition-colors flex flex-col justify-between min-h-[96px]">
          <label className="text-xs font-bold text-slate-400 uppercase flex items-center gap-1 mb-1">Travel Date <Calendar size={12} /></label>
          <input
            type="text"
            name="date"
            value={searchData.date}
            onChange={handleSearchChange}
            placeholder="Flexible / Dates"
            className="w-full text-xl sm:text-2xl font-black text-slate-800 bg-transparent border-0 outline-none p-0 focus:ring-0 placeholder:text-slate-300"
          />
          <p className="text-[10px] text-slate-400 mt-1">Choose dates</p>
        </div>

        {/* DURATION */}
        <div className="p-4 border-b md:border-b-0 md:border-r border-gray-200 hover:bg-slate-50 transition-colors flex flex-col justify-between min-h-[96px]">
          <label className="text-xs font-bold text-slate-400 uppercase block mb-1">Duration</label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              name="duration"
              value={searchData.duration}
              onChange={handleSearchChange}
              placeholder="5-7"
              className="w-full text-xl sm:text-2xl font-black text-slate-800 bg-transparent border-0 outline-none p-0 focus:ring-0 placeholder:text-slate-300"
            />
            <span className="text-lg font-bold text-slate-800 shrink-0">Days</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1">Trip duration</p>
        </div>

        {/* TRAVELERS */}
        <div className="p-4 hover:bg-slate-50 transition-colors flex flex-col justify-between min-h-[96px]">
          <label className="text-xs font-bold text-slate-400 uppercase flex items-center gap-1 mb-1">Travelers <UserCircle size={12} /></label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              name="travelers"
              min="1"
              max="20"
              value={searchData.travelers}
              onChange={handleSearchChange}
              placeholder="2"
              className="w-full text-xl sm:text-2xl font-black text-slate-800 bg-transparent border-0 outline-none p-0 focus:ring-0 placeholder:text-slate-300"
            />
            <span className="text-lg font-bold text-slate-800 shrink-0">People</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1">Add travelers</p>
        </div>
      </div>

      {/* Package Types */}
      <div className="flex flex-wrap items-center gap-3 mb-8">
        <span className="text-[10px] font-black text-slate-500 uppercase mr-1">Package Type</span>
        {['Honeymoon', 'Family', 'Adventure', 'Luxury', 'Budget', 'Group'].map((type) => {
          const isActive = searchData.category?.toLowerCase() === type.toLowerCase();
          return (
            <button
              key={type}
              type="button"
              onClick={() => {
                const nextCategory = isActive ? "" : type;
                setSearchData((prev: any) => ({ ...prev, category: nextCategory }));
                const params = new URLSearchParams(window.location.search);
                if (nextCategory) params.set("category", nextCategory);
                else params.delete("category");
                router.push(`${pathname}?${params.toString()}`);
              }}
              className={`px-4 py-2 border rounded-lg text-xs font-bold transition-all cursor-pointer ${
                isActive
                  ? 'bg-rose-500 text-white border-rose-500 shadow-md shadow-rose-200'
                  : 'bg-white text-slate-600 border-gray-200 hover:border-rose-500 hover:bg-rose-50'
              }`}
            >
              {type}
            </button>
          );
        })}
      </div>

      <div className="flex justify-center">
        <button type="submit" className="bg-linear-to-r from-blue-500 to-blue-600 hover:from-rose-500 hover:to-rose-600 text-white px-8 sm:px-20 py-3 sm:py-4 rounded-full text-lg sm:text-2xl font-black shadow-xl transition-all active:scale-95 uppercase tracking-widest cursor-pointer border-0">
          Find Packages
        </button>
      </div>
    </form>
  </div>
);

// Stays Search
const StaysSearch = ({ searchData, setSearchData, handleSearchChange, handleSearchSubmit, router, pathname }: SearchComponentProps) => (
  <div className="p-4 sm:p-8">
    <h2 className="text-2xl sm:text-3xl font-black text-slate-800 mb-6 flex items-center gap-3">
      <Hotel className="text-rose-500 shrink-0" size={24} /> Book Stays
    </h2>

    <form onSubmit={handleSearchSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-5 border border-gray-200 rounded-2xl mb-6 bg-white overflow-hidden shadow-sm">
        {/* DESTINATION */}
        <div className="p-4 border-b md:border-b-0 md:border-r border-gray-200 hover:bg-slate-50 transition-colors flex flex-col justify-between min-h-[96px]">
          <label className="text-xs font-bold text-slate-400 uppercase block mb-1">Destination</label>
          <input
            type="text"
            name="query"
            value={searchData.query}
            onChange={handleSearchChange}
            placeholder="Where to?"
            className="w-full text-xl sm:text-2xl font-black text-slate-800 bg-transparent border-0 outline-none p-0 focus:ring-0 placeholder:text-slate-300"
          />
          <p className="text-[10px] text-slate-400 mt-1">City or hotel name</p>
        </div>

        {/* CHECK IN */}
        <div className="p-4 border-b md:border-b-0 md:border-r border-gray-200 hover:bg-slate-50 transition-colors flex flex-col justify-between min-h-[96px]">
          <label className="text-xs font-bold text-slate-400 uppercase flex items-center gap-1 mb-1">Check In <Calendar size={12} /></label>
          <input
            type="text"
            name="date"
            value={searchData.date}
            onChange={handleSearchChange}
            placeholder="Select date"
            className="w-full text-xl sm:text-2xl font-black text-slate-800 bg-transparent border-0 outline-none p-0 focus:ring-0 placeholder:text-slate-300"
          />
          <p className="text-[10px] text-slate-400 mt-1">Arrival date</p>
        </div>

        {/* CHECK OUT */}
        <div className="p-4 border-b md:border-b-0 md:border-r border-gray-200 hover:bg-slate-50 transition-colors flex flex-col justify-between min-h-[96px]">
          <label className="text-xs font-bold text-slate-400 uppercase flex items-center gap-1 mb-1">Check Out <Calendar size={12} /></label>
          <input
            type="text"
            name="duration"
            value={searchData.duration}
            onChange={handleSearchChange}
            placeholder="Departure"
            className="w-full text-xl sm:text-2xl font-black text-slate-800 bg-transparent border-0 outline-none p-0 focus:ring-0 placeholder:text-slate-300"
          />
          <p className="text-[10px] text-slate-400 mt-1">Departure date</p>
        </div>

        {/* ROOMS */}
        <div className="p-4 border-b md:border-b-0 md:border-r border-gray-200 hover:bg-slate-50 transition-colors flex flex-col justify-between min-h-[96px]">
          <label className="text-xs font-bold text-slate-400 uppercase block mb-1">Rooms</label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              name="rooms"
              min="1"
              max="10"
              value={searchData.rooms}
              onChange={handleSearchChange}
              placeholder="1"
              className="w-full text-xl sm:text-2xl font-black text-slate-800 bg-transparent border-0 outline-none p-0 focus:ring-0 placeholder:text-slate-300"
            />
            <span className="text-lg font-bold text-slate-800 shrink-0">Room</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1">Rooms count</p>
        </div>

        {/* GUESTS */}
        <div className="p-4 hover:bg-slate-50 transition-colors flex flex-col justify-between min-h-[96px]">
          <label className="text-xs font-bold text-slate-400 uppercase flex items-center gap-1 mb-1">Guests <UserCircle size={12} /></label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              name="travelers"
              min="1"
              max="20"
              value={searchData.travelers}
              onChange={handleSearchChange}
              placeholder="2"
              className="w-full text-xl sm:text-2xl font-black text-slate-800 bg-transparent border-0 outline-none p-0 focus:ring-0 placeholder:text-slate-300"
            />
            <span className="text-lg font-bold text-slate-800 shrink-0">Adults</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1">Add guest count</p>
        </div>
      </div>

      {/* Hotel Types */}
      <div className="flex flex-wrap items-center gap-3 mb-8">
        <span className="text-[10px] font-black text-slate-500 uppercase mr-1">Property Type</span>
        {['Hotels', 'Resorts', 'Villas', 'Apartments', 'Homestays', 'Hostels'].map((type) => {
          const isActive = searchData.category?.toLowerCase() === type.toLowerCase() || (type === 'Hotels' && searchData.category?.toLowerCase() === 'hotel');
          return (
            <button
              key={type}
              type="button"
              onClick={() => {
                const nextCategory = isActive ? "" : (type === 'Hotels' ? 'hotel' : type.toLowerCase());
                setSearchData((prev: any) => ({ ...prev, category: nextCategory }));
                const params = new URLSearchParams(window.location.search);
                if (nextCategory) params.set("category", nextCategory);
                else params.delete("category");
                router.push(`${pathname}?${params.toString()}`);
              }}
              className={`px-4 py-2 border rounded-lg text-xs font-bold transition-all cursor-pointer ${
                isActive
                  ? 'bg-rose-500 text-white border-rose-500 shadow-md shadow-rose-200'
                  : 'bg-white text-slate-600 border-gray-200 hover:border-rose-500 hover:bg-rose-50'
              }`}
            >
              {type}
            </button>
          );
        })}
      </div>

      <div className="flex justify-center">
        <button type="submit" className="bg-linear-to-r from-blue-500 to-blue-600 hover:from-rose-500 hover:to-rose-600 text-white px-8 sm:px-20 py-3 sm:py-4 rounded-full text-lg sm:text-2xl font-black shadow-xl transition-all active:scale-95 uppercase tracking-widest cursor-pointer border-0">
          Search Stays
        </button>
      </div>
    </form>
  </div>
);

// Original Flight Search (default fallback)
const FlightSearch = ({}: SearchComponentProps) => (
  <div className="p-4 sm:p-8">
    {/* --- 2. Trip Type Radio Selection --- */}
    <div className="flex gap-6 mb-6">
      {['One Way', 'Round Trip', 'Multi City'].map((type) => (
        <label key={type} className="flex items-center gap-2 cursor-pointer group">
          <input type="radio" name="tripType" defaultChecked={type === 'One Way'} className="accent-rose-500 w-4 h-4" />
          <span className="text-sm font-semibold text-slate-700 group-hover:text-rose-500 transition-colors">{type}</span>
        </label>
      ))}
    </div>

    {/* --- 3. Multi-Column Search Grid --- */}
    <div className="grid grid-cols-1 md:grid-cols-5 border border-gray-200 rounded-2xl mb-6">
      {/* FROM */}
      <div className="p-4 border-b md:border-b-0 md:border-r border-gray-200 hover:bg-slate-50 transition-colors cursor-pointer relative group">
        <p className="text-xs font-bold text-slate-400 uppercase">From</p>
        <h3 className="text-3xl font-black text-slate-800">Delhi</h3>
        <p className="text-xs text-slate-500 truncate">DEL, Delhi Airport India</p>
        <div className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 hidden md:flex bg-white border border-gray-200 rounded-full p-1 shadow-sm group-hover:text-rose-500">
          <Route size={16} />
        </div>
      </div>

      {/* TO */}
      <div className="p-4 border-b md:border-b-0 md:border-r border-gray-200 hover:bg-slate-50 transition-colors cursor-pointer">
        <p className="text-xs font-bold text-slate-400 uppercase">To</p>
        <h3 className="text-3xl font-black text-slate-800">Bengaluru</h3>
        <p className="text-xs text-slate-500 truncate">BLR, Bengaluru Airport...</p>
      </div>

      {/* DEPARTURE */}
      <div className="p-4 border-b md:border-b-0 md:border-r border-gray-200 hover:bg-slate-50 transition-colors cursor-pointer">
        <p className="text-xs font-bold text-slate-400 uppercase flex items-center gap-1">Departure <Calendar size={12} /> </p>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-black text-slate-800">11</span>
          <span className="text-lg font-bold text-slate-800">May&apos;26</span>
        </div>
        <p className="text-xs text-slate-500">Monday</p>
      </div>

      {/* RETURN */}
      <div className="p-4 border-b md:border-b-0 md:border-r border-gray-200 hover:bg-slate-50 transition-colors cursor-pointer">
        <p className="text-xs font-bold text-slate-400 uppercase">Return</p>
        <p className="text-sm text-slate-400 font-medium mt-2 leading-tight">Tap to add a return date for bigger discounts</p>
      </div>

      {/* TRAVELLERS */}
      <div className="p-4 hover:bg-slate-50 transition-colors cursor-pointer">
        <p className="text-xs font-bold text-slate-400 uppercase flex items-center gap-1">Travellers <UserCircle size={12} /> </p>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-black text-slate-800">1</span>
          <span className="text-lg font-bold text-slate-800">Traveller</span>
        </div>
        <p className="text-xs text-slate-500">Economy/Premium...</p>
      </div>
    </div>

    {/* --- 4. Special Fares Section --- */}
    <div className="flex flex-wrap items-center gap-4 mb-8">
      <span className="text-[10px] font-black text-slate-500 uppercase">Special Fares</span>
      {['Regular', 'Student', 'Armed Forces', 'Senior Citizen'].map((fare) => (
        <button key={fare} className="px-4 py-2 border border-gray-200 rounded-lg text-xs font-bold text-slate-600 hover:border-rose-500 hover:bg-rose-50 transition-all">
          {fare}
        </button>
      ))}
    </div>

    {/* --- 5. Main Search Button --- */}
    <div className="flex justify-center">
      <button className="bg-linear-to-r from-blue-500 to-blue-600 hover:from-rose-500 hover:to-rose-600 text-white px-8 sm:px-20 py-3 sm:py-4 rounded-full text-lg sm:text-2xl font-black shadow-xl transition-all active:scale-95 uppercase tracking-widest cursor-pointer border-0">
        Search
      </button>
    </div>
  </div>
);

// Routes Search Component
const RoutesSearch = ({ searchData, handleSearchChange, router }: SearchComponentProps) => {
  const { data: locations = [], isLoading } = useQuery({
    queryKey: ["active-locations"],
    queryFn: getActiveLocations
  });

  const handleRoutesSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchData.from) params.set("sourceCityId", searchData.from);
    if (searchData.to) params.set("destinationCityId", searchData.to);
    if (searchData.date) params.set("travelDate", searchData.date);
    if (searchData.travelers) params.set("passengers", searchData.travelers);
    router.push(`/travel-routes?${params.toString()}`);
  };

  return (
    <div className="p-4 sm:p-8">
      <h2 className="text-2xl sm:text-3xl font-black text-slate-800 mb-6 flex items-center gap-3">
        <Bus className="text-rose-500 shrink-0" size={24} /> Search Intercity Routes
      </h2>

      <form onSubmit={handleRoutesSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-4 border border-gray-200 rounded-2xl mb-6 bg-white overflow-hidden shadow-sm">
          {/* ORIGIN CITY */}
          <div className="p-4 border-b md:border-b-0 md:border-r border-gray-200 hover:bg-slate-50 transition-colors flex flex-col justify-between min-h-[96px]">
            <label className="text-xs font-bold text-slate-400 uppercase block mb-1">Origin City</label>
            {isLoading ? (
              <div className="h-8 bg-slate-100 rounded-lg animate-pulse mt-2" />
            ) : (
              <select
                name="from"
                value={searchData.from}
                onChange={handleSearchChange}
                className="w-full text-xl sm:text-xl font-black text-slate-800 bg-transparent border-0 outline-none p-0 focus:ring-0 cursor-pointer mt-1"
              >
                <option value="">Select Origin</option>
                {locations.map((loc: any) => (
                  <option key={loc._id} value={loc._id}>{loc.name}</option>
                ))}
              </select>
            )}
            <p className="text-[10px] text-slate-400 mt-1">Starting point</p>
          </div>

          {/* DESTINATION CITY */}
          <div className="p-4 border-b md:border-b-0 md:border-r border-gray-200 hover:bg-slate-50 transition-colors flex flex-col justify-between min-h-[96px]">
            <label className="text-xs font-bold text-slate-400 uppercase block mb-1">Destination City</label>
            {isLoading ? (
              <div className="h-8 bg-slate-100 rounded-lg animate-pulse mt-2" />
            ) : (
              <select
                name="to"
                value={searchData.to}
                onChange={handleSearchChange}
                className="w-full text-xl sm:text-xl font-black text-slate-800 bg-transparent border-0 outline-none p-0 focus:ring-0 cursor-pointer mt-1"
              >
                <option value="">Select Destination</option>
                {locations.map((loc: any) => (
                  <option key={loc._id} value={loc._id}>{loc.name}</option>
                ))}
              </select>
            )}
            <p className="text-[10px] text-slate-400 mt-1">End point</p>
          </div>

          {/* DEPARTURE DATE */}
          <div className="p-4 border-b md:border-b-0 md:border-r border-gray-200 hover:bg-slate-50 transition-colors flex flex-col justify-between min-h-[96px]">
            <label className="text-xs font-bold text-slate-400 uppercase flex items-center gap-1 mb-1">Departure <Calendar size={12} /></label>
            <input
              type="date"
              name="date"
              value={searchData.date}
              onChange={handleSearchChange}
              className="w-full text-lg font-black text-slate-800 bg-transparent border-0 outline-none p-0 focus:ring-0 mt-1"
            />
            <p className="text-[10px] text-slate-400 mt-1">Choose travel date</p>
          </div>

          {/* PASSENGERS COUNT */}
          <div className="p-4 hover:bg-slate-50 transition-colors flex flex-col justify-between min-h-[96px]">
            <label className="text-xs font-bold text-slate-400 uppercase flex items-center gap-1 mb-1">Passengers <UserCircle size={12} /></label>
            <div className="flex items-center gap-2 mt-1">
              <input
                type="number"
                name="travelers"
                min="1"
                max="8"
                value={searchData.travelers}
                onChange={handleSearchChange}
                placeholder="2"
                className="w-full text-xl sm:text-2xl font-black text-slate-800 bg-transparent border-0 outline-none p-0 focus:ring-0 placeholder:text-slate-300"
              />
              <span className="text-lg font-bold text-slate-800 shrink-0">People</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-1">Seat reservations</p>
          </div>
        </div>

        <div className="flex justify-center">
          <button type="submit" className="bg-linear-to-r from-blue-500 to-blue-600 hover:from-rose-500 hover:to-rose-600 text-white px-8 sm:px-20 py-3 sm:py-4 rounded-full text-lg sm:text-2xl font-black shadow-xl transition-all active:scale-95 uppercase tracking-widest cursor-pointer border-0">
            Calculate Journeys
          </button>
        </div>
      </form>
    </div>
  );
};

// ─── Main Component ────────────────────────────────────────────────────────────

function HeroSearch() {
  const pathname = usePathname();
  const router = useRouter();
  const {
    data: heroContent,
  } = useHeroContent();

  const {
    searchData,
    setSearchData,
    handleSearchChange,
    handleSearchSubmit
  } = useSearchState();

  // Find the specific hero section for the current mood
  const currentHero = heroContent?.heroSection?.[0];

  // Route-based rendering
  const renderContent = () => {
    const props: SearchComponentProps = {
      searchData,
      setSearchData,
      handleSearchChange,
      handleSearchSubmit,
      router,
      pathname,
      currentHero
    };

    switch (pathname) {
      case '/':
        return <AISearchBar {...props} />;
      case '/destinations':
        return <DestinationsSearch {...props} />;
      case '/activities':
        return <ActivitiesSearch {...props} />;
      case '/packages':
        return <PackagesSearch {...props} />;
      case '/stays':
        return <StaysSearch {...props} />;
      case '/travel-routes':
        return <RoutesSearch {...props} />;
      default:
        return <FlightSearch {...props} />;
    }
  };

  return <div>{renderContent()}</div>;
}

export default HeroSearch;