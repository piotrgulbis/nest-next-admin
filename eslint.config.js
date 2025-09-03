const { FlatCompat } = require('@eslint/eslintrc');
const js = require('@eslint/js');
const typescriptEslint = require('@typescript-eslint/eslint-plugin');
const typescriptParser = require('@typescript-eslint/parser');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

module.exports = [
  // Base JavaScript/TypeScript configuration
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        node: true,
        browser: true,
        es2021: true,
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslint,
    },
    rules: {
      // TypeScript rules
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-inferrable-types': 'off',
      '@typescript-eslint/no-empty-function': 'warn',

      // General JavaScript rules
      'no-console': 'warn',
      'no-debugger': 'error',
      'no-unused-vars': 'off', // Using TypeScript version instead
      'prefer-const': 'error',
      'no-var': 'error',
      'object-shorthand': 'error',
      'prefer-template': 'error',

      // Code style
      indent: ['error', 2, { SwitchCase: 1 }],
      quotes: ['error', 'single', { avoidEscape: true }],
      semi: ['error', 'always'],
      'comma-dangle': ['error', 'always-multiline'],
      'eol-last': 'error',
      'no-trailing-spaces': 'error',
    },
  },

  // Backend (NestJS) specific configuration
  {
    files: ['backend/**/*.{ts,js}'],
    rules: {
      // Allow console in backend for logging
      'no-console': 'off',

      // NestJS specific
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',

      // Decorators support
      '@typescript-eslint/no-inferrable-types': 'off',
    },
  },

  // Frontend (Next.js/React) specific configuration
  ...compat.extends('next/core-web-vitals').map(config => ({
    ...config,
    files: ['admin/**/*.{js,jsx,ts,tsx}'],
  })),

  {
    files: ['admin/**/*.{js,jsx,ts,tsx}'],
    rules: {
      // React specific rules
      'react/react-in-jsx-scope': 'off', // Next.js doesn't require React import
      'react/prop-types': 'off', // Using TypeScript for prop validation
      'react/display-name': 'warn',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // Next.js specific
      '@next/next/no-img-element': 'warn',
      '@next/next/no-html-link-for-pages': 'error',
    },
  },

  // Configuration files
  {
    files: ['*.config.{js,ts,mjs}', '**/config/**/*.{js,ts}'],
    rules: {
      'no-console': 'off',
      '@typescript-eslint/no-var-requires': 'off',
    },
  },

  // Test files
  {
    files: ['**/*.{test,spec}.{js,ts,tsx}', '**/__tests__/**/*.{js,ts,tsx}'],
    rules: {
      'no-console': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
    },
  },

  // Ignore patterns
  {
    ignores: [
      'node_modules/**',
      '**/node_modules/**',
      'dist/**',
      '**/dist/**',
      'build/**',
      '**/build/**',
      '.next/**',
      '**/.next/**',
      'coverage/**',
      '**/coverage/**',
      '*.d.ts',
      '**/*.d.ts',
      'public/**',
      '**/public/**',
      '*.tsbuildinfo',
      '**/*.tsbuildinfo',
      '*.map',
      '**/*.map',
      'package-lock.json',
      '**/package-lock.json',
      '*.min.js',
      '**/*.min.js',
      'backend/dist/**',
      'admin/.next/**',
      'admin/public/**',
    ],
  },
];
