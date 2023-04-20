module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'airbnb-typescript',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 'latest', project: './tsconfig.json', sourceType: 'module' },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': 'warn',
    'react/react-in-jsx-scope': 0,
    'import/no-default-export': 'off',
    'import/prefer-default-export': 'off',
    'no-nested-ternary': 'error',
    'prefer-const': 'error',
    'react/jsx-sort-props': [
      'error',
      {
        ignoreCase: true,
      },
    ],
    'react-hooks/exhaustive-deps': 'error',
  },
};
