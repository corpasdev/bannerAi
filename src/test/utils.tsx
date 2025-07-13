import { render, RenderOptions } from '@testing-library/react';
import { ReactElement } from 'react';

// Test utilities for Firebase auth
export const mockUser = {
  uid: 'test-user-123',
  email: 'test@example.com',
  displayName: 'Test User',
  photoURL: null,
  emailVerified: true,
};

export const mockFirebaseAuth = {
  currentUser: mockUser,
  signOut: jest.fn(),
  onAuthStateChanged: jest.fn(),
};

// Custom render function that includes any providers
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, options);

// Test data generators
export const createMockDocument = (overrides = {}) => ({
  id: 'test-doc-123',
  createdAt: new Date('2023-01-01'),
  updatedAt: new Date('2023-01-01'),
  ...overrides,
});

export const createMockUser = (overrides = {}) => ({
  uid: 'test-user-123',
  email: 'test@example.com',
  displayName: 'Test User',
  photoURL: null,
  emailVerified: true,
  ...overrides,
});

// Mock handlers for common scenarios
export const mockHandlers = {
  onClick: jest.fn(),
  onChange: jest.fn(),
  onSubmit: jest.fn(),
  onError: jest.fn(),
  onSuccess: jest.fn(),
};

// Wait for async operations
export const waitFor = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock file for file upload tests
export const createMockFile = (name = 'test-file.jpg', type = 'image/jpeg') => {
  const file = new File(['test content'], name, { type });
  return file;
};

// Mock image for image tests
export const createMockImage = (width = 100, height = 100) => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  return canvas;
};

// Reset all mocks
export const resetAllMocks = () => {
  jest.clearAllMocks();
  Object.values(mockHandlers).forEach(handler => handler.mockReset());
};

// Export everything from testing library
// eslint-disable-next-line react-refresh/only-export-components
export * from '@testing-library/react';
// eslint-disable-next-line react-refresh/only-export-components
export * from '@testing-library/user-event';
export { customRender as render }; 