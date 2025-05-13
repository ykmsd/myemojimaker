import { useState, useEffect } from 'react';

const STORAGE_KEY = 'showJapaneseFonts';

export function useJapaneseFonts() {
  const [showJapaneseFonts, setShowJapaneseFonts] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(showJapaneseFonts));
  }, [showJapaneseFonts]);

  return { showJapaneseFonts, setShowJapaneseFonts };
}