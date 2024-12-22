import React from 'react';

interface LoadingSpinnerProps {
  label?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  label = 'Loading...' 
}) => (
  <div role="status" aria-live="polite">
    <span className="sr-only">{label}</span>
    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500" />
  </div>
);