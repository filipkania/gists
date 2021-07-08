module.exports = {
	root: true,
	env: {
		node: true,
		es6: true,
	},
	plugins: ["prettier"],
	parserOptions: { ecmaVersion: 8 },
	ignorePatterns: ["node_modules/*", ".next/*"],
	parser: "@typescript-eslint/parser",
	settings: { react: { version: "detect" } },
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended", // TypeScript rules
		"plugin:react/recommended", // React rules
		"plugin:react-hooks/recommended", // React hooks rules
		"plugin:jsx-a11y/recommended",
		"plugin:prettier/recommended",
	],
	rules: {
		"react/react-in-jsx-scope": "off",
		"jsx-a11y/anchor-is-valid": "off",
		"@typescript-eslint/explicit-module-boundary-types": "off",
		"@typescript-eslint/no-unused-vars": ["error"],
		"prettier/prettier": ["error", {}, { usePrettierrc: true }],
	},
};
