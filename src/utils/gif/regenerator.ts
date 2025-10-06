import { setCustomGifFilter } from './customFilter';

let currentGifFilter: string | null = null;
let currentImageUrl: string | null = null;

export async function regenerateCustomGif(
  gifData?: string,
  imageData?: string
): Promise<void> {
  console.log('regenerateCustomGif called', {
    hasGifData: !!gifData,
    hasImageData: !!imageData
  });

  // Update stored data
  if (gifData) {
    console.log('Setting current GIF filter');
    currentGifFilter = gifData;
  }
  if (imageData) {
    // Clear previous object URL if it exists
    if (currentImageUrl && currentImageUrl.startsWith('blob:')) {
      URL.revokeObjectURL(currentImageUrl);
    }
    console.log('Setting current image URL');
    currentImageUrl = imageData;
  }

  console.log('State after update:', {
    hasFilter: !!currentGifFilter,
    hasImage: !!currentImageUrl
  });

  // Only regenerate if we have both a filter and an image
  if (currentGifFilter && currentImageUrl) {
    console.log('Calling setCustomGifFilter...');
    await setCustomGifFilter(currentGifFilter, currentImageUrl);
    console.log('setCustomGifFilter completed');
  } else {
    console.warn('Missing data for regeneration:', {
      hasFilter: !!currentGifFilter,
      hasImage: !!currentImageUrl
    });
  }
}