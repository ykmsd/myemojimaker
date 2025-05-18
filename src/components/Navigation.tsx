import React from 'react';
import { NavigationProps, Section } from '../types';

export const Navigation: React.FC<NavigationProps> = ({ activeSection, onSectionChange }) => {
  const sections: { id: Section; label: string }[] = [
    { id: 'image', label: 'Image Emoji' },
    { id: 'text', label: 'Text Emoji' },
    { id: 'combine', label: 'Combine Emoji' },
  ];

  return (
    <nav className="flex justify-center mb-4 px-2">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-1 border border-purple-100 dark:border-purple-900 flex flex-wrap w-full max-w-md justify-center">
        {sections.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => onSectionChange(id)}
            className={`px-3 sm:px-6 py-2 m-1 rounded-md text-xs sm:text-sm font-medium transition-colors flex-1 max-w-[120px] ${
              activeSection === id
                ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                : 'text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </nav>
  );
};