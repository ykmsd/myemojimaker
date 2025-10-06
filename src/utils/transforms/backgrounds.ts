import { AnimatedEffectType } from '../../types/effects';
import { WIDTH, HEIGHT } from '../../constants';
import { getGifFrames } from '../gif/backgrounds';
import { getCustomGifFrames } from '../gif/customFilter';
import { calculateAspectRatioFit } from './utils';
import { contrastFilter } from '../filters';
import { createSpaceObjects } from './spaceObjects';

async function applyBackgroundEffect(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  i: number,
  type: 'fire' | 'space-travel',
  scale: number = 0.8,
  position: 'center' | 'bottom' = 'center'
) {
  const frames = await getGifFrames(type);
  if (!frames.length) return;

  const frameIndex = i % frames.length;
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  ctx.putImageData(frames[frameIndex], 0, 0);

  const dims = calculateAspectRatioFit(
    img.width,
    img.height,
    WIDTH * scale,
    HEIGHT * scale
  );

  const x = WIDTH / 2;
  const y = position === 'bottom' ? HEIGHT - dims.height / 2 : HEIGHT / 2;

  ctx.translate(x, y);
  ctx.drawImage(
    img,
    -dims.width / 2,
    -dims.height / 2,
    dims.width,
    dims.height
  );
  contrastFilter(ctx, 125);
}

export const backgroundTransforms = {
  [AnimatedEffectType.THIS_IS_FINE]: async (
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    i: number
  ) => {
    await applyBackgroundEffect(ctx, img, i, 'fire', 0.85, 'bottom');
  },

  [AnimatedEffectType.SPACE_TRAVEL]: async (
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    i: number
  ) => {
    const frames = await getGifFrames('space-travel');
    if (!frames.length) return;

    const frameIndex = i % frames.length;
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.putImageData(frames[frameIndex], 0, 0);

    // Create floating objects
    const objects = createSpaceObjects(i);
    objects.forEach(({ x, y, scale, opacity }) => {
      ctx.save();
      ctx.translate(x, y);
      
      const dims = calculateAspectRatioFit(
        img.width,
        img.height,
        WIDTH * scale,
        HEIGHT * scale
      );

      ctx.globalAlpha = opacity;
      ctx.drawImage(
        img,
        -dims.width / 2,
        -dims.height / 2,
        dims.width,
        dims.height
      );
      ctx.restore();
    });
  },

  [AnimatedEffectType.CUSTOM_GIF]: (
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    i: number
  ) => {
    const frames = getCustomGifFrames();

    if (!frames || frames.length === 0) {
      console.warn('No custom GIF frames available');
      return;
    }

    const frameIndex = i % frames.length;
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    // Draw the composed frame (already contains both GIF background and image)
    ctx.putImageData(frames[frameIndex], 0, 0);
  }
};