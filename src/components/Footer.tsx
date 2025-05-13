import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="text-center py-6 text-sm text-gray-600 dark:text-gray-400">
      Made with{' '}
      <a
        href="https://bolt.new"
        target="_blank"
        rel="noopener noreferrer"
        className="text-purple-600 dark:text-purple-400 hover:underline"
      >
        bolt.new
      </a>{' '}
      ❤️
    </footer>
  );
};