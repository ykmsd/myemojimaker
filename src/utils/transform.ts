import { AnimatedEffectType as TransformationType } from '../types/effects';
import { WIDTH, HEIGHT, FRAME_COUNT } from '../constants';
import { transforms } from './transforms';

export const transform = async (
  image: string,
  transformation: keyof typeof TransformationType,
  i: number
): Promise<string> => {
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

      // Clear the canvas with a fully transparent background
      ctx.clearRect(0, 0, WIDTH, HEIGHT);
      
      // Save the context state before transformations
      ctx.save();
      
      // Apply the transformation
      const transformationFn = transforms[transformation];
      await transformationFn(ctx, img, i);
      
      // Restore the context state
      ctx.restore();

      // Use PNG with alpha channel support for best quality
      resolve(canvas.toDataURL('image/png', 1.0));

      // Clean up DOM elements
      if (img.parentNode) img.parentNode.removeChild(img);
      canvas.remove();
    };

    img.src = image;
  });
};