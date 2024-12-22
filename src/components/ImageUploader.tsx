import React, { useCallback } from 'react';
import { ImagePlus } from 'lucide-react';
import { toast } from 'sonner';

interface ImageUploaderProps {
  onImageSelect: (imageData: string) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelect }) => {
  const handleImageUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      if (typeof result === 'string') {
        onImageSelect(result);
        toast.success('Image uploaded successfully!', {
          description: `${file.name} is ready to be transformed.`
        });
      }
    };
    reader.readAsDataURL(file);
  }, [onImageSelect]);

  return (
    <div className="w-full max-w-sm mx-auto">
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
    </div>
  );
};