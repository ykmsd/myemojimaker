import { render, screen, fireEvent } from '../utils/test-utils';
import { ColorPicker } from '../../components/ColorPicker';

describe('ColorPicker', () => {
  const mockOnChange = vi.fn();
  
  beforeEach(() => {
    vi.clearAllMocks();
  });
  
  it('renders with label and color value', () => {
    render(
      <ColorPicker 
        label="Primary Color" 
        value="#FF0000" 
        onChange={mockOnChange}
      />
    );
    
    // Check for the label
    expect(screen.getByText('Primary Color')).toBeInTheDocument();
    
    // Check for the color input with correct value
    const colorInput = screen.getByRole('presentation');
    expect(colorInput).toHaveAttribute('value', '#FF0000');
  });
  
  it('calls onChange when color is changed', () => {
    render(
      <ColorPicker 
        label="Primary Color" 
        value="#FF0000" 
        onChange={mockOnChange}
      />
    );
    
    const colorInput = screen.getByRole('presentation');
    
    // Simulate changing the color
    fireEvent.change(colorInput, { target: { value: '#00FF00' } });
    
    // Check if the onChange callback was called with the new color
    expect(mockOnChange).toHaveBeenCalledWith('#00FF00');
  });
});