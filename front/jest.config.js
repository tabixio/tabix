// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  // automock: false,
  // bail: 0,
  // browser: false,
  // cacheDirectory: "/private/var/folders/xr/54w2mws93hj3p3_ysc347flc0000gn/T/jest_dx",
  // clearMocks: false,
  // collectCoverage: false,
  // collectCoverageFrom: null,
  // coverageDirectory: null,
  coveragePathIgnorePatterns: ['/node_modules/'],
  // coverageReporters: [
  //   "json",
  //   "text",
  //   "lcov",
  //   "clover"
  // ],
  // coverageThreshold: null,
  // dependencyExtractor: null,
  // errorOnDeprecated: false,
  // forceCoverageMatch: [],
  // globalSetup: null,
  // globalTeardown: null,
  // A set of global variables that need to be available in all test environments
  globals: {
    window: {},
  },
  // moduleDirectories: [
  //   "node_modules"
  // ],

  // moduleFileExtensions: [
  //   "js",
  //   "json",
  //   "jsx",
  //   "ts",
  //   "tsx",
  //   "node"
  // ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  // moduleNameMapper: {},
  // modulePathIgnorePatterns: [],
  // notify: false,
  // notifyMode: "failure-change",
  // preset: null,
  // projects: null,
  // reporters: undefined,
  // resetMocks: false,
  // resetModules: false,
  // resolver: null,
  // restoreMocks: false,
  // rootDir: null,
  // roots: [
  //   "<rootDir>"
  // ],
  // runner: "jest-runner",
  // setupFiles: [],
  // setupFilesAfterEnv: [],
  // snapshotSerializers: [],
  // testEnvironment: 'node',
  // testEnvironmentOptions: {},
  // testLocationInResults: false,
  // testMatch: [
  //   "**/__tests__/**/*.[jt]s?(x)",
  //   "**/?(*.)+(spec|test).[tj]s?(x)"
  // ],
  testPathIgnorePatterns: ['/node_modules/'],
  // testRegex: [],
  // testResultsProcessor: null,
  // testRunner: "jasmine2",
  // testURL: "http://localhost",
  // timers: "real",
  transform: {
    '^.+\\.jsx?$': 'babel-jest', // Adding this line solved the issue
    '^.+\\.tsx?$': 'ts-jest',
  },
  // moduleNameMapper: {
  //   '^antlr4$': 'antlr4/src/antlr4',
  // },
  transformIgnorePatterns: ['/node_modules/'],
  // unmockedModulePathPatterns: undefined,
  // verbose: null,
  // watchPathIgnorePatterns: [],
  // watchman: true,
};
