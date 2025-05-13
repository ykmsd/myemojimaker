import { WIDTH, HEIGHT } from '../../constants';
import { createCanvas } from '../canvas';
import { parseGIF, decompressFrames } from './gifuct-wrapper';

export async function processGifData(gifData: string): Promise<ImageData[]> {
  const base64Data = gifData.split(',')[1];
  const binaryString = window.atob(base64Data);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  
  const buffer = bytes.buffer;
  const gif = await parseGIF(buffer);
  const frames = await decompressFrames(gif, true);
  
  const { canvas, ctx } = createCanvas(WIDTH, HEIGHT);
  
  return frames.map(frame => {
    const { dims, patch } = frame;
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    
    const imageData = ctx.createImageData(dims.width, dims.height);
    imageData.data.set(patch);
    
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = dims.width;
    tempCanvas.height = dims.height;
    const tempCtx = tempCanvas.getContext('2d')!;
    tempCtx.putImageData(imageData, 0, 0);
    
    ctx.drawImage(tempCanvas, 0, 0, WIDTH, HEIGHT);
    tempCanvas.remove();
    
    return ctx.getImageData(0, 0, WIDTH, HEIGHT);
  });
}