import { textToImage } from '../../utils/textToImage';

describe('textToImage', () => {
  // Mock canvas functionality
  let mockContext: any;
  let mockCanvas: any;
  
  beforeEach(() => {
    mockContext = {
      fillStyle: '',
      font: '',
      textAlign: '',
      textBaseline: '',
      fillRect: vi.fn(),
      fillText: vi.fn(),
      strokeText: vi.fn(),
      measureText: vi.fn().mockReturnValue({ width: 100 }),
      translate: vi.fn(),
      scale: vi.fn(),
      lineWidth: 0,
      strokeStyle: '',
      lineJoin: '',
      miterLimit: 0,
    };
    
    mockCanvas = {
      width: 0,
      height: 0,
      getContext: vi.fn().mockReturnValue(mockContext),
      toDataURL: vi.fn().mockReturnValue('data:image/png;base64,test'),
    };
    
    vi.spyOn(document, 'createElement').mockReturnValue(mockCanvas);
  });
  
  afterEach(() => {
    vi.restoreAllMocks();
  });
  
  it('creates a canvas with the specified dimensions', () => {
    textToImage('Test', '#000000');
    
    expect(mockCanvas.width).toBe(128);
    expect(mockCanvas.height).toBe(128);
  });
  
  it('sets the correct text properties', () => {
    textToImage('Test', '#FF0000', 'Arial');
    
    expect(mockContext.textAlign).toBe('center');
    expect(mockContext.textBaseline).toBe('middle');
    expect(mockContext.fillStyle).toBe('#FF0000');
    expect(mockContext.font).toContain('Arial');
  });
  
  it('fills the background color when specified', () => {
    textToImage('Test', '#000000', 'Arial', '#FFFFFF');
    
    // Should have two fillRect calls: one for transparent background and one for the specified color
    expect(mockContext.fillRect).toHaveBeenCalledTimes(2);
    
    // The second call should use the specified background color
    expect(mockContext.fillStyle).toBe('#FFFFFF');
  });
  
  it('adds an outline when specified', () => {
    textToImage('Test', '#000000', 'Arial', null, '#FFFFFF', 3);
    
    expect(mockContext.strokeStyle).toBe('#FFFFFF');
    expect(mockContext.lineWidth).toBe(6); // Double the specified width
    expect(mockContext.lineJoin).toBe('round');
    expect(mockContext.strokeText).toHaveBeenCalled();
  });
  
  it('applies scaling for text size adjustment', () => {
    textToImage('Very long text that needs scaling', '#000000');
    
    expect(mockContext.scale).toHaveBeenCalled();
  });
  
  it('returns a data URL', () => {
    const result = textToImage('Test', '#000000');
    
    expect(result).toBe('data:image/png;base64,test');
    expect(mockCanvas.toDataURL).toHaveBeenCalledWith('image/png');
  });
});