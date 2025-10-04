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
  overlayScale?: number;
  onOverlayScaleChange?: (scale: number) => void;
  overlayX?: number;
  onOverlayXChange?: (x: number) => void;
  overlayY?: number;
  onOverlayYChange?: (y: number) => void;
}

export const StaticEffectControls: React.FC<StaticEffectControlsProps> = ({
  primaryColor,
  onPrimaryColorChange,
  strokeColor,
  onStrokeColorChange,
  selectedSpeed,
  onSpeedChange,
  overlayScale = 100,
  onOverlayScaleChange,
  overlayX = 0,
  onOverlayXChange,
  overlayY = 0,
  onOverlayYChange,
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

        <div>
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Static Effect Position & Size
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Size: {overlayScale}%
              </label>
              <input
                type="range"
                min="50"
                max="200"
                step="5"
                value={overlayScale}
                onChange={(e) => onOverlayScaleChange?.(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Horizontal Position: {overlayX > 0 ? '+' : ''}{overlayX}px
              </label>
              <input
                type="range"
                min="-200"
                max="200"
                step="10"
                value={overlayX}
                onChange={(e) => onOverlayXChange?.(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Vertical Position: {overlayY > 0 ? '+' : ''}{overlayY}px
              </label>
              <input
                type="range"
                min="-200"
                max="200"
                step="10"
                value={overlayY}
                onChange={(e) => onOverlayYChange?.(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};