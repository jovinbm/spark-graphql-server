module.exports = {
  extends: ['alloy', 'alloy/typescript'],
  env: {
    node: true,
  },
  globals: {},
  rules: {
    'max-params': 0,
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
  },
};
