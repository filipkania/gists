import { filterGistsByFileName, filterGistsByName } from "@libs/filteringFunctions";
import "jest";

describe("Filters", () => {
	it("filter gists by file name", () => {
		expect.assertions(2);

		const gist = {
			files: {
				"test.sh": {
					filename: "test.sh",
				},
			},
		} as any;

		expect(filterGistsByFileName(gist, "test.sh")).toEqual(true);
		expect(filterGistsByFileName(gist, "file_that_doesnt_exist")).toEqual(false);
	});

	it("filter gists by gist description", () => {
		expect.assertions(2);

		const gist = {
			description: "some gist that should've exist",
		} as any;

		expect(filterGistsByName(gist, "exist")).toEqual(true);
		expect(filterGistsByName(gist, "chicken")).toEqual(false);
	});
});
