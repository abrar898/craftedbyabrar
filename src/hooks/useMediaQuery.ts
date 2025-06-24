"use client";

import { useState, useEffect } from 'react';

/**
 * Custom hook for responsive design based on media queries
 * @param query CSS media query string (e.g. '(max-width: 768px)')
 * @returns boolean indicating if the media query matches
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Default to false on the server
    if (typeof window === 'undefined') {
      return;
    }
    
    const media = window.matchMedia(query);
    
    // Set initial value
    setMatches(media.matches);
    
    // Define listener function
    const listener = (e: MediaQueryListEvent) => {
      setMatches(e.matches);
    };
    
    // Add listener
    media.addEventListener('change', listener);
    
    // Clean up function
    return () => {
      media.removeEventListener('change', listener);
    };
  }, [query]); // Re-run if query changes

  return matches;
} 