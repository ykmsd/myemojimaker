import GIF from './gif-wrapper';
import { GifOptions } from './types';

export class GifEncoder {
  private gif: any;
  
  constructor(options: GifOptions) {
    this.gif = new GIF({
      workers: options.workers || 2,
      quality: options.quality || 10,
      width: options.width,
      height: options.height,
      transparent: options.transparent || 0x000000,
      background: options.background || null,
      dither: options.dither || false
    });
  }

  addFrame(
    canvas: HTMLCanvasElement,
    delay: number,
    disposal: number = 1
  ): void {
    this.gif.addFrame(canvas, {
      delay,
      copy: true,
      transparent: true,
      disposal
    });
  }

  render(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.gif.on('finished', (blob: Blob) => {
        resolve(URL.createObjectURL(blob));
      });
      this.gif.on('error', reject);
      this.gif.render();
    });
  }
}