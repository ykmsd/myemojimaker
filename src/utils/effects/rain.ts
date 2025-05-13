import { WIDTH, HEIGHT, CONTRAST } from '../../constants';
import { calculateAspectRatioFit } from '../transforms/utils';
import { contrastFilter } from '../filters';

interface Raindrop {
  x: number;
  y: number;
  scale: number;
  opacity: number;
}

function createRaindrops(frameIndex: number): Raindrop[] {
  return Array.from({ length: 6 }, (_, idx) => {
    const progress = (frameIndex / 10 + idx / 6) % 1;
    return {
      x: (Math.random() - 0.5) * 100,
      y: progress * 250 - 125,
      scale: 0.5 + Math.random() * 0.5, // Increased scale range (0.5 to 1.0)
      opacity: Math.min(1, 1.5 - progress)
    };
  });
}

export function createRainEffect(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  frameIndex: number
): void {
  const dims = calculateAspectRatioFit(img.width, img.height, WIDTH * 0.7, HEIGHT * 0.7); // Increased base size to 70%
  ctx.clearRect(0, 0, WIDTH, HEIGHT);

  const raindrops = createRaindrops(frameIndex);

  raindrops.forEach(({ x, y, scale, opacity }) => {
    ctx.save();
    ctx.translate(WIDTH / 2 + x, HEIGHT / 2 + y);
    ctx.scale(scale, scale);
    ctx.globalAlpha = opacity;
    ctx.drawImage(img, -dims.width / 2, -dims.height / 2, dims.width, dims.height);
    ctx.restore();
  });

  contrastFilter(ctx, CONTRAST);
}