'use client';

import React from 'react';
import { HelpCircle, Mail, Phone, Clock, Wrench } from 'lucide-react';

const CONTACT_ITEMS = [
  {
    icon: Mail,
    label: 'Email Support',
    value: 'support@mountainmonkey.in',
    sub: 'We typically reply within 24 hours',
    color: 'text-blue-500',
    bg: 'bg-blue-50',
  },
  {
    icon: Phone,
    label: 'Phone Support',
    value: '+91 98765 43210',
    sub: 'Mon–Sat, 9 AM – 6 PM IST',
    color: 'text-emerald-500',
    bg: 'bg-emerald-50',
  },
  {
    icon: Clock,
    label: 'Business Hours',
    value: '9:00 AM – 6:00 PM IST',
    sub: 'Monday to Saturday',
    color: 'text-amber-500',
    bg: 'bg-amber-50',
  },
];

export default function HelpSupport() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Help & Support</h1>
        <p className="text-sm text-slate-500 mt-1 font-medium">Get help with your bookings, enquiries, and account</p>
      </div>

      {/* Coming Soon Banner */}
      <div className="relative bg-white rounded-2xl border border-slate-200/80 overflow-hidden mb-6 shadow-sm">
        {/* Decorative BG glow */}
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-orange-500/5 rounded-full blur-2xl pointer-events-none" />

        <div className="relative p-8 text-center">
          <div className="w-20 h-20 bg-orange-50 rounded-2xl flex items-center justify-center mx-auto mb-5 border border-orange-100">
            <Wrench size={34} className="text-orange-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-100 mb-4">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            <span className="text-[10px] font-bold text-orange-600 uppercase tracking-widest">Coming Soon</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Self-Service Help Centre</h2>
          <p className="text-xs text-slate-500 font-medium max-w-sm mx-auto leading-relaxed">
            We&apos;re building a complete help centre with FAQs, ticket tracking, and live chat.
            In the meantime, reach out to us directly!
          </p>
        </div>
      </div>

      {/* Contact Options */}
      <div className="space-y-3">
        {CONTACT_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className="bg-white rounded-2xl border border-slate-100 px-5 py-4 flex items-center gap-4 hover:border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-300"
            >
              <div className={`w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center flex-shrink-0 border border-slate-50`}>
                <Icon size={18} className={item.color} />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">{item.label}</p>
                <p className="font-bold text-slate-800 text-sm mt-0.5">{item.value}</p>
                <p className="text-xs text-slate-500 mt-0.5 font-medium">{item.sub}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* FAQ quick links */}
      <div className="mt-6 bg-white rounded-2xl border border-slate-100 p-5 shadow-xs">
        <div className="flex items-center gap-2 mb-4">
          <HelpCircle size={16} className="text-orange-500" />
          <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider">Quick Help</h3>
        </div>
        <div className="space-y-2">
          {[
            'How do I cancel or modify an enquiry?',
            'How long does review approval take?',
            'Can I update my traveler story after submission?',
            'How do I change my account email?',
          ].map((question) => (
            <a
              key={question}
              href="/faq"
              className="flex items-center justify-between px-4 py-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-100 text-xs font-bold text-slate-600 hover:text-slate-900 transition-all group no-underline"
            >
              <span>{question}</span>
              <span className="text-slate-400 group-hover:text-slate-600 text-[10px] font-bold uppercase tracking-wider transition-colors ml-4 whitespace-nowrap">View FAQ →</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
