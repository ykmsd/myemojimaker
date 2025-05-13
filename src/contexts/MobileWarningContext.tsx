import React, { createContext, useContext, useState, useEffect } from 'react';

interface MobileWarningContextType {
  showWarning: boolean;
  dismissWarning: () => void;
}

const MobileWarningContext = createContext<MobileWarningContextType | undefined>(undefined);

export function MobileWarningProvider({ children }: { children: React.ReactNode }) {
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ||
      (navigator.maxTouchPoints && navigator.maxTouchPoints > 2);
    const hasSeenWarning = localStorage.getItem('hasSeenMobileWarning');
    
    if (isMobile && !hasSeenWarning) {
      setShowWarning(true);
    }
  }, []);

  const dismissWarning = () => {
    localStorage.setItem('hasSeenMobileWarning', 'true');
    setShowWarning(false);
  };

  return (
    <MobileWarningContext.Provider value={{ showWarning, dismissWarning }}>
      {children}
    </MobileWarningContext.Provider>
  );
}

export function useMobileWarning() {
  const context = useContext(MobileWarningContext);
  if (context === undefined) {
    throw new Error('useMobileWarning must be used within a MobileWarningProvider');
  }
  return context;
}