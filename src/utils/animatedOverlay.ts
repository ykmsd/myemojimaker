import { createCanvas, loadImage } from './canvas';
import { WIDTH as FULL_WIDTH, HEIGHT as FULL_HEIGHT } from '../constants';
import { overlayMap } from '../constants/overlays';
import { getCachedSvg } from './svgCache';
import { OverlayAnimationType } from '../types/effects';
import GIF from 'gif.js';

const FRAME_COUNT = 10;
const WIDTH = 96;  // Smaller canvas for manga animations
const HEIGHT = 96;

interface AnimationParams {
  frameIndex: number;
  totalFrames: number;
  overlayWidth: number;
  overlayHeight: number;
  canvasWidth: number;
  canvasHeight: number;
  baseX: number;
  baseY: number;
  instanceIndex: number;
  totalInstances: number;
}

function calculateAnimatedPosition(
  animation: OverlayAnimationType,
  params: AnimationParams
): { x: number; y: number } {
  const { frameIndex, totalFrames, overlayWidth, overlayHeight, canvasWidth, canvasHeight, baseX, baseY, instanceIndex, totalInstances } = params;
  const progress = frameIndex / totalFrames;
  const phaseOffset = (instanceIndex / totalInstances);

  switch (animation) {
    case 'slide-right': {
      const startX = -overlayWidth;
      const endX = canvasWidth;
      const totalDistance = endX - startX;
      const adjustedProgress = (progress + phaseOffset) % 1;
      const x = startX + totalDistance * adjustedProgress;

      const verticalSpacing = canvasHeight / (totalInstances + 1);
      const y = verticalSpacing * (instanceIndex + 1) - overlayHeight / 2;

      return { x, y };
    }

    case 'float': {
      const angle = (progress + phaseOffset) * Math.PI * 2;
      const radiusVariation = 20 + (instanceIndex * 15);

      const x = baseX + Math.sin(angle) * radiusVariation;
      const y = baseY + Math.cos(angle) * radiusVariation * 0.5;
      return { x, y };
    }

    case 'intense': {
      const adjustedProgress = (progress + phaseOffset) % 1;

      const shake = Math.sin(adjustedProgress * Math.PI * 16) * 3;
      const vibrate = Math.cos(adjustedProgress * Math.PI * 12) * 2;

      const verticalSpacing = canvasHeight / (totalInstances + 1);
      const centerY = verticalSpacing * (instanceIndex + 1) - overlayHeight / 2;

      const x = baseX + shake;
      const y = centerY + vibrate;

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
  overlayCount: number = 1,
  backgroundColor?: string,
  animationSpeed: number = 0.1
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
      transparent: 0x000000,
      background: null,
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
      const canvas = document.createElement('canvas');
      canvas.width = WIDTH;
      canvas.height = HEIGHT;
      const ctx = canvas.getContext('2d', {
        willReadFrequently: true,
        alpha: true,
      });

      if (!ctx) continue;

      if (backgroundColor) {
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, WIDTH, HEIGHT);
      } else {
        ctx.clearRect(0, 0, WIDTH, HEIGHT);
      }

      ctx.drawImage(image, x, y, width, height);

      for (let instanceIndex = 0; instanceIndex < overlayCount; instanceIndex++) {
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
          instanceIndex,
          totalInstances: overlayCount,
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
      }

      const frameDelay = animationSpeed * 1000;
      gif.addFrame(canvas, { copy: true, delay: frameDelay, transparent: true, disposal: 2 });
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
