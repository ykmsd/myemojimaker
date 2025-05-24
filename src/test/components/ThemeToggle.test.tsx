import { render, screen, fireEvent } from '../utils/test-utils';
import { ThemeToggle } from '../../components/ThemeToggle';

describe('ThemeToggle', () => {
  beforeEach(() => {
    // Reset local storage before each test
    localStorage.clear();
    // Default to dark theme
    localStorage.setItem('theme', 'dark');
  });

  it('renders correctly with dark theme as default', () => {
    render(<ThemeToggle />);
    
    // In dark mode, we should see the sun icon for toggling to light mode
    const button = screen.getByRole('button', { name: /toggle theme/i });
    expect(button).toBeInTheDocument();
  });

  it('toggles theme when clicked', () => {
    render(<ThemeToggle />);
    
    const button = screen.getByRole('button', { name: /toggle theme/i });
    
    // Initially dark theme
    expect(localStorage.getItem('theme')).toBe('dark');
    
    // Click to toggle to light theme
    fireEvent.click(button);
    expect(localStorage.getItem('theme')).toBe('light');
    
    // Click again to toggle back to dark theme
    fireEvent.click(button);
    expect(localStorage.getItem('theme')).toBe('dark');
  });
});