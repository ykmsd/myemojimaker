import React, { useState, useEffect, useRef } from 'react';
import { useA11y } from '../hooks/useA11y';
import { LoadingSpinner } from './a11y/LoadingSpinner';
import GIF from 'gif.js';
import { AnimatedEffectType } from '../types/effects';
import { transform } from '../utils/transform';
import { BLANK_GIF, WIDTH, HEIGHT, FRAME_COUNT } from '../constants';
import { downloadUri } from '../utils/download';
import { gifGenerationLimiter } from '../utils/concurrency';

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
    let releaseSlot: (() => void) | null = null;

    (async () => {
      // Wait for a concurrency slot before starting generation
      releaseSlot = await gifGenerationLimiter.acquire();
      if (aborted) {
        releaseSlot();
        return;
      }

      try {
        // Load the source image once
        const sourceImg = await new Promise<HTMLImageElement>((resolve, reject) => {
          const el = new Image();
          el.onload = () => resolve(el);
          el.onerror = reject;
          el.src = img;
        });

        if (aborted) return;

        // Generate all frame canvases — reusing the single loaded image
        const canvases: HTMLCanvasElement[] = [];
        for (let i = 0; i < frameCount; i++) {
          if (aborted) return;
          canvases.push(await transform(sourceImg, transformation, i));
        }

        if (aborted) return;

        const gifEncoder = new GIF({
          workers: 2,
          quality: 5,
          repeat: 0,
          width: WIDTH,
          height: HEIGHT,
          transparent: 0x000000,
          background: null,
          workerScript: '/gif.worker.js',
          dither: false,
          debug: false
        });
        gifRef.current = gifEncoder;

        // Pass canvases directly to gif.addFrame — no intermediate Image decode
        canvases.forEach(canvas => {
          gifEncoder.addFrame(canvas, {
            delay: interval * 1000,
            transparent: true,
            disposal: 2
          });
        });

        // Timeout to prevent infinite loading if worker fails silently
        timeoutId = setTimeout(() => {
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

        gifEncoder.on('error', () => {
          clearTimeout(timeoutId);
          if (!aborted) setLoading(false);
        });

        gifEncoder.render();
      } catch {
        if (!aborted) setLoading(false);
      } finally {
        if (releaseSlot) releaseSlot();
        releaseSlot = null;
      }
    })();

    return () => {
      aborted = true;
      clearTimeout(timeoutId);
      if (releaseSlot) {
        releaseSlot();
        releaseSlot = null;
      }
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

export default React.memo(EmojiPanel);
