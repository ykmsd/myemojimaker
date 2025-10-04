import React, { useState } from 'react';
import { EffectsGrid } from './EffectsGrid';
import { ControlsPanel } from './ControlsPanel';
import { SectionContainer } from './SectionContainer';
import { AnimationSpeed } from '../types';
import { OverlayAnimationType } from '../types/effects';

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
  const [overlayScale, setOverlayScale] = useState(100);
  const [overlayX, setOverlayX] = useState(0);
  const [overlayY, setOverlayY] = useState(0);
  const [overlayAnimation, setOverlayAnimation] = useState<OverlayAnimationType>('none');
  const [updateKey, setUpdateKey] = useState(0);

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
        overlayScale={overlayScale}
        onOverlayScaleChange={(scale) => {
          setOverlayScale(scale);
          setUpdateKey(prev => prev + 1);
        }}
        overlayX={overlayX}
        onOverlayXChange={(x) => {
          setOverlayX(x);
          setUpdateKey(prev => prev + 1);
        }}
        overlayY={overlayY}
        onOverlayYChange={(y) => {
          setOverlayY(y);
          setUpdateKey(prev => prev + 1);
        }}
        overlayAnimation={overlayAnimation}
        onOverlayAnimationChange={(animation) => {
          setOverlayAnimation(animation);
          setUpdateKey(prev => prev + 1);
        }}
      />

      <EffectsGrid
        img={selectedImage}
        interval={interval}
        primaryColor={primaryColor}
        strokeColor={strokeColor}
        showUploadCard={true}
        updateKey={updateKey}
        overlayScale={overlayScale}
        overlayX={overlayX}
        overlayY={overlayY}
        overlayAnimation={overlayAnimation}
      />
    </SectionContainer>
  );
};