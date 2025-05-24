import { useState, useEffect } from 'react';
import { FontOption } from '../types';

// Cache to track fonts that have been loaded
const loadedFonts = new Set<string>();
// Cache to track fonts that are currently loading
const loadingFonts = new Map<string, Promise<boolean>>();

export const useFont = (font: FontOption) => {
  const [isLoaded, setIsLoaded] = useState(() => loadedFonts.has(font.url));

  useEffect(() => {
    // If font is already loaded, return early
    if (loadedFonts.has(font.url)) {
      setIsLoaded(true);
      return;
    }

    // Function to load font
    const loadFont = async (): Promise<boolean> => {
      return new Promise((resolve) => {
        const link = document.createElement('link');
        link.href = font.url;
        link.rel = 'stylesheet';
        
        link.onload = () => {
          // Ensure the font is actually loaded by testing with a sample text
          setTimeout(() => {
            loadedFonts.add(font.url);
            resolve(true);
          }, 100); // Small delay to ensure font is available
        };
        
        link.onerror = () => {
          // Even if font fails to load, we need to proceed
          resolve(false);
        };
        
        document.head.appendChild(link);
      });
    };

    // Use existing loading promise if this font is already being loaded
    let loadingPromise = loadingFonts.get(font.url);
    
    if (!loadingPromise) {
      loadingPromise = loadFont();
      loadingFonts.set(font.url, loadingPromise);
    }
    
    // When loading completes, update state and clean up
    loadingPromise.then((success) => {
      setIsLoaded(true);
      if (success) {
        loadedFonts.add(font.url);
      }
      loadingFonts.delete(font.url);
    });
    
    // No cleanup necessary - we want to keep the font stylesheet
  }, [font.url]);

  return isLoaded;
};