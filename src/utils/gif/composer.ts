import { WIDTH, HEIGHT } from '../../constants';
import { createCanvas } from '../canvas';
import { getCurrentImage } from './state';

export function composeFramesWithImage(frames: ImageData[]): ImageData[] {
  const currentImage = getCurrentImage();
  if (!currentImage) return frames;

  const { canvas, ctx } = createCanvas(WIDTH, HEIGHT);
  
  return frames.map(frame => {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.putImageData(frame, 0, 0);
    
    const scale = 0.8;
    const imgWidth = WIDTH * scale;
    const imgHeight = HEIGHT * scale;
    const x = (WIDTH - imgWidth) / 2;
    const y = (HEIGHT - imgHeight) / 2;
    
    ctx.drawImage(currentImage, x, y, imgWidth, imgHeight);
    
    return ctx.getImageData(0, 0, WIDTH, HEIGHT);
  });
}