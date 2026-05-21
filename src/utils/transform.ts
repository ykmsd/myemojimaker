import { AnimatedEffectType as TransformationType } from '../types/effects';
import { WIDTH, HEIGHT, FRAME_COUNT } from '../constants';
import { transforms } from './transforms';

export const transform = async (
  image: string,
  transformation: keyof typeof TransformationType,
  i: number
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = document.createElement('img');
    const canvas = document.createElement('canvas');
    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    img.onerror = () => {
      canvas.remove();
      reject(new Error(`Failed to load image for transformation ${transformation}`));
    };

    img.onload = async () => {
      try {
        const ctx = canvas.getContext('2d', {
          willReadFrequently: true,
          alpha: true,
          desynchronized: true,
        }) as CanvasRenderingContext2D;

        // Enable better image smoothing
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        ctx.clearRect(0, 0, WIDTH, HEIGHT);
        ctx.save();
        const transformationFn = transforms[transformation];
        await transformationFn(ctx, img, i);
        ctx.restore();

        // Use higher quality PNG encoding
        resolve(canvas.toDataURL('image/png', 0.95));
      } catch (err) {
        reject(err);
      } finally {
        if (img.parentNode) img.parentNode.removeChild(img);
        canvas.remove();
      }
    };

    img.src = image;
  });
};
