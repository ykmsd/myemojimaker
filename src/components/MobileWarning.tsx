import React from 'react';
import { X, AlertTriangle } from 'lucide-react';
import { useMobileWarning } from '../contexts/MobileWarningContext';

export const MobileWarning: React.FC = () => {
  const { showWarning, dismissWarning } = useMobileWarning();

  if (!showWarning) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" 
      style={{ 
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: 9999
      }}
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center text-amber-500">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <button
            onClick={dismissWarning}
            className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 p-2"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
          Mobile Device Detected
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          This app uses browser-based image processing which may not work well on mobile devices. 
          For the best experience, please use a desktop browser.
        </p>
        
        <button
          onClick={dismissWarning}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors"
        >
          I Understand
        </button>
      </div>
    </div>
  );
};