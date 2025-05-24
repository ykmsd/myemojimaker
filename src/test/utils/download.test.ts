import { downloadUri } from '../../utils/download';

describe('downloadUri', () => {
  let mockLink: HTMLAnchorElement;
  let mockCreateElement: jest.SpyInstance;
  let mockAppendChild: jest.SpyInstance;
  let mockRemoveChild: jest.SpyInstance;
  let mockClick: jest.SpyInstance;
  
  beforeEach(() => {
    // Create a mock link element
    mockLink = {
      download: '',
      href: '',
      click: vi.fn(),
    } as unknown as HTMLAnchorElement;
    
    // Mock document.createElement to return our mock link
    mockCreateElement = vi.spyOn(document, 'createElement').mockReturnValue(mockLink);
    
    // Mock document.body.appendChild and removeChild
    mockAppendChild = vi.spyOn(document.body, 'appendChild').mockImplementation();
    mockRemoveChild = vi.spyOn(document.body, 'removeChild').mockImplementation();
    
    // Mock link.click
    mockClick = mockLink.click as jest.SpyInstance;
  });
  
  afterEach(() => {
    vi.restoreAllMocks();
  });
  
  it('creates a download link with correct attributes', () => {
    const uri = 'data:image/png;base64,test';
    const filename = 'test.png';
    
    downloadUri(uri, filename);
    
    // Should create an anchor element
    expect(mockCreateElement).toHaveBeenCalledWith('a');
    
    // Should set the correct attributes
    expect(mockLink.download).toBe(filename);
    expect(mockLink.href).toBe(uri);
    
    // Should append, click, and remove the link
    expect(mockAppendChild).toHaveBeenCalledWith(mockLink);
    expect(mockClick).toHaveBeenCalled();
    expect(mockRemoveChild).toHaveBeenCalledWith(mockLink);
  });
  
  it('works with different file types', () => {
    const uri = 'data:image/gif;base64,test';
    const filename = 'animation.gif';
    
    downloadUri(uri, filename);
    
    expect(mockLink.download).toBe(filename);
    expect(mockLink.href).toBe(uri);
  });
});