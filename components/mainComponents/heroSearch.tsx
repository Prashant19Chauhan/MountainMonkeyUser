"use client";
import { UserCircle, Calendar, Route, MapPin, Activity, Package, Hotel, Sparkles } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useHeroContent, useSearchState } from '@/hooks/useHome';

function HeroSearch() {
  const pathname = usePathname();
  const { 
    data:heroContent, 
  } = useHeroContent();

  const { 
    searchData, 
    handleSearchChange, 
    handleSearchSubmit 
  } = useSearchState();

  // Find the specific hero section for the current mood
  const currentHero =  heroContent?.heroSection?.[0];

  // AI Search Bar for home page
  const AISearchBar = () => (
  <div className="max-w-4xl mx-auto p-8">
    <div className="text-center mb-8">
      <h1 className="text-5xl font-black text-foreground mb-4">
        {currentHero?.title || "Where would you like to go?"}
      </h1>
      <p className="text-lg text-foreground/70">
        {currentHero?.tagline || "Ask anything - we'll help you plan the perfect trip"}
      </p>
    </div>
    
    <div className="relative">
      <form onSubmit={handleSearchSubmit} className="flex items-center gap-4 bg-white border-2 border-gray-200 rounded-full p-4 shadow-2xl hover:border-rose-500 transition-all">
        <Sparkles className="text-rose-500 ml-2" size={24} />
        <input
          type="text"
          name="query"
          value={searchData.query}
          onChange={handleSearchChange}
          placeholder={currentHero?.searchBarPrompt || "Try: 'Beach destinations in Thailand under $1000' or 'Weekend getaway from Delhi'"}
          className="flex-1 text-lg outline-none text-slate-700 placeholder:text-slate-400"
        />
        <button 
          type="submit"
          className="bg-linear-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white px-8 py-3 rounded-full font-bold shadow-lg transition-all active:scale-95"
        >
          Ask AI
        </button>
      </form>
    </div>

    {/* Quick suggestions */}
    <div className="mt-6 flex flex-wrap justify-center gap-3">
      <span className="text-xs font-bold text-slate-400 uppercase">Popular:</span>
      {(currentHero?.categories || ['Beaches', 'Mountains', 'Adventure', 'Romantic', 'Family Trip']).map((tag: string) => (
        <button
          key={tag}
          onClick={() => {
            handleSearchChange({ target: { name: 'query', value: tag } } as React.ChangeEvent<HTMLInputElement>);
          }}
          className="px-4 py-2 bg-slate-100 hover:bg-rose-50 hover:text-rose-600 rounded-full text-sm font-semibold text-slate-600 transition-all"
        >
          {tag}
        </button>
      ))}
    </div>
  </div>
);

  // Destinations Search
  const DestinationsSearch = () => (
    <div className="p-8">
      <h2 className="text-3xl font-black text-slate-800 mb-6 flex items-center gap-3">
        <MapPin className="text-rose-500" /> Explore Destinations
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 border border-gray-200 rounded-2xl mb-6">
        {/* DESTINATION */}
        <div className="p-4 border-b md:border-b-0 md:border-r border-gray-200 hover:bg-slate-50 transition-colors cursor-pointer">
          <p className="text-xs font-bold text-slate-400 uppercase">Destination</p>
          <h3 className="text-3xl font-black text-slate-800">Where to?</h3>
          <p className="text-xs text-slate-500">City, country, or region</p>
        </div>

        {/* TRAVEL DATES */}
        <div className="p-4 border-b md:border-b-0 md:border-r border-gray-200 hover:bg-slate-50 transition-colors cursor-pointer">
          <p className="text-xs font-bold text-slate-400 uppercase flex items-center gap-1">When <Calendar size={12}/></p>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-black text-slate-800">Flexible</span>
          </div>
          <p className="text-xs text-slate-500">Choose dates</p>
        </div>

        {/* DURATION */}
        <div className="p-4 border-b md:border-b-0 md:border-r border-gray-200 hover:bg-slate-50 transition-colors cursor-pointer">
          <p className="text-xs font-bold text-slate-400 uppercase">Duration</p>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-black text-slate-800">7</span>
            <span className="text-lg font-bold text-slate-800">Days</span>
          </div>
          <p className="text-xs text-slate-500">Adjust as needed</p>
        </div>

        {/* TRAVELERS */}
        <div className="p-4 hover:bg-slate-50 transition-colors cursor-pointer">
          <p className="text-xs font-bold text-slate-400 uppercase flex items-center gap-1">Travelers <UserCircle size={12}/></p>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-black text-slate-800">2</span>
            <span className="text-lg font-bold text-slate-800">Adults</span>
          </div>
          <p className="text-xs text-slate-500">Add guests</p>
        </div>
      </div>

      {/* Destination Type */}
      <div className="flex flex-wrap items-center gap-4 mb-8">
        <span className="text-[10px] font-black text-slate-500 uppercase">I&apos;m looking for</span>
        {['Beach', 'Mountains', 'City', 'Wildlife', 'Heritage', 'Adventure'].map((type) => (
          <button key={type} className="px-4 py-2 border border-gray-200 rounded-lg text-xs font-bold text-slate-600 hover:border-rose-500 hover:bg-rose-50 transition-all">
            {type}
          </button>
        ))}
      </div>

      <div className="flex justify-center">
        <button className="bg-linear-to-r from-blue-500 to-blue-600 hover:from-rose-500 hover:to-rose-600 text-white px-20 py-4 rounded-full text-2xl font-black shadow-xl transition-all active:scale-95 uppercase tracking-widest">
          Explore
        </button>
      </div>
    </div>
  );

  // Activities Search
  const ActivitiesSearch = () => (
    <div className="p-8">
      <h2 className="text-3xl font-black text-slate-800 mb-6 flex items-center gap-3">
        <Activity className="text-rose-500" /> Find Activities
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 border border-gray-200 rounded-2xl mb-6">
        {/* LOCATION */}
        <div className="p-4 border-b md:border-b-0 md:border-r border-gray-200 hover:bg-slate-50 transition-colors cursor-pointer">
          <p className="text-xs font-bold text-slate-400 uppercase">Location</p>
          <h3 className="text-3xl font-black text-slate-800">Choose City</h3>
          <p className="text-xs text-slate-500">Where to explore</p>
        </div>

        {/* ACTIVITY TYPE */}
        <div className="p-4 border-b md:border-b-0 md:border-r border-gray-200 hover:bg-slate-50 transition-colors cursor-pointer">
          <p className="text-xs font-bold text-slate-400 uppercase">Activity</p>
          <h3 className="text-3xl font-black text-slate-800">All Types</h3>
          <p className="text-xs text-slate-500">Tours, experiences, etc.</p>
        </div>

        {/* DATE */}
        <div className="p-4 border-b md:border-b-0 md:border-r border-gray-200 hover:bg-slate-50 transition-colors cursor-pointer">
          <p className="text-xs font-bold text-slate-400 uppercase flex items-center gap-1">Date <Calendar size={12}/></p>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-black text-slate-800">Any</span>
          </div>
          <p className="text-xs text-slate-500">Select date</p>
        </div>

        {/* GUESTS */}
        <div className="p-4 hover:bg-slate-50 transition-colors cursor-pointer">
          <p className="text-xs font-bold text-slate-400 uppercase flex items-center gap-1">Guests <UserCircle size={12}/></p>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-black text-slate-800">1</span>
            <span className="text-lg font-bold text-slate-800">Person</span>
          </div>
          <p className="text-xs text-slate-500">Add more guests</p>
        </div>
      </div>

      {/* Activity Categories */}
      <div className="flex flex-wrap items-center gap-4 mb-8">
        <span className="text-[10px] font-black text-slate-500 uppercase">Categories</span>
        {['Adventure', 'Culture', 'Food & Drink', 'Water Sports', 'Sightseeing', 'Wellness'].map((category) => (
          <button key={category} className="px-4 py-2 border border-gray-200 rounded-lg text-xs font-bold text-slate-600 hover:border-rose-500 hover:bg-rose-50 transition-all">
            {category}
          </button>
        ))}
      </div>

      <div className="flex justify-center">
        <button className="bg-linear-to-r from-blue-500 to-blue-600 hover:from-rose-500 hover:to-rose-600 text-white px-20 py-4 rounded-full text-2xl font-black shadow-xl transition-all active:scale-95 uppercase tracking-widest">
          Search Activities
        </button>
      </div>
    </div>
  );

  // Packages Search
  const PackagesSearch = () => (
    <div className="p-8">
      <h2 className="text-3xl font-black text-slate-800 mb-6 flex items-center gap-3">
        <Package className="text-rose-500" /> Browse Packages
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-5 border border-gray-200 rounded-2xl mb-6">
        {/* FROM */}
        <div className="p-4 border-b md:border-b-0 md:border-r border-gray-200 hover:bg-slate-50 transition-colors cursor-pointer">
          <p className="text-xs font-bold text-slate-400 uppercase">From</p>
          <h3 className="text-3xl font-black text-slate-800">Your City</h3>
          <p className="text-xs text-slate-500">Departure city</p>
        </div>

        {/* TO */}
        <div className="p-4 border-b md:border-b-0 md:border-r border-gray-200 hover:bg-slate-50 transition-colors cursor-pointer">
          <p className="text-xs font-bold text-slate-400 uppercase">To</p>
          <h3 className="text-3xl font-black text-slate-800">Destination</h3>
          <p className="text-xs text-slate-500">Package destination</p>
        </div>

        {/* DEPARTURE DATE */}
        <div className="p-4 border-b md:border-b-0 md:border-r border-gray-200 hover:bg-slate-50 transition-colors cursor-pointer">
          <p className="text-xs font-bold text-slate-400 uppercase flex items-center gap-1">Travel Date <Calendar size={12}/></p>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-black text-slate-800">Flexible</span>
          </div>
          <p className="text-xs text-slate-500">Choose dates</p>
        </div>

        {/* DURATION */}
        <div className="p-4 border-b md:border-b-0 md:border-r border-gray-200 hover:bg-slate-50 transition-colors cursor-pointer">
          <p className="text-xs font-bold text-slate-400 uppercase">Duration</p>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-black text-slate-800">5-7</span>
            <span className="text-lg font-bold text-slate-800">Days</span>
          </div>
          <p className="text-xs text-slate-500">Trip duration</p>
        </div>

        {/* TRAVELERS */}
        <div className="p-4 hover:bg-slate-50 transition-colors cursor-pointer">
          <p className="text-xs font-bold text-slate-400 uppercase flex items-center gap-1">Travelers <UserCircle size={12}/></p>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-black text-slate-800">2</span>
            <span className="text-lg font-bold text-slate-800">People</span>
          </div>
          <p className="text-xs text-slate-500">Add travelers</p>
        </div>
      </div>

      {/* Package Types */}
      <div className="flex flex-wrap items-center gap-4 mb-8">
        <span className="text-[10px] font-black text-slate-500 uppercase">Package Type</span>
        {['Honeymoon', 'Family', 'Adventure', 'Luxury', 'Budget', 'Group'].map((type) => (
          <button key={type} className="px-4 py-2 border border-gray-200 rounded-lg text-xs font-bold text-slate-600 hover:border-rose-500 hover:bg-rose-50 transition-all">
            {type}
          </button>
        ))}
      </div>

      <div className="flex justify-center">
        <button className="bg-linear-to-r from-blue-500 to-blue-600 hover:from-rose-500 hover:to-rose-600 text-white px-20 py-4 rounded-full text-2xl font-black shadow-xl transition-all active:scale-95 uppercase tracking-widest">
          Find Packages
        </button>
      </div>
    </div>
  );

  // Stays Search
  const StaysSearch = () => (
    <div className="p-8">
      <h2 className="text-3xl font-black text-slate-800 mb-6 flex items-center gap-3">
        <Hotel className="text-rose-500" /> Book Stays
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-5 border border-gray-200 rounded-2xl mb-6">
        {/* DESTINATION */}
        <div className="p-4 border-b md:border-b-0 md:border-r border-gray-200 hover:bg-slate-50 transition-colors cursor-pointer">
          <p className="text-xs font-bold text-slate-400 uppercase">Destination</p>
          <h3 className="text-3xl font-black text-slate-800">Where?</h3>
          <p className="text-xs text-slate-500">City or hotel name</p>
        </div>

        {/* CHECK IN */}
        <div className="p-4 border-b md:border-b-0 md:border-r border-gray-200 hover:bg-slate-50 transition-colors cursor-pointer">
          <p className="text-xs font-bold text-slate-400 uppercase flex items-center gap-1">Check In <Calendar size={12}/></p>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-black text-slate-800">15</span>
            <span className="text-lg font-bold text-slate-800">May</span>
          </div>
          <p className="text-xs text-slate-500">Select date</p>
        </div>

        {/* CHECK OUT */}
        <div className="p-4 border-b md:border-b-0 md:border-r border-gray-200 hover:bg-slate-50 transition-colors cursor-pointer">
          <p className="text-xs font-bold text-slate-400 uppercase flex items-center gap-1">Check Out <Calendar size={12}/></p>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-black text-slate-800">18</span>
            <span className="text-lg font-bold text-slate-800">May</span>
          </div>
          <p className="text-xs text-slate-500">3 nights</p>
        </div>

        {/* ROOMS */}
        <div className="p-4 border-b md:border-b-0 md:border-r border-gray-200 hover:bg-slate-50 transition-colors cursor-pointer">
          <p className="text-xs font-bold text-slate-400 uppercase">Rooms</p>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-black text-slate-800">1</span>
            <span className="text-lg font-bold text-slate-800">Room</span>
          </div>
          <p className="text-xs text-slate-500">Add more rooms</p>
        </div>

        {/* GUESTS */}
        <div className="p-4 hover:bg-slate-50 transition-colors cursor-pointer">
          <p className="text-xs font-bold text-slate-400 uppercase flex items-center gap-1">Guests <UserCircle size={12}/></p>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-black text-slate-800">2</span>
            <span className="text-lg font-bold text-slate-800">Adults</span>
          </div>
          <p className="text-xs text-slate-500">0 children</p>
        </div>
      </div>

      {/* Hotel Types */}
      <div className="flex flex-wrap items-center gap-4 mb-8">
        <span className="text-[10px] font-black text-slate-500 uppercase">Property Type</span>
        {['Hotels', 'Resorts', 'Villas', 'Apartments', 'Homestays', 'Hostels'].map((type) => (
          <button key={type} className="px-4 py-2 border border-gray-200 rounded-lg text-xs font-bold text-slate-600 hover:border-rose-500 hover:bg-rose-50 transition-all">
            {type}
          </button>
        ))}
      </div>

      <div className="flex justify-center">
        <button className="bg-linear-to-r from-blue-500 to-blue-600 hover:from-rose-500 hover:to-rose-600 text-white px-20 py-4 rounded-full text-2xl font-black shadow-xl transition-all active:scale-95 uppercase tracking-widest">
          Search Stays
        </button>
      </div>
    </div>
  );

  // Original Flight Search (default fallback)
  const FlightSearch = () => (
    <div className="p-8">
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
          <p className="text-xs font-bold text-slate-400 uppercase flex items-center gap-1">Departure <Calendar size={12}/> </p>
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
          <p className="text-xs font-bold text-slate-400 uppercase flex items-center gap-1">Travellers <UserCircle size={12}/> </p>
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
        <button className="bg-linear-to-r from-blue-500 to-blue-600 hover:from-rose-500 hover:to-rose-600 text-white px-20 py-4 rounded-full text-2xl font-black shadow-xl transition-all active:scale-95 uppercase tracking-widest">
          Search
        </button>
      </div>
    </div>
  );

  // Route-based rendering
  const renderContent = () => {
    switch (pathname) {
      case '/':
        return <AISearchBar />;
      case '/destinations':
        return <DestinationsSearch />;
      case '/activities':
        return <ActivitiesSearch />;
      case '/packages':
        return <PackagesSearch />;
      case '/stays':
        return <StaysSearch />;
      default:
        return <FlightSearch />; // Default to flight search for other routes
    }
  };

  return <div>{renderContent()}</div>;
}

export default HeroSearch;