require('@rushstack/eslint-config/patch/modern-module-resolution');

module.exports = {
  extends: ['@tiffinger-thiel/eslint-config/profile/nest'],

  parserOptions: {
    project: `${__dirname}/tsconfig.json`,
  },

  rules: {
    '@typescript-eslint/parameter-properties': 'off',
  },
};
