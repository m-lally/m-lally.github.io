/**
 * Jest Configuration File
 * Configures Jest testing framework for JavaScript tests
 */

module.exports = {
  // Test environment - jsdom simulates browser environment
  testEnvironment: 'jsdom',

  // Pattern to find test files
  testMatch: ['**/*.test.js'],

  // Setup files to run before tests
  setupFilesAfterEnv: [],

  // Collect coverage reports
  collectCoverage: false,
  collectCoverageFrom: [
    'assets/js/*.js',
    '!assets/js/*.test.js',
    '!assets/js/vendor/**',
  ],

  // Coverage thresholds
  coverageThreshold: {
    global: {
      statements: 50,
      branches: 50,
      functions: 50,
      lines: 50,
    },
  },

  // Module name mapper for CSS and asset imports
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(gif|ttf|eot|svg|png|jpg|jpeg)$': '<rootDir>/__mocks__/fileMock.js',
  },

  // Test timeout (in milliseconds)
  testTimeout: 5000,

  // Verbose output
  verbose: true,

  // Ignore patterns
  testPathIgnorePatterns: ['/node_modules/'],
  modulePathIgnorePatterns: ['/vendor/'],
};
