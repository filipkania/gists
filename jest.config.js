module.exports = {
	roots: ["tests/"],
	setupFiles: ["dotenv/config"],
	moduleNameMapper: {
		"@libs/(.*)": "<rootDir>/lib/$1",
	},
};
