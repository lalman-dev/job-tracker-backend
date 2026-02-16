export default {
  testEnvironment: "node",

  moduleFileExtensions: ["ts", "js", "json"],

  transform: {
    "^.+\\.(t|j)s$": [
      "@swc/jest",
      {
        jsc: {
          parser: {
            syntax: "typescript",
          },
          target: "es2022",
        },
        module: {
          type: "commonjs",
        },
      },
    ],
  },

  moduleDirectories: ["node_modules", "src"],

  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov"],

  setupFiles: ["<rootDir>/src/tests/setup.ts"],
};
