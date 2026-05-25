"use client";

import { useAppSelector } from "@/store/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
};

export default function AuthRoutesProvider({
  children,
}: Props) {
  const router = useRouter();
  const { token, user, hydrated } = useAppSelector((state) => state.user);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (hydrated) {
      if (token && user) {
        router.replace("/");
      } else {
        const timer = setTimeout(() => {
          setIsChecking(false);
        }, 0);
        return () => clearTimeout(timer);
      }
    }
  }, [token, user, hydrated, router]);

  if (!hydrated || isChecking) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-50">
        <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return <>{children}</>;
}
