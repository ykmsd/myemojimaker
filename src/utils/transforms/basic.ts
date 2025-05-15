import { AnimatedEffectType } from '../../types/effects';
import { WIDTH, HEIGHT, CONTRAST, SATURATE, SPIRAL_SPEED_MULTIPLIER, SPEED_STORAGE_KEY, DEFAULT_SPEED } from '../../constants';
import { contrastFilter, hueRotateFilter, saturateFilter } from '../filters';
import { calculateAspectRatioFit } from './utils';
import * as animations from '../../constants/animations';

export const basicTransforms = {
  [AnimatedEffectType.COLORS]: (
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    i: number
  ) => {
    const angle = (360 / 10) * i;
    const hdeg = 9 * angle;
    const dims = calculateAspectRatioFit(img.width, img.height, WIDTH, HEIGHT);
    ctx.translate(WIDTH / 2, HEIGHT / 2);
    ctx.drawImage(img, -dims.width / 2, -dims.height / 2, dims.width, dims.height);
    hueRotateFilter(ctx, hdeg);
    contrastFilter(ctx, CONTRAST);
    saturateFilter(ctx, SATURATE);
  },

  [AnimatedEffectType.SPIN]: (
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    i: number
  ) => {
    const angle = (360 / 10) * i;
    const deg = (angle * Math.PI) / 180;
    const dims = calculateAspectRatioFit(img.width, img.height, WIDTH, HEIGHT);
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.translate(WIDTH / 2, HEIGHT / 2);
    ctx.rotate(deg);
    ctx.drawImage(img, -dims.width / 2, -dims.height / 2, dims.width, dims.height);
    contrastFilter(ctx, CONTRAST);
  },

  [AnimatedEffectType.TWIST]: (
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    i: number
  ) => {
    const dims = calculateAspectRatioFit(img.width, img.height, WIDTH, HEIGHT);
    const angle = (animations.twistAngles[i] * Math.PI) / 180;
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.translate(WIDTH / 2, HEIGHT / 2);
    ctx.rotate(angle);
    ctx.drawImage(img, -dims.width / 2, -dims.height / 2, dims.width, dims.height);
    contrastFilter(ctx, CONTRAST);
  },

  [AnimatedEffectType.JELLO]: (
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    i: number
  ) => {
    if (!Array.isArray(animations.jelloScales) || !animations.jelloScales[i]) return;
    
    const dims = calculateAspectRatioFit(img.width, img.height, WIDTH, HEIGHT);
    const [scaleX, scaleY] = animations.jelloScales[i];
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.translate(WIDTH / 2, HEIGHT / 2);
    ctx.scale(scaleX, scaleY);
    ctx.drawImage(img, -dims.width / 2, -dims.height / 2, dims.width, dims.height);
    contrastFilter(ctx, CONTRAST);
  },

  [AnimatedEffectType.SKEW]: (
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    i: number
  ) => {
    if (!animations.skewSteps[i]) return;
    
    const dims = calculateAspectRatioFit(img.width, img.height, WIDTH, HEIGHT);
    const { skewX } = animations.skewSteps[i];
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.translate(WIDTH / 2, HEIGHT / 2);
    ctx.transform(1, 0, Math.tan((skewX * Math.PI) / 180), 1, 0, 0);
    ctx.drawImage(img, -dims.width / 2, -dims.height / 2, dims.width, dims.height);
    contrastFilter(ctx, CONTRAST);
  },

  [AnimatedEffectType.SPIRAL]: (
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    i: number
  ) => {
    const currentSpeed = localStorage.getItem(SPEED_STORAGE_KEY) || DEFAULT_SPEED;
    const dims = calculateAspectRatioFit(img.width, img.height, WIDTH, HEIGHT);
    const { angle: baseAngle, scale, opacity } = animations.spiralSteps[i];
    const angle = baseAngle * SPIRAL_SPEED_MULTIPLIER[currentSpeed as keyof typeof SPIRAL_SPEED_MULTIPLIER];
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.translate(WIDTH / 2, HEIGHT / 2);
    ctx.rotate((angle * Math.PI) / 180);
    ctx.scale(scale, scale);
    ctx.globalAlpha = opacity;
    ctx.drawImage(img, -dims.width / 2, -dims.height / 2, dims.width, dims.height);
    ctx.globalAlpha = 1;
    contrastFilter(ctx, CONTRAST);
  },

  [AnimatedEffectType.PULSE]: (
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    i: number
  ) => {
    const dims = calculateAspectRatioFit(img.width, img.height, WIDTH, HEIGHT);
    const [scaleX, scaleY] = animations.pulseSteps[i];
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.translate(WIDTH / 2, HEIGHT / 2);
    ctx.scale(scaleX, scaleY);
    ctx.drawImage(img, -dims.width / 2, -dims.height / 2, dims.width, dims.height);
    contrastFilter(ctx, CONTRAST);
  },

  [AnimatedEffectType.ZOOM]: (
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    i: number
  ) => {
    const dims = calculateAspectRatioFit(img.width, img.height, WIDTH, HEIGHT);
    const [scale] = animations.zoomSteps[i];
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.translate(WIDTH / 2, HEIGHT / 2);
    ctx.scale(scale, scale);
    ctx.drawImage(img, -dims.width / 2, -dims.height / 2, dims.width, dims.height);
    contrastFilter(ctx, CONTRAST);
  },

  [AnimatedEffectType.HEARTBEAT]: (
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    i: number
  ) => {
    if (!animations.heartbeatSteps[i]) return;
    
    const dims = calculateAspectRatioFit(img.width, img.height, WIDTH, HEIGHT);
    const [scaleX, scaleY] = animations.heartbeatSteps[i];
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.translate(WIDTH / 2, HEIGHT / 2);
    ctx.scale(scaleX, scaleY);
    ctx.drawImage(img, -dims.width / 2, -dims.height / 2, dims.width, dims.height);
    contrastFilter(ctx, CONTRAST);
  },
};