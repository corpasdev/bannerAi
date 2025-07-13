import '@testing-library/jest-dom';

// Mock Firebase
jest.mock('@/firebase/init', () => ({
  auth: {
    currentUser: null,
  },
  db: {},
  storage: {},
  currentEnvironment: 'development',
}));

// Mock environment variables
Object.defineProperty(window, 'import', {
  value: {
    meta: {
      env: {
        MODE: 'test',
        VITE_FIREBASE_API_KEY_DEV: 'mock-api-key',
        VITE_FIREBASE_AUTH_DOMAIN_DEV: 'mock-auth-domain',
        VITE_FIREBASE_PROJECT_ID_DEV: 'mock-project-id',
        VITE_FIREBASE_STORAGE_BUCKET_DEV: 'mock-storage-bucket',
        VITE_FIREBASE_MESSAGING_SENDER_ID_DEV: 'mock-sender-id',
        VITE_FIREBASE_APP_ID_DEV: 'mock-app-id',
      },
    },
  },
});

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
};

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
};

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock HTMLElement.prototype.scrollIntoView
HTMLElement.prototype.scrollIntoView = jest.fn();

// Mock console methods for cleaner test output
const originalError = console.error;
const originalWarn = console.warn;

beforeAll(() => {
  console.error = (...args: any[]) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Warning: ReactDOM.render is no longer supported')
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
  
  console.warn = (...args: any[]) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('componentWillReceiveProps has been renamed')
    ) {
      return;
    }
    originalWarn.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
  console.warn = originalWarn;
}); 