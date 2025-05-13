import React, { useState, useCallback } from 'react';
import { EffectsGrid } from './EffectsGrid';
import { ControlsPanel } from './ControlsPanel';
import { setCustomGifFilter } from '../utils/gif/customFilter';
import { SectionContainer } from './SectionContainer';
import { AnimationSpeed } from '../types';
import sampleImage from '../images/sample/pistache.png';

interface ImageEmojiSectionProps {
  selectedImage: string;
  onImageSelect: (image: string) => void;
  interval: number;
  selectedSpeed: AnimationSpeed;
  onSpeedChange: (speed: AnimationSpeed) => void;
}

export const ImageEmojiSection: React.FC<ImageEmojiSectionProps> = ({
  selectedImage,
  onImageSelect,
  interval,
  selectedSpeed,
  onSpeedChange,
}) => {
  const [primaryColor, setPrimaryColor] = useState('#FFFFFF');
  const [strokeColor, setStrokeColor] = useState('#000000');

  const handleGifSelect = useCallback(
    (gifData: string) => {
      setCustomGifFilter(gifData);
      // If no image is selected, use the sample image
      if (!selectedImage) {
        onImageSelect(sampleImage);
      }
    },
    [selectedImage, onImageSelect]
  );

  return (
    <SectionContainer>
      <ControlsPanel
        primaryColor={primaryColor}
        onPrimaryColorChange={setPrimaryColor}
        strokeColor={strokeColor}
        onStrokeColorChange={setStrokeColor}
        onGifSelect={handleGifSelect}
        onImageSelect={onImageSelect}
        selectedSpeed={selectedSpeed}
        onSpeedChange={onSpeedChange}
      />

      <EffectsGrid
        img={selectedImage}
        interval={interval}
        primaryColor={primaryColor}
        strokeColor={strokeColor}
      />
    </SectionContainer>
  );
};