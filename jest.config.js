/** @type {import("jest").Config} **/
export default {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    '^.+\\.ts?$': 'babel-jest', // usa babel para TS
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testMatch: ['**/tests/**/*.ts', '**/?(*.)+(spec|test).ts'],
  transformIgnorePatterns: ['/node_modules/(?!(uuid)/)', '/uuid/'],
  transform: {
  "^.+\\.ts$": ["ts-jest", { useESM: true }],
  "^.+\\.js$": ["ts-jest", { useESM: true }]
  },

  transformIgnorePatterns: [
    "/node_modules/(?!(uuid)/)"
  ],
  moduleNameMapper: {
    "^node:test$": "@jest/globals"
  }
  }