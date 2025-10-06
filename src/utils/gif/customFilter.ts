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

    if (!frames || frames.length === 0) {
      throw new Error('No frames could be processed from the GIF');
    }

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

    // Compose frames with current image
    const composedFrames = composeFramesWithImage(frames);

    if (!composedFrames || composedFrames.length === 0) {
      throw new Error('Failed to compose frames with image');
    }

    setCustomGifFrames(composedFrames);

  } catch (error) {
    console.error('Error processing custom GIF:', error);
    setCustomGifFrames(null);
    throw error;
  }
}

export { getCustomGifFrames };
export { clearState as clearCustomGifFilter } from './state';