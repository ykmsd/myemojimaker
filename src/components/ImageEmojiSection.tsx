import React from 'react';
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
  return (
    <SectionContainer>
      <ControlsPanel
        onImageSelect={onImageSelect}
        selectedSpeed={selectedSpeed}
        onSpeedChange={onSpeedChange}
      />

      <EffectsGrid
        img={selectedImage}
        interval={interval}
        showStatic={false}
        showUploadCard={true}
      />
    </SectionContainer>
  );
};