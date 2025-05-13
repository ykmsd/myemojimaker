import { useState, useEffect } from 'react';

const HIDDEN_FILTERS_KEY = 'hiddenFilters';

export function useFilterVisibility() {
  const [hiddenFilters, setHiddenFilters] = useState<string[]>(() => {
    const saved = localStorage.getItem(HIDDEN_FILTERS_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(HIDDEN_FILTERS_KEY, JSON.stringify(hiddenFilters));
  }, [hiddenFilters]);

  const toggleFilter = (filterId: string) => {
    setHiddenFilters(prev => 
      prev.includes(filterId) 
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId]
    );
  };

  const showAllFilters = () => {
    setHiddenFilters([]);
  };

  const isFilterVisible = (filterId: string) => !hiddenFilters.includes(filterId);

  return { 
    hiddenFilters, 
    toggleFilter, 
    isFilterVisible, 
    showAllFilters,
    hiddenCount: hiddenFilters.length 
  };
}