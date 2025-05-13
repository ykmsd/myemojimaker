import { WIDTH, HEIGHT, CONTRAST } from '../../constants';
import { calculateAspectRatioFit } from '../transforms/utils';
import { contrastFilter } from '../filters';

interface RainbowDrop {
  x: number;
  y: number;
  scale: number;
  opacity: number;
  hue: number;
}

function createRainbowDrops(frameIndex: number): RainbowDrop[] {
  return Array.from({ length: 8 }, (_, idx) => {
    const progress = (frameIndex / 10 + idx / 8) % 1;
    return {
      x: (Math.random() - 0.5) * 120,
      y: progress * 300 - 150,
      scale: 0.5 + Math.random() * 0.5, // Increased scale range (0.5 to 1.0)
      opacity: Math.min(1, 1.5 - progress),
      hue: (idx * 45 + frameIndex * 10) % 360
    };
  });
}

export function createRainbowRainEffect(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  frameIndex: number
): void {
  const dims = calculateAspectRatioFit(img.width, img.height, WIDTH * 0.7, HEIGHT * 0.7); // Increased base size to 70%
  ctx.clearRect(0, 0, WIDTH, HEIGHT);

  const drops = createRainbowDrops(frameIndex);

  drops.forEach(({ x, y, scale, opacity, hue }) => {
    ctx.save();
    ctx.translate(WIDTH / 2 + x, HEIGHT / 2 + y);
    ctx.scale(scale, scale);
    ctx.globalAlpha = opacity;
    ctx.filter = `hue-rotate(${hue}deg) saturate(150%)`;
    ctx.drawImage(img, -dims.width / 2, -dims.height / 2, dims.width, dims.height);
    ctx.restore();
  });

  contrastFilter(ctx, CONTRAST);
}