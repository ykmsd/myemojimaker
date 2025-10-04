import React, { useRef, useState } from 'react';
import { Upload, FileImage } from 'lucide-react';
import { regenerateCustomGif } from '../utils/gif/regenerator';
import { parseGif } from 'gifuct-js';

interface GifUploadCardProps {
  currentImage: string;
}

export const GifUploadCard: React.FC<GifUploadCardProps> = ({ currentImage }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleGifSelect = async (file: File) => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const gif = parseGif(arrayBuffer);

      if (!gif.frames || gif.frames.length === 0) {
        alert('Invalid GIF file: No frames found');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (result && currentImage) {
          regenerateCustomGif(result, currentImage);
        }
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error processing GIF:', error);
      alert('Failed to process GIF file. Please try another file.');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'image/gif') {
      handleGifSelect(file);
    } else if (file) {
      alert('Please select a valid GIF file');
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file && file.type === 'image/gif') {
      handleGifSelect(file);
    } else if (file) {
      alert('Please select a valid GIF file');
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
        Upload GIF Filter
      </p>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/gif"
        onChange={handleFileChange}
        className="hidden"
        aria-label="Upload custom GIF filter"
      />
    </div>
  );
};
