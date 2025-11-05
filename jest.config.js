/** @type {import("jest").Config} **/
export default {
    preset: "ts-jest",
    testEnvironment: "node",
    transform: {
    '^.+\\.ts?$': 'babel-jest', // usa babel para TS
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testMatch: ['**/tests/**/*.ts', '**/?(*.)+(spec|test).ts'],
  }