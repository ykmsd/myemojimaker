import React from 'react';
import { FontOption } from '../types';
import { FontPreview } from './FontPreview';
import { FONTS } from '../constants/fonts';

interface FontSelectorProps {
  selectedFont: FontOption;
  onFontSelect: (font: FontOption) => void;
  sampleText: string;
}

export const FontSelector: React.FC<FontSelectorProps> = ({
  selectedFont,
  onFontSelect,
  sampleText,
}) => {
  const fontCategories = FONTS.reduce((acc, font) => ({
    ...acc,
    [font.category]: [...(acc[font.category] || []), font],
  }), {} as Record<string, FontOption[]>);

  return (
    <div className="space-y-4">
      {Object.entries(fontCategories).map(([category, fonts]) => (
        <div key={category}>
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center">
            <span className="mr-2">{category.charAt(0).toUpperCase() + category.slice(1)} Fonts</span>
            <div className="h-px bg-gradient-to-r from-gray-200 dark:from-gray-700 flex-grow ml-2" />
          </h3>
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
            {fonts.map((font) => (
              <FontPreview
                key={font.value}
                font={font}
                isSelected={selectedFont.value === font.value}
                onSelect={onFontSelect}
                sampleText={sampleText}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};