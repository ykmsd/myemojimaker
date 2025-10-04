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
import { createConfettiEffect } from '../effects/confetti';
import { createStarsEffect } from '../effects/stars';
import { createMoneyRainEffect } from '../effects/money';

export const effectTransforms = {
  [AnimatedEffectType.RAINBOW]: (ctx, img, i) => {
    const dims = calculateAspectRatioFit(img.width, img.height, WIDTH, HEIGHT);
    
    // Make a full and continuous cycle across all frames
    // Use a precise cycle fraction to ensure the last frame aligns with the first
    const cycleOffset = (i / FRAME_COUNT) * HEIGHT;
    
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.translate(WIDTH / 2, HEIGHT / 2);
    ctx.drawImage(img, -dims.width / 2, -dims.height / 2, dims.width, dims.height);
    rainbowFilter(ctx, cycleOffset);
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
    
    // Make a full and continuous cycle across all frames
    // Use a precise cycle fraction to ensure the last frame aligns with the first
    const cycleOffset = (i / FRAME_COUNT) * HEIGHT;
    
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.translate(WIDTH / 2, HEIGHT / 2);
    ctx.drawImage(img, -dims.width / 2, -dims.height / 2, dims.width, dims.height);
    neonFilter(ctx, cycleOffset);
    contrastFilter(ctx, CONTRAST);
  },

  [AnimatedEffectType.SYNTHWAVE]: (ctx, img, i) => {
    const dims = calculateAspectRatioFit(img.width, img.height, WIDTH, HEIGHT);
    
    // Make a full and continuous cycle across all frames
    // Use a precise cycle fraction to ensure the last frame aligns with the first
    const cycleOffset = (i / FRAME_COUNT) * HEIGHT;
    
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.translate(WIDTH / 2, HEIGHT / 2);
    ctx.drawImage(img, -dims.width / 2, -dims.height / 2, dims.width, dims.height);
    synthwaveFilter(ctx, cycleOffset);
    contrastFilter(ctx, CONTRAST);
  },

  [AnimatedEffectType.FIRE]: (ctx, img, i) => {
    const dims = calculateAspectRatioFit(img.width, img.height, WIDTH, HEIGHT);
    
    // Make a full and continuous cycle across all frames
    // Use a precise cycle fraction to ensure the last frame aligns with the first
    const cycleOffset = (i / FRAME_COUNT) * HEIGHT;
    
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.translate(WIDTH / 2, HEIGHT / 2);
    ctx.drawImage(img, -dims.width / 2, -dims.height / 2, dims.width, dims.height);
    fireFilter(ctx, cycleOffset);
    contrastFilter(ctx, CONTRAST);
  },

  [AnimatedEffectType.FROZEN]: (ctx, img, i) => {
    const dims = calculateAspectRatioFit(img.width, img.height, WIDTH, HEIGHT);
    
    // Make a full and continuous cycle across all frames
    // Use a precise cycle fraction to ensure the last frame aligns with the first
    const cycleOffset = (i / FRAME_COUNT) * HEIGHT;
    
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.translate(WIDTH / 2, HEIGHT / 2);
    ctx.drawImage(img, -dims.width / 2, -dims.height / 2, dims.width, dims.height);
    frozenFilter(ctx, cycleOffset);
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
  },

  [AnimatedEffectType.CONFETTI]: (ctx, img, i) => {
    createConfettiEffect(ctx, img, i);
  },

  [AnimatedEffectType.STARS]: (ctx, img, i) => {
    createStarsEffect(ctx, img, i);
  },

  [AnimatedEffectType.MONEY_RAIN]: (ctx, img, i) => {
    createMoneyRainEffect(ctx, img, i);
  }
};