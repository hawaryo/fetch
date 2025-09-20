import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
  {
    rules: {
      quotes: ["error", "double"],
      "prefer-const": "error",
      "no-console": "warn",
      eqeqeq: ["error", "always"],
      // Additional strict rules
      strict: ["error", "global"],
      "no-unused-vars": ["error", { args: "none", ignoreRestSiblings: true }],
      "no-shadow": "warn",
      "consistent-return": "error",
      "no-var": "error",
      "prefer-arrow-callback": "error",
      "@next/next/no-img-element": "off",
      "no-console": "warn",
    },
  },
];

export default eslintConfig;
