import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  testRunner: 'jest-circus/runner',
  testEnvironment: './env/jest-environment-fail-fast.ts',
  preset: 'ts-jest',
  setupFilesAfterEnv: ['./helper/jest.setup.ts'],
  sandboxInjectedGlobals: [
    'Math',
  ],
};

// eslint-disable-next-line import/no-default-export
export default config;
