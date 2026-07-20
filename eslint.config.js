const tseslint = require('@typescript-eslint/eslint-plugin');
const parser = require('@typescript-eslint/parser');
const angular = require('@angular-eslint/eslint-plugin');
const angularTemplate = require('@angular-eslint/eslint-plugin-template');
const angularTemplateParser = require('@angular-eslint/template-parser');
const stylistic = require('@stylistic/eslint-plugin');
const prettierPlugin = require('eslint-plugin-prettier');
const prettierConfig = require('eslint-config-prettier');

module.exports = [
  {
    ignores: ['node_modules/**', '.angular/**', 'dist/**'],
  },

  prettierConfig,

  {
    files: ['**/*.ts'],

    languageOptions: {
      parser,
    },

    plugins: {
      '@typescript-eslint': tseslint,
      '@angular-eslint': angular,
      '@stylistic': stylistic,
      prettier: prettierPlugin,
    },

    rules: {
      ...tseslint.configs.recommended.rules,

      'no-console': [
        'warn',
        {
          allow: ['warn', 'error'],
        },
      ],

      '@stylistic/quotes': [
        'warn',
        'single',
        {
          avoidEscape: true,
          allowTemplateLiterals: 'always',
        },
      ],

      'lines-between-class-members': [
        'error',
        'always',
        {
          exceptAfterSingleLine: true,
        },
      ],

      '@stylistic/object-curly-spacing': ['warn', 'always'],

      '@stylistic/template-curly-spacing': ['warn', 'always'],

      '@stylistic/semi': ['error', 'always'],

      '@stylistic/padded-blocks': [
        'error',
        {
          classes: 'always',
        },
      ],

      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        {
          accessibility: 'no-public',
        },
      ],

      '@typescript-eslint/naming-convention': [
        'error',

        {
          selector: 'enumMember',
          format: ['UPPER_CASE'],
        },

        {
          selector: 'interface',
          format: ['PascalCase'],
          custom: {
            regex: '^I[A-Z]',
            match: true,
          },
        },
      ],

      '@typescript-eslint/no-explicit-any': 'off',
    },
  },

  {
    files: ['**/*.html'],

    languageOptions: {
      parser: angularTemplateParser,
    },

    plugins: {
      '@angular-eslint/template': angularTemplate,
      prettier: prettierPlugin,
    },

    rules: {
      '@angular-eslint/template/banana-in-box': 'error',

      '@angular-eslint/template/eqeqeq': 'warn',

      '@angular-eslint/template/no-negated-async': 'error',
    },
  },
];
