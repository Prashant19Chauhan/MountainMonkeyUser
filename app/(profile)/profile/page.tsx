import { Metadata } from 'next';
import ProfileDashboard from '@/components/profile/ProfileDashboard';

export const metadata: Metadata = {
  title: 'My Profile | Mountain Monkey',
  description: 'Manage your profile, track enquiries, share travel stories, and write reviews on Mountain Monkey.',
  robots: { index: false, follow: false },
};

export default function ProfilePage() {
  return <ProfileDashboard />;
}
