/* eslint-env node */
module.exports = {
	extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint'],
	overrides: [
		{
			files: ['*.tsx'],
			rules: {
				"react-native/no-inline-styles": "off",
				"react-native/no-color-literals": "off",
				"typescript-eslint/no-var-requires": "off"
			}
		}
	],
	root: true,
  };