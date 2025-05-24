import { AnimatedEffectType } from '../../types/effects';
import { WIDTH, HEIGHT, CONTRAST, FRAME_COUNT } from '../../constants';
import {
  contrastFilter,
  rainbowFilter,
  neonFilter,
  synthwaveFilter,
  fireFilter,
  frozenFilter,
  glitchFilter
} from '../filters';
import { calculateAspectRatioFit } from './utils';
import { createStardustEffect } from './sparkles';
import { createRainEffect } from '../effects/rain';
import { createMatrixEffect } from '../effects/matrix';
import { createSpaceTravelEffect } from '../effects/spaceTravel';
import { createRainbowRainEffect } from '../effects/rainbowRain';
import { createCuteHeartsEffect } from '../effects/hearts';

export const effectTransforms = {
  [AnimatedEffectType.RAINBOW]: (ctx, img, i) => {
    const dims = calculateAspectRatioFit(img.width, img.height, WIDTH, HEIGHT);
    // Use a smoother continuous animation based on frame index
    const offset = i * (HEIGHT * 2 / FRAME_COUNT);
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.translate(WIDTH / 2, HEIGHT / 2);
    ctx.drawImage(img, -dims.width / 2, -dims.height / 2, dims.width, dims.height);
    rainbowFilter(ctx, offset);
    contrastFilter(ctx, CONTRAST);
  },

  [AnimatedEffectType.STARDUST]: (ctx, img, i) => {
    createStardustEffect(ctx, img, i);
  },

  [AnimatedEffectType.GLITCH]: (ctx, img, i) => {
    const dims = calculateAspectRatioFit(img.width, img.height, WIDTH, HEIGHT);
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.translate(WIDTH / 2, HEIGHT / 2);
    ctx.drawImage(img, -dims.width / 2, -dims.height / 2, dims.width, dims.height);
    glitchFilter(ctx, 10 + Math.sin(i * 0.5) * 5);
    contrastFilter(ctx, CONTRAST);
  },

  [AnimatedEffectType.NEON]: (ctx, img, i) => {
    const dims = calculateAspectRatioFit(img.width, img.height, WIDTH, HEIGHT);
    // Use a smoother continuous animation based on frame index
    const offset = i * (HEIGHT * 2 / FRAME_COUNT);
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.translate(WIDTH / 2, HEIGHT / 2);
    ctx.drawImage(img, -dims.width / 2, -dims.height / 2, dims.width, dims.height);
    neonFilter(ctx, offset);
    contrastFilter(ctx, CONTRAST);
  },

  [AnimatedEffectType.SYNTHWAVE]: (ctx, img, i) => {
    const dims = calculateAspectRatioFit(img.width, img.height, WIDTH, HEIGHT);
    // Use a smoother continuous animation based on frame index
    const offset = i * (HEIGHT * 2 / FRAME_COUNT);
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.translate(WIDTH / 2, HEIGHT / 2);
    ctx.drawImage(img, -dims.width / 2, -dims.height / 2, dims.width, dims.height);
    synthwaveFilter(ctx, offset);
    contrastFilter(ctx, CONTRAST);
  },

  [AnimatedEffectType.FIRE]: (ctx, img, i) => {
    const dims = calculateAspectRatioFit(img.width, img.height, WIDTH, HEIGHT);
    // Use a smoother continuous animation based on frame index
    const offset = i * (HEIGHT * 2 / FRAME_COUNT);
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.translate(WIDTH / 2, HEIGHT / 2);
    ctx.drawImage(img, -dims.width / 2, -dims.height / 2, dims.width, dims.height);
    fireFilter(ctx, offset);
    contrastFilter(ctx, CONTRAST);
  },

  [AnimatedEffectType.FROZEN]: (ctx, img, i) => {
    const dims = calculateAspectRatioFit(img.width, img.height, WIDTH, HEIGHT);
    // Use a smoother continuous animation based on frame index
    const offset = i * (HEIGHT * 2 / FRAME_COUNT);
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.translate(WIDTH / 2, HEIGHT / 2);
    ctx.drawImage(img, -dims.width / 2, -dims.height / 2, dims.width, dims.height);
    frozenFilter(ctx, offset);
    contrastFilter(ctx, CONTRAST);
  },

  [AnimatedEffectType.RAIN]: (ctx, img, i) => {
    createRainEffect(ctx, img, i);
  },

  [AnimatedEffectType.MATRIX]: (ctx, img, i) => {
    createMatrixEffect(ctx, img);
  },

  [AnimatedEffectType.SPACE_TRAVEL]: (ctx, img, i) => {
    createSpaceTravelEffect(ctx, img, i);
  },

  [AnimatedEffectType.RAINBOW_RAIN]: (ctx, img, i) => {
    createRainbowRainEffect(ctx, img, i);
  },

  [AnimatedEffectType.CUTE_HEARTS]: (ctx, img, i) => {
    createCuteHeartsEffect(ctx, img, i);
  }
};