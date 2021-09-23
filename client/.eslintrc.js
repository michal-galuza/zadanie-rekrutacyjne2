module.exports = {
	env: {
		browser: true,
		jest: true,
		es6: true,
	},
	plugins: ["import", "prettier"],
	extends: [
		"eslint:recommended",
		"plugin:prettier/recommended",
		"plugin:react/recommended",
	],
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: "module",
	},
	rules: {
		"prettier/prettier": [
			"error",
			{
				endOfLine: "auto",
			},
		],

		"no-console": "warn",
		"no-eval": "error",
		"import/first": "error",
		"react/react-in-jsx-scope": "off",
		"react/prop-types": "off",
	},
};
