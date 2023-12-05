module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:react/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:import/typescript",
    "plugin:react/jsx-runtime",
    "plugin:prettier/recommended",
    "prettier",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: [
    "react-refresh",
    "react",
    "@typescript-eslint",
    "import",
    "jsx-a11y",
    "react-hooks",
    "prettier",
  ],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
      },
    ],
    "react/jsx-uses-react": "error",
    "react/no-unescaped-entities": "off", // should be error, see docs for this rule
    "react/jsx-uses-vars": "error",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",

    "no-console": "warn",
    "prettier/prettier": [
      "warn",
      {
        endOfLine: "auto",
        singleQuote: false,
        trailingComma: "all",
      },
    ],
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
