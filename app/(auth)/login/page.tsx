import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Sign In | Access Your Himalayan Journey | MountainMonkey",
  description: "Log in to your MountainMonkey account to manage your bookings, customize travel plans, and chat with our AI-powered mountain guide.",
};

import { LoginHeroSection } from '@/components/_auth/LoginHeroSection';
import { LoginFormSection } from '@/components/_auth/LoginFormSection';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen w-full bg-white font-sans overflow-hidden">
      <LoginHeroSection />
      <LoginFormSection />
    </div>
  );
}
