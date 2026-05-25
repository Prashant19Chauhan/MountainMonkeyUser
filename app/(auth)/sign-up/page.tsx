import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Join MountainMonkey | Start Your Himalayan Adventure",
  description: "Create a MountainMonkey account to plan, book, and experience premium Himalayan eco-travel. Gain exclusive access to curated routes and custom activities.",
};

import { SignupSidebarStepper } from '@/components/_auth/SignupSidebarStepper';
import { SignupFormSteps } from '@/components/_auth/SignupFormSteps';

export default function SignupPage() {
  return (
    <div className="flex min-h-screen w-full bg-white font-sans overflow-hidden">
      <SignupSidebarStepper />
      <SignupFormSteps />
    </div>
  );
}