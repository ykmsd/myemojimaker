import React, { useRef, useState } from 'react';
import { Upload, FileImage } from 'lucide-react';
import { regenerateCustomGif } from '../utils/gif/regenerator';
import { toast } from 'sonner';

interface GifUploadCardProps {
  currentImage: string;
}

export const GifUploadCard: React.FC<GifUploadCardProps> = ({ currentImage }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleGifSelect = async (file: File) => {
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
        await regenerateCustomGif(result, currentImage);
        toast.success('GIF background uploaded successfully!', {
          description: `${file.name} is ready to be used as a background.`
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleGifSelect(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleGifSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  return (
    <div className="flex flex-col items-center">
      <div
        onClick={() => fileInputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`
          w-28 h-28 rounded-lg border-2 border-dashed cursor-pointer
          flex flex-col items-center justify-center gap-2
          transition-all duration-200
          ${isDragging
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 scale-105'
            : 'border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-gray-50 dark:hover:bg-gray-700/50'
          }
        `}
      >
        <FileImage className="w-8 h-8 text-gray-400 dark:text-gray-500" />
        <Upload className="w-6 h-6 text-gray-400 dark:text-gray-500" />
      </div>

      <p className="mt-2 text-xs text-center text-gray-600 dark:text-gray-400 max-w-[120px]">
        Upload GIF Background
      </p>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/gif"
        onChange={handleFileChange}
        className="hidden"
        aria-label="Upload custom GIF background"
      />
    </div>
  );
};
