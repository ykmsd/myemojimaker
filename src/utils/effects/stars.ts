import { WIDTH, HEIGHT } from '../../constants';
import { calculateAspectRatioFit } from '../transforms/utils';

interface Star {
  x: number;
  y: number;
  size: number;
  twinkle: number;
  twinkleSpeed: number;
}

let stars: Star[] = [];

const initStars = () => {
  if (stars.length === 0) {
    stars = Array.from({ length: 25 }, () => ({
      x: Math.random() * WIDTH,
      y: Math.random() * HEIGHT,
      size: Math.random() * 4 + 3,
      twinkle: Math.random() * Math.PI * 2,
      twinkleSpeed: Math.random() * 0.15 + 0.08,
    }));
  }
};

export const createStarsEffect = (
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement | HTMLCanvasElement,
  frameIndex: number
) => {
  initStars();

  const dims = calculateAspectRatioFit(img.width, img.height, WIDTH, HEIGHT);

  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  ctx.fillStyle = 'rgba(10, 10, 30, 0.5)';
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  ctx.translate(WIDTH / 2, HEIGHT / 2);
  ctx.drawImage(img, -dims.width / 2, -dims.height / 2, dims.width, dims.height);
  ctx.translate(-WIDTH / 2, -HEIGHT / 2);

  stars.forEach((star) => {
    star.twinkle += star.twinkleSpeed;
    const brightness = Math.max(0.3, (Math.sin(star.twinkle) + 1) / 2);

    const gradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.size * 1.5);
    gradient.addColorStop(0, `rgba(255, 255, 255, ${brightness})`);
    gradient.addColorStop(0.5, `rgba(255, 255, 200, ${brightness * 0.6})`);
    gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size * 1.5, 0, Math.PI * 2);
    ctx.fill();

    if (brightness > 0.5) {
      const glowIntensity = (brightness - 0.5) * 2;
      ctx.strokeStyle = `rgba(255, 255, 255, ${glowIntensity * 0.8})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(star.x - star.size * 3, star.y);
      ctx.lineTo(star.x + star.size * 3, star.y);
      ctx.moveTo(star.x, star.y - star.size * 3);
      ctx.lineTo(star.x, star.y + star.size * 3);
      ctx.stroke();
    }
  });
};
