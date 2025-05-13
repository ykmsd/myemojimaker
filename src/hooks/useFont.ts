import { useState, useEffect } from 'react';
import { FontOption } from '../types';

const loadedFonts = new Set<string>();

export const useFont = (font: FontOption) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Skip if font is already loaded
    if (loadedFonts.has(font.url)) {
      setIsLoaded(true);
      return;
    }

    const link = document.createElement('link');
    link.href = font.url;
    link.rel = 'stylesheet';
    
    link.onload = () => {
      setIsLoaded(true);
      loadedFonts.add(font.url);
    };
    link.onerror = () => setIsLoaded(true); // Proceed even if font fails to load
    
    document.head.appendChild(link);
    
    return () => {
      document.head.removeChild(link);
    };
  }, [font.url]);

  return isLoaded;
};