import { render, screen } from '../utils/test-utils';
import { LoadingSpinner } from '../../components/a11y/LoadingSpinner';

describe('LoadingSpinner', () => {
  it('renders with default label', () => {
    render(<LoadingSpinner />);
    
    // Check for the default loading label
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    
    // Check that it has the role="status" for accessibility
    expect(screen.getByRole('status')).toBeInTheDocument();
  });
  
  it('renders with custom label', () => {
    render(<LoadingSpinner label="Processing..." />);
    
    // Check for the custom loading label
    expect(screen.getByText('Processing...')).toBeInTheDocument();
  });
  
  it('has proper accessibility attributes', () => {
    render(<LoadingSpinner />);
    
    // Should have aria-live="polite" for screen reader announcements
    const status = screen.getByRole('status');
    expect(status).toHaveAttribute('aria-live', 'polite');
    
    // The label should be visually hidden but accessible to screen readers
    const label = screen.getByText('Loading...');
    expect(label).toHaveClass('sr-only');
  });
});