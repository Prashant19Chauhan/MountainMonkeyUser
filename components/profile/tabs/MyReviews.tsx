'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Star, Trash2, Loader2, X, Check, Package, Activity, Home, Compass, Info, MessageSquare } from 'lucide-react';
import { useMyReviews, useSubmitReview, useDeleteReview } from '@/hooks/useProfileReviews';
import { Review } from '@/services/review.services';

const TYPE_CONFIG: Record<string, { icon: React.ElementType; color: string; bg: string; label: string }> = {
  package:     { icon: Package, color: 'text-blue-500',   bg: 'bg-blue-50',   label: 'Package' },
  stay:        { icon: Home,    color: 'text-purple-500', bg: 'bg-purple-50', label: 'Stay' },
  activity:    { icon: Activity,color: 'text-emerald-500',  bg: 'bg-emerald-50',  label: 'Activity' },
  destination: { icon: Compass, color: 'text-amber-500',  bg: 'bg-amber-50',  label: 'Destination' },
};

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; border: string }> = {
  pending:  { label: 'Under Review', color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-100' },
  approved: { label: 'Published',    color: 'text-emerald-600',  bg: 'bg-emerald-50', border: 'border-emerald-100' },
  rejected: { label: 'Rejected',     color: 'text-rose-600',    bg: 'bg-rose-50', border: 'border-rose-100' },
};

const StarRating = ({ value, onChange, interactive }: { value: number; onChange: (v: number) => void; interactive?: boolean }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((star) => (
      <button
        key={star}
        type="button"
        onClick={() => interactive && onChange(star)}
        className={interactive ? 'cursor-pointer border-0 bg-transparent p-0' : 'cursor-default border-0 bg-transparent p-0'}
      >
        <Star
          size={interactive ? 22 : 15}
          className={star <= value ? 'text-amber-500 fill-amber-500' : 'text-slate-200'}
        />
      </button>
    ))}
  </div>
);

const ReviewCard = ({ review, onDelete }: { review: Review; onDelete: (id: string) => void }) => {
  const typeConfig = TYPE_CONFIG[review.itemType] || TYPE_CONFIG.package;
  const statusConfig = STATUS_CONFIG[review.status] || STATUS_CONFIG.pending;
  const TypeIcon = typeConfig.icon;

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-5 hover:border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-300">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className={`w-9 h-9 rounded-xl ${typeConfig.bg} flex items-center justify-center flex-shrink-0 border border-slate-50`}>
            <TypeIcon size={16} className={typeConfig.color} />
          </div>
          <div className="min-w-0">
            <p className="font-bold text-slate-800 text-sm truncate">{review.itemTitle}</p>
            <p className={`text-[10px] font-black uppercase tracking-wider ${typeConfig.color}`}>{typeConfig.label}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${statusConfig.bg} ${statusConfig.color} ${statusConfig.border}`}>
            {statusConfig.label}
          </span>
          {review.status === 'pending' && (
            <button onClick={() => onDelete(review._id)} className="text-rose-500 hover:text-rose-700 transition-colors cursor-pointer border-0 bg-transparent">
              <Trash2 size={14} />
            </button>
          )}
        </div>
      </div>

      <div className="mb-3">
        <StarRating value={review.rating} onChange={() => {}} />
      </div>

      <p className="text-xs text-slate-600 font-medium leading-relaxed italic">&ldquo;{review.reviewText}&ldquo;</p>

      <p className="text-[10px] text-slate-400 font-bold mt-3">
        {new Date(review.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
      </p>
    </div>
  );
};

const formatSlug = (slug: string) => {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

interface ReviewFormProps {
  itemType: "package" | "stay" | "activity" | "destination";
  itemSlug: string;
  onSubmit: (rating: number, text: string) => void;
  onCancel: () => void;
  isPending: boolean;
}

const ReviewForm = ({ itemType, itemSlug, onSubmit, onCancel, isPending }: ReviewFormProps) => {
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  
  const typeConfig = TYPE_CONFIG[itemType] || TYPE_CONFIG.package;
  const TypeIcon = typeConfig.icon;
  const displayTitle = formatSlug(itemSlug);

  const isValid = reviewText.trim().length >= 10;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 space-y-5 shadow-lg relative z-10">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">Submit Your Review</h3>
        <button onClick={onCancel} className="text-slate-400 hover:text-slate-700 transition-colors cursor-pointer border-0 bg-transparent">
          <X size={18} />
        </button>
      </div>

      {/* Product Details Header (Read-Only) */}
      <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex items-center gap-3.5">
        <div className={`w-12 h-12 rounded-2xl ${typeConfig.bg} flex items-center justify-center flex-shrink-0 border border-slate-100`}>
          <TypeIcon size={20} className={typeConfig.color} />
        </div>
        <div>
          <h4 className="font-extrabold text-slate-800 text-sm">{displayTitle}</h4>
          <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 mt-0.5">Reviewing {typeConfig.label}</p>
        </div>
      </div>

      {/* Rating */}
      <div>
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2 block">Your Rating</label>
        <StarRating value={rating} onChange={setRating} interactive />
      </div>

      {/* Review Text */}
      <div className="space-y-1.5">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Your Experience</label>
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          rows={5}
          placeholder="Share your detailed feedback about this experience..."
          className="w-full bg-slate-50 border border-slate-200/60 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/10 focus:border-orange-500/30 transition-all resize-none"
        />
        <div className="flex justify-between text-[10px] text-slate-400 font-bold uppercase tracking-wider">
          <span>Minimum 10 characters</span>
          <span className={reviewText.trim().length >= 10 ? 'text-emerald-500' : 'text-slate-400'}>
            {reviewText.trim().length} chars
          </span>
        </div>
      </div>

      <div className="flex gap-3">
        <button onClick={onCancel} className="flex-1 px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider transition-all border-0 cursor-pointer">
          Cancel
        </button>
        <button
          onClick={() => isValid && onSubmit(rating, reviewText)}
          disabled={isPending || !isValid}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold uppercase tracking-wider transition-all disabled:opacity-60 border-0 cursor-pointer shadow-md shadow-orange-500/10"
        >
          {isPending ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
          {isPending ? 'Submitting...' : 'Submit Review'}
        </button>
      </div>
    </div>
  );
};

export default function MyReviews() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: reviews, isLoading, refetch } = useMyReviews();
  const { mutate: submitReview, isPending: isSubmitting } = useSubmitReview();
  const { mutate: deleteReview } = useDeleteReview();

  // Read URL search params
  const queryType = searchParams.get('type');
  const querySlug = searchParams.get('slug');

  // Verify parameters
  const isValidType = queryType && ["package", "stay", "activity", "destination"].includes(queryType);
  const showReviewForm = isValidType && querySlug;

  const handleSubmit = (rating: number, reviewText: string) => {
    if (!queryType || !querySlug) return;
    
    submitReview({
      itemType: queryType as "package" | "stay" | "activity" | "destination",
      itemSlug: querySlug,
      rating,
      reviewText
    }, {
      onSuccess: () => {
        // Clear query parameters and reload reviews
        refetch();
        router.replace('/profile?tab=reviews');
      }
    });
  };

  const handleCancel = () => {
    router.replace('/profile?tab=reviews');
  };

  const stats = reviews ? {
    total: reviews.length,
    approved: reviews.filter((r) => r.status === 'approved').length,
    avg: reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : '—',
  } : null;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">My Reviews</h1>
          <p className="text-sm text-slate-500 mt-1 font-medium">Rate packages, stays, activities, and destinations you've experienced</p>
        </div>
      </div>

      {/* Stats */}
      {stats && reviews && reviews.length > 0 && !showReviewForm && (
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: 'Total Reviews', value: stats.total },
            { label: 'Published', value: stats.approved },
            { label: 'Avg Rating', value: stats.avg },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl border border-slate-100 p-4 text-center shadow-xs">
              <p className="text-xl font-extrabold text-orange-500">{stat.value}</p>
              <p className="text-[10px] font-black text-slate-400 uppercase mt-0.5 tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      )}

      {showReviewForm && (
        <div className="mb-6">
          <ReviewForm 
            itemType={queryType as "package" | "stay" | "activity" | "destination"} 
            itemSlug={querySlug as string} 
            onSubmit={handleSubmit} 
            onCancel={handleCancel} 
            isPending={isSubmitting} 
          />
        </div>
      )}

      {/* Custom Write a Review Alert Box */}
      {!showReviewForm && (
        <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-5 mb-6 flex items-start gap-3 shadow-xs">
          <Info size={18} className="text-orange-500 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">How to review a product</h4>
            <p className="text-xs text-slate-500 leading-relaxed font-medium mt-1">
              To review a product, click the **&ldquo;Write a Review&rdquo;** button or link on that product&apos;s details page. 
              The system will automatically open your profile dashboard, identify the product, and prompt you to submit your review rating and message.
            </p>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 size={32} className="animate-spin text-orange-500" />
        </div>
      ) : !reviews || reviews.length === 0 ? (
        !showReviewForm && (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-100 p-8 shadow-xs max-w-md mx-auto">
            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-slate-100">
              <MessageSquare size={28} className="text-slate-400" />
            </div>
            <h3 className="font-bold text-slate-800 mb-2 uppercase tracking-wider text-xs">No reviews submitted yet</h3>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">Your submitted reviews will appear here once you write them from the product details pages.</p>
          </div>
        )
      ) : (
        !showReviewForm && (
          <div className="grid gap-6 sm:grid-cols-2">
            {reviews.map((review) => (
              <ReviewCard key={review._id} review={review} onDelete={(id) => deleteReview(id)} />
            ))}
          </div>
        )
      )}
    </div>
  );
}
