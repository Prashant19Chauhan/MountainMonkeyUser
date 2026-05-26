"use client";

import React from 'react';
import { Plane, ChevronLeft, Globe, MapPin, Camera, Sparkles, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSignup } from '@/hooks/useAuth';

export const SignupFormSteps = () => {
  const {
    currentStep,
    signupData,
    handleSignupChange,
    toggleTravelType,
    handleNext,
    handleBack,
    isSignupPending
  } = useSignup();

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-8 py-12 lg:px-24 bg-white relative overflow-y-auto">
      <div className="w-full max-w-2xl relative z-10">
        
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {/* Step Header */}
            <div className="mb-12">
              <div className="flex items-center gap-2 mb-3">
                 <span className="h-1 w-12 bg-rose-500 rounded-full" />
                 <span className="text-[10px] font-black text-rose-500 uppercase tracking-[0.2em]">Step 0{currentStep} of 05</span>
              </div>
              <h1 className="text-4xl font-black text-slate-900 tracking-tight">
                {currentStep === 1 && "Welcome to the Tribe"}
                {currentStep === 2 && "Personal Essentials"}
                {currentStep === 3 && "Travel Footprint"}
                {currentStep === 4 && "Passion & Style"}
                {currentStep === 5 && "Contact Details"}
              </h1>
              <p className="text-slate-500 mt-3 font-medium text-lg leading-relaxed">
                {currentStep === 1 && "We're thrilled to have you here! Ready to build your dream travel profile?"}
                {currentStep === 2 && "Let's start with the basics to secure your account."}
                {currentStep === 3 && "Share your past adventures to help us know your vibe."}
                {currentStep === 4 && "Final touch! How do you like to explore the world?"}
                {currentStep === 5 && "Help us stay connected with you for updates and support."}
              </p>
            </div>

            <form onSubmit={handleNext} className="space-y-8">
              {/* --- STEP 1: WELCOME --- */}
              {currentStep === 1 && (
                <div className="relative p-10 bg-rose-50/50 rounded-[40px] border border-rose-100 overflow-hidden">
                  <div className="absolute top-[-20px] right-[-20px] opacity-10">
                      <Plane size={200} className="rotate-12" />
                  </div>
                  <div className="relative z-10">
                      <div className="w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center text-rose-500 mb-6">
                          <Sparkles size={32} />
                      </div>
                      <h3 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-2">Hello, Explorer! <Sparkles className="text-rose-500 w-6 h-6 shrink-0 animate-pulse" /></h3>
                      <p className="text-slate-600 font-medium leading-relaxed mb-8">
                          SunSeeker is more than just a travel app. It&apos;s your companion for finding hidden gems, 
                          connecting with like-minded travelers, and creating memories that last a lifetime.
                      </p>
                      <div className="flex flex-col gap-4">
                          <div className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm border border-rose-100/50">
                              <div className="bg-rose-50 p-2 rounded-xl text-rose-500">
                                  <MapPin size={20} />
                              </div>
                              <span className="font-bold text-slate-700">Curated Destinations</span>
                          </div>
                          <div className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm border border-rose-100/50">
                              <div className="bg-rose-50 p-2 rounded-xl text-rose-500">
                                  <Camera size={20} />
                              </div>
                              <span className="font-bold text-slate-700">Travel Community</span>
                          </div>
                      </div>
                  </div>
                </div>
              )}

              {/* --- STEP 2: BASIC DETAILS --- */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-black text-slate-700 uppercase tracking-wider ml-1">First Name</label>
                      <input
                        required
                        type="text"
                        name="firstName"
                        value={signupData.firstName}
                        onChange={handleSignupChange}
                        placeholder="Alex"
                        className="w-full rounded-2xl border border-slate-100 bg-slate-50/50 py-4 px-5 outline-none transition-all focus:bg-white focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 font-bold text-slate-800"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-black text-slate-700 uppercase tracking-wider ml-1">Last Name</label>
                      <input
                        required
                        type="text"
                        name="lastName"
                        value={signupData.lastName}
                        onChange={handleSignupChange}
                        placeholder="Johnson"
                        className="w-full rounded-2xl border border-slate-100 bg-slate-50/50 py-4 px-5 outline-none transition-all focus:bg-white focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 font-bold text-slate-800"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-black text-slate-700 uppercase tracking-wider ml-1">Email Address</label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={signupData.email}
                      onChange={handleSignupChange}
                      placeholder="alex@traveler.com"
                      className="w-full rounded-2xl border border-slate-100 bg-slate-50/50 py-4 px-5 outline-none transition-all focus:bg-white focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 font-bold text-slate-800"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-black text-slate-700 uppercase tracking-wider ml-1">Secure Password</label>
                    <input
                      required
                      type="password"
                      name="password"
                      value={signupData.password}
                      onChange={handleSignupChange}
                      placeholder="••••••••"
                      className="w-full rounded-2xl border border-slate-100 bg-slate-50/50 py-4 px-5 outline-none transition-all focus:bg-white focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 font-bold text-slate-800"
                    />
                  </div>
                </div>
              )}

              {/* --- STEP 3: TRAVEL EXPERIENCES --- */}
              {currentStep === 3 && (
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-black text-slate-700 uppercase tracking-wider ml-1 flex items-center gap-2">
                        Countries Visited <Globe size={14} className="text-rose-500" />
                      </label>
                      <input
                        type="text"
                        name="countriesVisited"
                        value={signupData.countriesVisited}
                        onChange={handleSignupChange}
                        placeholder="e.g. India, USA, France"
                        className="w-full rounded-2xl border border-slate-100 bg-slate-50/50 py-4 px-5 outline-none transition-all focus:bg-white focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 font-bold text-slate-800"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-black text-slate-700 uppercase tracking-wider ml-1 flex items-center gap-2">
                        Dream Destination <MapPin size={14} className="text-rose-500" />
                      </label>
                      <input
                        type="text"
                        name="dreamDestination"
                        value={signupData.dreamDestination}
                        onChange={handleSignupChange}
                        placeholder="e.g. Iceland, Japan"
                        className="w-full rounded-2xl border border-slate-100 bg-slate-50/50 py-4 px-5 outline-none transition-all focus:bg-white focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 font-bold text-slate-800"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-sm font-black text-slate-700 uppercase tracking-wider ml-1">Preferred Travel Styles</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {['Solo', 'Luxury', 'Budget', 'Group', 'Family', 'Adventure'].map((style) => (
                        <button
                          key={style}
                          type="button"
                          onClick={() => toggleTravelType(style)}
                          className={`py-3 px-4 rounded-xl text-sm font-bold border-2 transition-all cursor-pointer ${
                            signupData.travelTypes.includes(style)
                              ? 'border-rose-500 bg-rose-50 text-rose-600 shadow-sm'
                              : 'border-slate-100 bg-slate-50/30 text-slate-500 hover:border-slate-200'
                          }`}
                        >
                          {style}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* --- STEP 4: TRAVEL ENTHUSIASM --- */}
              {currentStep === 4 && (
                <div className="space-y-8">
                  <div className="space-y-4">
                    <label className="text-sm font-black text-slate-700 uppercase tracking-wider ml-1">How often do you travel?</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                       {[
                         { value: 'rarely', label: 'Rarely' },
                         { value: 'occasionally', label: 'Occasionally' },
                         { value: 'frequently', label: 'Frequently' },
                         { value: 'very_frequently', label: 'Very Often' }
                       ].map((freq) => (
                         <label key={freq.value} className="flex-1 cursor-pointer">
                           <input 
                              type="radio" 
                              name="frequency" 
                              value={freq.value} 
                              checked={signupData.frequency === freq.value}
                              onChange={handleSignupChange}
                              className="hidden" 
                           />
                           <div className={`text-center py-4 rounded-2xl border-2 transition-all font-black text-[10px] uppercase tracking-[0.2em] ${
                             signupData.frequency === freq.value ? 'border-rose-500 bg-rose-500 text-white shadow-lg shadow-rose-200' : 'border-slate-100 text-slate-400 bg-slate-50/30'
                           }`}>
                             {freq.label}
                           </div>
                         </label>
                       ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-black text-slate-700 uppercase tracking-wider ml-1">Adventure Level</label>
                      <span className="text-rose-500 font-black text-xl">{signupData.adventureLevel}/10</span>
                    </div>
                    <input 
                      type="range" 
                      name="adventureLevel"
                      min="1" 
                      max="10" 
                      value={signupData.adventureLevel}
                      onChange={handleSignupChange}
                      className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-rose-500" 
                    />
                    <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      <span>Chilled</span>
                      <span>Hardcore</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-black text-slate-700 uppercase tracking-wider ml-1">A brief travel bio</label>
                    <textarea
                      name="bio"
                      value={signupData.bio}
                      onChange={handleSignupChange}
                      placeholder="Tell us about your favorite travel memory..."
                      rows={4}
                      className="w-full rounded-2xl border border-slate-100 bg-slate-50/50 py-4 px-5 outline-none transition-all focus:bg-white focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 font-bold resize-none text-slate-800"
                    />
                  </div>
                </div>
              )}

              {/* --- STEP 5: CONTACT INFO --- */}
              {currentStep === 5 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-black text-slate-700 uppercase tracking-wider ml-1">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={signupData.phone}
                      onChange={handleSignupChange}
                      placeholder="+1 234 567 8900"
                      className="w-full rounded-2xl border border-slate-100 bg-slate-50/50 py-4 px-5 outline-none transition-all focus:bg-white focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 font-bold text-slate-800"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-black text-slate-700 uppercase tracking-wider ml-1">Preferred Language</label>
                    <select
                      name="language"
                      value={signupData.language}
                      onChange={handleSignupChange}
                      className="w-full rounded-2xl border border-slate-100 bg-slate-50/50 py-4 px-5 outline-none transition-all focus:bg-white focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 font-bold text-slate-800"
                    >
                      <option value="English">English</option>
                      <option value="Spanish">Spanish</option>
                      <option value="French">French</option>
                      <option value="German">German</option>
                      <option value="Chinese">Chinese</option>
                      <option value="Japanese">Japanese</option>
                      <option value="Korean">Korean</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-black text-slate-700 uppercase tracking-wider ml-1">Country</label>
                      <input
                        type="text"
                        name="country"
                        value={signupData.country}
                        onChange={handleSignupChange}
                        placeholder="United States"
                        className="w-full rounded-2xl border border-slate-100 bg-slate-50/50 py-4 px-5 outline-none transition-all focus:bg-white focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 font-bold text-slate-800"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-black text-slate-700 uppercase tracking-wider ml-1">State/Province</label>
                      <input
                        type="text"
                        name="state"
                        value={signupData.state}
                        onChange={handleSignupChange}
                        placeholder="California"
                        className="w-full rounded-2xl border border-slate-100 bg-slate-50/50 py-4 px-5 outline-none transition-all focus:bg-white focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 font-bold text-slate-800"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-black text-slate-700 uppercase tracking-wider ml-1">City</label>
                      <input
                        type="text"
                        name="city"
                        value={signupData.city}
                        onChange={handleSignupChange}
                        placeholder="San Francisco"
                        className="w-full rounded-2xl border border-slate-100 bg-slate-50/50 py-4 px-5 outline-none transition-all focus:bg-white focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 font-bold text-slate-800"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-black text-slate-700 uppercase tracking-wider ml-1">Pincode/ZIP</label>
                      <input
                        type="text"
                        name="pincode"
                        value={signupData.pincode}
                        onChange={handleSignupChange}
                        placeholder="94102"
                        className="w-full rounded-2xl border border-slate-100 bg-slate-50/50 py-4 px-5 outline-none transition-all focus:bg-white focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 font-bold text-slate-800"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-black text-slate-700 uppercase tracking-wider ml-1">Address (Optional)</label>
                    <textarea
                      name="address"
                      value={signupData.address}
                      onChange={handleSignupChange}
                      placeholder="123 Travel Street, Apt 4B"
                      rows={3}
                      className="w-full rounded-2xl border border-slate-100 bg-slate-50/50 py-4 px-5 outline-none transition-all focus:bg-white focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 font-bold resize-none text-slate-800"
                    />
                  </div>
                </div>
              )}

              {/* Form Footer */}
              <div className="pt-10 flex items-center justify-between border-t border-slate-50">
                <button
                  type="button"
                  onClick={handleBack}
                  className={`flex items-center gap-2 text-slate-400 font-black text-[11px] uppercase tracking-[0.2em] hover:text-slate-900 transition-colors cursor-pointer ${
                    currentStep === 1 ? 'invisible' : 'visible'
                  }`}
                >
                  <ChevronLeft size={18} strokeWidth={3} /> Back
                </button>
                
                <button 
                  type="submit"
                  disabled={isSignupPending}
                  className="bg-slate-900 text-white px-12 py-4 rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-2xl shadow-slate-200 hover:bg-rose-500 hover:shadow-rose-100 transition-all active:scale-95 flex items-center gap-3 group cursor-pointer"
                >
                  {currentStep === 5 ? "Join the Tribe" : currentStep === 1 ? "Let's Get Started" : "Next Adventure"}
                  {isSignupPending ? <Loader2 className="animate-spin" size={18} /> : <Plane size={18} className="rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                </button>
              </div>
            </form>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
