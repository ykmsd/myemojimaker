import React from 'react';
import { X, Plus } from 'lucide-react';

interface FilterToggleProps {
  isVisible: boolean;
  onToggle: () => void;
}

export const FilterToggle: React.FC<FilterToggleProps> = ({ isVisible, onToggle }) => {
  return (
    <div className="group absolute top-1 right-1 z-10">
      <button
        onClick={onToggle}
        className="p-1 rounded-full bg-white/90 dark:bg-gray-800/90 
          hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        aria-label={isVisible ? 'Hide filter' : 'Show filter'}
      >
        {isVisible ? (
          <X className="w-3 h-3 text-gray-600 dark:text-gray-400" />
        ) : (
          <Plus className="w-3 h-3 text-gray-600 dark:text-gray-400" />
        )}
      </button>
      <div className="absolute right-0 top-full mt-1 scale-0 group-hover:scale-100 transition-transform origin-top-right z-20">
        <div className="px-2 py-1 text-xs text-white bg-gray-900 dark:bg-gray-700 rounded shadow-lg whitespace-nowrap">
          {isVisible ? 'Hide this filter' : 'Show this filter'}
        </div>
      </div>
    </div>
  );
};