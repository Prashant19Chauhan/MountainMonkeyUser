import Link from 'next/link';
import React from 'react';

export const ModeCard = ({ icon, label, sub, type }: any) => {
  return (
    <Link 
      href={`/transport/${type}`}
      className="bg-white p-8 rounded-3xl border border-gray-100 text-center flex flex-col items-center gap-4 hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="text-slate-700">{React.cloneElement(icon, { size: 32 })}</div>
      <div>
        <p className="font-bold text-sm">{label}</p>
        <p className="text-slate-400 text-[10px]">{sub}</p>
      </div>
    </Link>
  );
};