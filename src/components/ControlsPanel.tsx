import React from 'react';
import { ImageUploader } from './ImageUploader';
import { StaticEffectControls } from './StaticEffectControls';
import { AnimationSpeed } from '../types';
import { OverlayAnimationType } from '../types/effects';

interface ControlsPanelProps {
  primaryColor: string;
  onPrimaryColorChange: (color: string) => void;
  strokeColor: string;
  onStrokeColorChange: (color: string) => void;
  onImageSelect: (imageData: string) => void;
  selectedSpeed: AnimationSpeed;
  onSpeedChange: (speed: AnimationSpeed) => void;
  overlayScale?: number;
  onOverlayScaleChange?: (scale: number) => void;
  overlayX?: number;
  onOverlayXChange?: (x: number) => void;
  overlayY?: number;
  onOverlayYChange?: (y: number) => void;
  overlayAnimation?: OverlayAnimationType;
  onOverlayAnimationChange?: (animation: OverlayAnimationType) => void;
  overlayCount?: number;
  onOverlayCountChange?: (count: number) => void;
}

export const ControlsPanel: React.FC<ControlsPanelProps> = ({
  primaryColor,
  onPrimaryColorChange,
  strokeColor,
  onStrokeColorChange,
  onImageSelect,
  selectedSpeed,
  onSpeedChange,
  overlayScale,
  onOverlayScaleChange,
  overlayX,
  onOverlayXChange,
  overlayY,
  onOverlayYChange,
  overlayAnimation,
  onOverlayAnimationChange,
  overlayCount,
  onOverlayCountChange,
}) => {
  return (
    <div className="grid grid-cols-2 gap-6 mb-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
          Upload Image
        </h3>
        <ImageUploader onImageSelect={onImageSelect} />
      </div>

      <StaticEffectControls
        primaryColor={primaryColor}
        onPrimaryColorChange={onPrimaryColorChange}
        strokeColor={strokeColor}
        onStrokeColorChange={onStrokeColorChange}
        selectedSpeed={selectedSpeed}
        onSpeedChange={onSpeedChange}
        overlayScale={overlayScale}
        onOverlayScaleChange={onOverlayScaleChange}
        overlayX={overlayX}
        onOverlayXChange={onOverlayXChange}
        overlayY={overlayY}
        onOverlayYChange={onOverlayYChange}
        overlayAnimation={overlayAnimation}
        onOverlayAnimationChange={onOverlayAnimationChange}
        overlayCount={overlayCount}
        onOverlayCountChange={onOverlayCountChange}
      />
    </div>
  );
};