import { WIDTH, HEIGHT } from '../../constants';
import { calculateAspectRatioFit } from '../transforms/utils';

interface Bubble {
  x: number;
  y: number;
  radius: number;
  speed: number;
  wobble: number;
  wobbleSpeed: number;
}

let bubbles: Bubble[] = [];

const initBubbles = () => {
  if (bubbles.length === 0) {
    bubbles = Array.from({ length: 30 }, () => ({
      x: Math.random() * WIDTH,
      y: HEIGHT + Math.random() * 100,
      radius: Math.random() * 15 + 5,
      speed: Math.random() * 2 + 1,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: Math.random() * 0.1 + 0.05,
    }));
  }
};

export const createBubblesEffect = (
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement | HTMLCanvasElement,
  frameIndex: number
) => {
  initBubbles();

  const dims = calculateAspectRatioFit(img.width, img.height, WIDTH, HEIGHT);

  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  ctx.translate(WIDTH / 2, HEIGHT / 2);
  ctx.drawImage(img, -dims.width / 2, -dims.height / 2, dims.width, dims.height);
  ctx.translate(-WIDTH / 2, -HEIGHT / 2);

  bubbles.forEach((bubble) => {
    bubble.y -= bubble.speed;
    bubble.wobble += bubble.wobbleSpeed;
    const wobbleX = Math.sin(bubble.wobble) * 10;

    if (bubble.y + bubble.radius < 0) {
      bubble.y = HEIGHT + bubble.radius;
      bubble.x = Math.random() * WIDTH;
    }

    const gradient = ctx.createRadialGradient(
      bubble.x + wobbleX,
      bubble.y,
      0,
      bubble.x + wobbleX,
      bubble.y,
      bubble.radius
    );
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
    gradient.addColorStop(0.5, 'rgba(173, 216, 230, 0.3)');
    gradient.addColorStop(1, 'rgba(135, 206, 235, 0.1)');

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(bubble.x + wobbleX, bubble.y, bubble.radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(bubble.x + wobbleX, bubble.y, bubble.radius, 0, Math.PI * 2);
    ctx.stroke();
  });
};
