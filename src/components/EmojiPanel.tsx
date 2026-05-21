import React, { useState, useEffect, useRef } from 'react';
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
  const gifRef = useRef<GIF | null>(null);

  useEffect(() => {
    if (!img) return;

    // Abort previous GIF generation if still running
    if (gifRef.current) {
      try { gifRef.current.abort(); } catch (_) {}
      gifRef.current = null;
    }

    setGif(BLANK_GIF);
    setLoading(true);

    let aborted = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    (async () => {
      const framesArray = [...Array(frameCount)].fill(null);
      const imagePromises = framesArray.map(async (_, i) => {
        return await transform(img, transformation, i);
      });

      const images = await Promise.all(imagePromises);
      if (aborted) return;

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

        if (aborted) return;

        const workerScript = import.meta.env.PROD ? '/gif.worker.js' : '/public/gif.worker.js';
        const gifEncoder = new GIF({
          workers: 2,
          quality: 5,
          repeat: 0,
          width: WIDTH,
          height: HEIGHT,
          transparent: 0x000000,
          background: null,
          workerScript,
          dither: false,
          debug: false
        });
        gifRef.current = gifEncoder;

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
            gifEncoder.addFrame(canvas, {
              delay: interval * 1000,
              transparent: true,
              disposal: 2
            });
          }
        });

        // Timeout to prevent infinite loading if worker fails silently
        timeoutId = setTimeout(() => {
          console.error(`GIF generation timeout for ${name}`);
          try { gifEncoder.abort(); } catch (_) {}
          if (!aborted) setLoading(false);
        }, 30000);

        gifEncoder.on('finished', blob => {
          clearTimeout(timeoutId);
          if (aborted) return;
          const url = URL.createObjectURL(blob);
          setGif(url);
          setLoading(false);
        });

        gifEncoder.on('error', error => {
          clearTimeout(timeoutId);
          console.error('GIF generation error:', error);
          if (!aborted) setLoading(false);
        });

        gifEncoder.render();
      } catch (error) {
        console.error('Error creating GIF:', error);
        if (!aborted) setLoading(false);
      }
    })();

    return () => {
      aborted = true;
      clearTimeout(timeoutId);
      if (gifRef.current) {
        try { gifRef.current.abort(); } catch (_) {}
        gifRef.current = null;
      }
    };
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