import { setCustomGifFilter } from './customFilter';

let currentGifFilter: string | null = null;
let currentImage: string | null = null;

export async function regenerateCustomGif(
  gifData?: string, 
  imageData?: string
): Promise<void> {
  // Update stored data
  if (gifData) currentGifFilter = gifData;
  if (imageData) currentImage = imageData;

  // Only regenerate if we have both a filter and an image
  if (currentGifFilter && currentImage) {
    await setCustomGifFilter(currentGifFilter, currentImage);
  }
}