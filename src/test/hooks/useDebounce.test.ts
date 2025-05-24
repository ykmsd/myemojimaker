import { renderHook, act } from '@testing-library/react';
import { useDebounce } from '../../hooks/useDebounce';

describe('useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  
  afterEach(() => {
    vi.useRealTimers();
  });
  
  it('returns the initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initial value', 500));
    
    expect(result.current).toBe('initial value');
  });
  
  it('does not update the value before the delay', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'initial value', delay: 500 } }
    );
    
    // Change the value
    rerender({ value: 'new value', delay: 500 });
    
    // Advance time but not enough to trigger the debounce
    act(() => {
      vi.advanceTimersByTime(400);
    });
    
    // Value should still be the initial value
    expect(result.current).toBe('initial value');
  });
  
  it('updates the value after the delay', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'initial value', delay: 500 } }
    );
    
    // Change the value
    rerender({ value: 'new value', delay: 500 });
    
    // Advance time to trigger the debounce
    act(() => {
      vi.advanceTimersByTime(600);
    });
    
    // Value should be updated
    expect(result.current).toBe('new value');
  });
  
  it('uses the most recent value when debouncing multiple changes', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'initial value', delay: 500 } }
    );
    
    // Change the value multiple times in quick succession
    rerender({ value: 'intermediate value', delay: 500 });
    
    act(() => {
      vi.advanceTimersByTime(200);
    });
    
    rerender({ value: 'final value', delay: 500 });
    
    // Advance time to trigger the debounce
    act(() => {
      vi.advanceTimersByTime(600);
    });
    
    // Value should be the most recent one
    expect(result.current).toBe('final value');
  });
});