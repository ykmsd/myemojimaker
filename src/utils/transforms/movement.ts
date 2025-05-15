import { AnimatedEffectType } from '../../types/effects';
import { WIDTH, HEIGHT, CONTRAST } from '../../constants';
import { contrastFilter } from '../filters';
import * as animations from '../../constants/animations';
import { calculateAspectRatioFit } from './utils';

export const movementTransforms = {
  // Basic Movement
  [AnimatedEffectType.PARTY]: (
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    i: number
  ) => {
    if (!animations.partyTranslations?.[i]) {
      return;
    }
    const [x, y] = animations.partyTranslations[i];
    const dims = calculateAspectRatioFit(img.width, img.height, WIDTH, HEIGHT);
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.translate(WIDTH / 2, HEIGHT / 2);
    ctx.translate(x, y);
    ctx.drawImage(
      img,
      -dims.width / 2,
      -dims.height / 2,
      dims.width,
      dims.height
    );
    contrastFilter(ctx, CONTRAST);
  },

  [AnimatedEffectType.SHAKING]: (
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    i: number
  ) => {
    if (!animations.shakingTranslations?.[i]) {
      return;
    }
    const [x, y] = animations.shakingTranslations[i];
    const dims = calculateAspectRatioFit(img.width, img.height, WIDTH, HEIGHT);
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.translate(WIDTH / 2, HEIGHT / 2);
    ctx.translate(x, y);
    ctx.drawImage(
      img,
      -dims.width / 2,
      -dims.height / 2,
      dims.width,
      dims.height
    );
    contrastFilter(ctx, CONTRAST);
  },

  [AnimatedEffectType.BOUNCE]: (
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    i: number
  ) => {
    if (!animations.bounceTranslations?.[i]) {
      return;
    }
    const [x, y] = animations.bounceTranslations[i];
    const dims = calculateAspectRatioFit(img.width, img.height, WIDTH, HEIGHT);
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.translate(WIDTH / 2, HEIGHT / 2);
    ctx.translate(x, y);
    ctx.drawImage(
      img,
      -dims.width / 2,
      -dims.height / 2,
      dims.width,
      dims.height
    );
    contrastFilter(ctx, CONTRAST);
  },

  [AnimatedEffectType.OSCILLATE]: (
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    i: number
  ) => {
    if (!animations.oscillateSteps?.[i]) {
      return;
    }
    const [x] = animations.oscillateSteps[i];
    const dims = calculateAspectRatioFit(img.width, img.height, WIDTH, HEIGHT);
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.translate(WIDTH / 2, HEIGHT / 2);
    ctx.translate(x, 0);
    ctx.drawImage(
      img,
      -dims.width / 2,
      -dims.height / 2,
      dims.width,
      dims.height
    );
    contrastFilter(ctx, CONTRAST);
  },

  [AnimatedEffectType.FLOAT]: (
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    i: number
  ) => {
    if (!animations.floatSteps?.[i]) {
      return;
    }
    const [x, y] = animations.floatSteps[i];
    const dims = calculateAspectRatioFit(img.width, img.height, WIDTH, HEIGHT);
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.translate(WIDTH / 2, HEIGHT / 2);
    ctx.translate(x, y);
    ctx.drawImage(
      img,
      -dims.width / 2,
      -dims.height / 2,
      dims.width,
      dims.height
    );
    contrastFilter(ctx, CONTRAST);
  },

  [AnimatedEffectType.ZIGZAG]: (
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    i: number
  ) => {
    if (!animations.zigzagSteps?.[i]) {
      return;
    }
    const [x, y] = animations.zigzagSteps[i];
    const dims = calculateAspectRatioFit(img.width, img.height, WIDTH, HEIGHT);
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.translate(WIDTH / 2, HEIGHT / 2);
    ctx.translate(x, y);
    ctx.drawImage(
      img,
      -dims.width / 2,
      -dims.height / 2,
      dims.width,
      dims.height
    );
    contrastFilter(ctx, CONTRAST);
  },

  [AnimatedEffectType.SWING]: (
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    i: number
  ) => {
    if (!animations.swingSteps?.[i]?.angle) {
      return;
    }
    const { angle } = animations.swingSteps[i];
    const dims = calculateAspectRatioFit(img.width, img.height, WIDTH, HEIGHT);
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.translate(WIDTH / 2, HEIGHT / 2);
    ctx.rotate((angle * Math.PI) / 180);
    ctx.drawImage(
      img,
      -dims.width / 2,
      -dims.height / 2,
      dims.width,
      dims.height
    );
    contrastFilter(ctx, CONTRAST);
  },

  [AnimatedEffectType.SCROLL_V]: (
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    i: number
  ) => {
    if (!animations.scrollSteps?.[i]) {
      return;
    }
    const dims = calculateAspectRatioFit(img.width, img.height, WIDTH, HEIGHT);
    const offset = animations.scrollSteps[i] * HEIGHT;
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.translate(WIDTH / 2, HEIGHT / 2);
    ctx.drawImage(
      img,
      -dims.width / 2,
      -dims.height / 2 + offset,
      dims.width,
      dims.height
    );
    ctx.drawImage(
      img,
      -dims.width / 2,
      -dims.height / 2 - HEIGHT + offset,
      dims.width,
      dims.height
    );
    contrastFilter(ctx, CONTRAST);
  },

  [AnimatedEffectType.SCROLL_H]: (
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    i: number
  ) => {
    if (!animations.scrollSteps?.[i]) {
      return;
    }
    const dims = calculateAspectRatioFit(img.width, img.height, WIDTH, HEIGHT);
    const offset = animations.scrollSteps[i] * WIDTH;
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.translate(WIDTH / 2, HEIGHT / 2);
    ctx.drawImage(
      img,
      -dims.width / 2 + offset,
      -dims.height / 2,
      dims.width,
      dims.height
    );
    ctx.drawImage(
      img,
      -dims.width / 2 - WIDTH + offset,
      -dims.height / 2,
      dims.width,
      dims.height
    );
    contrastFilter(ctx, CONTRAST);
  },
};