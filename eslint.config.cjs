const js = require('@eslint/js');
const globals = require('globals');
const { defineConfig } = require('eslint/config');

module.exports = defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    ignores: ['node_modules/**', 'coverage/**'],
    languageOptions: {
      globals: { ...globals.node, ...globals.es2021 },
      sourceType: 'commonjs',
      ecmaVersion: 'latest',
    },
    plugins: { js },
    extends: ['js/recommended'],
    rules: {
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
      indent: ['error', 2],
      'no-trailing-spaces': 'error',
      'eol-last': ['error', 'always'],
      'no-multiple-empty-lines': ['error', { max: 1 }],
      'comma-dangle': ['error', 'always-multiline'],
      'no-unused-vars': ['warn'],
      'no-console': 'off',
      eqeqeq: ['error', 'always'],
      curly: ['error', 'all'],
      'no-duplicate-imports': 'error',
      'prefer-const': 'error',
      'arrow-spacing': ['error', { before: true, after: true }],
    },
  },
  {
    files: ['**/__tests__/**/*.js', '**/*.test.js'],
    languageOptions: { globals: { ...globals.jest } },
  },
]);
