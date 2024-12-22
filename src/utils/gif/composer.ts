import { loadImage } from '../canvas';
import { GifParser } from './parser';
import { GifEncoder } from './encoder';
import { createCanvas } from '../canvas';
import { WIDTH, HEIGHT } from '../../constants';

export async function createGifFromFrames(
  content: string | HTMLImageElement,
  frameUrls: string[],
  width: number = WIDTH,
  height: number = HEIGHT,
  interval: number = 0.04
): Promise<string> {
  try {
    // Load content image
    const contentImg = typeof content === 'string' ? 
      await loadImage(content) : content;

    // Create encoder
    const encoder = new GifEncoder({
      width,
      height,
      quality: 10,
      workers: 2,
      transparent: 0x000000,
      background: null,
      dither: false
    });

    // Setup composition canvas
    const { canvas, ctx } = createCanvas(width, height);

    // Process each frame
    for (const frameUrl of frameUrls) {
      const frameImg = await loadImage(frameUrl);
      
      // Clear canvas
      ctx.clearRect(0, 0, width, height);
      
      // Draw background frame
      ctx.drawImage(frameImg, 0, 0, width, height);
      
      // Calculate content dimensions
      const ratio = Math.min(
        width / contentImg.width,
        height / contentImg.height
      ) * 0.8; // Make content slightly smaller
      const contentWidth = contentImg.width * ratio;
      const contentHeight = contentImg.height * ratio;
      const x = (width - contentWidth) / 2;
      const y = (height - contentHeight) / 2;
      
      // Draw content
      ctx.globalCompositeOperation = 'source-over';
      ctx.drawImage(contentImg, x, y, contentWidth, contentHeight);
      
      // Add frame
      encoder.addFrame(canvas, interval * 1000);
    }

    return encoder.render();
  } catch (error) {
    console.error('Error composing GIF:', error);
    throw error;
  }
}

export async function createGifWithBackground(
  content: string | HTMLImageElement,
  backgroundGifUrl: string,
  width: number,
  height: number,
  interval: number
): Promise<string> {
  try {
    // Parse background GIF
    const parser = new GifParser(width, height);
    const frames = await parser.parseGif(backgroundGifUrl, width, height);
    
    // Load content image
    const contentImg = typeof content === 'string' ? 
      await loadImage(content) : content;

    // Create encoder
    const encoder = new GifEncoder({
      width,
      height,
      quality: 10,
      workers: 2,
      transparent: 0x000000,
      background: null,
      dither: false
    });

    // Setup composition canvas
    const { canvas, ctx } = createCanvas(width, height);

    // Process each frame
    for (const frame of frames) {
      // Clear canvas
      ctx.clearRect(0, 0, width, height);
      
      // Draw background frame
      ctx.putImageData(frame.data, 0, 0);
      
      // Calculate content dimensions
      const ratio = Math.min(
        width / contentImg.width,
        height / contentImg.height
      );
      const contentWidth = contentImg.width * ratio;
      const contentHeight = contentImg.height * ratio;
      const x = (width - contentWidth) / 2;
      const y = (height - contentHeight) / 2;
      
      // Draw content
      ctx.globalCompositeOperation = 'source-over';
      ctx.drawImage(contentImg, x, y, contentWidth, contentHeight);
      
      // Add frame
      encoder.addFrame(canvas, frame.delay || interval * 1000);
    }

    return encoder.render();
  } catch (error) {
    console.error('Error composing GIF:', error);
    throw error;
  }
}