import React from 'react';
import { ColorPicker } from './ColorPicker';
import { SpeedControl } from './SpeedControl';
import { AnimationSpeed } from '../types';

interface StaticEffectControlsProps {
  primaryColor: string;
  onPrimaryColorChange: (color: string) => void;
  strokeColor: string;
  onStrokeColorChange: (color: string) => void;
  selectedSpeed: AnimationSpeed;
  onSpeedChange: (speed: AnimationSpeed) => void;
}

export const StaticEffectControls: React.FC<StaticEffectControlsProps> = ({
  primaryColor,
  onPrimaryColorChange,
  strokeColor,
  onStrokeColorChange,
  selectedSpeed,
  onSpeedChange,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Static Effect Colors
          </h3>
          <div className="grid grid-cols-2 gap-6">
            <ColorPicker
              label="Primary Color"
              value={primaryColor}
              onChange={onPrimaryColorChange}
            />
            <ColorPicker
              label="Stroke Color"
              value={strokeColor}
              onChange={onStrokeColorChange}
            />
          </div>
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