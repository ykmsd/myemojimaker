import React from 'react';
import { ImageUploader } from './ImageUploader';
import { SpeedControl } from './SpeedControl';
import { AnimationSpeed } from '../types';

interface ControlsPanelProps {
  onImageSelect: (imageData: string) => void;
  selectedSpeed: AnimationSpeed;
  onSpeedChange: (speed: AnimationSpeed) => void;
}

export const ControlsPanel: React.FC<ControlsPanelProps> = ({
  onImageSelect,
  selectedSpeed,
  onSpeedChange,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Upload Image
          </h3>
          <ImageUploader onImageSelect={onImageSelect} />
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Animation Speed
          </h3>
          <SpeedControl
            selectedSpeed={selectedSpeed}
            onSpeedChange={onSpeedChange}
          />
        </div>
      </div>
    </div>
  );
};