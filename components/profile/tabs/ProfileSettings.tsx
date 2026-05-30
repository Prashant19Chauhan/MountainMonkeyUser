'use client';

import React, { useState, useEffect } from 'react';
import {
  User, MapPin, Globe, Heart, Compass, Phone, Mail,
  Save, Loader2, Edit3, X, Check, ChevronDown
} from 'lucide-react';
import { useProfile, useUpdateProfile } from '@/hooks/useProfile';
import { ProfileUpdatePayload } from '@/services/profile.services';

const TRAVEL_TYPES = ['Solo', 'Couple', 'Family', 'Group', 'Adventure', 'Luxury', 'Budget', 'Backpacking'];
const LANGUAGES = ['English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese', 'Korean'];
const FREQUENCY_OPTIONS = [
  { value: 'rarely', label: 'Rarely (1-2x/year)' },
  { value: 'occasionally', label: 'Occasionally (3-4x/year)' },
  { value: 'frequently', label: 'Frequently (5-8x/year)' },
  { value: 'very_frequently', label: 'Very Frequently (9+/year)' },
];

const SectionCard = ({ title, icon: Icon, children }: { title: string; icon: React.ElementType; children: React.ReactNode }) => (
  <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden mb-6 shadow-xs">
    <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-100 bg-slate-50/50">
      <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center">
        <Icon size={16} className="text-orange-500" />
      </div>
      <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider">{title}</h3>
    </div>
    <div className="p-6">{children}</div>
  </div>
);

const InputField = ({
  label, value, onChange, type = 'text', placeholder = '', disabled = false
}: {
  label: string; value: string; onChange: (v: string) => void;
  type?: string; placeholder?: string; disabled?: boolean;
}) => (
  <div className="space-y-1.5">
    <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      className="w-full bg-slate-50 border border-slate-200/60 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/10 focus:border-orange-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
    />
  </div>
);

export default function ProfileSettings() {
  const { data: profile, isLoading } = useProfile();
  const { mutate: saveProfile, isPending: isSaving } = useUpdateProfile();

  const [formData, setFormData] = useState<ProfileUpdatePayload>({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (profile) {
      setFormData({
        firstName: profile.firstName,
        lastName: profile.lastName,
        phone: profile.phone || '',
        bio: profile.bio || '',
        country: profile.country || '',
        state: profile.state || '',
        city: profile.city || '',
        pincode: profile.pincode || '',
        address: profile.address || '',
        language: profile.language || 'English',
        countriesVisited: profile.countriesVisited || [],
        dreamDestination: profile.dreamDestination || [],
        travelTypes: profile.travelTypes || [],
        frequency: profile.frequency || 'occasionally',
        adventureLevel: profile.adventureLevel || 5,
        mood: profile.mood || '',
      });
    }
  }, [profile]);

  const set = (key: keyof ProfileUpdatePayload) => (value: string | string[] | number) =>
    setFormData((prev) => ({ ...prev, [key]: value }));

  const toggleTravelType = (type: string) => {
    const current = (formData.travelTypes || []) as string[];
    set('travelTypes')(current.includes(type) ? current.filter((t) => t !== type) : [...current, type]);
  };

  const handleSave = () => {
    saveProfile(formData, {
      onSuccess: () => setIsEditing(false),
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 size={32} className="animate-spin text-orange-500" />
      </div>
    );
  }

  return (
    <div>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Profile & Settings</h1>
          <p className="text-sm text-slate-500 mt-1 font-medium">Manage your personal information and travel preferences</p>
        </div>
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <button
                onClick={() => setIsEditing(false)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider transition-all border-0 cursor-pointer"
              >
                <X size={14} /> Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold uppercase tracking-wider transition-all disabled:opacity-60 border-0 cursor-pointer shadow-md shadow-orange-500/10"
              >
                {isSaving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-orange-200 text-orange-600 bg-white hover:bg-orange-50 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
            >
              <Edit3 size={14} /> Edit Profile
            </button>
          )}
        </div>
      </div>

      {/* Account Info */}
      <SectionCard title="Account Information" icon={User}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField
            label="First Name"
            value={(formData.firstName as string) || ''}
            onChange={set('firstName')}
            disabled={!isEditing}
            placeholder="First name"
          />
          <InputField
            label="Last Name"
            value={(formData.lastName as string) || ''}
            onChange={set('lastName')}
            disabled={!isEditing}
            placeholder="Last name"
          />
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Mail size={10} /> Email
            </label>
            <input
              value={profile?.email || ''}
              disabled
              className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm text-slate-400 cursor-not-allowed opacity-75"
            />
          </div>
          <InputField
            label="Phone"
            value={(formData.phone as string) || ''}
            onChange={set('phone')}
            disabled={!isEditing}
            placeholder="+91 98765 43210"
            type="tel"
          />
        </div>
        <div className="mt-4">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Bio</label>
          <textarea
            value={(formData.bio as string) || ''}
            onChange={(e) => set('bio')(e.target.value)}
            disabled={!isEditing}
            rows={3}
            placeholder="Tell fellow travelers a bit about yourself..."
            className="mt-1.5 w-full bg-slate-50 border border-slate-200/60 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/10 focus:border-orange-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed resize-none"
          />
        </div>
      </SectionCard>

      {/* Location */}
      <SectionCard title="Location" icon={MapPin}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField label="Country" value={(formData.country as string) || ''} onChange={set('country')} disabled={!isEditing} placeholder="India" />
          <InputField label="State" value={(formData.state as string) || ''} onChange={set('state')} disabled={!isEditing} placeholder="Himachal Pradesh" />
          <InputField label="City" value={(formData.city as string) || ''} onChange={set('city')} disabled={!isEditing} placeholder="Manali" />
          <InputField label="Pincode" value={(formData.pincode as string) || ''} onChange={set('pincode')} disabled={!isEditing} placeholder="175131" />
          <div className="sm:col-span-2">
            <InputField label="Address" value={(formData.address as string) || ''} onChange={set('address')} disabled={!isEditing} placeholder="Full address..." />
          </div>
        </div>
      </SectionCard>

      {/* Travel Preferences */}
      <SectionCard title="Travel Preferences" icon={Compass}>
        {/* Language */}
        <div className="mb-5">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5 block">Preferred Language</label>
          <div className="relative">
            <select
              value={(formData.language as string) || 'English'}
              onChange={(e) => set('language')(e.target.value)}
              disabled={!isEditing}
              className="w-full bg-slate-50 border border-slate-200/60 rounded-xl px-4 py-3 text-sm text-slate-800 appearance-none focus:outline-none focus:ring-2 focus:ring-orange-500/10 focus:border-orange-500/30 transition-all disabled:opacity-50 cursor-pointer"
            >
              {LANGUAGES.map((l) => <option key={l} value={l}>{l}</option>)}
            </select>
            <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {/* Travel Frequency */}
        <div className="mb-5">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5 block">Travel Frequency</label>
          <div className="relative">
            <select
              value={(formData.frequency as string) || 'occasionally'}
              onChange={(e) => set('frequency')(e.target.value)}
              disabled={!isEditing}
              className="w-full bg-slate-50 border border-slate-200/60 rounded-xl px-4 py-3 text-sm text-slate-800 appearance-none focus:outline-none focus:ring-2 focus:ring-orange-500/10 focus:border-orange-500/30 transition-all disabled:opacity-50 cursor-pointer"
            >
              {FREQUENCY_OPTIONS.map((f) => <option key={f.value} value={f.value}>{f.label}</option>)}
            </select>
            <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {/* Adventure Level */}
        <div className="mb-5">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5 block">
            Adventure Level — <span className="text-orange-500 font-bold">{formData.adventureLevel || 5}/10</span>
          </label>
          <input
            type="range" min={1} max={10}
            value={(formData.adventureLevel as number) || 5}
            onChange={(e) => set('adventureLevel')(Number(e.target.value))}
            disabled={!isEditing}
            className="w-full accent-orange-500 disabled:opacity-50 cursor-pointer"
          />
          <div className="flex justify-between text-xs text-slate-400 mt-1 font-medium">
            <span>Relaxed</span><span>Extreme</span>
          </div>
        </div>

        {/* Travel Types */}
        <div className="mb-5">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2.5 block">Travel Style</label>
          <div className="flex flex-wrap gap-2">
            {TRAVEL_TYPES.map((type) => {
              const selected = ((formData.travelTypes || []) as string[]).includes(type);
              return (
                <button
                  key={type}
                  onClick={() => isEditing && toggleTravelType(type)}
                  disabled={!isEditing}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border cursor-pointer ${
                    selected
                      ? 'bg-orange-500 text-white border-orange-500 shadow-sm'
                      : 'bg-slate-50 text-slate-500 border-slate-200/60 hover:bg-slate-100 hover:text-slate-800'
                  } disabled:cursor-default`}
                >
                  {selected && <Check size={10} className="inline mr-1" />}
                  {type}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dream Destinations */}
        <div className="mb-5">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5 block flex items-center gap-1">
            <Heart size={10} /> Dream Destinations
          </label>
          <input
            type="text"
            value={((formData.dreamDestination as string[]) || []).join(', ')}
            onChange={(e) => set('dreamDestination')(e.target.value.split(',').map((s) => s.trim()).filter(Boolean))}
            disabled={!isEditing}
            placeholder="Ladakh, Spiti, Zanskar..."
            className="w-full bg-slate-50 border border-slate-200/60 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/10 focus:border-orange-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <p className="text-xs text-slate-400 mt-1 font-medium">Separate multiple destinations with commas</p>
        </div>

        {/* Countries Visited */}
        <div>
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5 block flex items-center gap-1">
            <Globe size={10} /> Countries Visited
          </label>
          <input
            type="text"
            value={((formData.countriesVisited as string[]) || []).join(', ')}
            onChange={(e) => set('countriesVisited')(e.target.value.split(',').map((s) => s.trim()).filter(Boolean))}
            disabled={!isEditing}
            placeholder="India, Nepal, Bhutan..."
            className="w-full bg-slate-50 border border-slate-200/60 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/10 focus:border-orange-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>
      </SectionCard>
    </div>
  );
}
