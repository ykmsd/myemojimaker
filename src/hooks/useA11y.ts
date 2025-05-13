import { useCallback } from 'react';

export const useA11y = () => {
  const handleKeyPress = useCallback((callback: () => void) => 
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        callback();
      }
    }, 
  []);

  return { handleKeyPress };
};