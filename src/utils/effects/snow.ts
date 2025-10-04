import { WIDTH, HEIGHT } from '../../constants';
import { calculateAspectRatioFit } from '../transforms/utils';

interface Snowflake {
  x: number;
  y: number;
  radius: number;
  speed: number;
  wind: number;
}

let snowflakes: Snowflake[] = [];

const initSnowflakes = () => {
  if (snowflakes.length === 0) {
    snowflakes = Array.from({ length: 50 }, () => ({
      x: Math.random() * WIDTH,
      y: Math.random() * HEIGHT,
      radius: Math.random() * 3 + 1,
      speed: Math.random() * 1 + 0.5,
      wind: Math.random() * 0.5 - 0.25,
    }));
  }
};

export const createSnowEffect = (
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement | HTMLCanvasElement,
  frameIndex: number
) => {
  initSnowflakes();

  const dims = calculateAspectRatioFit(img.width, img.height, WIDTH, HEIGHT);

  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  ctx.translate(WIDTH / 2, HEIGHT / 2);
  ctx.drawImage(img, -dims.width / 2, -dims.height / 2, dims.width, dims.height);
  ctx.translate(-WIDTH / 2, -HEIGHT / 2);

  ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';

  snowflakes.forEach((flake) => {
    flake.y += flake.speed;
    flake.x += flake.wind;

    if (flake.y > HEIGHT) {
      flake.y = -10;
      flake.x = Math.random() * WIDTH;
    }
    if (flake.x > WIDTH) flake.x = 0;
    if (flake.x < 0) flake.x = WIDTH;

    ctx.beginPath();
    ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
    ctx.fill();
  });
};
