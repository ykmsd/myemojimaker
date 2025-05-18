import React, { useState, useEffect } from 'react';
import { EffectsGrid } from './EffectsGrid';
import { textToImage } from '../utils/textToImage';
import { FONTS } from '../constants/fonts';
import { FontSelector } from './FontSelector';
import { useFont } from '../hooks/useFont';
import { useDebounce } from '../hooks/useDebounce';
import { SectionContainer } from './SectionContainer';
import { GifFilterUploader } from './GifFilterUploader';
import { regenerateCustomGif } from '../utils/gif/regenerator';
import { LoadingSpinner } from './a11y/LoadingSpinner';
import { Sparkles } from 'lucide-react';

interface TextEmojiSectionProps {
  interval: number;
}

const DEFAULT_FONT =
  FONTS.find((font) => font.value === 'Bungee Shade') || FONTS[14];

export const TextEmojiSection: React.FC<TextEmojiSectionProps> = ({
  interval,
}) => {
  const [text, setText] = useState('OMG');
  const [textColor, setTextColor] = useState('#9333EA'); // purple-600
  const [isTransparent, setIsTransparent] = useState(true);
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');
  const [outlineColor, setOutlineColor] = useState('#FFFFFF');
  const [outlineWidth, setOutlineWidth] = useState(2);
  const [selectedFont, setSelectedFont] = useState(DEFAULT_FONT);
  const fontLoaded = useFont(selectedFont);
  const [previewUrl, setPreviewUrl] = useState('');
  const debouncedText = useDebounce(text, 500);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const generateImage = async () => {
      setIsGenerating(true);
      const imageUrl = textToImage(
        debouncedText,
        textColor,
        selectedFont.value,
        isTransparent ? null : backgroundColor,
        outlineColor,
        outlineWidth
      );
      setPreviewUrl(imageUrl);
      // Regenerate custom GIF with new text image
      await regenerateCustomGif(undefined, imageUrl);
      setIsGenerating(false);
    };

    if (fontLoaded) {
      generateImage();
    }
  }, [
    debouncedText,
    textColor,
    backgroundColor,
    isTransparent,
    outlineColor,
    outlineWidth,
    selectedFont,
    fontLoaded,
  ]);

  const handleGifSelect = (gifData: string) => {
    regenerateCustomGif(gifData, previewUrl);
  };

  return (
    <SectionContainer>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <div className="space-y-4">
          {/* Text Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Text
            </label>
            <div className="relative">
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value.slice(0, 6))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter your text"
                maxLength={6}
                aria-label="Enter text for emoji"
              />
              <span className="absolute right-2 top-2 text-xs text-gray-400 dark:text-gray-500">
                {text.length}/6
              </span>
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-600 dark:text-gray-400">
              <Sparkles className="w-4 h-4 text-purple-500 mr-1" />
              <span>
                <span className="font-medium text-purple-600 dark:text-purple-400">Pro Tip:</span> You can also use emoji characters like 👍 😊 🔥 to animate them!
              </span>
            </div>
          </div>

          {/* Font Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-3">
              Font Family
            </label>
            <FontSelector
              selectedFont={selectedFont}
              onFontSelect={setSelectedFont}
              sampleText={text}
            />
          </div>

          {/* Color Controls */}
          <div className="grid gap-4">
            {/* Text Color */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                Text Color
              </label>
              <input
                type="color"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
                className="w-full h-10 rounded-md cursor-pointer"
                aria-label="Select text color"
              />
            </div>

            {/* Outline Color */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                Outline Color
              </label>
              <input
                type="color"
                value={outlineColor}
                onChange={(e) => setOutlineColor(e.target.value)}
                className="w-full h-10 rounded-md cursor-pointer"
                aria-label="Select outline color"
              />
            </div>

            {/* Background Controls */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-200">
                <input
                  type="checkbox"
                  className="mr-2 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  checked={isTransparent}
                  onChange={(e) => setIsTransparent(e.target.checked)}
                  aria-label="Toggle transparent background"
                />
                Transparent Background
              </label>

              <div className={isTransparent ? 'opacity-50' : ''}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                  Background Color
                </label>
                <input
                  type="color"
                  value={backgroundColor}
                  onChange={(e) => setBackgroundColor(e.target.value)}
                  className="w-full h-10 rounded-md cursor-pointer"
                  disabled={isTransparent}
                  aria-label="Select background color"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <GifFilterUploader onGifSelect={handleGifSelect} />

      {fontLoaded &&
        previewUrl &&
        (isGenerating ? (
          <div className="flex justify-center items-center py-12">
            <LoadingSpinner label="Generating text emoji..." />
          </div>
        ) : (
          <EffectsGrid
            img={previewUrl}
            interval={interval}
            showStatic={false}
          />
        ))}
    </SectionContainer>
  );
};