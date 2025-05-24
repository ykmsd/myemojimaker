import { calculateAspectRatioFit } from '../../../utils/transforms/utils';

describe('calculateAspectRatioFit', () => {
  it('maintains aspect ratio when scaling down', () => {
    // Original dimensions: 200x100 (2:1 aspect ratio)
    // Max dimensions: 100x100
    const result = calculateAspectRatioFit(200, 100, 100, 100);
    
    // Should scale to 100x50 to maintain the 2:1 aspect ratio
    expect(result.width).toBe(100);
    expect(result.height).toBe(50);
  });
  
  it('maintains aspect ratio when container is not square', () => {
    // Original dimensions: 200x200 (1:1 aspect ratio)
    // Max dimensions: 300x100 (container is wider than tall)
    const result = calculateAspectRatioFit(200, 200, 300, 100);
    
    // Should be limited by height: 100x100
    expect(result.width).toBe(100);
    expect(result.height).toBe(100);
  });
  
  it('keeps original size when smaller than max dimensions', () => {
    // Original dimensions: 50x50
    // Max dimensions: 100x100
    const result = calculateAspectRatioFit(50, 50, 100, 100);
    
    // Should stay 50x50 since it already fits
    expect(result.width).toBe(50);
    expect(result.height).toBe(50);
  });
  
  it('calculates correct position values', () => {
    // Original dimensions: 100x100
    // Max dimensions: 200x200
    const result = calculateAspectRatioFit(100, 100, 200, 200);
    
    // Positioned at 50,50 to center in the 200x200 container
    expect(result.x).toBe(50);
    expect(result.y).toBe(50);
  });
  
  it('handles zero dimensions gracefully', () => {
    // Edge case: zero width or height
    const result = calculateAspectRatioFit(0, 100, 200, 200);
    
    // Should not cause NaN or infinity
    expect(result.width).toBe(0);
    expect(result.height).toBe(0);
  });
});