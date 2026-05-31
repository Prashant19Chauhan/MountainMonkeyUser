'use client';

import React, { useState } from 'react';
import {
  BookOpen, Plus, X, Loader2, Star, Calendar, Clock, MapPin, Tag,
  Image as ImageIcon, Edit3, Trash2, ChevronDown, ChevronUp, Check
} from 'lucide-react';
import { useMyStories, useCreateStory, useUpdateStory, useDeleteStory } from '@/hooks/useProfileStories';
import { TravelerStory, CreateStoryPayload } from '@/services/story.services';

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; border: string }> = {
  pending:  { label: 'Under Review', color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-100' },
  approved: { label: 'Published',    color: 'text-emerald-600',  bg: 'bg-emerald-50', border: 'border-emerald-100' },
  rejected: { label: 'Rejected',     color: 'text-rose-600',    bg: 'bg-rose-50', border: 'border-rose-100' },
};

const EMPTY_FORM: CreateStoryPayload = {
  title: '', shortDescription: '', content: '',
  tripExperience: '', storyAboutTrip: '', coverImage: '',
  location: '', destination: '', tripDate: '', tripDuration: '',
  tags: [], images: [], rating: 5,
};

const StarRating = ({ value, onChange, disabled }: { value: number; onChange: (v: number) => void; disabled?: boolean }) => (
  <div className="flex gap-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <button
        key={star}
        type="button"
        onClick={() => !disabled && onChange(star)}
        disabled={disabled}
        className="disabled:cursor-default cursor-pointer bg-transparent border-0 p-0"
      >
        <Star
          size={18}
          className={star <= value ? 'text-amber-500 fill-amber-500' : 'text-slate-200'}
        />
      </button>
    ))}
  </div>
);

const InputField = ({
  label, value, onChange, placeholder = '', type = 'text', multiline = false, rows = 4
}: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; type?: string; multiline?: boolean; rows?: number;
}) => (
  <div className="space-y-1.5">
    <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">{label}</label>
    {multiline ? (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        placeholder={placeholder}
        className="w-full bg-slate-50 border border-slate-200/60 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/10 focus:border-orange-500/30 transition-all resize-none"
      />
    ) : (
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-slate-50 border border-slate-200/60 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/10 focus:border-orange-500/30 transition-all"
      />
    )}
  </div>
);

const StoryCard = ({
  story, onEdit, onDelete
}: {
  story: TravelerStory; onEdit: (s: TravelerStory) => void; onDelete: (id: string) => void;
}) => {
  const [expanded, setExpanded] = useState(false);
  const status = STATUS_CONFIG[story.status] || STATUS_CONFIG.pending;

  return (
    <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden hover:border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-300">
      {story.coverImage && (
        <div className="h-40 overflow-hidden relative">
          <img src={story.coverImage} alt={story.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
        </div>
      )}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-bold text-slate-800 text-sm leading-tight">{story.title}</h3>
          <span className={`flex-shrink-0 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${status.bg} ${status.color} ${status.border}`}>
            {status.label}
          </span>
        </div>

        {story.shortDescription && (
          <p className="text-xs text-slate-500 mb-3 font-medium line-clamp-2 leading-relaxed">{story.shortDescription}</p>
        )}

        <div className="flex flex-wrap gap-3 text-xs text-slate-400 font-bold mb-3">
          {story.location && <span className="flex items-center gap-1"><MapPin size={12} className="text-slate-300" />{story.location}</span>}
          {story.tripDuration && <span className="flex items-center gap-1"><Clock size={12} className="text-slate-300" />{story.tripDuration}</span>}
          {story.tripDate && (
            <span className="flex items-center gap-1">
              <Calendar size={12} className="text-slate-300" />
              {new Date(story.tripDate).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
            </span>
          )}
          <StarRating value={story.rating} onChange={() => {}} disabled />
        </div>

        {story.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {story.tags.map((tag) => (
              <span key={tag} className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-50 border border-slate-100 text-slate-500 text-[10px] font-bold">
                <Tag size={10} className="text-slate-400" />{tag}
              </span>
            ))}
          </div>
        )}

        {expanded && (
          <div className="mt-3 space-y-3 border-t border-slate-100 pt-3">
            {story.storyAboutTrip && (
              <div>
                <p className="text-[10px] font-black text-slate-400 mb-1 uppercase tracking-wider">Story Narrative</p>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">{story.storyAboutTrip}</p>
              </div>
            )}
            {story.tripExperience && (
              <div>
                <p className="text-[10px] font-black text-slate-400 mb-1 uppercase tracking-wider">Trip Experience</p>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">{story.tripExperience}</p>
              </div>
            )}
            {story.status === 'rejected' && story.rejectionReason && (
              <div className="bg-rose-50 border border-rose-100 rounded-xl p-3">
                <p className="text-xs font-bold text-rose-600 mb-1 uppercase tracking-wider text-[10px]">Rejection Reason</p>
                <p className="text-xs text-rose-700 font-medium">{story.rejectionReason}</p>
              </div>
            )}
          </div>
        )}

        <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-800 transition-colors font-semibold cursor-pointer border-0 bg-transparent"
          >
            {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
            {expanded ? 'Less' : 'More'}
          </button>
          <div className="flex gap-2.5">
            {story.status === 'pending' && (
              <>
                <button
                  onClick={() => onEdit(story)}
                  className="flex items-center gap-1 text-xs text-orange-600 hover:text-orange-700 transition-colors font-bold uppercase tracking-wider cursor-pointer border-0 bg-transparent"
                >
                  <Edit3 size={12} /> Edit
                </button>
                <button
                  onClick={() => onDelete(story._id)}
                  className="flex items-center gap-1 text-xs text-rose-600 hover:text-rose-700 transition-colors font-bold uppercase tracking-wider cursor-pointer border-0 bg-transparent"
                >
                  <Trash2 size={12} /> Delete
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const StoryForm = ({
  initial, onSubmit, onCancel, isPending
}: {
  initial: CreateStoryPayload; onSubmit: (data: CreateStoryPayload) => void;
  onCancel: () => void; isPending: boolean;
}) => {
  const [form, setForm] = useState<CreateStoryPayload>(initial);
  const [tagsText, setTagsText] = useState(() => {
    return ((initial.tags || []) as string[]).join(', ');
  });

  const set = (key: keyof CreateStoryPayload) => (value: string | string[] | number) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleTagInput = (v: string) => {
    setTagsText(v);
    const parsedTags = v.split(',').map((s) => s.trim()).filter(Boolean);
    setForm((prev) => ({ ...prev, tags: parsedTags }));
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 space-y-5 shadow-lg relative z-10">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">Share Your Adventure</h3>
        <button onClick={onCancel} className="text-slate-400 hover:text-slate-700 transition-colors cursor-pointer border-0 bg-transparent">
          <X size={18} />
        </button>
      </div>

      <InputField label="Story Title *" value={form.title || ''} onChange={set('title')} placeholder="My epic trek to Hampta Pass..." />
      <InputField label="Short Description" value={form.shortDescription || ''} onChange={set('shortDescription')} placeholder="A teaser for your story..." multiline rows={2} />
      <InputField label="Main Content *" value={form.content || ''} onChange={set('content')} placeholder="The full story goes here..." multiline rows={5} />
      <InputField label="Trip Experience" value={form.tripExperience || ''} onChange={set('tripExperience')} placeholder="Overall how was the experience?" multiline rows={3} />
      <InputField label="Story About the Trip" value={form.storyAboutTrip || ''} onChange={set('storyAboutTrip')} placeholder="Share a memorable moment or narrative..." multiline rows={4} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InputField label="Location" value={form.location || ''} onChange={set('location')} placeholder="Himachal Pradesh" />
        <InputField label="Destination" value={form.destination || ''} onChange={set('destination')} placeholder="Hampta Pass" />
        <InputField label="Trip Date" value={form.tripDate || ''} onChange={set('tripDate')} placeholder="2024-05-15" type="date" />
        <InputField label="Trip Duration" value={form.tripDuration || ''} onChange={set('tripDuration')} placeholder="5 days 4 nights" />
      </div>

      <InputField label="Tags (comma separated)" value={tagsText} onChange={handleTagInput} placeholder="trekking, himalaya, adventure..." />
      <InputField label="Cover Image URL" value={form.coverImage || ''} onChange={set('coverImage')} placeholder="https://..." />

      <div>
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2 block">Rating</label>
        <StarRating value={form.rating || 5} onChange={set('rating')} />
      </div>

      <div className="flex gap-3 pt-2">
        <button
          onClick={onCancel}
          className="flex-1 px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider transition-all border-0 cursor-pointer"
        >
          Cancel
        </button>
        <button
          onClick={() => onSubmit(form)}
          disabled={isPending || !form.title || !form.content}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold uppercase tracking-wider transition-all disabled:opacity-60 border-0 cursor-pointer shadow-md shadow-orange-500/10"
        >
          {isPending ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
          {isPending ? 'Submitting...' : 'Submit Story'}
        </button>
      </div>
    </div>
  );
};

export default function MyStories() {
  const { data: stories, isLoading } = useMyStories();
  const { mutate: createStory, isPending: isCreating } = useCreateStory();
  const { mutate: updateStory, isPending: isUpdating } = useUpdateStory();
  const { mutate: deleteStory } = useDeleteStory();

  const [showForm, setShowForm] = useState(false);
  const [editingStory, setEditingStory] = useState<TravelerStory | null>(null);

  const handleCreate = (data: CreateStoryPayload) => {
    createStory(data, { onSuccess: () => setShowForm(false) });
  };

  const handleUpdate = (data: CreateStoryPayload) => {
    if (!editingStory) return;
    updateStory({ id: editingStory._id, payload: data }, { onSuccess: () => setEditingStory(null) });
  };

  const handleEdit = (story: TravelerStory) => {
    setEditingStory(story);
    setShowForm(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Traveler Stories</h1>
          <p className="text-sm text-slate-500 mt-1 font-medium">Share your mountain adventures with the world</p>
        </div>
        {!showForm && !editingStory && (
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold uppercase tracking-wider transition-all border-0 cursor-pointer shadow-md shadow-orange-500/10"
          >
            <Plus size={14} /> New Story
          </button>
        )}
      </div>

      {showForm && (
        <div className="mb-6">
          <StoryForm
            initial={EMPTY_FORM}
            onSubmit={handleCreate}
            onCancel={() => setShowForm(false)}
            isPending={isCreating}
          />
        </div>
      )}

      {editingStory && (
        <div className="mb-6">
          <StoryForm
            initial={{ ...editingStory, tripDate: editingStory.tripDate ? new Date(editingStory.tripDate).toISOString().split('T')[0] : '' }}
            onSubmit={handleUpdate}
            onCancel={() => setEditingStory(null)}
            isPending={isUpdating}
          />
        </div>
      )}

      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 size={32} className="animate-spin text-orange-500" />
        </div>
      ) : !stories || stories.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-slate-100 p-8 shadow-xs max-w-md mx-auto">
          <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-slate-100">
            <BookOpen size={28} className="text-slate-400" />
          </div>
          <h3 className="font-bold text-slate-800 mb-2 uppercase tracking-wider text-xs">No stories yet</h3>
          <p className="text-xs text-slate-500 font-medium leading-relaxed mb-5">Share your first travel story and inspire others to explore.</p>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold uppercase tracking-wider transition-all border-0 cursor-pointer shadow-md shadow-orange-500/10"
          >
            <Plus size={14} /> Write a Story
          </button>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {stories.map((story) => (
            <StoryCard
              key={story._id}
              story={story}
              onEdit={handleEdit}
              onDelete={(id) => deleteStory(id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
