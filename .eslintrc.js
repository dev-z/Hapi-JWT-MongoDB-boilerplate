// ESLint configuration
// http://eslint.org/docs/user-guide/configuring
module.exports = {
    parser: 'babel-eslint',
  
    extends: [
      'airbnb-base',
    ],
  
    globals: {
      __DEV__: true,
    },
  
    env: {
      node: true,
      mocha: true,
      mongo: true
    },
  
    rules: {
      // `js` and `jsx` are common extensions
      // `mjs` is for `universal-router` only, for now
      'import/extensions': [
        'error',
        'always',
        {
          js: 'never',
          jsx: 'never',
          mjs: 'never',
        },
      ],
  
      // Not supporting nested package.json yet
      // https://github.com/benmosher/eslint-plugin-import/issues/458
      'import/no-extraneous-dependencies': 'off',
  
      // Recommend not to leave any console.log in your code
      // Use console.error, console.warn and console.info instead
      'no-console': [
        'error',
        {
          allow: ['warn', 'error', 'info'],
        },
      ],
  
      // Switching off checks for linebreaks
      'linebreak-style': 'off',

      // Enforce fat-arrow fn syntax
      'arrow-body-style': ["error", "always"],
      
      'prefer-promise-reject-errors': 'off',
    },
  };