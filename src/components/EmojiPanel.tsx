import React, { useState, useEffect } from 'react';
import { useA11y } from '../hooks/useA11y';
import { LoadingSpinner } from './a11y/LoadingSpinner';
import GIF from 'gif.js';
import { AnimatedEffectType } from '../types/effects';
import { transform } from '../utils/transform';
import { BLANK_GIF, WIDTH, HEIGHT, FRAME_COUNT } from '../constants';
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

  useEffect(() => {
    if (!img) return;
    
    setGif(BLANK_GIF);
    setLoading(true);
    
    (async () => {
      const framesArray = [...Array(frameCount)].fill(null);
      const imagePromises = framesArray.map(async (_, i) => {
        return await transform(img, transformation, i);
      });
      
      const images = await Promise.all(imagePromises);
      
      try {
        const loadedImages = await Promise.all(
          images.map(
            (imageData) => 
              new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = () => resolve(img);
                img.onerror = reject;
                img.src = imageData;
              })
          )
        );

        const gif = new GIF({
          workers: 4,
          quality: 5,
          repeat: 0,
          width: WIDTH,
          height: HEIGHT,
          transparent: 0x000000,
          background: null,
          workerScript: import.meta.env.PROD ? '/gif.worker.js' : '/public/gif.worker.js',
          dither: false,
          debug: false
        });

        loadedImages.forEach(img => {
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
            // First, fill with a solid color that won't be in the image
            // This ensures transparency works correctly
            ctx.fillStyle = '#010101'; // Almost black but not exactly 0x000000
            ctx.fillRect(0, 0, WIDTH, HEIGHT);
            
            // Then draw the image
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
        });
        
        gif.on('finished', blob => {
          const url = URL.createObjectURL(blob);
          setGif(url);
          setLoading(false);
        });
        
        gif.on('error', error => {
          console.error('GIF generation error:', error);
          setLoading(false);
        });
        
        gif.render();
      } catch (error) {
        console.error('Error creating GIF:', error);
        setLoading(false);
      }
    })();
  }, [img, transformation, interval, frameCount]);

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