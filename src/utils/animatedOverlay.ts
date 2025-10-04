import { createCanvas, loadImage } from './canvas';
import { WIDTH, HEIGHT } from '../constants';
import { overlayMap } from '../constants/overlays';
import { getCachedSvg } from './svgCache';
import { OverlayAnimationType } from '../types/effects';
import GIF from 'gif.js';

const FRAME_COUNT = 30;
const FRAME_DELAY = 50;

interface AnimationParams {
  frameIndex: number;
  totalFrames: number;
  overlayWidth: number;
  overlayHeight: number;
  canvasWidth: number;
  canvasHeight: number;
  baseX: number;
  baseY: number;
}

function calculateAnimatedPosition(
  animation: OverlayAnimationType,
  params: AnimationParams
): { x: number; y: number } {
  const { frameIndex, totalFrames, overlayWidth, canvasWidth, baseX, baseY } = params;
  const progress = frameIndex / totalFrames;

  switch (animation) {
    case 'slide-right': {
      const startX = -overlayWidth;
      const endX = canvasWidth;
      const x = startX + (endX - startX) * progress;
      return { x, y: baseY };
    }

    case 'float': {
      const angle = progress * Math.PI * 2;
      const floatRadius = 20;
      const x = baseX + Math.sin(angle) * floatRadius;
      const y = baseY + Math.cos(angle) * floatRadius * 0.5;
      return { x, y };
    }

    default:
      return { x: baseX, y: baseY };
  }
}

export async function generateAnimatedOverlayGif(
  imageUrl: string,
  effectClass: string,
  primaryColor: string,
  strokeColor: string,
  overlayScale: number = 100,
  overlayX: number = 0,
  overlayY: number = 0,
  animation: OverlayAnimationType = 'none',
  backgroundColor?: string
): Promise<Blob> {
  try {
    const image = await loadImage(imageUrl);
    const effect = overlayMap[effectClass];

    if (!effect) {
      throw new Error(`Effect ${effectClass} not found`);
    }

    const overlayUrl = await getCachedSvg(
      effect.src,
      primaryColor,
      strokeColor
    );

    const overlayImage = await loadImage(overlayUrl);

    const gif = new GIF({
      workers: 2,
      quality: 10,
      width: WIDTH,
      height: HEIGHT,
      workerScript: '/gif.worker.js',
    });

    const ratio = Math.min(WIDTH / image.width, HEIGHT / image.height);
    const width = image.width * ratio;
    const height = image.height * ratio;
    const x = (WIDTH - width) / 2;
    const y = (HEIGHT - height) / 2;

    let baseWidth = effect.size?.width ?? WIDTH;
    let baseHeight = effect.size?.height ?? HEIGHT;

    if (effect.size?.width && !effect.size?.height) {
      const aspectRatio = overlayImage.width / overlayImage.height;
      baseHeight = baseWidth / aspectRatio;
    }

    const scaleFactor = overlayScale / 100;
    const overlayWidth = baseWidth * scaleFactor;
    const overlayHeight = baseHeight * scaleFactor;

    const baseOverlayX = effect.position?.x ?? (WIDTH - overlayWidth) / 2;
    const baseOverlayY = effect.position?.y ?? (HEIGHT - overlayHeight) / 2;

    for (let frameIndex = 0; frameIndex < FRAME_COUNT; frameIndex++) {
      const { canvas, ctx } = createCanvas(WIDTH, HEIGHT);

      ctx.clearRect(0, 0, WIDTH, HEIGHT);

      if (backgroundColor) {
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, WIDTH, HEIGHT);
      }

      ctx.drawImage(image, x, y, width, height);

      ctx.save();

      if (effect.opacity) {
        ctx.globalAlpha = effect.opacity;
      }

      if (effect.blendMode) {
        ctx.globalCompositeOperation = effect.blendMode;
      }

      const animationParams: AnimationParams = {
        frameIndex,
        totalFrames: FRAME_COUNT,
        overlayWidth,
        overlayHeight,
        canvasWidth: WIDTH,
        canvasHeight: HEIGHT,
        baseX: baseOverlayX + overlayX,
        baseY: baseOverlayY + overlayY,
      };

      const { x: finalX, y: finalY } = calculateAnimatedPosition(
        animation,
        animationParams
      );

      ctx.drawImage(
        overlayImage,
        finalX,
        finalY,
        overlayWidth,
        overlayHeight
      );

      ctx.restore();

      gif.addFrame(ctx, { copy: true, delay: FRAME_DELAY });
    }

    return new Promise((resolve, reject) => {
      gif.on('finished', (blob: Blob) => {
        resolve(blob);
      });

      gif.on('error', (error: Error) => {
        reject(error);
      });

      gif.render();
    });
  } catch (error) {
    console.error('Error generating animated overlay GIF:', error);
    throw error;
  }
}
