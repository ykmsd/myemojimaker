import { setCustomGifFilter } from './customFilter';

let currentGifFilter: string | null = null;
let currentImageUrl: string | null = null;

export async function regenerateCustomGif(
  gifData?: string, 
  imageData?: string
): Promise<void> {
  // Update stored data
  if (gifData) currentGifFilter = gifData;
  if (imageData) {
    // Clear previous object URL if it exists
    if (currentImageUrl && currentImageUrl.startsWith('blob:')) {
      URL.revokeObjectURL(currentImageUrl);
    }
    currentImageUrl = imageData;
  }

  // Only regenerate if we have both a filter and an image
  if (currentGifFilter && currentImageUrl) {
    await setCustomGifFilter(currentGifFilter, currentImageUrl);
  }
}