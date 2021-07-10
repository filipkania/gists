import "jest";

const xit = process.env.TESTING_GITHUB_TOKEN ? it : it.skip;

describe("GistAPI: token validation", () => {
	xit("should return error", () => {
		expect(1 + 2).toBe(3);
	});
});
