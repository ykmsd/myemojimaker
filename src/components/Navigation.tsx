import React from 'react';
import { NavigationProps, Section } from '../types';

export const Navigation: React.FC<NavigationProps> = ({ activeSection, onSectionChange }) => {
  const sections: { id: Section; label: string }[] = [
    { id: 'image', label: 'Image Emoji' },
    { id: 'text', label: 'Text Emoji' },
  ];

  return (
    <nav className="flex justify-center mb-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-1 border border-purple-100 dark:border-purple-900">
        {sections.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => onSectionChange(id)}
            className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
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