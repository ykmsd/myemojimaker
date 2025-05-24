import React from 'react';
import { Zap } from 'lucide-react';
import { PERFORMANCE_MODE_KEY } from '../constants';

export const PerformanceModeToggle: React.FC = () => {
  const [isPerformanceMode, setIsPerformanceMode] = React.useState(() => 
    localStorage.getItem(PERFORMANCE_MODE_KEY) === 'true'
  );

  const handleToggle = () => {
    const newValue = !isPerformanceMode;
    setIsPerformanceMode(newValue);
    localStorage.setItem(PERFORMANCE_MODE_KEY, String(newValue));
    
    // Reload the page to apply performance settings
    window.location.reload();
  };

  return (
    <button
      onClick={handleToggle}
      className={`fixed bottom-4 right-4 p-2 rounded-lg transition-colors z-10
        ${isPerformanceMode 
          ? 'bg-amber-500 text-white' 
          : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200'}`}
      aria-label={isPerformanceMode ? "Disable performance mode" : "Enable performance mode"}
      title={isPerformanceMode ? "Disable performance mode" : "Enable performance mode"}
    >
      <Zap className="w-5 h-5" />
      <span className="sr-only">
        {isPerformanceMode ? "Disable performance mode" : "Enable performance mode"}
      </span>
      
      <div className="absolute right-0 bottom-full mb-2 transform scale-0 transition-transform origin-bottom-right 
        group-hover:scale-100 pointer-events-none whitespace-nowrap">
        <div className="bg-gray-900 text-white text-xs px-2 py-1 rounded">
          {isPerformanceMode ? "Disable performance mode" : "Enable performance mode"}
        </div>
      </div>
    </button>
  );
};