/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["@zenith/eslint-config/library.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
};
