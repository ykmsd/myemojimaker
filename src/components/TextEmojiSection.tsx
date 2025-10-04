import React, { useState, useEffect } from 'react';
import { EffectsGrid } from './EffectsGrid';
import { textToImage } from '../utils/textToImage';
import { FONTS } from '../constants/fonts';
import { FontSelector } from './FontSelector';
import { useFont } from '../hooks/useFont';
import { SectionContainer } from './SectionContainer';
import { regenerateCustomGif } from '../utils/gif/regenerator';
import { LoadingSpinner } from './a11y/LoadingSpinner';
import { Sparkles, AlertCircle, Wand2 } from 'lucide-react';

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
  const [staticBackgroundColor, setStaticBackgroundColor] = useState('#FFFFFF');
  const [outlineColor, setOutlineColor] = useState('#FFFFFF');
  const [outlineWidth, setOutlineWidth] = useState(2);
  const [selectedFont, setSelectedFont] = useState(DEFAULT_FONT);
  const fontLoaded = useFont(selectedFont);
  const [previewUrl, setPreviewUrl] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [interfaceReady, setInterfaceReady] = useState(false);

  useEffect(() => {
    // Set interface ready when the initial font is loaded
    if (fontLoaded && !interfaceReady) {
      setInterfaceReady(true);
    }
  }, [fontLoaded, interfaceReady]);

  const handleGenerateEmoji = async () => {
    if (!fontLoaded || !text) return;
    
    setIsGenerating(true);
    try {
      const imageUrl = textToImage(
        text,
        textColor,
        selectedFont.value,
        isTransparent ? null : backgroundColor,
        outlineColor,
        outlineWidth
      );
      setPreviewUrl(imageUrl);
      // Regenerate custom GIF with new text image
      await regenerateCustomGif(undefined, imageUrl);
    } catch (error) {
      console.error('Error generating text image:', error);
    } finally {
      setIsGenerating(false);
    }
  };


  if (!interfaceReady) {
    return (
      <SectionContainer>
        <div className="flex flex-col items-center justify-center py-16 space-y-4">
          <LoadingSpinner label="Loading fonts..." />
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Preparing text emoji generator...
          </p>
        </div>
      </SectionContainer>
    );
  }

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
              onFontSelect={(font) => {
                setSelectedFont(font);
                // Clear preview URL when changing font to avoid showing emoji with wrong font
                setPreviewUrl('');
              }}
              sampleText={text}
            />
            {selectedFont && !fontLoaded && (
              <div className="mt-2 flex items-center text-sm text-amber-600 dark:text-amber-400">
                <AlertCircle className="w-4 h-4 mr-1" />
                <span>Loading font: {selectedFont.label}...</span>
              </div>
            )}
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
                  Background Color (for animated emojis)
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

            {/* Static Background Controls */}
            <div className="space-y-2 pt-2 border-t border-gray-200 dark:border-gray-700">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                Background Color (for static emojis)
              </label>
              <input
                type="color"
                value={staticBackgroundColor}
                onChange={(e) => setStaticBackgroundColor(e.target.value)}
                className="w-full h-10 rounded-md cursor-pointer"
                aria-label="Select static background color"
              />
            </div>
          </div>
          
          {/* Generate Button */}
          <div className="mt-6">
            <button
              onClick={handleGenerateEmoji}
              disabled={!fontLoaded || isGenerating}
              className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-white 
                ${!fontLoaded || isGenerating 
                  ? 'bg-purple-400 cursor-not-allowed' 
                  : 'bg-purple-600 hover:bg-purple-700 transition-colors'}`}
            >
              {isGenerating ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Generating...</span>
                </div>
              ) : (
                <>
                  <Wand2 className="w-5 h-5" />
                  <span>Generate Emoji</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {previewUrl ? (
        <EffectsGrid
          img={previewUrl}
          interval={interval}
          showStatic={true}
          showUploadCard={true}
          primaryColor={textColor}
          strokeColor={outlineColor}
          backgroundColor={staticBackgroundColor}
        />
      ) : fontLoaded ? (
        <div className="flex flex-col justify-center items-center py-16 text-center">
          <Wand2 className="w-12 h-12 text-purple-400 dark:text-purple-500 mb-4" />
          <p className="text-gray-600 dark:text-gray-400 max-w-md">
            Customize your text, then click the Generate Emoji button to create your emoji animations.
          </p>
        </div>
      ) : (
        <div className="flex justify-center items-center py-12">
          <LoadingSpinner label={`Loading font: ${selectedFont.label}...`} />
        </div>
      )}
    </SectionContainer>
  );
};