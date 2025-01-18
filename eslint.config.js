import eslintPluginVue from 'eslint-plugin-vue';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
	...eslintPluginVue.configs['flat/recommended'],
	{
		plugins: {
			prettier: eslintPluginPrettier,
		},
		rules: {
			// Report Prettier issues as ESLint errors
			'prettier/prettier': 'error',
		},
	},

	// Disable conflicting ESLint rules with Prettier
	eslintConfigPrettier,
];
