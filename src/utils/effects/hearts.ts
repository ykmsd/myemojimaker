import { WIDTH, HEIGHT } from '../../constants';
import { calculateAspectRatioFit } from '../transforms/utils';

interface Heart {
  x: number;
  y: number;
  size: number;
  opacity: number;
  color: string;
  isFront: boolean;
}

const HEART_COLORS = [
  '#FF69B4', // Hot Pink
  '#FF1493', // Deep Pink
  '#FF0066', // Bright Pink
  '#FF91A4', // Light Pink
  '#FF4466'  // Rose Pink
];

function createHearts(frameIndex: number): Heart[] {
  const heartCount = 6; // Reduced from 12 to 6 hearts
  return Array.from({ length: heartCount }, (_, idx) => {
    const progress = (frameIndex / 10 + idx / heartCount) % 1;
    const angle = Math.PI * 2 * Math.random();
    const radius = Math.random() * Math.min(WIDTH, HEIGHT) * 0.2;
    
    return {
      x: WIDTH / 2 + Math.cos(angle) * radius,
      y: HEIGHT * 0.2 + Math.sin(angle) * radius - progress * HEIGHT,
      size: 24 + Math.random() * 24, // Increased size range (24-48px)
      opacity: Math.max(0, 1 - progress),
      color: HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)],
      isFront: idx < heartCount / 2
    };
  });
}

function drawHearts(ctx: CanvasRenderingContext2D, hearts: Heart[], isFront: boolean): void {
  hearts
    .filter(heart => heart.isFront === isFront)
    .forEach(({ x, y, size, opacity, color }) => {
      ctx.save();
      ctx.font = `${size}px Arial`;
      ctx.fillStyle = color;
      ctx.globalAlpha = opacity;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('❤', x, y);
      ctx.restore();
    });
}

export function createCuteHeartsEffect(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  frameIndex: number
): void {
  const dims = calculateAspectRatioFit(img.width, img.height, WIDTH * 0.9, HEIGHT * 0.9);
  const hearts = createHearts(frameIndex);
  
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  
  // Draw background hearts
  drawHearts(ctx, hearts, false);
  
  // Draw the image closer to bottom
  ctx.save();
  ctx.translate(
    WIDTH / 2,
    HEIGHT - dims.height / 2 - 5 // Even closer to bottom
  );
  ctx.drawImage(img, -dims.width / 2, -dims.height / 2, dims.width, dims.height);
  ctx.restore();
  
  // Draw foreground hearts
  drawHearts(ctx, hearts, true);
}