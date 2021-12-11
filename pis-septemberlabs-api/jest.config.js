module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    "__tests__/(.*)": "<rootDir>/$1",
  },
};
