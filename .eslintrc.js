module.exports = {
  env: {
    commonjs: true,
    node: true,
    browser: true,
    es6: true,
    jest: true,
  },
  //extends: ['eslint:recommended', 'plugin:react/recommended'],
  extends: ["plugin:prettier/recommended"],
  globals: {},
  parser: "babel-eslint",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: "module",
  },
  plugins: ["react", "import", "react-hooks", "prettier"],
  ignorePatterns: ["node_modules/"],
  rules: {
    "prettier/prettier": "error",
  },
  settings: {
    react: {
      version: "latest", // "detect" automatically picks the version you have installed.
    },
  },
};
