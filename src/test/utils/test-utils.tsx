import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { ThemeProvider } from '../../contexts/ThemeContext';
import { MobileWarningProvider } from '../../contexts/MobileWarningContext';
import { BrowserRouter } from 'react-router-dom';

const AllProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <BrowserRouter>
      <MobileWarningProvider>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </MobileWarningProvider>
    </BrowserRouter>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllProviders, ...options });

// Re-export everything from testing-library
export * from '@testing-library/react';
export { customRender as render };