/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["@zenith/eslint-config/next.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
};
