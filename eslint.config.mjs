// ESLint flat config for Deno-driven Node tools
// Uses npm: spec so no local node_modules are required
import tsParser from "npm:@typescript-eslint/parser@8";
import tsPlugin from "npm:@typescript-eslint/eslint-plugin@8";
import sonarjs from "npm:eslint-plugin-sonarjs@1";
import { fileURLToPath } from "node:url";
import path from "node:path";

const tsconfigRootDir = path.dirname(fileURLToPath(new URL(import.meta.url)));

export default [
  {
    ignores: [
      "**/*.js",
      "static/dist/**",
      "node_modules/**",
      "deno.lock",
    ],
  },
  {
    files: ["**/*.ts"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parser: tsParser,
      parserOptions: {
        project: ["./tsconfig.json"],
        tsconfigRootDir,
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      sonarjs,
    },
    rules: {
      // Ported key rules from .eslintrc (kept close but concise)
      "prefer-arrow-callback": ["warn", { allowNamedFunctions: true }],
      "func-style": ["warn", "declaration", { allowArrowFunctions: false }],

      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/no-non-null-assertion": "error",
      "constructor-super": "error",
      "@typescript-eslint/no-invalid-this": "error",
      "no-restricted-syntax": ["error", "ForInStatement"],
      "use-isnan": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          args: "after-used",
          ignoreRestSiblings: true,
          vars: "all",
          varsIgnorePattern: "^_",
          argsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/await-thenable": "error",
      "@typescript-eslint/no-misused-new": "error",
      "@typescript-eslint/restrict-plus-operands": "error",

      // sonarjs
      "sonarjs/no-all-duplicated-branches": "error",
      "sonarjs/no-collection-size-mischeck": "error",
      "sonarjs/no-duplicated-branches": "error",
      "sonarjs/no-element-overwrite": "error",
      "sonarjs/no-identical-conditions": "error",
      "sonarjs/no-identical-expressions": "error",

      // Naming rules (subset of original for flat config)
      "@typescript-eslint/naming-convention": [
        "error",
        { selector: "interface", format: ["PascalCase"], custom: { regex: "^I[A-Z]", match: false } },
        { selector: "memberLike", modifiers: ["private"], format: ["camelCase"], leadingUnderscore: "require" },
        { selector: "typeLike", format: ["PascalCase"] },
        { selector: "typeParameter", format: ["PascalCase"], prefix: ["T"] },
        { selector: "variable", format: ["camelCase", "UPPER_CASE"], leadingUnderscore: "allow", trailingUnderscore: "allow" },
        { selector: "variable", modifiers: ["destructured"], format: null },
        { selector: "variable", types: ["boolean"], format: ["PascalCase"], prefix: ["is", "should", "has", "can", "did", "will", "does"] },
        { selector: "variableLike", format: ["camelCase"] },
        { selector: ["function", "variable"], format: ["camelCase"] },
      ],
    },
  },
];
