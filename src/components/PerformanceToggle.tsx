import React from 'react';
import { Cpu } from 'lucide-react';
import { usePerformance } from '../contexts/PerformanceContext';

export const PerformanceToggle: React.FC = () => {
  const { performanceMode, setPerformanceMode, isLowEndDevice } = usePerformance();

  return (
    <div className="fixed bottom-4 right-4 z-30">
      <div className="relative group">
        <button
          onClick={() => {
            const modes = ['low', 'medium', 'high', 'auto'] as const;
            const currentIndex = modes.indexOf(performanceMode);
            const nextIndex = (currentIndex + 1) % modes.length;
            setPerformanceMode(modes[nextIndex]);
          }}
          className={`flex items-center space-x-1 px-3 py-2 rounded-full text-xs shadow-lg transition-colors ${
            performanceMode === 'high'
              ? 'bg-green-500 text-white'
              : performanceMode === 'medium'
              ? 'bg-blue-500 text-white'
              : performanceMode === 'low'
              ? 'bg-yellow-500 text-white'
              : 'bg-gray-500 text-white'
          }`}
          aria-label="Toggle performance mode"
        >
          <Cpu className="w-4 h-4 mr-1" />
          <span>
            {performanceMode === 'auto'
              ? `Auto (${isLowEndDevice ? 'Low-End' : 'Standard'})`
              : `${performanceMode.charAt(0).toUpperCase() + performanceMode.slice(1)} Quality`}
          </span>
        </button>
        
        <div className="absolute bottom-full right-0 mb-2 w-60 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl 
                        opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <p className="text-xs text-gray-600 dark:text-gray-300">
            Current mode: <strong>{performanceMode.toUpperCase()}</strong>
            {performanceMode === 'low' && ' (Best for low-end devices)'}
            {performanceMode === 'medium' && ' (Balanced performance)'}
            {performanceMode === 'high' && ' (Best quality, high CPU usage)'}
            {performanceMode === 'auto' && ' (Automatically selects based on your device)'}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Click to cycle through performance modes.
          </p>
        </div>
      </div>
    </div>
  );
};