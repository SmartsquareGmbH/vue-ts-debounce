import type { Config } from "@jest/types"

const config: Config.InitialOptions = {
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^~/(.*)$": "<rootDir>/src/$1",
    "^vue$": "vue/dist/vue.common.js",
  },
  moduleFileExtensions: ["js", "ts", "vue"],
  transform: {
    "^.+\\.ts$": "ts-jest",
    "^.+\\.js$": "babel-jest",
    "^.+\\.vue$": "@vue/vue2-jest",
  },
  collectCoverage: true,
  collectCoverageFrom: ["<rootDir>/src/**/*.vue", "<rootDir>/src/**/*.ts"],
  coverageProvider: "v8",
  testPathIgnorePatterns: ["dist"],
}

export default config
