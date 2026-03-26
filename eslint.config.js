// import js from '@eslint/js'
// import globals from 'globals'
// import reactHooks from 'eslint-plugin-react-hooks'
// import reactRefresh from 'eslint-plugin-react-refresh'
// import tseslint from 'typescript-eslint'
// import { defineConfig, globalIgnores } from 'eslint/config'

// export default defineConfig([
//   globalIgnores(['dist']),
//   {
//     files: ['**/*.{ts,tsx}'],
//     extends: [
//       js.configs.recommended,
//       tseslint.configs.recommended,
//       reactHooks.configs.flat.recommended,
//       reactRefresh.configs.vite,
//     ],
//     languageOptions: {
//       ecmaVersion: 2020,
//       globals: globals.browser,
//     },
//   },
// ])
import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import ts from 'typescript-eslint';

export default defineConfig([
    globalIgnores(['dist']),
    {
        files: ['./src/**/*.{ts,tsx,js,jsx}', './configs/**/*.{ts,tsx,js,jsx}'],
        plugins: { 'simple-import-sort': simpleImportSort },
        extends: [
            js.configs.recommended,
            ts.configs.recommended,
            reactHooks.configs.flat.recommended,
            reactRefresh.configs.vite,
        ],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
            parserOptions: {
                ecmaVersion: 'latest',
                ecmaFeatures: { jsx: true },
                sourceType: 'module',
            },
        },
        rules: {
            'no-unused-vars': 'off',
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/no-unsafe-function-type': 'warn',
            '@typescript-eslint/no-unused-vars': [
                'warn',
                {
                    vars: 'all',
                    varsIgnorePattern: '^_',
                    args: 'after-used',
                    argsIgnorePattern: '^_',
                    caughtErrors: 'all',
                    caughtErrorsIgnorePattern: '^_',
                    destructuredArrayIgnorePattern: '^_',
                    ignoreRestSiblings: true,
                },
            ],
            'simple-import-sort/imports': [
                'warn',
                {
                    groups: [
                        ['^\\u0000'],
                        ['^react', '^mobx', '^@mui', '^@\\w', '^@?\\w', '^'],
                        [
                            '^(@src|@|store|httpClient|api|containers|components|uwp|formik-schemas|hooks|utils|consts|icons)(/.*|$)',
                        ],
                        ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
                        ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
                        ['^.+\\./styles.tsx$'],
                        ['^.+\\.(scss|css|module\\.scss|module\\.css)$'],
                    ],
                },
            ],
        },
    },
]);F