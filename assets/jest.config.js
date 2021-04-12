module.exports = {
  testRegex: ["/__tests__/.*test.[jt]sx?$"],
  rootDir: "./__tests__/",
  testEnvironment: "node",
  testPathIgnorePatterns: ["/node_modules/", ".tmp", ".cache"],
};
