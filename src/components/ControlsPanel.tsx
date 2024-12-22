import React from 'react';
import { ImageUploader } from './ImageUploader';
import { GifFilterUploader } from './GifFilterUploader';
import { StaticEffectControls } from './StaticEffectControls';
import { AnimationSpeed } from '../types';

interface ControlsPanelProps {
  primaryColor: string;
  onPrimaryColorChange: (color: string) => void;
  strokeColor: string;
  onStrokeColorChange: (color: string) => void;
  onGifSelect: (gifData: string) => void;
  onImageSelect: (imageData: string) => void;
  selectedSpeed: AnimationSpeed;
  onSpeedChange: (speed: AnimationSpeed) => void;
}

export const ControlsPanel: React.FC<ControlsPanelProps> = ({
  primaryColor,
  onPrimaryColorChange,
  strokeColor,
  onStrokeColorChange,
  onGifSelect,
  onImageSelect,
  selectedSpeed,
  onSpeedChange,
}) => {
  return (
    <div className="grid grid-cols-2 gap-6 mb-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
          Upload
        </h3>
        <div className="space-y-6">
          <ImageUploader onImageSelect={onImageSelect} />
          <GifFilterUploader onGifSelect={onGifSelect} onImageSelect={onImageSelect} />
        </div>
      </div>

      <StaticEffectControls
        primaryColor={primaryColor}
        onPrimaryColorChange={onPrimaryColorChange}
        strokeColor={strokeColor}
        onStrokeColorChange={onStrokeColorChange}
        selectedSpeed={selectedSpeed}
        onSpeedChange={onSpeedChange}
      />
    </div>
  );
};