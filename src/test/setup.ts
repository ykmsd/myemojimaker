import '@testing-library/jest-dom';

// Mock canvas API since JSDOM doesn't support it
class MockCanvas {
  getContext() {
    return {
      clearRect: vi.fn(),
      drawImage: vi.fn(),
      fillRect: vi.fn(),
      fillText: vi.fn(),
      translate: vi.fn(),
      rotate: vi.fn(),
      scale: vi.fn(),
      save: vi.fn(),
      restore: vi.fn(),
      putImageData: vi.fn(),
      createImageData: vi.fn(),
      measureText: () => ({ width: 100 }),
      canvas: { toDataURL: () => 'data:image/png;base64,test' },
    };
  }
  toBlob(callback: any) {
    callback(new Blob());
  }
}

// Mock HTMLCanvasElement
Object.defineProperty(window, 'HTMLCanvasElement', {
  value: class extends HTMLElement {
    constructor() {
      super();
    }
    getContext() {
      return MockCanvas.prototype.getContext();
    }
    toBlob(callback: any) {
      MockCanvas.prototype.toBlob(callback);
    }
    toDataURL() {
      return 'data:image/png;base64,test';
    }
  }
});

// Mock window.URL.createObjectURL
Object.defineProperty(window.URL, 'createObjectURL', {
  value: vi.fn().mockReturnValue('blob:test'),
});

// Mock window.URL.revokeObjectURL
Object.defineProperty(window.URL, 'revokeObjectURL', {
  value: vi.fn(),
});

// Mock IntersectionObserver
class MockIntersectionObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}

Object.defineProperty(window, 'IntersectionObserver', {
  value: MockIntersectionObserver,
});

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Suppress console errors during tests
console.error = vi.fn();

// Mock local storage
const localStorageMock = (function() {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    }
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

// Define a global vi
global.vi = vi;