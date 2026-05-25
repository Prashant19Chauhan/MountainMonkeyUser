"use client"

import { useInView } from '@/hooks/useInView';
import { useTestimonials } from '@/hooks/useHome';
import { TestimonialCard } from '@/components/cards/TestimonialCard';
import Link from 'next/link';

type TestimonialType = {
  _id:string,
  name:string,
  message:string,
  rating:number,
}

export const TestimonialsSection = () => {
  const [testimonialsRef, testimonialsInView] = useInView();
  const { data: testimonials, isLoading: testimonialsLoading } = useTestimonials();

  return (
    <section ref={testimonialsRef} className="bg-gray-50 py-16 px-4 border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-2xl font-bold">What our users say</h2>
          <Link href="/testimonials" className="text-rose-500 font-semibold hover:underline">
            See all →
          </Link>
        </div>
        <div className="flex gap-6 overflow-x-auto pb-8 no-scrollbar scroll-smooth snap-x snap-mandatory px-1">
          {testimonialsLoading ? (
            [1,2,3,4].map((i) => (
              <div key={i} className="min-w-[300px] aspect-video bg-slate-100 rounded-3xl animate-pulse" />
            ))
          ) : testimonials?.length > 0 ? (
            testimonials.map((t: TestimonialType) => (
              <div key={t._id} className="min-w-[300px] snap-start">
                <TestimonialCard name={t.name} text={t.message} rating={t.rating} />
              </div>
            ))
          ) : (
            <div className="min-w-full py-12 text-center bg-slate-50 rounded-3xl">
              <p className="text-slate-400 italic">No testimonials yet. Share your experience!</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};