import { parseGIF, decompressFrames } from './gifuct-wrapper';
import { GifFrame } from './types';
import { createCanvas } from '../canvas';

export class GifParser {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  constructor(width: number, height: number) {
    const { canvas, ctx } = createCanvas(width, height);
    this.canvas = canvas;
    this.ctx = ctx;
  }

  private async fetchGifBuffer(url: string): Promise<ArrayBuffer> {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch GIF: ${response.statusText}`);
    }
    return response.arrayBuffer();
  }

  private applyDisposalMethod(
    frame: any,
    previousImageData: ImageData | null
  ): void {
    const disposalMethod = frame.disposalType;

    if (disposalMethod === 1) {
      // Do nothing (leave as is)
    } else if (disposalMethod === 2) {
      // Clear the frame
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    } else if (disposalMethod === 3 && previousImageData) {
      // Restore the previous image
      this.ctx.putImageData(previousImageData, 0, 0);
    }
  }

  private renderFrame(frame: any, width: number, height: number): ImageData {
    const { dims, patch } = frame;

    // Create ImageData from patch
    const imageData = this.ctx.createImageData(dims.width, dims.height);
    imageData.data.set(patch);

    // Create temporary canvas for scaling
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = dims.width;
    tempCanvas.height = dims.height;
    const tempCtx = tempCanvas.getContext('2d')!;
    tempCtx.putImageData(imageData, 0, 0);
    
    // Calculate scaling to maintain aspect ratio
    const scale = Math.min(width / dims.width, height / dims.height);
    const scaledWidth = dims.width * scale;
    const scaledHeight = dims.height * scale;
    const x = (width - scaledWidth) / 2;
    const y = (height - scaledHeight) / 2;

    // Draw scaled frame on main canvas
    this.ctx.drawImage(tempCanvas, x, y, scaledWidth, scaledHeight);

    return this.ctx.getImageData(0, 0, width, height);
  }

  async parseGif(url: string, width: number, height: number): Promise<GifFrame[]> {
    const buffer = await this.fetchGifBuffer(url);
    const gif = await parseGIF(buffer);
    const frames = await decompressFrames(gif, true);

    let previousImageData: ImageData | null = null;

    return frames.map(frame => {
      // Apply disposal method
      this.applyDisposalMethod(frame, previousImageData);

      // Render the frame
      const renderedFrame = this.renderFrame(frame, width, height);

      // Save current frame for disposal handling
      previousImageData = this.ctx.getImageData(0, 0, width, height);

      return {
        data: renderedFrame,
        delay: frame.delay * 10 || 100, // Convert delay to milliseconds
      };
    });
  }
}