import type {Config} from '@jest/types';

const config:Config.InitialOptions = {
  testEnvironment: "jsdom",
  moduleFileExtensions: ["js", "ts", "tsx", "jsx"],
  verbose: true,
  setupFiles: [
    "./src/tests/jest.setup.ts"
  ],
  preset: "jest-expo",
  globals: {
    "ts-jest": {
      tsconfig: {
        jsx: "react",
      },
    },
  },
  transform: {
    "^.+\\.js$": "<rootDir>/node_modules/react-native/jest/preprocessor.js",
    "^.+\\.tsx?$": "ts-jest",
  },
  testMatch: ["**/?(*.)+(spec|test).ts?(x)", "**/?(*.)+(spec|test).js?(x)"],
  collectCoverageFrom: [
    "**/*.{ts,tsx,js,jsx}",
    "!**/*.config.(ts|js)?(x)",
    "!**/*.d.ts",
    "!**/__test_coverage__/**",
    "!**/node_modules/**",
    "!**/jest.setup.ts",
  ],
  collectCoverage: false,
  transformIgnorePatterns: [
    "node_modules/(?!(jest-)?|@react-native|react-native|react-clone-referenced-element|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|sentry-expo|native-base)",
  ],
  coverageReporters: ["json-summary", "text", "lcov"],
  coverageDirectory: "./src/tests/__test_coverage__",
};

export default config;
