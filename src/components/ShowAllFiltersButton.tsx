import React from 'react';
import { EyeIcon } from 'lucide-react';

interface ShowAllFiltersButtonProps {
  onShowAll: () => void;
  hiddenCount: number;
}

export const ShowAllFiltersButton: React.FC<ShowAllFiltersButtonProps> = ({
  onShowAll,
  hiddenCount,
}) => {
  if (hiddenCount === 0) return null;

  return (
    <button
      onClick={onShowAll}
      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-purple-600 
        dark:text-purple-400 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:bg-purple-50 
        dark:hover:bg-gray-700 transition-colors"
    >
      <EyeIcon className="w-4 h-4" />
      Show All Filters ({hiddenCount})
    </button>
  );
};