import React from 'react';
import { ColorPicker } from './ColorPicker';
import { SpeedControl } from './SpeedControl';
import { AnimationSpeed } from '../types';
import { OverlayAnimationType } from '../types/effects';

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
  overlayAnimation?: OverlayAnimationType;
  onOverlayAnimationChange?: (animation: OverlayAnimationType) => void;
  overlayCount?: number;
  onOverlayCountChange?: (count: number) => void;
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
  overlayAnimation = 'none',
  onOverlayAnimationChange,
  overlayCount = 1,
  onOverlayCountChange,
}) => {
  return (
    <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Effect Colors
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
            Overlay Animation
          </h3>
          <div className="grid grid-cols-2 gap-2 mb-2">
            <button
              onClick={() => onOverlayAnimationChange?.('none')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                overlayAnimation === 'none'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              None
            </button>
            <button
              onClick={() => onOverlayAnimationChange?.('slide-right')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                overlayAnimation === 'slide-right'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              Slide Right
            </button>
            <button
              onClick={() => onOverlayAnimationChange?.('float')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                overlayAnimation === 'float'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              Float
            </button>
            <button
              onClick={() => onOverlayAnimationChange?.('intense')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                overlayAnimation === 'intense'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              Intense
            </button>
          </div>
          {overlayAnimation !== 'none' && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Number of Overlays: {overlayCount}
              </label>
              <input
                type="range"
                min="1"
                max="5"
                step="1"
                value={overlayCount}
                onChange={(e) => onOverlayCountChange?.(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
              </div>
            </div>
          )}
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Effect Position & Size
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
                min="-50"
                max="50"
                step="5"
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
                min="-50"
                max="50"
                step="5"
                value={overlayY}
                onChange={(e) => onOverlayYChange?.(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>
          </div>
        </div>
    </div>
  );
};