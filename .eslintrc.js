module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    commonjs: true,
    jest: true,
  },
  ignorePatterns: ['node_modules', 'build'],
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:react/recommended',
    'prettier',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  plugins: ['react', 'prettier'],
  rules: {
    curly: 'error',
    'prettier/prettier': ['error'],
    'no-console': 'off',
    'react/prop-types': 0,
    'react/react-in-jsx-scope': 0,
    'react/no-unescaped-entities': 0,
    'react/jsx-tag-spacing': ['error', { beforeSelfClosing: 'always' }],
    'react/self-closing-comp': 'error',
    'no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'all',
        ignoreRestSiblings: false,
        argsIgnorePattern: '^_',
      },
    ],
  },
};
