import { AnimatedEffectType as TransformationType } from '../types/effects';
import { WIDTH, HEIGHT, FRAME_COUNT, PERFORMANCE_MODE_KEY } from '../constants';
import { transforms } from './transforms';

// Cache transformed images to avoid redundant processing
const transformCache = new Map<string, string>();

export const transform = async (
  image: string,
  transformation: keyof typeof TransformationType,
  i: number
): Promise<string> => {
  // Generate cache key
  const cacheKey = `${image.slice(0, 50)}-${transformation}-${i}`;
  
  // Check cache first
  if (transformCache.has(cacheKey)) {
    return transformCache.get(cacheKey)!;
  }
  
  return new Promise(async (resolve) => {
    const img = document.createElement('img');
    const canvas = document.createElement('canvas');
    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    img.onload = async () => {
      const ctx = canvas.getContext('2d', {
        willReadFrequently: true,
        alpha: true,
        desynchronized: true,
      }) as CanvasRenderingContext2D;

      // Optimize canvas rendering
      ctx.imageSmoothingEnabled = false; // Disable anti-aliasing for better performance
      ctx.clearRect(0, 0, WIDTH, HEIGHT);
      ctx.save();
      
      // Apply transformation
      const transformationFn = transforms[transformation];
      await transformationFn(ctx, img, i);
      ctx.restore();

      // Get image data with appropriate quality settings
      const isPerformanceMode = localStorage.getItem(PERFORMANCE_MODE_KEY) === 'true';
      const quality = isPerformanceMode ? 0.8 : 0.95;
      const result = canvas.toDataURL('image/png', quality);
      
      // Cache the result (limit cache size)
      if (transformCache.size > 100) {
        const firstKey = transformCache.keys().next().value;
        transformCache.delete(firstKey);
      }
      transformCache.set(cacheKey, result);
      
      resolve(result);

      // Clean up
      if (img.parentNode) img.parentNode.removeChild(img);
      canvas.remove();
    };

    img.src = image;
  });
};