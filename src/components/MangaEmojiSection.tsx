import React, { useState } from 'react';
import { EffectsGrid } from './EffectsGrid';
import { StaticEffectControls } from './StaticEffectControls';
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
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-6">
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
              Upload Image
            </h3>
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
        </div>

        <div>
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
        </div>
      </div>
    </div>
  );
};
