"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { getThemeMetaData, Mood, VisualElement } from "@/services/theme.service";
import { useQuery } from "@tanstack/react-query";

interface ThemeContextType {
  moods: Mood[];
  activeMood: Mood | null;
  changeMood: (name: string) => void;
  isLoading: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Premium static fallback moods in case backend database is empty
const FALLBACK_MOODS: Mood[] = [
  {
    name: "classic-mountain",
    label: "Classic Mountain",
    bgColor: "#ffffff",
    fgColor: "#0f172a",
    visualElements: []
  },
  {
    name: "coastal-relax",
    label: "Coastal Relax",
    bgColor: "#ecf9f8",
    fgColor: "#0f172a",
    visualElements: [
      {
        type: "svg",
        className: "absolute bottom-0 left-0 w-full h-40 opacity-10 text-teal-400",
        viewBox: "0 0 1440 320",
        paths: [
          "M0,192L48,197.3C96,203,192,213,288,192C384,171,480,117,576,112C672,107,768,149,864,165.3C960,181,1056,171,1152,149.3C1248,128,1344,96,1392,80L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ]
      }
    ]
  },
  {
    name: "forest-chill",
    label: "Forest Chill",
    bgColor: "#f0fdf4",
    fgColor: "#064e3b",
    visualElements: [
      {
        type: "svg",
        className: "absolute top-10 right-10 w-24 h-24 opacity-[0.08] text-green-500",
        viewBox: "0 0 100 100",
        paths: [
          "M50,10 L80,70 L65,70 L85,90 L15,90 L35,70 L20,70 Z"
        ]
      }
    ]
  },
  {
    name: "sunset-valley",
    label: "Sunset Valley",
    bgColor: "#fff7ed",
    fgColor: "#7c2d12",
    visualElements: [
      {
        type: "svg",
        className: "absolute bottom-10 right-10 w-32 h-32 opacity-10 text-orange-500",
        viewBox: "0 0 100 100",
        paths: [
          "M50,15 A35,35 0 0 0 50,85 A35,35 0 0 0 50,15 Z"
        ]
      }
    ]
  },
];

// --- Recursive Visual Element Renderer ---
function renderVisualElement(el: VisualElement, index: number): React.ReactNode {
  const isSvg = el.type === "motion.svg" || el.type === "svg";
  const isImg = el.type === "img";

  // Build spread-safe props (key must NOT be inside the spread object)
  const spreadProps: Record<string, any> = {
    className: el.className || "",
    style: {
      position: "absolute",
      pointerEvents: "none",
      fill: isSvg ? "currentColor" : undefined,
      ...el.style,
    },
    ...el.props,
  };

  if (isSvg) {
    spreadProps.viewBox = el.viewBox || "0 0 100 100";
    return (
      <svg key={index} {...spreadProps}>
        {el.paths && el.paths.map((p, idx) => (
          <path key={idx} d={p} />
        ))}
        {el.children && el.children.map((child: any, idx: number) => (
          renderVisualElement(child as VisualElement, idx)
        ))}
      </svg>
    );
  }

  if (isImg) {
    return <img key={index} {...spreadProps} alt="" />;
  }

  return (
    <div key={index} {...spreadProps}>
      {el.children && el.children.map((child: any, idx: number) => (
        renderVisualElement(child as VisualElement, idx)
      ))}
    </div>
  );
}

// --- Client-Safe Theme Background overlay ---
function ThemeBackground() {
  const { activeMood } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted || !activeMood) {
    return <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" />;
  }

  const elements = activeMood.visualElements || [];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden transition-all duration-[1000ms]">
      {elements.map((el, index) => renderVisualElement(el, index))}
    </div>
  );
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [activeMood, setActiveMood] = useState<Mood | null>(null);

  // Fetch moods from backend
  const { data: themeRes, isLoading } = useQuery({
    queryKey: ["theme-metadata"],
    queryFn: getThemeMetaData,
    staleTime: 60 * 60 * 1000, // 1 hour
  });

  const moods = themeRes?.data?.moods && themeRes.data.moods.length > 0
    ? themeRes.data.moods
    : FALLBACK_MOODS;

  useEffect(() => {
    if (!moods || moods.length === 0) return;

    // Load active mood from localStorage or fallback to first mood
    const savedMoodName = localStorage.getItem("active-himalayan-mood");
    const foundMood = moods.find((m) => m.name === savedMoodName) || moods[0];
    const timer = setTimeout(() => {
      setActiveMood(foundMood);
    }, 0);
    return () => clearTimeout(timer);
  }, [themeRes, moods]);

  // Apply colors to document variables with a buttery-smooth transition
  useEffect(() => {
    if (!activeMood) return;

    const root = document.documentElement;
    const body = document.body;

    body.style.transition = "background-color 0.8s cubic-bezier(0.16, 1, 0.3, 1), color 0.8s cubic-bezier(0.16, 1, 0.3, 1)";
    
    root.style.setProperty("--background", activeMood.bgColor);
    body.style.backgroundColor = activeMood.bgColor;
    
    root.style.setProperty("--foreground", activeMood.fgColor);
    body.style.color = activeMood.fgColor;
  }, [activeMood]);

  const changeMood = (name: string) => {
    const selected = moods.find((m) => m.name === name);
    if (selected) {
      setActiveMood(selected);
      localStorage.setItem("active-himalayan-mood", name);
    }
  };

  return (
    <ThemeContext.Provider value={{ moods, activeMood, changeMood, isLoading }}>
      <ThemeBackground />
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
