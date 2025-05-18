import React from 'react';
import { Cpu } from 'lucide-react';
import { usePerformance } from '../contexts/PerformanceContext';

export const PerformanceToggle: React.FC = () => {
  const { performanceMode, setPerformanceMode, isLowEndDevice } = usePerformance();

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="relative group">
        <button
          onClick={() => {
            const modes = ['low', 'medium', 'high', 'auto'] as const;
            const currentIndex = modes.indexOf(performanceMode);
            const nextIndex = (currentIndex + 1) % modes.length;
            setPerformanceMode(modes[nextIndex]);
          }}
          className={`flex items-center space-x-1 px-3 py-2 rounded-full text-sm font-medium shadow-lg transition-colors border-2 ${
            performanceMode === 'high'
              ? 'bg-green-500 border-green-600 text-white'
              : performanceMode === 'medium'
              ? 'bg-blue-500 border-blue-600 text-white'
              : performanceMode === 'low'
              ? 'bg-yellow-500 border-yellow-600 text-white'
              : 'bg-gray-600 border-gray-700 text-white'
          }`}
          aria-label="Toggle performance mode"
        >
          <Cpu className="w-5 h-5 mr-1" />
          <span>
            {performanceMode === 'auto'
              ? `Auto (${isLowEndDevice ? 'Low-End' : 'Standard'})`
              : `${performanceMode.charAt(0).toUpperCase() + performanceMode.slice(1)} Quality`}
          </span>
        </button>
        
        <div className="absolute bottom-full right-0 mb-2 w-64 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-xl 
                        opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
            Current mode: <strong>{performanceMode.toUpperCase()}</strong>
          </p>
          <ul className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
            <li>• <strong>Low</strong>: Best for low-end devices</li>
            <li>• <strong>Medium</strong>: Balanced performance</li>
            <li>• <strong>High</strong>: Best quality, high CPU usage</li>
            <li>• <strong>Auto</strong>: Automatically detects device capabilities</li>
          </ul>
        </div>
      </div>
    </div>
  );
};