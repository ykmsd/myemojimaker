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
          // Set transparent color to a very bright magenta that won't appear in any normal image
          transparent: 0xFF00FF,
          // Set background to null to ensure transparency is preserved
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
            // Fill with transparent pixels first
            ctx.clearRect(0, 0, WIDTH, HEIGHT);
            
            // Draw the image using 'source-over' to preserve transparency
            ctx.globalCompositeOperation = 'source-over';
            ctx.save();
            ctx.imageSmoothingEnabled = false;
            ctx.drawImage(img, 0, 0, WIDTH, HEIGHT);
            ctx.restore();
            
            // Important: Mark magenta pixels as transparent
            // This is done by making a second pass and changing any magenta pixels
            // to transparent before adding the frame to the GIF
            const imageData = ctx.getImageData(0, 0, WIDTH, HEIGHT);
            const { data } = imageData;
            for (let i = 0; i < data.length; i += 4) {
              // If a pixel is exactly magenta (255, 0, 255), make it transparent
              if (data[i] === 255 && data[i+1] === 0 && data[i+2] === 255) {
                data[i+3] = 0; // Set alpha to 0
              }
            }
            ctx.putImageData(imageData, 0, 0);
            
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