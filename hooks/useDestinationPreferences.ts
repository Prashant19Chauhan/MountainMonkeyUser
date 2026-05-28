"use client";

import { useState, useEffect, useCallback } from 'react';

// Predefined categories in the app
export type CategoryId = 'trending' | 'tropical' | 'history' | 'adventure' | 'nature' | 'spiritual';

const STORAGE_KEY = 'monkey_destination_preferences';

interface PreferenceScores {
  [key: string]: number;
}

const DEFAULT_CATEGORY_ORDER: CategoryId[] = [
  'trending',
  'adventure',
  'history',
  'tropical',
  'nature',
  'spiritual'
];

export const useDestinationPreferences = () => {
  const [scores, setScores] = useState<PreferenceScores>({});

  // Load scores on mount (SSR Safe)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = window.localStorage.getItem(STORAGE_KEY);
        if (saved) {
          setScores(JSON.parse(saved));
        }
      } catch (e) {
        console.error("Error reading destination preferences", e);
      }
    }
  }, []);

  // Increment preference scores for a list of categories
  const trackCategoryInteraction = useCallback((categories: string[]) => {
    if (typeof window === 'undefined') return;

    setScores((prev) => {
      const updated = { ...prev };
      categories.forEach((cat) => {
        const normalized = cat.toLowerCase();
        updated[normalized] = (updated[normalized] || 0) + 1;
      });

      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error("Error saving destination preferences", e);
      }

      return updated;
    });
  }, []);

  // Get sorted list of CategoryIds based on active scores
  const getSortedCategories = useCallback((): CategoryId[] => {
    return [...DEFAULT_CATEGORY_ORDER].sort((a, b) => {
      const scoreA = scores[a] || 0;
      const scoreB = scores[b] || 0;

      if (scoreA !== scoreB) {
        return scoreB - scoreA; // Descending score order
      }

      // Tie-breaker: Preserve default priority order
      return DEFAULT_CATEGORY_ORDER.indexOf(a) - DEFAULT_CATEGORY_ORDER.indexOf(b);
    });
  }, [scores]);

  return {
    scores,
    trackCategoryInteraction,
    getSortedCategories
  };
};
