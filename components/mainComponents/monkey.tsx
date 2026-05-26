'use client'

import React, { useState } from "react";
import Lottie from "lottie-react";
import monkeyAnimation from "@/public/monkeyIcon.json";
import { Sparkles, MessageCircle, Zap } from "lucide-react";

function Monkey() {
  const [isHovered, setIsHovered] = useState(false);
  const [isPulsing, setIsPulsing] = useState(true);

  return (
    <div className="relative group">
      {/* Animated rings */}
      {isPulsing && (
        <>
          <div className="absolute inset-0 rounded-full bg-purple-400 animate-ping opacity-20"></div>
          <div className="absolute inset-0 rounded-full bg-indigo-400 animate-pulse opacity-20"></div>
        </>
      )}

      {/* Main Button */}
      <button
        onMouseEnter={() => {
          setIsHovered(true);
          setIsPulsing(false);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
          setIsPulsing(true);
        }}
        className="relative flex items-center justify-center 
                   w-14 h-14 sm:w-20 sm:h-20 
                   bg-linear-to-br from-purple-500 via-indigo-600 to-blue-600
                   rounded-full 
                   shadow-2xl 
                   hover:shadow-purple-500/50
                   hover:scale-110 
                   active:scale-95
                   transition-all duration-300
                   focus:outline-none
                   focus:ring-4 focus:ring-purple-300
                   overflow-hidden
                   border-4 border-white/20
                   cursor-pointer"
      >
        {/* Shimmer effect */}
        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        
        {/* Lottie Animation */}
        <Lottie
          animationData={monkeyAnimation}
          loop
          autoplay
          className="w-24 h-24 sm:w-[140px] sm:h-[140px] shrink-0"
        />

        {/* Notification Badge */}
        <div className="absolute -top-0.5 -right-0.5 w-4 h-4 sm:w-5 sm:h-5 bg-red-500 rounded-full border-2 border-white flex items-center justify-center">
          <Sparkles size={8} className="text-white sm:hidden" />
          <Sparkles size={10} className="text-white hidden sm:block" />
        </div>
      </button>

      {/* Tooltip on hover */}
      {isHovered && (
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 
                        bg-slate-900 text-white px-4 py-2 rounded-lg 
                        shadow-xl whitespace-nowrap
                        animate-in fade-in slide-in-from-bottom-2 duration-200
                        before:content-[''] before:absolute before:top-full before:left-1/2 before:-translate-x-1/2
                        before:border-8 before:border-transparent before:border-t-slate-900">
          <div className="flex items-center gap-2">
            <Zap size={14} className="text-yellow-400" />
            <span className="text-sm font-bold">AI Assistant</span>
          </div>
        </div>
      )}

      {/* Expandable label (shows on hover) */}
      <div className={`absolute left-24 top-1/2 -translate-y-1/2
                       bg-linear-to-r from-purple-600 to-indigo-600 
                       text-white px-6 py-3 rounded-full
                       shadow-lg font-bold text-sm
                       transition-all duration-300 whitespace-nowrap
                       ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 pointer-events-none'}`}>
        <div className="flex items-center gap-2">
          <MessageCircle size={16} />
          <span>Chat with AI</span>
        </div>
      </div>

      {/* Bottom mini label */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 
                      text-xs font-bold text-slate-600 whitespace-nowrap
                      opacity-0 group-hover:opacity-100 transition-opacity">
        Click to start
      </div>
    </div>
  );
}

export default Monkey;