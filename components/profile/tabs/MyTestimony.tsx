'use client';

import React, { useState } from 'react';
import { MessageSquare, Star, Trash2, Loader2, Check, Plus, X } from 'lucide-react';
import { useMyTestimonials, useSubmitTestimonial, useDeleteTestimonial, UserTestimonial } from '@/hooks/useProfileTestimony';

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; border: string }> = {
  pending:  { label: 'Under Review', color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-100' },
  approved: { label: 'Published',    color: 'text-emerald-600',  bg: 'bg-emerald-50', border: 'border-emerald-100' },
  rejected: { label: 'Rejected',     color: 'text-rose-600',    bg: 'bg-rose-50', border: 'border-rose-100' },
};

const StarRating = ({ value, onChange, interactive }: { value: number; onChange: (v: number) => void; interactive?: boolean }) => (
  <div className="flex gap-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <button
        key={star}
        type="button"
        onClick={() => interactive && onChange(star)}
        className={interactive ? 'cursor-pointer border-0 bg-transparent p-0' : 'cursor-default border-0 bg-transparent p-0'}
      >
        <Star
          size={interactive ? 22 : 16}
          className={star <= value ? 'text-amber-500 fill-amber-500' : 'text-slate-200'}
        />
      </button>
    ))}
  </div>
);

const TestimonialCard = ({ testimonial, onDelete }: { testimonial: UserTestimonial; onDelete: (id: string) => void }) => {
  const status = STATUS_CONFIG[testimonial.status] || STATUS_CONFIG.pending;
  return (
    <div className={`bg-white rounded-2xl border ${status.border} p-6 shadow-xs`}>
      <div className="flex items-start justify-between gap-3 mb-4">
        <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${status.bg} ${status.color} border ${status.border}`}>
          {status.label}
        </span>
        <div className="flex items-center gap-3">
          <StarRating value={testimonial.rating} onChange={() => {}} />
          {testimonial.status === 'pending' && (
            <button
              onClick={() => onDelete(testimonial._id)}
              className="text-rose-500 hover:text-rose-700 transition-colors cursor-pointer border-0 bg-transparent"
              title="Delete testimonial"
            >
              <Trash2 size={15} />
            </button>
          )}
        </div>
      </div>

      <blockquote className="text-slate-600 text-sm leading-relaxed italic font-medium">
        &ldquo;{testimonial.message}&rdquo;
      </blockquote>

      {testimonial.isFeatured && (
        <div className="mt-3 flex items-center gap-1.5 text-amber-500 text-xs font-bold uppercase tracking-wider">
          <Star size={12} className="fill-amber-500 text-amber-500" />
          <span>Featured on homepage</span>
        </div>
      )}

      <p className="text-[10px] text-slate-400 font-bold mt-3">
        Submitted {new Date(testimonial.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
      </p>
    </div>
  );
};

const TestimonialForm = ({ onSubmit, onCancel, isPending }: {
  onSubmit: (msg: string, rating: number) => void;
  onCancel: () => void;
  isPending: boolean;
}) => {
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(5);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-lg">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">Share Your Experience</h3>
        <button onClick={onCancel} className="text-slate-400 hover:text-slate-700 transition-colors cursor-pointer border-0 bg-transparent">
          <X size={18} />
        </button>
      </div>

      <div className="mb-5">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2 block">Rating</label>
        <StarRating value={rating} onChange={setRating} interactive />
      </div>

      <div className="mb-5">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5 block">Your Message</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          placeholder="Tell others about your experience with Mountain Monkey — the service, the guides, the adventure..."
          className="w-full bg-slate-50 border border-slate-200/60 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/10 focus:border-orange-500/30 transition-all resize-none"
        />
      </div>

      <div className="flex gap-3">
        <button
          onClick={onCancel}
          className="flex-1 px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider transition-all border-0 cursor-pointer"
        >
          Cancel
        </button>
        <button
          onClick={() => message.trim() && onSubmit(message, rating)}
          disabled={isPending || !message.trim()}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold uppercase tracking-wider transition-all disabled:opacity-60 border-0 cursor-pointer shadow-md shadow-orange-500/10"
        >
          {isPending ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
          {isPending ? 'Submitting...' : 'Submit Testimony'}
        </button>
      </div>
    </div>
  );
};

export default function MyTestimony() {
  const { data: testimonials, isLoading } = useMyTestimonials();
  const { mutate: submitTestimonial, isPending: isSubmitting } = useSubmitTestimonial();
  const { mutate: deleteTestimonial } = useDeleteTestimonial();
  const [showForm, setShowForm] = useState(false);

  const hasPendingOrApproved = testimonials?.some((t) => t.status !== 'rejected');

  const handleSubmit = (message: string, rating: number) => {
    submitTestimonial({ message, rating }, { onSuccess: () => setShowForm(false) });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">My Testimony</h1>
          <p className="text-sm text-slate-500 mt-1 font-medium">Share your feedback about the Mountain Monkey experience</p>
        </div>
        {!showForm && !hasPendingOrApproved && (
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold uppercase tracking-wider transition-all border-0 cursor-pointer shadow-md shadow-orange-500/10"
          >
            <Plus size={14} /> Add Testimony
          </button>
        )}
      </div>

      {/* Info banner */}
      <div className="bg-orange-50 border border-orange-100 rounded-xl px-4 py-3 mb-6 flex items-start gap-3 shadow-xs">
        <MessageSquare size={16} className="text-orange-500 mt-0.5 flex-shrink-0" />
        <p className="text-xs text-orange-800 leading-relaxed font-semibold">
          Your testimony is a single message shown on our website for other travelers to read.
          Submissions are reviewed by our team before being published.
        </p>
      </div>

      {showForm && (
        <div className="mb-6">
          <TestimonialForm
            onSubmit={handleSubmit}
            onCancel={() => setShowForm(false)}
            isPending={isSubmitting}
          />
        </div>
      )}

      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 size={32} className="animate-spin text-orange-500" />
        </div>
      ) : !testimonials || testimonials.length === 0 ? (
        !showForm && (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-100 p-8 shadow-xs max-w-md mx-auto">
            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-slate-100">
              <MessageSquare size={28} className="text-slate-400" />
            </div>
            <h3 className="font-bold text-slate-800 mb-2 uppercase tracking-wider text-xs">No testimony yet</h3>
            <p className="text-xs text-slate-500 font-medium leading-relaxed mb-5">Let others know how their Mountain Monkey adventure could be!</p>
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold uppercase tracking-wider transition-all border-0 cursor-pointer shadow-md shadow-orange-500/10"
            >
              <Plus size={14} /> Write a Testimony
            </button>
          </div>
        )
      ) : (
        <div className="space-y-4">
          {testimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial._id}
              testimonial={testimonial}
              onDelete={(id) => deleteTestimonial(id)}
            />
          ))}
          {hasPendingOrApproved && (
            <p className="text-xs text-slate-400 text-center pt-2 font-medium">
              You already have an active testimony. Delete your current pending testimony to submit a new one.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
