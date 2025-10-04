import React, { useCallback, useState } from 'react';
import { ImagePlus, Eraser, Smile } from 'lucide-react';
import { toast } from 'sonner';
import { regenerateCustomGif } from '../utils/gif/regenerator';
import { removeBackground } from '@imgly/background-removal';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';

interface ImageUploaderProps {
  onImageSelect: (imageData: string) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelect }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleImageUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      const result = e.target?.result;
      if (typeof result === 'string') {
        setCurrentImage(result);
        await regenerateCustomGif(undefined, result);
        onImageSelect(result);

        toast.success('Image uploaded successfully!', {
          description: `${file.name} is ready to be transformed.`
        });
      }
    };
    reader.readAsDataURL(file);
  }, [onImageSelect]);

  const handleEmojiSelect = async (emojiData: EmojiClickData) => {
    setShowEmojiPicker(false);

    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      ctx.clearRect(0, 0, 512, 512);
      ctx.font = '400px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(emojiData.emoji, 256, 256);

      const imageUrl = canvas.toDataURL('image/png');
      setCurrentImage(imageUrl);
      await regenerateCustomGif(undefined, imageUrl);
      onImageSelect(imageUrl);

      toast.success('Emoji selected!', {
        description: `${emojiData.emoji} is ready to be transformed.`
      });
    }
  };

  const buttonTooltip = !currentImage 
    ? "Upload an image first to use background removal" 
    : isProcessing 
      ? "Processing..." 
      : "Remove background from image";

  const handleRemoveBackground = async () => {
    if (!currentImage || isProcessing) return;

    const toastId = toast.loading('Removing background...');

    try {
      setIsProcessing(true);

      // Create a new Image object and wait for it to load
      const image = new Image();
      image.crossOrigin = 'anonymous';

      await new Promise((resolve, reject) => {
        image.onload = resolve;
        image.onerror = reject;
        image.src = currentImage;
      });

      // Use the loaded image for background removal
      const blob = await removeBackground(image);

      // Convert blob to data URL for better compatibility
      const reader = new FileReader();
      const dataUrl = await new Promise<string>((resolve, reject) => {
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });

      setCurrentImage(dataUrl);
      await regenerateCustomGif(undefined, dataUrl);
      onImageSelect(dataUrl);

      toast.success('Background removed successfully!', { id: toastId });
    } catch (error) {
      toast.error('Failed to remove background. Please try again.', { id: toastId });
      console.error('Background removal error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto space-y-4">
      <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-purple-300 dark:border-purple-700 rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <ImagePlus className="w-10 h-10 mb-3 text-purple-400 dark:text-purple-500 group-hover:text-purple-500 dark:group-hover:text-purple-400 transition-colors" />
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400 group-hover:text-purple-500 dark:group-hover:text-purple-400 transition-colors">
            <span className="font-semibold">Upload an image</span> or drag and drop
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG or GIF (MAX. 800x800px)</p>
        </div>
        <input
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleImageUpload}
        />
      </label>

      <div className="relative group">
        <button
          onClick={handleRemoveBackground}
          disabled={isProcessing || !currentImage}
          className={`w-full flex items-center justify-center gap-2 px-4 py-2
            ${currentImage
              ? 'bg-purple-600 hover:bg-purple-700'
              : 'bg-gray-400 cursor-not-allowed'}
            text-white rounded-lg transition-colors
            ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <Eraser className="w-4 h-4" />
          {isProcessing ? 'Processing...' : 'Remove Background'}
        </button>
        <div className="absolute left-1/2 -translate-x-1/2 -bottom-2 translate-y-full
          opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <div className="bg-gray-900 text-white text-sm px-3 py-1 rounded-lg whitespace-nowrap">
            {buttonTooltip}
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400">or</span>
        </div>
      </div>

      <button
        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
      >
        <Smile className="w-5 h-5" />
        Select Emoji
      </button>

      {showEmojiPicker && (
        <div className="flex justify-center">
          <EmojiPicker onEmojiClick={handleEmojiSelect} width={300} height={400} />
        </div>
      )}
    </div>
  );
};