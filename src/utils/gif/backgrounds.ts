import { parseGIF, decompressFrames } from './gifuct-wrapper';
import { WIDTH, HEIGHT } from '../../constants';
import { createCanvas } from '../canvas';

const GIF_PATHS = {
  fire: new URL('../../images/effects/flames-fire.gif', import.meta.url).href,
  'space-travel': new URL('../../images/effects/space-travel.gif', import.meta.url).href,
} as const;

type GifType = keyof typeof GIF_PATHS;

// Cache for frames
const framesCache: Partial<Record<GifType, ImageData[]>> = {};

export async function getGifFrames(type: GifType): Promise<ImageData[]> {
  try {
    // Return cached frames if available
    if (framesCache[type]) {
      return framesCache[type]!;
    }

    const gifUrl = GIF_PATHS[type];
    const response = await fetch(gifUrl);
    const buffer = await response.arrayBuffer();
    const gif = await parseGIF(buffer);
    const frames = await decompressFrames(gif, true);


    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d')!;
    const { canvas, ctx } = createCanvas(WIDTH, HEIGHT);

    const processedFrames = frames.map((frame) => {
      const { dims, patch } = frame;

      // Clear both canvases
      ctx.clearRect(0, 0, WIDTH, HEIGHT);
      tempCanvas.width = dims.width;
      tempCanvas.height = dims.height;

      // Create and set frame data on temp canvas
      const imageData = tempCtx.createImageData(dims.width, dims.height);
      imageData.data.set(patch);
      tempCtx.putImageData(imageData, 0, 0);

      // Scale and center the frame on main canvas
      const scale = Math.max(WIDTH / dims.width, HEIGHT / dims.height);
      const scaledWidth = dims.width * scale;
      const scaledHeight = dims.height * scale;
      const x = (WIDTH - scaledWidth) / 2;
      const y = (HEIGHT - scaledHeight) / 2;

      ctx.drawImage(tempCanvas, x, y, scaledWidth, scaledHeight);

      return ctx.getImageData(0, 0, WIDTH, HEIGHT);
    });

    // Clean up temp canvas
    tempCanvas.remove();

    // Cache the frames
    framesCache[type] = processedFrames;

    return processedFrames;
  } catch (error) {
    console.error(`Error extracting ${type} frames:`, error);
    return [];
  }
}