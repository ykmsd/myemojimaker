import React, { useState, useEffect, useRef } from 'react';
import { generateStaticPng } from '../utils/staticEffects';
import { downloadUri } from '../utils/download';
import { BLANK_GIF } from '../constants';

interface StaticEmojiPanelProps {
  img: string;
  transformation: string;
  name: string;
  primaryColor: string;
  strokeColor: string;
  updateKey: number;
}

// Cache for static PNGs
const staticPngCache = new Map<string, string>();

const StaticEmojiPanel: React.FC<StaticEmojiPanelProps> = ({
  img,
  transformation,
  name,
  primaryColor,
  strokeColor,
  updateKey,
}) => {
  const [pngUrl, setPngUrl] = useState(BLANK_GIF);
  const [loading, setLoading] = useState(false);
  const generationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!img) return;

    // Clear previous timeout if it exists
    if (generationTimeoutRef.current) {
      clearTimeout(generationTimeoutRef.current);
    }

    // Generate cache key
    const cacheKey = `${img.slice(0, 50)}-${transformation}-${primaryColor}-${strokeColor}-${updateKey}`;
    
    // Check if we have this in cache
    if (staticPngCache.has(cacheKey)) {
      setPngUrl(staticPngCache.get(cacheKey)!);
      return;
    }

    setLoading(true);
    setPngUrl(BLANK_GIF);

    // Delay generation slightly to avoid blocking the main thread
    generationTimeoutRef.current = setTimeout(() => {
      generateStaticPng(img, transformation, primaryColor, strokeColor)
        .then((blob) => {
          const url = URL.createObjectURL(blob);
          setPngUrl(url);
          
          // Cache the result (limit cache size)
          if (staticPngCache.size > 50) {
            const firstKey = staticPngCache.keys().next().value;
            const oldUrl = staticPngCache.get(firstKey);
            if (oldUrl && oldUrl !== BLANK_GIF) {
              URL.revokeObjectURL(oldUrl);
            }
            staticPngCache.delete(firstKey);
          }
          staticPngCache.set(cacheKey, url);
          
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error generating PNG:', error);
          setLoading(false);
        });
    }, 50);

    return () => {
      if (generationTimeoutRef.current) {
        clearTimeout(generationTimeoutRef.current);
      }
      
      // Don't revoke BLANK_GIF
      if (pngUrl !== BLANK_GIF) {
        URL.revokeObjectURL(pngUrl);
      }
    };
  }, [img, transformation, primaryColor, strokeColor, updateKey]);

  const isClickable = pngUrl !== BLANK_GIF;

  const handleClick = () => {
    if (isClickable) {
      downloadUri(pngUrl, `${name}.png`);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`relative p-3 w-28 h-36 bg-white dark:bg-gray-800 rounded-lg shadow-md transition-all ${
        isClickable
          ? 'cursor-pointer hover:shadow-lg transform hover:-translate-y-1'
          : ''
      }`}
    >
      <div className="relative w-20 h-20 mx-auto">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-700 bg-opacity-75 rounded-lg">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
          </div>
        )}
        <img
          src={pngUrl}
          alt={`The generated ${name} static emoji`}
          className="w-full h-full object-contain rounded-lg hover:scale-150 transition-transform"
        />
      </div>
      <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400 break-words">
        :{name}:
      </p>
    </div>
  );
};

export default StaticEmojiPanel;