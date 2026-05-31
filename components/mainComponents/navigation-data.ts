import { MapPin, Gift, Camera, Bed, LucideIcon, Home, Bus } from 'lucide-react';

export interface TabConfig {
  id: string;
  label: string;
  icon: LucideIcon;
  placeholder: string;
}

export const tabs: TabConfig[] = [
  { id: '/', label: 'Home', icon: Home, placeholder: 'Home...' },
  { id: 'destinations', label: 'Destinations', icon: MapPin, placeholder: 'Search by country, city or region...' },
  { id: 'packages', label: 'Packages', icon: Gift, placeholder: 'Find perfect holiday packages...' },
  { id: 'activities', label: 'Activities', icon: Camera, placeholder: 'Things to do, tours, and experiences...' },
  { id: 'stays', label: 'Stays', icon: Bed, placeholder: 'Hotels, ryokans, and unique homes...' },
  { id: 'travel-routes', label: 'Routes', icon: Bus, placeholder: 'Search by routes, operators or vehicles...' }
];
