module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },

  'extends': [
    'eslint:recommended',
    'plugin:react/recommended',
  ],

  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    __PATH_PREFIX__: 'readonly',
  },

  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },

  plugins: [
    'react',
  ],

  rules: {
    'react/jsx-filename-extension': 0,
    'react/jsx-props-no-spreading': 0,
    'react/state-in-constructor': 0,
    'arrow-parens': 0,
    'react/prop-types': 0,
    'react/no-multi-comp': 0,
    'no-underscore-dangle': 0,
  },
};
