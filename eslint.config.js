import js from "@eslint/js";
import globals from "globals";
import importPlugin from "eslint-plugin-import";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRedux from "eslint-plugin-react-redux";
import prettier from "eslint-config-prettier/flat";

import airbnbRules from "./eslint.airbnb-rules.js";

const REDUX_IMPORT = {
  name: "redux",
  message:
    "Import from @reduxjs/toolkit, which bundles its own redux; a direct import pulls a second copy into the build.",
};

const ANALYTICS_IMPORT = {
  name: "react-ga4",
  message:
    "Reducers must stay free of side effects; send analytics from src/analyticsListeners.js instead.",
};

export default [
  {
    ignores: [
      "dist/**",
      "coverage/**",
      "tiling/work/**",
      "CREST_TIFS/**",
      "lambda_functions/.aws-sam/**",
      "lambda_functions/.venv/**",
    ],
  },
  js.configs.recommended,
  react.configs.flat.recommended,
  {
    files: ["**/*.{js,jsx}"],
    plugins: {
      import: importPlugin,
      "react-hooks": reactHooks,
      "react-redux": reactRedux,
    },
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: globals.browser,
    },
    settings: {
      react: { version: "detect" },
      "import/resolver": { node: { extensions: [".mjs", ".js", ".json"] } },
      "import/extensions": [".js", ".mjs", ".jsx"],
      "import/core-modules": [],
      "import/ignore": [
        "node_modules",
        "\\.(coffee|scss|css|less|hbs|svg|json)$",
      ],
    },
    rules: {
      ...airbnbRules,
      ...reactHooks.configs.recommended.rules,
      ...reactRedux.configs.recommended.rules,
      "no-underscore-dangle": "off",
      "no-unused-expressions": ["error", { allowTernary: true }],
      "no-unused-vars": ["error", { args: "none", caughtErrors: "none" }],
      "import/prefer-default-export": "off",
      "import/named": "off",
      "no-restricted-imports": ["error", { paths: [REDUX_IMPORT] }],
      "no-await-in-loop": "off",
      "no-param-reassign": [
        "error",
        {
          props: true,
          ignorePropertyModificationsFor: ["elem", "e", "wrapper", "state"],
        },
      ],
      "prefer-destructuring": [
        "error",
        { array: false, object: false },
        { enforceForRenamedProperties: false },
      ],
    },
  },
  {
    files: ["src/reducers/**/*.js"],
    ignores: ["**/*.test.js"],
    rules: {
      "no-restricted-imports": [
        "error",
        { paths: [REDUX_IMPORT, ANALYTICS_IMPORT] },
      ],
    },
  },
  {
    files: ["tiling/**/*.js"],
    languageOptions: { globals: globals.node },
    rules: {
      "no-console": "off",
      "import/extensions": "off",
      "import/no-extraneous-dependencies": "off",
    },
  },
  {
    files: ["vite.config.js", "eslint.config.js", "eslint.airbnb-rules.js"],
    languageOptions: { globals: globals.node },
    rules: {
      "import/no-unresolved": [
        "error",
        { ignore: ["^@vitejs/plugin-react$", "^eslint-config-prettier/flat$"] },
      ],
      "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
      "import/extensions": "off",
    },
  },
  {
    files: ["**/*.test.{js,jsx}"],
    languageOptions: { globals: globals.node },
    rules: {
      "import/no-extraneous-dependencies": "off",
      "import/extensions": "off",
    },
  },
  prettier,
];
