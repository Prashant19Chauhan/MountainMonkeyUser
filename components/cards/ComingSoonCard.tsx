import { Calendar } from 'lucide-react';
import Link from 'next/link';
import Image from '../ui/Image';

interface ComingSoonCardProps {
  title?: string;
  date?: string;
  image?: string;
  slug?: string;
}

export const ComingSoonCard = ({ title, date, image, slug }: ComingSoonCardProps) => {

  return (
    <Link 
      href={`/packages/${slug}`}
      className="group cursor-pointer"
    >
      <div className="relative aspect-[16/10] bg-gray-100 rounded-[32px] mb-4 overflow-hidden">
        <span className="absolute top-4 left-4 bg-black text-white text-[10px] font-black px-3 py-1.5 rounded-md uppercase tracking-widest z-10">
          COMING SOON
        </span>
        <Image 
          src={image || "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=800"} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
        />
      </div>
      <h4 className="font-bold text-lg px-1">{title}</h4>
      <div className="flex items-center gap-1.5 text-rose-500 font-bold text-sm px-1 mt-1">
        <Calendar className="w-4 h-4" />
        Releasing {date}
      </div>
    </Link>
  );
};