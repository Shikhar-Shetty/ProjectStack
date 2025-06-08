export default {
  extends: [
    "next/core-web-vitals",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  plugins: ["unused-imports", "react", "react-hooks"],
  rules: {
    "unused-imports/no-unused-imports": "warn", // helps clean code
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/no-unused-expressions": "warn",
    "react/jsx-key": "warn",
  },
};
