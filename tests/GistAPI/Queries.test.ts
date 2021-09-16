import GistAPI from "@libs/GistAPI";
import { User } from "@typings/api/User";
import { AxiosError, AxiosResponse } from "axios";
import "jest";

const xit = process.env.TESTING_GITHUB_TOKEN ? it : it.skip;

describe("GistAPI: queries", () => {
	expect.assertions(1);

	it("should throw error with wrong token", () => {
		const wrapper = new GistAPI("token_that_should_not_be_correct");

		return wrapper.getUser().catch((err: AxiosError) => {
			expect(err.response?.status).toBe(401);
		});
	});

	xit("should return data with valid token", () => {
		const wrapper = new GistAPI(process.env.TESTING_GITHUB_TOKEN || "");

		return wrapper.getUser().then((res: AxiosResponse<User>) => {
			expect(res.data.name).not.toBeUndefined();
		});
	});
});
