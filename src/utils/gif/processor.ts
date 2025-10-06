import { WIDTH, HEIGHT } from '../../constants';
import { createCanvas } from '../canvas';
import { parseGIF, decompressFrames } from './gifuct-wrapper';

export async function processGifData(gifData: string): Promise<ImageData[]> {
  console.log('Processing GIF data...');

  const base64Data = gifData.split(',')[1];
  const binaryString = window.atob(base64Data);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  const buffer = bytes.buffer;
  console.log('Parsing GIF buffer...');
  const gif = await parseGIF(buffer);
  console.log('Decompressing frames...');
  const frames = await decompressFrames(gif, true);
  console.log('Decompressed frames:', frames.length);

  const { canvas, ctx } = createCanvas(WIDTH, HEIGHT);

  const processedFrames = frames.map((frame, index) => {
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

  console.log('Processed', processedFrames.length, 'frames');
  return processedFrames;
}