import React, { useState, useEffect } from 'react';
import { useA11y } from '../hooks/useA11y';
import { LoadingSpinner } from './a11y/LoadingSpinner';
import GIF from 'gif.js';
import { AnimatedEffectType } from '../types/effects';
import { transform } from '../utils/transform';
import { BLANK_GIF, WIDTH, HEIGHT, FRAME_COUNT, PERFORMANCE_MODE_KEY, PERFORMANCE_SETTINGS } from '../constants';
import { downloadUri } from '../utils/download';

interface EmojiPanelProps {
  img: string;
  transformation: keyof typeof AnimatedEffectType;
  name: string;
  interval: number;
  frameCount?: number;
}

const EmojiPanel: React.FC<EmojiPanelProps> = ({
  img,
  transformation,
  name,
  interval,
  frameCount = FRAME_COUNT
}) => {
  const [gif, setGif] = useState(BLANK_GIF);
  const [loading, setLoading] = useState(false);
  const { handleKeyPress } = useA11y();
  
  // Get performance mode from localStorage
  const isPerformanceMode = localStorage.getItem(PERFORMANCE_MODE_KEY) === 'true';
  const settings = isPerformanceMode 
    ? PERFORMANCE_SETTINGS.performance 
    : PERFORMANCE_SETTINGS.standard;

  useEffect(() => {
    if (!img) return;
    
    let isMounted = true;
    setGif(BLANK_GIF);
    setLoading(true);
    
    // Use a smaller timeout to avoid blocking the main thread
    const timeoutId = setTimeout(async () => {
      try {
        // Reduce frame count for performance mode
        const actualFrameCount = isPerformanceMode ? Math.min(6, frameCount) : frameCount;
        const framesArray = [...Array(actualFrameCount)].fill(null);
        
        // Process frames in batches to avoid blocking the main thread
        const batchSize = 2;
        const imagePromises = [];
        
        for (let i = 0; i < framesArray.length; i += batchSize) {
          const batch = framesArray.slice(i, i + batchSize);
          const batchPromises = batch.map((_, idx) => 
            transform(img, transformation, i + idx)
          );
          
          // Wait for each batch to complete
          const batchResults = await Promise.all(batchPromises);
          imagePromises.push(...batchResults);
          
          // Small delay to allow UI updates
          await new Promise(r => setTimeout(r, 5));
        }
        
        const images = await Promise.all(
          imagePromises.map(
            (imageData) => 
              new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = () => resolve(img);
                img.onerror = reject;
                img.src = imageData;
              })
          )
        );

        if (!isMounted) return;

        const gif = new GIF({
          workers: settings.workers,
          quality: settings.quality,
          repeat: 0,
          width: WIDTH,
          height: HEIGHT,
          transparent: 0x000000,
          background: null,
          workerScript: import.meta.env.PROD ? '/gif.worker.js' : '/public/gif.worker.js',
          dither: settings.dither,
          debug: false
        });

        // Process frames in batches
        for (let i = 0; i < images.length; i++) {
          const img = images[i];
          const canvas = document.createElement('canvas');
          canvas.width = WIDTH;
          canvas.height = HEIGHT;
          const ctx = canvas.getContext('2d', { 
            willReadFrequently: true,
            alpha: true,
            desynchronized: true,
            powerPreference: 'high-performance'
          });
          
          if (ctx) {
            ctx.globalCompositeOperation = 'copy';
            ctx.clearRect(0, 0, WIDTH, HEIGHT);
            ctx.save();
            ctx.imageSmoothingEnabled = false;
            ctx.drawImage(img, 0, 0, WIDTH, HEIGHT);
            ctx.restore();
            
            gif.addFrame(canvas, { 
              delay: interval * 1000, 
              transparent: true,
              disposal: 2
            });
          }
          
          // Small delay after each frame to allow UI updates
          if (i % 2 === 0 && i > 0) {
            await new Promise(r => setTimeout(r, 5));
          }
        }
        
        gif.on('finished', blob => {
          if (isMounted) {
            const url = URL.createObjectURL(blob);
            setGif(url);
            setLoading(false);
          }
        });
        
        gif.on('error', error => {
          console.error('GIF generation error:', error);
          if (isMounted) {
            setLoading(false);
          }
        });
        
        gif.render();
      } catch (error) {
        console.error('Error creating GIF:', error);
        if (isMounted) {
          setLoading(false);
        }
      }
    }, 50);

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
      if (gif !== BLANK_GIF) {
        URL.revokeObjectURL(gif);
      }
    };
  }, [img, transformation, interval, frameCount, isPerformanceMode, settings]);

  const isClickable = gif !== BLANK_GIF;

  const handleClick = () => {
    if (isClickable) {
      downloadUri(gif, `${name}.gif`);
    }
  };

  return (
    <div 
      onClick={handleClick}
      onKeyPress={handleKeyPress(handleClick)}
      role="button"
      tabIndex={isClickable ? 0 : -1}
      aria-label={`Download ${name} emoji effect`}
      className={`relative p-3 w-28 h-36 bg-white dark:bg-gray-800 rounded-lg shadow-md transition-all ${
        isClickable ? 'cursor-pointer hover:shadow-lg transform hover:-translate-y-1' : ''
      }`}
    >
      <div className="relative w-20 h-20 mx-auto">
        {loading && <LoadingSpinner label={`Generating ${name} effect...`} />}
        <img
          src={gif}
          alt={`The generated ${name} animated emoji`}
          className="w-full h-full object-contain rounded-lg hover:scale-150 transition-transform"
        />
      </div>
      <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400 break-words">
        :{name}:
      </p>
    </div>
  );
};

export default EmojiPanel;