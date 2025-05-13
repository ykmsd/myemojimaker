import { WIDTH, HEIGHT } from '../../constants';
import { calculateAspectRatioFit } from './utils';

const SPARKLE_LIFETIME = 200; // Increased from 100 to 200 for slower animation

export const createStardustEffect = (
  ctx: CanvasRenderingContext2D,
  userImg: HTMLImageElement,
  i: number
) => {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);

  const sparkleCount = 40; // Reduced number of sparkles for clearer visuals
  const maxScale = 0.8;
  const minScale = 0.4;

  const dims = calculateAspectRatioFit(userImg.width, userImg.height, WIDTH * 0.4, HEIGHT * 0.4);

  const sparkles = Array.from({ length: sparkleCount }, (_, idx) => {
    const progress = (i + idx * 5) % SPARKLE_LIFETIME / SPARKLE_LIFETIME; // Slowed down individual sparkle movement
    const x = Math.random() * WIDTH;
    const y = Math.random() * HEIGHT;
    const scale = minScale + Math.random() * (maxScale - minScale);
    const rotation = Math.random() * Math.PI * 2;
    const opacity = Math.sin(progress * Math.PI); // Smoother opacity transition

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