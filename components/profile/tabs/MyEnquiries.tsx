'use client';

import React, { useState } from 'react';
import { FileText, Users, Calendar, MessageCircle, ChevronLeft, ChevronRight, Loader2, Package, Activity, Home, Compass } from 'lucide-react';
import { useMyEnquiries } from '@/hooks/useProfileEnquiries';
import { Enquiry } from '@/services/enquiry.services';

const TYPE_CONFIG: Record<string, { icon: React.ElementType; color: string; bg: string }> = {
  package:     { icon: Package,    color: 'text-blue-500',   bg: 'bg-blue-50' },
  stay:        { icon: Home,       color: 'text-purple-500', bg: 'bg-purple-50' },
  activity:    { icon: Activity,   color: 'text-emerald-500', bg: 'bg-emerald-50' },
  destination: { icon: Compass,    color: 'text-amber-500',  bg: 'bg-amber-50' },
};

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; border: string }> = {
  Pending:   { label: 'Pending',   color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-100' },
  Reviewed:  { label: 'Reviewed',  color: 'text-blue-600',   bg: 'bg-blue-50', border: 'border-blue-100' },
  Completed: { label: 'Completed', color: 'text-emerald-600',  bg: 'bg-emerald-50', border: 'border-emerald-100' },
};

const EnquiryCard = ({ enquiry }: { enquiry: Enquiry }) => {
  const typeConfig = TYPE_CONFIG[enquiry.enquiryType] || TYPE_CONFIG.package;
  const statusConfig = STATUS_CONFIG[enquiry.status] || STATUS_CONFIG.Pending;
  const TypeIcon = typeConfig.icon;

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-5 hover:border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-300 group">
      <div className="flex items-start gap-4">
        <div className={`w-10 h-10 rounded-xl ${typeConfig.bg} flex items-center justify-center flex-shrink-0 mt-0.5 border border-slate-50`}>
          <TypeIcon size={18} className={typeConfig.color} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-bold text-slate-800 text-sm truncate">{enquiry.itemTitle}</h3>
            <span className={`flex-shrink-0 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${statusConfig.bg} ${statusConfig.color} ${statusConfig.border}`}>
              {statusConfig.label}
            </span>
          </div>
          <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 capitalize mb-3">{enquiry.enquiryType} enquiry</p>

          <div className="grid grid-cols-2 gap-2 text-xs text-slate-500 mb-3 font-medium">
            {enquiry.checkInDate && (
              <div className="flex items-center gap-1.5">
                <Calendar size={12} className="text-slate-400" />
                <span>{new Date(enquiry.checkInDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
              </div>
            )}
            {enquiry.numberOfGuests && (
              <div className="flex items-center gap-1.5">
                <Users size={12} className="text-slate-400" />
                <span>{enquiry.numberOfGuests} guest{enquiry.numberOfGuests > 1 ? 's' : ''}</span>
              </div>
            )}
          </div>

          <div className="bg-slate-50 border border-slate-100 rounded-xl px-4 py-3">
            <div className="flex items-start gap-1.5">
              <MessageCircle size={12} className="text-slate-400 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-slate-600 font-medium leading-relaxed italic">&ldquo;{enquiry.message}&ldquo;</p>
            </div>
          </div>

          <p className="text-[10px] text-slate-400 font-bold mt-3">
            Submitted {new Date(enquiry.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default function MyEnquiries() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useMyEnquiries(page, 6);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">My Enquiries</h1>
        <p className="text-sm text-slate-500 mt-1 font-medium">Track your package, stay, activity, and destination enquiries</p>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 size={32} className="animate-spin text-orange-500" />
        </div>
      ) : !data || data.data.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-slate-100 shadow-xs p-8 max-w-md mx-auto">
          <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-slate-100">
            <FileText size={28} className="text-slate-400" />
          </div>
          <h3 className="font-bold text-slate-800 mb-2 uppercase tracking-wider text-xs">No enquiries yet</h3>
          <p className="text-xs text-slate-500 font-medium leading-relaxed">Browse our packages, stays, and activities and send an enquiry to get started.</p>
        </div>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            {data.data.map((enquiry) => (
              <EnquiryCard key={enquiry._id} enquiry={enquiry} />
            ))}
          </div>

          {/* Pagination */}
          {data.meta.totalPages > 1 && (
            <div className="flex items-center justify-between mt-6 bg-white rounded-2xl border border-slate-100 px-5 py-3 shadow-xs">
              <p className="text-xs font-medium text-slate-500">
                Page {data.meta.currentPage} of {data.meta.totalPages}
                <span className="ml-2 text-slate-400">({data.meta.total} total)</span>
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200/50 text-xs font-bold text-slate-600 disabled:opacity-30 transition-all cursor-pointer"
                >
                  <ChevronLeft size={14} /> Prev
                </button>
                <button
                  onClick={() => setPage((p) => Math.min(data.meta.totalPages, p + 1))}
                  disabled={page === data.meta.totalPages}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200/50 text-xs font-bold text-slate-600 disabled:opacity-30 transition-all cursor-pointer"
                >
                  Next <ChevronRight size={14} />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
