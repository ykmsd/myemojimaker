import React, { useCallback } from 'react';
import { ImagePlus, Eraser, Upload } from 'lucide-react';
import { toast } from 'sonner';
import { regenerateCustomGif } from '../utils/gif/regenerator';
import { removeBackground } from '@imgly/background-removal';

interface ImageUploaderProps {
  onImageSelect: (imageData: string) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelect }) => {
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [currentImage, setCurrentImage] = React.useState<string | null>(null);

  const handleImageUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      const result = e.target?.result;
      if (typeof result === 'string') {
        setCurrentImage(result);
        // Regenerate custom GIF with new image
        await regenerateCustomGif(undefined, result);
        onImageSelect(result);
        
        toast.success('Image uploaded successfully!', {
          description: `${file.name} is ready to be transformed.`
        });
      }
    };
    reader.readAsDataURL(file);
  }, [onImageSelect]);

  const buttonTooltip = !currentImage 
    ? "Upload an image first to use background removal" 
    : isProcessing 
      ? "Processing..." 
      : "Remove background from image";

  const handleRemoveBackground = async () => {
    if (!currentImage || isProcessing) return;

    try {
      setIsProcessing(true);
      toast.loading('Removing background...');

      const blob = await removeBackground(currentImage);
      const newImageUrl = URL.createObjectURL(blob);
      
      setCurrentImage(newImageUrl);
      await regenerateCustomGif(undefined, newImageUrl);
      onImageSelect(newImageUrl);

      toast.success('Background removed successfully!');
    } catch (error) {
      toast.error('Failed to remove background');
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
    </div>
  );
};