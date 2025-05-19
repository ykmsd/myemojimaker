import React, { createContext, useContext, useState, useEffect } from 'react';

interface MobileWarningContextType {
  showWarning: boolean;
  dismissWarning: () => void;
}

const MobileWarningContext = createContext<MobileWarningContextType | undefined>(undefined);

export function MobileWarningProvider({ children }: { children: React.ReactNode }) {
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    // More precise mobile detection
    // 1. Check user agent for mobile devices
    const mobileUserAgent = /iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // 2. Check screen size - typically mobile devices have smaller screens
    const isSmallScreen = window.innerWidth <= 768;
    
    // 3. Check if it's a touch-only device (has touch but no mouse)
    const isTouchOnly = window.matchMedia('(pointer: coarse)').matches && 
                        !window.matchMedia('(pointer: fine)').matches;
    
    // Only show warning if it's likely a true mobile device
    const isMobile = mobileUserAgent && (isSmallScreen || isTouchOnly);
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