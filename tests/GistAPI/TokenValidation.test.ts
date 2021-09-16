import GistAPI from "@libs/GistAPI";
import "jest";

const xit = process.env.TESTING_GITHUB_TOKEN ? it : it.skip;

describe("GistAPI: token validation", () => {
	expect.assertions(1);

	it("invalid token should return false", () => {
		const wrapper = new GistAPI("token_that_should_not_be_correct");
		return expect(wrapper.validateToken()).resolves.toEqual(false);
	});

	xit("valid token should return true", () => {
		const wrapper = new GistAPI(process.env.TESTING_GITHUB_TOKEN || "");
		return expect(wrapper.validateToken()).resolves.toEqual(true);
	});
});
