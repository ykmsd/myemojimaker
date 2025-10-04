import React from 'react';
import { AnimationSpeed, SpeedControlProps } from '../types';

export const SpeedControl: React.FC<SpeedControlProps> = ({
  selectedSpeed,
  onSpeedChange,
}) => {
  const speeds = [
    { value: AnimationSpeed.SLOW, label: 'Slow' },
    { value: AnimationSpeed.NORMAL, label: 'Normal' },
    { value: AnimationSpeed.FAST, label: 'Fast' },
  ];

  return (
    <div className="flex gap-2">
      {speeds.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => onSpeedChange(value)}
          className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
            selectedSpeed === value
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};
