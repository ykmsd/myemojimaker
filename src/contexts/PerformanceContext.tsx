import React, { createContext, useContext, useState, useEffect } from 'react';

type PerformanceMode = 'high' | 'medium' | 'low' | 'auto';

interface PerformanceContextType {
  performanceMode: PerformanceMode;
  setPerformanceMode: (mode: PerformanceMode) => void;
  frameCount: number;
  gifQuality: number;
  workerCount: number;
  isLowEndDevice: boolean;
}

const PerformanceContext = createContext<PerformanceContextType | undefined>(undefined);

const STORAGE_KEY = 'emojiMakerPerformanceMode';

// Performance presets
const PERFORMANCE_SETTINGS = {
  high: {
    frameCount: 10,
    gifQuality: 5,
    workerCount: 4
  },
  medium: {
    frameCount: 8,
    gifQuality: 10,
    workerCount: 2
  },
  low: {
    frameCount: 5,
    gifQuality: 20,
    workerCount: 1
  }
};

export function PerformanceProvider({ children }: { children: React.ReactNode }) {
  // Try to detect low-end devices automatically
  const [isLowEndDevice, setIsLowEndDevice] = useState<boolean>(false);
  
  // Initialize performance mode from storage or auto-detect
  const [performanceMode, setPerformanceMode] = useState<PerformanceMode>(() => {
    const savedMode = localStorage.getItem(STORAGE_KEY) as PerformanceMode | null;
    return savedMode || 'auto';
  });

  useEffect(() => {
    // Auto-detect device capabilities
    const detectDeviceCapabilities = () => {
      // Check if device has limited memory or CPU cores
      const limitedMemory = navigator.deviceMemory !== undefined && navigator.deviceMemory < 4;
      const limitedCores = navigator.hardwareConcurrency !== undefined && navigator.hardwareConcurrency <= 2;
      
      // Check for mobile devices which typically have less processing power
      const isMobile = /Android|iPhone|iPad|iPod|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      // Detect slow CPU using a simple benchmark
      const startTime = performance.now();
      let result = 0;
      for (let i = 0; i < 1000000; i++) {
        result += Math.sqrt(i);
      }
      const endTime = performance.now();
      const benchmarkTime = endTime - startTime;
      const isSlowCPU = benchmarkTime > 100; // If it takes more than 100ms, consider it slow
      
      return limitedMemory || limitedCores || (isMobile && isSlowCPU);
    };

    const isLow = detectDeviceCapabilities();
    setIsLowEndDevice(isLow);
    
    // If mode is 'auto', set performance based on device detection
    if (performanceMode === 'auto') {
      setPerformanceMode(isLow ? 'low' : 'medium');
    }
  }, []);

  // Save performance mode to localStorage when it changes
  useEffect(() => {
    if (performanceMode !== 'auto') {
      localStorage.setItem(STORAGE_KEY, performanceMode);
    }
  }, [performanceMode]);

  // Get settings based on current performance mode
  const activeSettings = PERFORMANCE_SETTINGS[performanceMode === 'auto' 
    ? (isLowEndDevice ? 'low' : 'medium') 
    : performanceMode];

  return (
    <PerformanceContext.Provider
      value={{
        performanceMode,
        setPerformanceMode,
        isLowEndDevice,
        ...activeSettings
      }}
    >
      {children}
    </PerformanceContext.Provider>
  );
}

export function usePerformance() {
  const context = useContext(PerformanceContext);
  if (context === undefined) {
    throw new Error('usePerformance must be used within a PerformanceProvider');
  }
  return context;
}