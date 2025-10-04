import { createCanvas, loadImage } from './canvas';
import { WIDTH, HEIGHT } from '../constants';
import { overlayMap } from '../constants/overlays';
import { getCachedSvg } from './svgCache';

export async function generateStaticPng(
  imageUrl: string,
  effectClass: string,
  primaryColor: string,
  strokeColor: string,
  overlayScale: number = 100,
  overlayX: number = 0,
  overlayY: number = 0
): Promise<Blob> {
  try {
    const image = await loadImage(imageUrl);
    const { canvas, ctx } = createCanvas(WIDTH, HEIGHT);

    // Calculate dimensions to maintain aspect ratio
    const ratio = Math.min(WIDTH / image.width, HEIGHT / image.height);
    const width = image.width * ratio;
    const height = image.height * ratio;
    const x = (WIDTH - width) / 2;
    const y = (HEIGHT - height) / 2;

    // Clear canvas and set background to transparent
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    // Draw the base image
    ctx.drawImage(image, x, y, width, height);

    // Apply overlay effect if available
    const effect = overlayMap[effectClass];
    if (effect) {
      const overlayUrl = await getCachedSvg(
        effect.src,
        primaryColor,
        strokeColor
      );

      try {
        // Check if it's an SVG effect
        const overlayImage = await loadImage(overlayUrl);

        ctx.save();

        // Set opacity
        if (effect.opacity) {
          ctx.globalAlpha = effect.opacity;
        }

        // Set blend mode
        if (effect.blendMode) {
          ctx.globalCompositeOperation = effect.blendMode;
        }

        // Get overlay dimensions and position
        let baseWidth = effect.size?.width ?? WIDTH;
        let baseHeight = effect.size?.height ?? HEIGHT;

        // If only width is specified, calculate height to maintain aspect ratio
        if (effect.size?.width && !effect.size?.height) {
          const aspectRatio = overlayImage.width / overlayImage.height;
          baseHeight = baseWidth / aspectRatio;
        }

        // Apply scale
        const scaleFactor = overlayScale / 100;
        let overlayWidth = baseWidth * scaleFactor;
        let overlayHeight = baseHeight * scaleFactor;

        // Calculate position with custom offset
        const baseX = effect.position?.x ?? (WIDTH - overlayWidth) / 2;
        const baseY = effect.position?.y ?? (HEIGHT - overlayHeight) / 2;
        const finalX = baseX + overlayX;
        const finalY = baseY + overlayY;

        // Draw overlay
        ctx.drawImage(
          overlayImage,
          finalX,
          finalY,
          overlayWidth,
          overlayHeight
        );

        ctx.restore();
      } catch (overlayError) {
        console.warn(
          `Failed to load overlay for effect ${effectClass}:`,
          overlayError
        );
        // Continue without the overlay
      }
    }

    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Failed to generate PNG blob'));
          }
        },
        'image/png',
        1.0
      );
    });
  } catch (error) {
    console.error('Error generating PNG:', error);
    throw error;
  }
}
