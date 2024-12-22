import { parseGIF, decompressFrames } from 'gifuct-js';
import { WIDTH, HEIGHT } from '../../constants';
import { createCanvas } from '../canvas';

let customGifFrames: ImageData[] | null = null;

export async function setCustomGifFilter(gifData: string): Promise<void> {
  try {
    // Clear previous frames
    customGifFrames = null;
    
    // Convert base64 to array buffer
    const base64Data = gifData.split(',')[1];
    const binaryString = window.atob(base64Data);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    
    const buffer = bytes.buffer;
    const gif = parseGIF(buffer);
    const frames = decompressFrames(gif, true);
    
    const { canvas, ctx } = createCanvas(WIDTH, HEIGHT);
    
    // Convert each frame to ImageData
    customGifFrames = frames.map(frame => {
      const { dims, patch } = frame;
      
      // Clear canvas
      ctx.clearRect(0, 0, WIDTH, HEIGHT);
      
      // Create ImageData from patch
      const imageData = ctx.createImageData(dims.width, dims.height);
      imageData.data.set(patch);
      
      // Create temporary canvas for scaling
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = dims.width;
      tempCanvas.height = dims.height;
      const tempCtx = tempCanvas.getContext('2d')!;
      tempCtx.putImageData(imageData, 0, 0);
      
      // Scale to fit our dimensions
      ctx.drawImage(tempCanvas, 0, 0, WIDTH, HEIGHT);
      
      // Clean up temp canvas
      tempCanvas.remove();
      
      return ctx.getImageData(0, 0, WIDTH, HEIGHT);
    });
  } catch (error) {
    console.error('Error processing custom GIF:', error);
    customGifFrames = null;
  }
}

export function getCustomGifFrames(): ImageData[] | null {
  return customGifFrames;
}