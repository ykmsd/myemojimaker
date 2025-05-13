import React from 'react';

interface SectionContainerProps {
  children: React.ReactNode;
}

export const SectionContainer: React.FC<SectionContainerProps> = ({ children }) => {
  return (
    <div className="max-w-4xl mx-auto">
      {children}
    </div>
  );
};