export interface GifFrame {
  data: ImageData;
  delay: number;
}

export interface GifOptions {
  width: number;
  height: number;
  quality?: number;
  workers?: number;
  transparent?: number;
  background?: string | null;
  dither?: boolean;
  disposal?: number;
}