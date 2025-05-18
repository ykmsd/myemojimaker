import React, { useState, useEffect, useRef } from 'react';
import { useA11y } from '../hooks/useA11y';
import { usePerformance } from '../contexts/PerformanceContext';
import { LoadingSpinner } from './a11y/LoadingSpinner';
import GIF from 'gif.js';
import { AnimatedEffectType } from '../types/effects';
import { transform } from '../utils/transform';
import { BLANK_GIF, WIDTH, HEIGHT } from '../constants';
import { downloadUri } from '../utils/download';

interface EmojiPanelProps {
  img: string;
  transformation: keyof typeof AnimatedEffectType;
  name: string;
  interval: number;
  frameCount?: number;
}

// Queue for limiting concurrent GIF generation
const processingQueue: Array<() => Promise<void>> = [];
let isProcessing = false;

async function processQueue() {
  if (isProcessing || processingQueue.length === 0) return;
  
  isProcessing = true;
  const nextTask = processingQueue.shift();
  
  if (nextTask) {
    try {
      await nextTask();
    } catch (error) {
      console.error('Error in processing queue:', error);
    }
    
    isProcessing = false;
    processQueue(); // Process next item in queue
  }
}

const EmojiPanel: React.FC<EmojiPanelProps> = ({
  img,
  transformation,
  name,
  interval,
  frameCount: propFrameCount
}) => {
  const [gif, setGif] = useState(BLANK_GIF);
  const [loading, setLoading] = useState(false);
  const { handleKeyPress } = useA11y();
  const processingRef = useRef(false);
  
  // Get performance settings from context
  const { frameCount: contextFrameCount, gifQuality, workerCount } = usePerformance();
  
  // Use prop frameCount if provided, otherwise use the one from performance context
  const frameCount = propFrameCount || contextFrameCount;

  useEffect(() => {
    if (!img || processingRef.current) return;
    
    setGif(BLANK_GIF);
    setLoading(true);
    processingRef.current = true;
    
    const generateGif = async () => {
      try {
        // Reduce frame count for better performance
        const framesToRender = [...Array(frameCount)].fill(null);
        
        // Generate frames in smaller batches to avoid blocking UI
        const batchSize = 3;
        const imageBatches = [];
        
        for (let i = 0; i < framesToRender.length; i += batchSize) {
          const batch = framesToRender.slice(i, i + batchSize);
          const batchPromises = batch.map((_, batchIndex) => {
            const frameIndex = i + batchIndex;
            return transform(img, transformation, frameIndex);
          });
          
          // Add a small delay between batches to allow UI updates
          if (i > 0) {
            await new Promise(resolve => setTimeout(resolve, 5));
          }
          
          const batchResults = await Promise.all(batchPromises);
          imageBatches.push(...batchResults);
        }
        
        const loadedImages = await Promise.all(
          imageBatches.map(
            (imageData) => 
              new Promise<HTMLImageElement>((resolve, reject) => {
                const img = new Image();
                img.onload = () => resolve(img);
                img.onerror = reject;
                img.src = imageData;
              })
          )
        );

        const gif = new GIF({
          workers: workerCount,
          quality: gifQuality,
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
        });
        
        await new Promise<void>((resolve, reject) => {
          gif.on('finished', blob => {
            const url = URL.createObjectURL(blob);
            setGif(url);
            setLoading(false);
            processingRef.current = false;
            resolve();
          });
          
          gif.on('error', error => {
            console.error('GIF generation error:', error);
            setLoading(false);
            processingRef.current = false;
            reject(error);
          });
          
          gif.render();
        });
      } catch (error) {
        console.error('Error creating GIF:', error);
        setLoading(false);
        processingRef.current = false;
      }
    };

    // Queue this processing task
    processingQueue.push(generateGif);
    processQueue();
    
    return () => {
      // If the component unmounts while generating, mark it as not processing
      processingRef.current = false;
    };
  }, [img, transformation, interval, frameCount, gifQuality, workerCount]);

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
          loading="lazy"
        />
      </div>
      <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400 break-words">
        :{name}:
      </p>
    </div>
  );
};

export default EmojiPanel;