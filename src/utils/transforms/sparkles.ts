import { WIDTH, HEIGHT } from '../../constants';
import { calculateAspectRatioFit } from './utils';

export const createStardustEffect = (
  ctx: CanvasRenderingContext2D,
  userImg: HTMLImageElement,
  i: number
) => {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);

  const sparkleCount = 50;
  const sparkleLifetime = 100;
  const maxScale = 0.8;
  const minScale = 0.4;

  const dims = calculateAspectRatioFit(userImg.width, userImg.height, WIDTH * 0.4, HEIGHT * 0.4);

  const sparkles = Array.from({ length: sparkleCount }, (_, idx) => {
    const progress = (i + idx * 10) % sparkleLifetime / sparkleLifetime;
    const x = Math.random() * WIDTH;
    const y = Math.random() * HEIGHT;
    const scale = minScale + Math.random() * (maxScale - minScale);
    const rotation = Math.random() * Math.PI * 2;
    const opacity = 1 - Math.abs(progress - 0.5) * 2;

    return { x, y, scale, rotation, opacity };
  });

  sparkles.forEach(({ x, y, scale, rotation, opacity }) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.globalAlpha = opacity;
    ctx.scale(scale, scale);
    ctx.drawImage(
      userImg,
      -dims.width / 2,
      -dims.height / 2,
      dims.width,
      dims.height
    );
    ctx.restore();
  });
};