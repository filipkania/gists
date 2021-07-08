module.exports = {
	"**/*.(j|t)s?(x)": (filenames) => `yarn lint ${filenames.join(" ")}`,
};
