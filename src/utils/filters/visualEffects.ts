import { WIDTH, HEIGHT } from '../../constants';

export const glitchFilter = (
  ctx: CanvasRenderingContext2D,
  intensity: number
) => {
  const sliceHeight = Math.floor(HEIGHT / 20);

  for (let i = 0; i < 20; i++) {
    const offsetX = (Math.random() - 0.5) * intensity;
    const y = i * sliceHeight;
    const imageData = ctx.getImageData(0, y, WIDTH, sliceHeight);
    ctx.putImageData(imageData, offsetX, y);
  }
};