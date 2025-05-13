import React from 'react';
import { FontOption } from '../types';
import { useFont } from '../hooks/useFont';

interface FontPreviewProps {
  font: FontOption;
  isSelected: boolean;
  onSelect: (font: FontOption) => void;
  sampleText: string;
}

export const FontPreview: React.FC<FontPreviewProps> = ({
  font,
  isSelected,
  onSelect,
  sampleText,
}) => {
  const fontLoaded = useFont(font);

  return (
    <button
      onClick={() => onSelect(font)}
      className={`w-full p-2 rounded-lg transition-all ${
        isSelected
          ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg scale-105'
          : 'bg-white dark:bg-gray-800 hover:bg-purple-50 dark:hover:bg-gray-700'
      }`}
      style={{
        opacity: fontLoaded ? 1 : 0.5,
      }}
    >
      <p
        className={`text-lg mb-1 truncate ${
          isSelected 
            ? 'text-white' 
            : 'text-gray-900 dark:text-gray-100'
        }`}
        style={{ fontFamily: font.value }}
      >
        {sampleText}
      </p>
      <p className={`text-xs truncate ${
        isSelected 
          ? 'text-gray-100' 
          : 'text-gray-500 dark:text-gray-400'
      }`}>
        {font.label}
      </p>
    </button>
  );
};