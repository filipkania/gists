import GistAPI from "@libs/GistAPI";
import "jest";

describe("GistAPI: values", () => {
	it("token should be accessible from outside of the class", () => {
		const token = "peanut_butter";
		const wrapper = new GistAPI(token);

		return expect(wrapper.token).toEqual(token);
	});

	it("client should have token in headers", () => {
		const token = "peanut_butter";
		const wrapper = new GistAPI(token);

		return expect(wrapper.client.defaults.headers.Authorization).toEqual(`token ${token}`);
	});
});
