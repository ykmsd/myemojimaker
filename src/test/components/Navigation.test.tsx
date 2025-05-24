import { render, screen, fireEvent } from '../utils/test-utils';
import { Navigation } from '../../components/Navigation';
import { Section } from '../../types';

describe('Navigation', () => {
  const mockOnSectionChange = vi.fn();
  
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Mock window.innerWidth for responsive testing
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024, // Default to desktop view
    });
  });
  
  it('renders all navigation tabs', () => {
    render(
      <Navigation 
        activeSection="image" 
        onSectionChange={mockOnSectionChange}
      />
    );
    
    expect(screen.getByText('Image Emoji')).toBeInTheDocument();
    expect(screen.getByText('Text Emoji')).toBeInTheDocument();
    expect(screen.getByText('Combine Emoji')).toBeInTheDocument();
  });
  
  it('highlights the active section', () => {
    render(
      <Navigation 
        activeSection="text" 
        onSectionChange={mockOnSectionChange}
      />
    );
    
    // The text tab should have the active class (which has gradient background)
    const textButton = screen.getByText('Text Emoji');
    expect(textButton).toHaveClass('bg-gradient-to-r');
    
    // The other tabs should not have the active class
    const imageButton = screen.getByText('Image Emoji');
    expect(imageButton).not.toHaveClass('bg-gradient-to-r');
  });
  
  it('calls onSectionChange when a tab is clicked', () => {
    render(
      <Navigation 
        activeSection="image" 
        onSectionChange={mockOnSectionChange}
      />
    );
    
    fireEvent.click(screen.getByText('Text Emoji'));
    expect(mockOnSectionChange).toHaveBeenCalledWith('text');
    
    fireEvent.click(screen.getByText('Combine Emoji'));
    expect(mockOnSectionChange).toHaveBeenCalledWith('combine');
  });
  
  it('adapts to mobile view for smaller screens', () => {
    // Set window.innerWidth to a mobile size
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: 320,
    });
    
    render(
      <Navigation 
        activeSection="image" 
        onSectionChange={mockOnSectionChange}
      />
    );
    
    // On very small screens, "Combine Emoji" should be shortened to "Combine"
    expect(screen.getByText('Combine')).toBeInTheDocument();
  });
});