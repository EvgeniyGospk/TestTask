module.exports = {
  preset: 'jest-expo',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testMatch: ['**/__tests__/**/*.test.(ts|tsx|js)'],
  moduleNameMapper: {
    '\\.(css)$': '<rootDir>/__tests__/__mocks__/styleMock.js',
  },
};
