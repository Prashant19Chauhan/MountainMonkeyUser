"use client";

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, User, Mail, Phone, Calendar, Users, HelpCircle, Send } from 'lucide-react';
import { toast } from 'sonner';
import { submitEnquiry } from '@/services/enquiry.services';
import { motion, AnimatePresence } from 'framer-motion';

export interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    name?: string;
    firstName?: string;
    lastName?: string;
    email: string;
    phone?: string;
  } | null;
  enquiryData: {
    enquiryType: 'stay' | 'package' | 'activity' | 'destination' | 'route';
    itemId: string;
    itemTitle: string;
    checkInDate?: string;
    checkOutDate?: string;
    numberOfGuests?: number;
    roomType?: string;
    message?: string;
    scheduleDetails?: any;
  };
}

export const EnquiryModal = ({ isOpen, onClose, user, enquiryData }: EnquiryModalProps) => {
  const getInitialName = () => {
    if (user?.name) return user.name;
    if (user?.firstName) {
      return `${user.firstName}${user.lastName ? ' ' + user.lastName : ''}`;
    }
    return '';
  };

  const [name, setName] = useState(getInitialName());
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [message, setMessage] = useState(enquiryData.message || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Sync with user data once hydrated or if it changes
  useEffect(() => {
    if (isOpen) {
      if (user) {
        setName(prev => prev || getInitialName());
        setEmail(prev => prev || user.email || '');
        setPhone(prev => prev || user.phone || '');
      }
      setMessage(enquiryData.message || '');
    }
  }, [user, isOpen, enquiryData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim() || !message.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);
    try {
      await submitEnquiry({
        name,
        email,
        phone,
        enquiryType: enquiryData.enquiryType,
        itemId: enquiryData.itemId,
        itemTitle: enquiryData.itemTitle,
        checkInDate: enquiryData.checkInDate,
        checkOutDate: enquiryData.checkOutDate,
        numberOfGuests: enquiryData.numberOfGuests,
        roomType: enquiryData.roomType,
        message,
        scheduleDetails: enquiryData.scheduleDetails
      });
      toast.success("Your enquiry has been sent successfully!");
      setMessage('');
      onClose();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to submit enquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] overflow-y-auto bg-slate-950/60 backdrop-blur-sm flex justify-center items-start sm:items-center p-4">
          {/* Backdrop click close */}
          <div className="absolute inset-0 cursor-default" onClick={onClose} />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="bg-white/95 border border-slate-200/50 backdrop-blur-md rounded-[1.5rem] sm:rounded-[2rem] p-5 sm:p-8 max-w-lg w-full shadow-2xl relative font-sans text-slate-800 my-4 sm:my-8 z-10"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 bg-slate-100 hover:bg-slate-200 rounded-full transition-all text-slate-500 cursor-pointer border-0 animate-pulse-once"
            >
              <X size={18} />
            </button>

            {/* Header */}
            <div className="mb-4 sm:mb-6">
              <div className="bg-rose-50 text-rose-500 w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center mb-2 sm:mb-3 shadow-sm">
                <HelpCircle size={22} className="sm:w-6 sm:h-6" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Request Details</h3>
              <p className="text-[10px] sm:text-xs text-slate-400 font-semibold uppercase tracking-wider mt-1 leading-normal truncate">
                For {enquiryData.itemTitle}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">

              {/* Context/Transaction Summary (Sticky summary card) */}
              <div className="bg-slate-50 border border-slate-100 p-3 sm:p-4 rounded-xl sm:rounded-2xl space-y-2 text-xs">
                <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Enquiry Parameters</span>
                <div className="grid grid-cols-2 gap-y-2 font-semibold text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={13} className="text-slate-400 shrink-0" />
                    <span className="truncate">
                      {enquiryData.checkInDate ? new Date(enquiryData.checkInDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) : 'Flexible Dates'}
                      {enquiryData.checkOutDate ? ` - ${new Date(enquiryData.checkOutDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}` : ''}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 justify-end">
                    <Users size={13} className="text-slate-400 shrink-0" />
                    <span>{enquiryData.numberOfGuests || 1} Explorer{enquiryData.numberOfGuests && enquiryData.numberOfGuests > 1 ? 's' : ''}</span>
                  </div>
                  {enquiryData.roomType && (
                    <div className="col-span-2 border-t border-slate-200/50 pt-2 mt-1">
                      <span className="text-[9px] sm:text-[10px] text-slate-400 uppercase font-black tracking-wide mr-1">Room Class:</span>
                      <span className="text-slate-700 font-bold">{enquiryData.roomType}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Prefilled Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Your Full Name</label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" size={15} />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                      className="w-full rounded-xl border border-slate-100 bg-slate-50/50 py-2.5 sm:py-3 pl-11 pr-4 outline-none transition-all focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 text-xs font-bold text-slate-700"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" size={15} />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full rounded-xl border border-slate-100 bg-slate-50/50 py-2.5 sm:py-3 pl-11 pr-4 outline-none transition-all focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 text-xs font-bold text-slate-700"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Phone Number</label>
                  <div className="relative group">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" size={15} />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Enter your phone number"
                      className="w-full rounded-xl border border-slate-100 bg-slate-50/50 py-2.5 sm:py-3 pl-11 pr-4 outline-none transition-all focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 text-xs font-bold text-slate-700"
                    />
                  </div>
                </div>
              </div>

              {/* Traveler message */}
              <div className="space-y-1">
                <label className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Custom Message / Requests</label>
                <textarea
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="What details or questions do you have for our guides regarding this trip? Any customization requests?"
                  className="w-full rounded-xl border border-slate-100 bg-slate-50/50 p-3 sm:p-4 outline-none transition-all focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 text-xs font-bold text-slate-700 leading-relaxed resize-none h-20 sm:h-24"
                />
              </div>

              {/* Actions */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-xl bg-slate-900 py-3 sm:py-3.5 font-black text-white text-xs uppercase tracking-widest hover:bg-rose-500 hover:shadow-lg hover:shadow-rose-100 transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:bg-slate-300"
              >
                {isSubmitting ? "Sending Enquiry..." : "Submit Enquiry Form"}
                {!isSubmitting && <Send size={14} />}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};
