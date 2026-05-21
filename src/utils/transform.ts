import { AnimatedEffectType as TransformationType } from '../types/effects';
import { WIDTH, HEIGHT, FRAME_COUNT } from '../constants';
import { transforms } from './transforms';

export const transform = async (
  image: HTMLImageElement,
  transformation: keyof typeof TransformationType,
  i: number
): Promise<HTMLCanvasElement> => {
  const canvas = document.createElement('canvas');
  canvas.width = WIDTH;
  canvas.height = HEIGHT;

  const ctx = canvas.getContext('2d', {
    willReadFrequently: true,
    alpha: true,
    desynchronized: true,
  }) as CanvasRenderingContext2D;

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  ctx.save();
  const transformationFn = transforms[transformation];
  await transformationFn(ctx, image, i);
  ctx.restore();

  return canvas;
};
