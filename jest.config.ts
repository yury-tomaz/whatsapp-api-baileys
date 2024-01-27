import type { JestConfigWithTsJest } from 'ts-jest';

const jestConfig: JestConfigWithTsJest = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>'],
  setupFiles: ['<rootDir>/.jest/setEnvVars.js'],
  testMatch: ['**/*.unit-spec.ts', '**/*.integration-spec.ts', '**/*.e2e-spec.ts'],
}

export default jestConfig;