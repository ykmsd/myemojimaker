import { processGifData } from './processor';
import { composeFramesWithImage } from './composer';
import { setCustomGifFrames, setCurrentImage, getCustomGifFrames } from './state';

const IMAGE_CACHE = new Map<string, string>();
const GIF_CACHE = new Map<string, ImageData[]>();

export async function setCustomGifFilter(
  gifData: string,
  imageData?: string
): Promise<void> {
  try {
    // Use cached frames if same GIF is being used
    const gifCacheKey = gifData.substring(0, 100); // Use part of data URL as cache key
    let frames: ImageData[];
    
    if (GIF_CACHE.has(gifCacheKey)) {
      frames = GIF_CACHE.get(gifCacheKey)!;
      // Clear existing frames first to trigger state updates
      setCustomGifFrames(null);
    } else {
      // Clear existing frames first to trigger state updates
      setCustomGifFrames(null);
      
      // Process GIF frames
      frames = await processGifData(gifData);
      
      // Cache the frames
      GIF_CACHE.set(gifCacheKey, frames);
    }
    
    // Update current image if provided
    if (imageData) {
      // Use cached image if we've processed it before
      const imageCacheKey = imageData.substring(0, 100);
      
      if (IMAGE_CACHE.has(imageCacheKey)) {
        setCurrentImage(IMAGE_CACHE.get(imageCacheKey) as unknown as HTMLImageElement);
      } else {
        const img = new Image();
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
          img.src = imageData;
        });
        setCurrentImage(img);
        IMAGE_CACHE.set(imageCacheKey, img as unknown as string);
      }
    }
    
    // Small delay to ensure state updates are processed
    await new Promise(resolve => setTimeout(resolve, 50));
    
    // Compose frames with current image
    const composedFrames = composeFramesWithImage(frames);
    setCustomGifFrames(composedFrames);
    
  } catch (error) {
    console.error('Error processing custom GIF:', error);
    setCustomGifFrames(null);
  }
}

export { getCustomGifFrames };
export { clearState as clearCustomGifFilter } from './state';