import React from 'react';
import Link from 'next/link';
import { Plane, Globe, Mail, Phone, Heart } from 'lucide-react';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-slate-900 text-slate-300 font-sans border-t border-slate-800">
      {/* Top Ambient Glow Gradient */}
      <div className="w-full h-1 bg-gradient-to-r from-orange-500 via-rose-500 to-purple-600" />
      
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-16">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16 mb-12">
          
          {/* Column 1: Brand & Narrative */}
          <div className="space-y-5 text-left">
            <Link href="/" className="flex items-center gap-2.5 text-orange-500 font-black text-2xl tracking-tighter no-underline">
              <div className="bg-orange-500 text-white p-1.5 rounded-xl shadow-lg">
                <Plane className="rotate-45" fill="currentColor" size={18} />
              </div>
              <span className="text-white font-black tracking-tight">Mountain Monkey</span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              Bespoke travel adventures and ecological mountain stays curated by our AI-powered travel engines. Experience the Himalayas in premium luxury and authentic native style.
            </p>
            <div className="space-y-2 pt-1.5">
              <a href="mailto:support@mountainmonkey.com" className="text-xs font-bold text-slate-300 hover:text-orange-400 transition-colors flex items-center gap-2 no-underline">
                <Mail size={14} className="text-orange-500" />
                <span>support@mountainmonkey.com</span>
              </a>
              <a href="tel:+911902252525" className="text-xs font-bold text-slate-300 hover:text-orange-400 transition-colors flex items-center gap-2 no-underline">
                <Phone size={14} className="text-orange-500" />
                <span>+91 1902 252 525</span>
              </a>
            </div>
          </div>

          {/* Column 2: Expeditions Nav */}
          <div className="space-y-4 text-left">
            <h4 className="text-xs font-black text-white uppercase tracking-[0.2em] pb-1 border-b border-slate-800">Expeditions</h4>
            <ul className="space-y-2.5 text-xs font-bold list-none p-0 m-0">
              <li>
                <Link href="/destinations" className="text-slate-400 hover:text-orange-400 no-underline transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500/50" /> Explore Peaks
                </Link>
              </li>
              <li>
                <Link href="/packages" className="text-slate-400 hover:text-orange-400 no-underline transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500/50" /> Tour Packages
                </Link>
              </li>
              <li>
                <Link href="/activities" className="text-slate-400 hover:text-orange-400 no-underline transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500/50" /> Premium Experiences
                </Link>
              </li>
              <li>
                <Link href="/stays" className="text-slate-400 hover:text-orange-400 no-underline transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500/50" /> Eco-Stays & Lodges
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Community Nav */}
          <div className="space-y-4 text-left">
            <h4 className="text-xs font-black text-white uppercase tracking-[0.2em] pb-1 border-b border-slate-800">Community</h4>
            <ul className="space-y-2.5 text-xs font-bold list-none p-0 m-0">
              <li>
                <Link href="/stories" className="text-slate-400 hover:text-orange-400 no-underline transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500/50" /> Traveler Stories
                </Link>
              </li>
              <li>
                <Link href="/testimonials" className="text-slate-400 hover:text-orange-400 no-underline transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500/50" /> Testimonials
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="text-slate-400 hover:text-orange-400 no-underline transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500/50" /> Explorer Blogs
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-slate-400 hover:text-orange-400 no-underline transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500/50" /> Frequently Asked
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Discover Nav */}
          <div className="space-y-4 text-left">
            <h4 className="text-xs font-black text-white uppercase tracking-[0.2em] pb-1 border-b border-slate-800">Discover</h4>
            <ul className="space-y-2.5 text-xs font-bold list-none p-0 m-0">
              <li>
                <Link href="/about" className="text-slate-400 hover:text-orange-400 no-underline transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500/50" /> About Our Brand
                </Link>
              </li>
              <li>
                <Link href="/cities" className="text-slate-400 hover:text-orange-400 no-underline transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500/50" /> Alpine Hubs & Cities
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-400 hover:text-orange-400 no-underline transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500/50" /> Contact Guides
                </Link>
              </li>
              <li>
                <Link href="/profile" className="text-slate-400 hover:text-orange-400 no-underline transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500/50" /> Traveler Profile
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-black uppercase tracking-wider text-slate-500">
          <div>
            &copy; {currentYear} Mountain Monkey. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-slate-300 no-underline transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-slate-300 no-underline transition-colors">Terms of Use</Link>
            <span className="flex items-center gap-1 text-rose-500 font-bold">
              Crafted with <Heart size={10} className="fill-rose-500 animate-pulse text-rose-500" /> in the Hills
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;