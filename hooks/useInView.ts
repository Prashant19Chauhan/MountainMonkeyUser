import { useRef, RefObject } from 'react';

/**
 * Disables the intersection observer scroll lazy-loading logic.
 * Always returns `true` for immediate mounting and querying.
 */
export function useInView(options?: IntersectionObserverInit): [RefObject<HTMLDivElement | null>, boolean] {
    const ref = useRef<HTMLDivElement | null>(null);
    return [ref, true];
}
