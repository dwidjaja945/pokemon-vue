module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/airbnb',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'import/prefer-default-export': 'off',
    'implicit-arrow-linebreak': 'off',
    'arrow-parens': 'off',
    'no-shadow': 'warn',
    'indent': ['warn', 4],
    'no-restricted-syntax': 'off',
    'guard-for-in': 'off',
    'no-param-reassign': 'warn',
    'no-return-assign': 'warn',
    '@typescript-eslint/camelcase': 'off',
    'func-names': 'off'
  },
};
