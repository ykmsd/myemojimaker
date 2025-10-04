// Manages the state of custom GIF backgrounds and images
let customGifFrames: ImageData[] | null = null;
let currentImage: HTMLImageElement | null = null;

export function getCustomGifFrames(): ImageData[] | null {
  return customGifFrames;
}

export function setCustomGifFrames(frames: ImageData[] | null): void {
  customGifFrames = frames;
}

export function getCurrentImage(): HTMLImageElement | null {
  return currentImage;
}

export function setCurrentImage(image: HTMLImageElement | null): void {
  currentImage = image;
}

export function clearState(): void {
  customGifFrames = null;
  currentImage = null;
}