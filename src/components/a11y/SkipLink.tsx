import React from 'react';

export const SkipLink = () => (
  <a 
    href="#main-content"
    className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-purple-600 text-white p-4 rounded z-50"
  >
    Skip to main content
  </a>
);