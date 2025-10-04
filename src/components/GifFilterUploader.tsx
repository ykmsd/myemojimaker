import React, { useCallback } from 'react';
import { Upload } from 'lucide-react';
import { toast } from 'sonner';
import { regenerateCustomGif } from '../utils/gif/regenerator';

interface GifFilterUploaderProps {
  onGifSelect: (gifData: string) => void;
}

export const GifFilterUploader: React.FC<GifFilterUploaderProps> = ({ 
  onGifSelect
}) => {
  const handleGifUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/gif')) {
      toast.error('Invalid file type', {
        description: 'Please upload a GIF file.'
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      const result = e.target?.result;
      if (typeof result === 'string') {
        // Regenerate custom GIF with new background
        await regenerateCustomGif(result);
        onGifSelect(result);

        toast.success('GIF background uploaded successfully!', {
          description: `${file.name} is ready to be used as a background.`
        });
      }
    };
    reader.readAsDataURL(file);
  }, [onGifSelect]);

  return (
    <div className="w-full max-w-sm mx-auto mb-8">
      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-purple-300 dark:border-purple-700 rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group">
        <div className="flex flex-col items-center justify-center pt-4 pb-4">
          <Upload className="w-8 h-8 mb-2 text-purple-400 dark:text-purple-500 group-hover:text-purple-500 dark:group-hover:text-purple-400 transition-colors" />
          <p className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-purple-500 dark:group-hover:text-purple-400 transition-colors">
            <span className="font-semibold">Upload a GIF background</span>
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            This GIF will be used as a background
          </p>
        </div>
        <input
          type="file"
          className="hidden"
          accept="image/gif"
          onChange={handleGifUpload}
        />
      </label>
    </div>
  );
};