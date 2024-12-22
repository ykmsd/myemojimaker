import React from 'react';
import { Microscope } from 'lucide-react';
import { AnimationSpeed, SpeedControlProps } from '../types';

export const SpeedControl: React.FC<SpeedControlProps> = ({
  selectedSpeed,
  onSpeedChange,
}) => {
  return (
    <div className="flex flex-col items-center gap-2 mb-8">
      <div className="flex items-center bg-white dark:bg-gray-800 rounded-lg shadow-md p-2 border border-purple-100 dark:border-purple-900">
        <Microscope className="w-5 h-5 text-purple-600 dark:text-purple-400 mr-2" />
        <select
          value={selectedSpeed}
          onChange={(e) => onSpeedChange(e.target.value as AnimationSpeed)}
          className="bg-transparent text-gray-700 dark:text-gray-300 text-sm font-medium focus:outline-none cursor-pointer hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
        >
          <option value={AnimationSpeed.SLOW}>Slow</option>
          <option value={AnimationSpeed.NORMAL}>Normal</option>
          <option value={AnimationSpeed.FAST}>Fast</option>
        </select>
      </div>
    </div>
  );
};
