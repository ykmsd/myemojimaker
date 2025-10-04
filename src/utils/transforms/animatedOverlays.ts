import { WIDTH, HEIGHT } from '../../constants';
import { AnimatedEffectType } from '../../types/effects';
import e1672Gif from '../../images/effects/e1672.gif?url';
import e1676Gif from '../../images/effects/e1676.gif?url';
import exclamationQuestionGif from '../../images/effects/exclamation-question-mark01-r.gif?url';
import sleepGif from '../../images/effects/sleep01.gif?url';
import { parseGIF, decompressFrames } from 'gifuct-js';

interface GifFrameCache {
  frames: ImageData[];
  frameCount: number;
}

const gifCache = new Map<string, GifFrameCache>();

async function loadGifFrames(gifUrl: string): Promise<GifFrameCache> {
  if (gifCache.has(gifUrl)) {
    return gifCache.get(gifUrl)!;
  }

  const response = await fetch(gifUrl);
  const buffer = await response.arrayBuffer();
  const gif = parseGIF(buffer);
  const frames = decompressFrames(gif, true);

  const canvas = document.createElement('canvas');
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  const ctx = canvas.getContext('2d')!;

  const imageDataFrames: ImageData[] = [];

  for (const frame of frames) {
    const imageData = new ImageData(
      new Uint8ClampedArray(frame.patch),
      frame.dims.width,
      frame.dims.height
    );

    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = frame.dims.width;
    tempCanvas.height = frame.dims.height;
    const tempCtx = tempCanvas.getContext('2d')!;
    tempCtx.putImageData(imageData, 0, 0);

    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.drawImage(tempCanvas, 0, 0, WIDTH, HEIGHT);
    imageDataFrames.push(ctx.getImageData(0, 0, WIDTH, HEIGHT));
  }

  const cache: GifFrameCache = {
    frames: imageDataFrames,
    frameCount: imageDataFrames.length,
  };

  gifCache.set(gifUrl, cache);
  return cache;
}

async function createAnimatedOverlayEffect(
  gifUrl: string,
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  frameIndex: number
) {
  const gifFrames = await loadGifFrames(gifUrl);
  const gifFrameIndex = frameIndex % gifFrames.frameCount;
  const gifFrame = gifFrames.frames[gifFrameIndex];

  ctx.clearRect(0, 0, WIDTH, HEIGHT);

  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = WIDTH;
  tempCanvas.height = HEIGHT;
  const tempCtx = tempCanvas.getContext('2d')!;
  tempCtx.putImageData(gifFrame, 0, 0);

  const scale = 1.5;
  const gifWidth = WIDTH * scale;
  const gifHeight = HEIGHT * scale;
  const x = (WIDTH - gifWidth) / 2;
  const y = (HEIGHT - gifHeight) / 2;

  ctx.drawImage(tempCanvas, x, y, gifWidth, gifHeight);

  ctx.drawImage(img, 0, 0, WIDTH, HEIGHT);
}

export const animatedOverlayTransforms = {
  [AnimatedEffectType.FIREWORKS]: async (
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    frameIndex: number
  ) => {
    await createAnimatedOverlayEffect(e1672Gif, ctx, img, frameIndex);
  },
  [AnimatedEffectType.EXPLODE]: async (
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    frameIndex: number
  ) => {
    await createAnimatedOverlayEffect(e1676Gif, ctx, img, frameIndex);
  },
  [AnimatedEffectType.CONFUSED]: async (
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    frameIndex: number
  ) => {
    await createAnimatedOverlayEffect(exclamationQuestionGif, ctx, img, frameIndex);
  },
  [AnimatedEffectType.SLEEPING]: async (
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    frameIndex: number
  ) => {
    await createAnimatedOverlayEffect(sleepGif, ctx, img, frameIndex);
  },
};
