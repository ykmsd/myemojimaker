import React from 'react';
import { FontOption } from '../types';
import { FontPreview } from './FontPreview';
import { FONTS } from '../constants/fonts';
import { useJapaneseFonts } from '../hooks/useJapaneseFonts';

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
  const { showJapaneseFonts, setShowJapaneseFonts } = useJapaneseFonts();

  const fontCategories = FONTS.reduce((acc, font) => ({
    ...acc,
    [font.category]: [...(acc[font.category] || []), font],
  }), {} as Record<string, FontOption[]>);

  // Filter out Japanese fonts if not shown
  const visibleCategories = Object.entries(fontCategories).filter(([category]) => 
    showJapaneseFonts || category !== 'japanese'
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center mb-4">
        <label className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
          <input
            type="checkbox"
            checked={showJapaneseFonts}
            onChange={(e) => setShowJapaneseFonts(e.target.checked)}
            className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
          />
          <span>Show Japanese Fonts</span>
        </label>
      </div>
      {visibleCategories.map(([category, fonts]) => (
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