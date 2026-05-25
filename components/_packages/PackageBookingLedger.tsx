"use client";

import React, { useState } from 'react';
import { Calendar, Users, Car, Lock, MessageCircle } from 'lucide-react';

type PackageBookingLedgerProps = {
  packageDetails: any;
  discountPercentage: number;
  baseTotal: number;
  taxes: number;
  totalDiscount: number;
  totalPrice: number;
};

export const PackageBookingLedger = ({
  packageDetails,
  discountPercentage,
  baseTotal,
  taxes,
  totalDiscount,
  totalPrice
}: PackageBookingLedgerProps) => {
  return (
    <div className="sticky top-28 bg-white border border-gray-100 rounded-[2.5rem] p-6 shadow-xl shadow-gray-200/50">
      
      <div className="flex justify-between items-start mb-6 border-b border-gray-100 pb-6">
        <div>
          <p className="text-gray-500 text-sm mb-1">Price per person</p>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-black text-gray-900">
              ₹{packageDetails.pricing.discountedPrice?.toLocaleString('en-IN') || packageDetails.pricing.basePrice.toLocaleString('en-IN')}
            </span>
            {packageDetails.pricing.discountedPrice && (
              <span className="text-sm text-gray-400 line-through mb-1">
                ₹{packageDetails.pricing.basePrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>
        </div>
        {discountPercentage > 0 && (
          <div className="bg-red-50 text-red-600 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider">
            Save {discountPercentage}%
          </div>
        )}
      </div>

      {/* Booking Form Inputs */}
      <div className="space-y-4 mb-6">
        
        {/* Dates */}
        <div className="border border-gray-200 rounded-2xl p-1 relative">
          <div className="flex items-center px-4 py-2 border-b border-gray-100 cursor-pointer hover:bg-gray-50 rounded-t-xl transition-colors">
            <div className="flex-1">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Dates</p>
              <p className="text-sm font-bold text-gray-900">
                {new Date(packageDetails.availability.startDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })} - 
                {new Date(new Date(packageDetails.availability.startDate).getTime() + (packageDetails.duration.days * 24 * 60 * 60 * 1000)).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
              </p>
            </div>
            <Calendar size={18} className="text-gray-400" />
          </div>
          <div className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-50 rounded-b-xl transition-colors">
            <div className="flex-1">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Travelers</p>
              <p className="text-sm font-bold text-gray-900">2 Adults, 0 Children</p>
            </div>
            <Users size={18} className="text-gray-400" />
          </div>
        </div>

        {/* Transport Option */}
        {packageDetails.transport.included && (
          <div className="border border-gray-200 rounded-2xl p-4 cursor-pointer hover:border-gray-300 transition-colors">
            <div className="flex justify-between items-center mb-2">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Transport</p>
              <span className="text-[10px] text-blue-600 font-bold">Included</span>
            </div>
            <p className="text-sm font-bold text-gray-900 flex items-center gap-1">
              <Car size={14}/> {packageDetails.transport.modes.join(', ')}
            </p>
          </div>
        )}

      </div>

      {/* Price Breakdown */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-sm text-gray-600">
          <span className="underline decoration-dotted cursor-pointer hover:text-gray-900">
            2x Adults (₹{(packageDetails.pricing.discountedPrice || packageDetails.pricing.basePrice).toLocaleString('en-IN')})
          </span>
          <span className="font-medium">₹{baseTotal.toLocaleString('en-IN')}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span className="underline decoration-dotted cursor-pointer hover:text-gray-900">Taxes & Fees</span>
          <span className="font-medium">₹{taxes.toLocaleString('en-IN')}</span>
        </div>
        {totalDiscount > 0 && (
          <div className="flex justify-between text-sm text-green-600 font-medium">
            <span>Discount Applied</span>
            <span>-₹{totalDiscount.toLocaleString('en-IN')}</span>
          </div>
        )}
        <div className="pt-3 border-t border-gray-100 flex justify-between items-end">
          <span className="font-bold text-gray-900">Total</span>
          <span className="text-2xl font-black text-gray-900">₹{totalPrice.toLocaleString('en-IN')}</span>
        </div>
      </div>

      {/* Actions */}
      <button type="button" className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-sm shadow-xl shadow-blue-600/20 hover:bg-blue-700 hover:-translate-y-0.5 transition-all mb-4 cursor-pointer">
        Check Availability ({packageDetails.availability.availableSeats} seats left)
      </button>
      
      <p className="text-center text-xs text-gray-500 font-medium flex items-center justify-center gap-1">
        <Lock size={12} className="text-gray-400" /> No payment needed today
      </p>

      {/* Support */}
      <div className="mt-6 pt-6 border-t border-gray-100">
        <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-blue-600">
            <MessageCircle size={18} />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium">Need help booking?</p>
            <p className="text-sm font-bold text-gray-900 hover:text-blue-600 cursor-pointer transition-colors">Chat with an expert</p>
          </div>
        </div>
      </div>
    </div>
  );
};
