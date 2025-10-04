import React, { useState } from 'react';
import { EffectsGrid } from './EffectsGrid';
import { ControlsPanel } from './ControlsPanel';
import { SectionContainer } from './SectionContainer';
import { AnimationSpeed } from '../types';

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

  return (
    <SectionContainer>
      <ControlsPanel
        primaryColor={primaryColor}
        onPrimaryColorChange={setPrimaryColor}
        strokeColor={strokeColor}
        onStrokeColorChange={setStrokeColor}
        onImageSelect={onImageSelect}
        selectedSpeed={selectedSpeed}
        onSpeedChange={onSpeedChange}
      />

      <EffectsGrid
        img={selectedImage}
        interval={interval}
        primaryColor={primaryColor}
        strokeColor={strokeColor}
        showUploadCard={true}
      />
    </SectionContainer>
  );
};