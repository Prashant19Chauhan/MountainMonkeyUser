"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, MessageSquare, Globe } from 'lucide-react';
import { submitContactMessageApi } from '@/services/contact.services';
import { toast } from 'sonner';

export default function ContactContent() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error("Please fill in all required fields (Name, Email, Message).");
      return;
    }

    setLoading(true);
    try {
      await submitContactMessageApi(formData);
      setSubmitted(true);
      toast.success("Your message has been sent successfully!");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to submit message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const contactDetails = [
    {
      icon: MapPin,
      title: "Basecamp Address",
      details: "108 Summit Ridge, Peak View Road",
      subDetails: "Manali, Himachal Pradesh, 175131, India",
      color: "text-rose-500",
      bgColor: "bg-rose-50"
    },
    {
      icon: Phone,
      title: "Exploration Desk",
      details: "+91 98765 43210",
      subDetails: "Mon to Sat, 9:00 AM - 6:00 PM IST",
      color: "text-indigo-500",
      bgColor: "bg-indigo-50"
    },
    {
      icon: Mail,
      title: "Digital Correspondence",
      details: "explore@mountainmonkey.com",
      subDetails: "Inbound communications answered within 24h",
      color: "text-emerald-500",
      bgColor: "bg-emerald-50"
    },
    {
      icon: Clock,
      title: "Operation Timings",
      details: "Himalayan Time (GMT+5:30)",
      subDetails: "Emergency field assistance 24/7",
      color: "text-amber-500",
      bgColor: "bg-amber-50"
    }
  ];

  return (
    <div className="bg-[#f8fafc] min-h-screen font-sans">
      {/* Hero Section */}
      <div className="relative h-[45vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1454496522488-7a8e488e8606?q=80&w=2076" 
            alt="Himalayan Mountain Range Basecamp"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px]" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center px-6 space-y-4">
          <motion.span 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[10px] sm:text-xs font-black text-rose-400 uppercase tracking-[0.3em] block"
          >
            Himalayan Expedition Desk
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight"
          >
            Contact Basecamp
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-sm sm:text-base md:text-lg font-bold text-slate-200 tracking-wide max-w-xl mx-auto"
          >
            Have a question about our Himalayan tours, stays, or customizable itineraries? Reach out to our guide team below.
          </motion.p>
        </div>

        {/* Waves divider */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-[#f8fafc] clip-path-wave" style={{ clipPath: "ellipse(60% 100% at 50% 100%)" }} />
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Column 1: Basecamp Details */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-indigo-500 block mb-2">
                Operational Directory
              </span>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">Our Basecamp HQ</h2>
              <p className="text-slate-500 font-medium text-sm mt-2 leading-relaxed">
                Nestled in the foothills of the high Himalayas, our operational command center handles traveler support, custom itineraries coordination, and field safety protocols.
              </p>
            </div>

            {/* Contact details cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {contactDetails.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    className="bg-white border border-slate-100 p-5 rounded-3xl shadow-xs flex gap-4 hover:shadow-md hover:border-slate-200/60 transition-all duration-300 group"
                  >
                    <div className={`${item.bgColor} ${item.color} p-3.5 rounded-2xl shrink-0 group-hover:scale-105 transition-transform duration-300 h-fit`}>
                      <Icon size={20} />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 block">{item.title}</span>
                      <p className="font-extrabold text-slate-900 text-sm">{item.details}</p>
                      <p className="text-xs text-slate-500 font-medium">{item.subDetails}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Column 2: Interactive Contact Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-[3rem] border border-slate-100 shadow-sm relative overflow-hidden">
            
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.div
                  key="form-state"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-[0.25em] text-rose-500 block mb-2">
                      Digital Transmission
                    </span>
                    <h2 className="text-2xl font-black text-slate-900 uppercase tracking-wide">Send a Message</h2>
                    <p className="text-slate-500 font-medium text-xs">Fill out the coordinates below and our lead explorer will contact you shortly.</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
                          Full Name <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-800 focus:outline-none focus:ring-4 focus:ring-rose-500/10 focus:bg-white transition-all text-xs"
                          placeholder="e.g. Tenzing Norgay"
                        />
                      </div>

                      {/* Email */}
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
                          Email Address <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-800 focus:outline-none focus:ring-4 focus:ring-rose-500/10 focus:bg-white transition-all text-xs"
                          placeholder="e.g. tenzing@summit.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Phone */}
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-800 focus:outline-none focus:ring-4 focus:ring-rose-500/10 focus:bg-white transition-all text-xs"
                          placeholder="e.g. +91 98765 43210"
                        />
                      </div>

                      {/* Subject */}
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
                          Subject / Topic
                        </label>
                        <input
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-800 focus:outline-none focus:ring-4 focus:ring-rose-500/10 focus:bg-white transition-all text-xs"
                          placeholder="e.g. Custom itinerary request"
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex justify-between items-center">
                        <span>Detailed message <span className="text-rose-500">*</span></span>
                        <span className="text-[9px] text-slate-300 font-bold lowercase tracking-normal">Max 1000 characters</span>
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={5}
                        maxLength={1000}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-800 focus:outline-none focus:ring-4 focus:ring-rose-500/10 focus:bg-white transition-all text-xs leading-relaxed resize-none"
                        placeholder="Type the details of your inquiry or custom itinerary plans here..."
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4.5 bg-slate-900 hover:bg-rose-500 text-white rounded-2xl font-black uppercase tracking-[0.2em] shadow-xl shadow-slate-200 transition-all flex items-center justify-center gap-2 cursor-pointer border-0 duration-300 hover:-translate-y-0.5 active:translate-y-0"
                    >
                      {loading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <Send size={14} />
                          <span>Submit Message</span>
                        </>
                      )}
                    </button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success-state"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-12 text-center space-y-6"
                >
                  <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-md shadow-emerald-50/50">
                    <CheckCircle2 size={40} />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">Transmission Received</h3>
                    <p className="text-slate-500 font-medium text-sm max-w-sm mx-auto leading-relaxed">
                      Thank you, <strong className="text-slate-800">{formData.name}</strong>! Your Contact Us submission has been securely delivered to our operational admin dashboard.
                    </p>
                  </div>

                  <p className="text-xs text-slate-400 font-bold">
                    One of our expert Himalayan coordinators will follow up with you at <strong className="text-slate-600">{formData.email}</strong> shortly.
                  </p>

                  <button
                    onClick={() => {
                      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
                      setSubmitted(false);
                    }}
                    className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-black text-[10px] uppercase tracking-widest transition border-0 cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>
      </div>
    </div>
  );
}
