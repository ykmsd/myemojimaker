import { renderHook, act } from '@testing-library/react';
import { useAnimationSpeed } from '../../hooks/useAnimationSpeed';
import { AnimationSpeed } from '../../types';
import { SPEED_STORAGE_KEY } from '../../constants';

describe('useAnimationSpeed', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });
  
  it('returns default speed when no saved speed exists', () => {
    const { result } = renderHook(() => useAnimationSpeed());
    
    // Default speed should be 'normal'
    expect(result.current.speed).toBe('normal');
  });
  
  it('returns saved speed from localStorage', () => {
    // Set a speed in localStorage
    localStorage.setItem(SPEED_STORAGE_KEY, 'fast');
    
    const { result } = renderHook(() => useAnimationSpeed());
    
    // Should return the saved speed
    expect(result.current.speed).toBe('fast');
  });
  
  it('updates speed and localStorage when setSpeed is called', () => {
    const { result } = renderHook(() => useAnimationSpeed());
    
    // Initially 'normal'
    expect(result.current.speed).toBe('normal');
    
    // Update to 'slow'
    act(() => {
      result.current.setSpeed(AnimationSpeed.SLOW);
    });
    
    // Speed should be updated in the hook state
    expect(result.current.speed).toBe('slow');
    
    // Speed should be saved to localStorage
    expect(localStorage.getItem(SPEED_STORAGE_KEY)).toBe('slow');
  });
  
  it('returns the correct interval value based on speed', () => {
    // Test with 'slow' speed
    localStorage.setItem(SPEED_STORAGE_KEY, 'slow');
    const { result: slowResult } = renderHook(() => useAnimationSpeed());
    expect(slowResult.current.interval).toBeGreaterThan(0.1); // Slow interval should be higher
    
    // Test with 'fast' speed
    localStorage.setItem(SPEED_STORAGE_KEY, 'fast');
    const { result: fastResult } = renderHook(() => useAnimationSpeed());
    expect(fastResult.current.interval).toBeLessThan(0.1); // Fast interval should be lower
  });
});