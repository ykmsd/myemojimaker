import React, { useState } from 'react';
import { EffectsGrid } from './EffectsGrid';
import { StaticEffectControls } from './StaticEffectControls';
import { SectionContainer } from './SectionContainer';
import { ImageUploader } from './ImageUploader';
import { AnimationSpeed } from '../types';
import { OverlayAnimationType } from '../types/effects';

interface MangaEmojiSectionProps {
  selectedImage: string;
  onImageSelect: (image: string) => void;
  interval: number;
  selectedSpeed: AnimationSpeed;
  onSpeedChange: (speed: AnimationSpeed) => void;
}

export const MangaEmojiSection: React.FC<MangaEmojiSectionProps> = ({
  selectedImage,
  onImageSelect,
  interval,
  selectedSpeed,
  onSpeedChange,
}) => {
  const [primaryColor, setPrimaryColor] = useState('#000000');
  const [strokeColor, setStrokeColor] = useState('#FFFFFF');
  const [overlayScale, setOverlayScale] = useState(100);
  const [overlayX, setOverlayX] = useState(0);
  const [overlayY, setOverlayY] = useState(0);
  const [overlayAnimation, setOverlayAnimation] = useState<OverlayAnimationType>('none');
  const [overlayCount, setOverlayCount] = useState(1);
  const [updateKey, setUpdateKey] = useState(0);

  return (
    <SectionContainer>
      <div className="mb-6">
        <ImageUploader onImageSelect={onImageSelect} />
      </div>

      <StaticEffectControls
        primaryColor={primaryColor}
        onPrimaryColorChange={setPrimaryColor}
        strokeColor={strokeColor}
        onStrokeColorChange={setStrokeColor}
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
        overlayCount={overlayCount}
        onOverlayCountChange={(count) => {
          setOverlayCount(count);
          setUpdateKey(prev => prev + 1);
        }}
      />

      <EffectsGrid
        img={selectedImage}
        interval={interval}
        primaryColor={primaryColor}
        strokeColor={strokeColor}
        showStatic={true}
        showUploadCard={false}
        updateKey={updateKey}
        overlayScale={overlayScale}
        overlayX={overlayX}
        overlayY={overlayY}
        overlayAnimation={overlayAnimation}
        overlayCount={overlayCount}
      />
    </SectionContainer>
  );
};
