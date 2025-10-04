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
    stars = Array.from({ length: 100 }, () => ({
      x: Math.random() * WIDTH,
      y: Math.random() * HEIGHT,
      size: Math.random() * 2 + 1,
      twinkle: Math.random() * Math.PI * 2,
      twinkleSpeed: Math.random() * 0.1 + 0.05,
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

  stars.forEach((star) => {
    star.twinkle += star.twinkleSpeed;
    const brightness = (Math.sin(star.twinkle) + 1) / 2;

    ctx.fillStyle = `rgba(255, 255, 255, ${brightness * 0.9})`;
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    ctx.fill();

    if (brightness > 0.7) {
      ctx.strokeStyle = `rgba(255, 255, 255, ${(brightness - 0.7) * 2})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(star.x - star.size * 2, star.y);
      ctx.lineTo(star.x + star.size * 2, star.y);
      ctx.moveTo(star.x, star.y - star.size * 2);
      ctx.lineTo(star.x, star.y + star.size * 2);
      ctx.stroke();
    }
  });

  ctx.translate(WIDTH / 2, HEIGHT / 2);
  ctx.drawImage(img, -dims.width / 2, -dims.height / 2, dims.width, dims.height);
  ctx.translate(-WIDTH / 2, -HEIGHT / 2);
};
