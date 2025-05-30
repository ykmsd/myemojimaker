import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { ThemeProvider } from './contexts/ThemeContext';
import { MobileWarningProvider } from './contexts/MobileWarningContext';
import { MenuBar } from './components/MenuBar';
import { AboutPage } from './pages/AboutPage';
import { FaqPage } from './pages/FaqPage';
import { EmojiMaker } from './pages/EmojiMaker';
import { ThemeToggle } from './components/ThemeToggle';
import { MobileWarning } from './components/MobileWarning';
import { Footer } from './components/Footer';
import './styles/a11y.css';

function App() {
  return (
    <BrowserRouter>
      <MobileWarningProvider>
        <ThemeProvider>
          <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors flex flex-col">
            <Toaster 
              position="top-right"
              expand={false}
              richColors
              closeButton
            />
            <MobileWarning />
            <ThemeToggle />
            <MenuBar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<EmojiMaker />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/faq" element={<FaqPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </MobileWarningProvider>
    </BrowserRouter>
  );
}

export default App;