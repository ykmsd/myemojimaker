// Manages the state of custom GIF backgrounds and images
let customGifFrames: ImageData[] | null = null;
let currentImage: HTMLImageElement | null = null;
let changeListeners: Array<() => void> = [];

export function getCustomGifFrames(): ImageData[] | null {
  return customGifFrames;
}

export function setCustomGifFrames(frames: ImageData[] | null): void {
  customGifFrames = frames;
  notifyListeners();
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
  notifyListeners();
}

export function onCustomGifChange(listener: () => void): () => void {
  changeListeners.push(listener);
  return () => {
    changeListeners = changeListeners.filter(l => l !== listener);
  };
}

function notifyListeners(): void {
  changeListeners.forEach(listener => listener());
}