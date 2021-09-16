import { Gist } from "@typings/api/Gist";

export const filterGistsByName = (gist: Gist, name: string) => {
	const queryName = name.toLowerCase();
	return gist.description.toLowerCase().includes(queryName);
};

export const filterGistsByFileName = (gist: Gist, filename: string) => {
	const queryName = filename.toLowerCase();
	return Object.keys(gist.files).some((key) => {
		const file = gist.files[key];
		return file.filename.toLowerCase().includes(queryName);
	});
};
