import { processGifData } from './processor';
import { composeFramesWithImage } from './composer';
import { setCustomGifFrames, setCurrentImage, getCustomGifFrames } from './state';

export async function setCustomGifFilter(
  gifData: string,
  imageData?: string
): Promise<void> {
  try {
    // Clear existing frames first to trigger state updates
    setCustomGifFrames(null);
    
    // Process GIF frames
    const frames = await processGifData(gifData);
    
    // Update current image if provided
    if (imageData) {
      const img = new Image();
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = imageData;
      });
      setCurrentImage(img);
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
;