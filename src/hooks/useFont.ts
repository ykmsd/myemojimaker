import { useState, useEffect } from 'react';
import { FontOption } from '../types';

export const useFont = (font: FontOption) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const link = document.createElement('link');
    link.href = font.url;
    link.rel = 'stylesheet';
    
    link.onload = () => setIsLoaded(true);
    link.onerror = () => setIsLoaded(true); // Proceed even if font fails to load
    
    document.head.appendChild(link);
    
    return () => {
      document.head.removeChild(link);
    };
  }, [font.url]);

  return isLoaded;
};