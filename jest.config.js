import { readFileSync } from 'node:fs';
import { pathsToModuleNameMapper } from 'ts-jest';

const tsconfig = JSON.parse(readFileSync('./tsconfig.json', 'utf-8'));
const { compilerOptions } = tsconfig;

const COVERAGE_FILE_SUFFIX = ['service', 'controller', 'handler', 'util'];

/** @type {import('ts-jest/dist/types').JestConfigWithTsJest} */
export default {
  rootDir: '.',
  moduleFileExtensions: ['js', 'json', 'ts'],
  testRegex: '.*\\.spec\\.ts$',
  transform: { '^.+\\.ts$': 'ts-jest' },
  collectCoverageFrom: [`**/*.(${COVERAGE_FILE_SUFFIX.join('|')}).ts`],
  setupFilesAfterEnv: ['./test/env.setup.js', 'jest-extended/all'],
  coverageDirectory: './coverage',
  testEnvironment: 'node',
  // Helps to use aliases in tsconfig (@module/*)
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>',
  }),
};
