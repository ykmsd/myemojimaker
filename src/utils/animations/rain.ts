import { WIDTH, HEIGHT } from '../../constants';

interface Raindrop {
  x: number;
  y: number;
  speed: number;
  length: number;
}

export function createRaindrops(count: number): Raindrop[] {
  return Array.from({ length: count }, () => ({
    x: Math.random() * WIDTH,
    y: Math.random() * HEIGHT,
    speed: 2 + Math.random() * 3,
    length: 10 + Math.random() * 20
  }));
}

export function updateRaindrops(raindrops: Raindrop[]): void {
  raindrops.forEach(drop => {
    drop.y = (drop.y + drop.speed) % HEIGHT;
  });
}

export function drawRain(
  ctx: CanvasRenderingContext2D, 
  raindrops: Raindrop[],
  color: string = '#ADD8E6'
): void {
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  ctx.globalAlpha = 0.6;

  raindrops.forEach(drop => {
    ctx.beginPath();
    ctx.moveTo(drop.x, drop.y);
    ctx.lineTo(drop.x, drop.y + drop.length);
    ctx.stroke();
  });

  ctx.globalAlpha = 1;
}