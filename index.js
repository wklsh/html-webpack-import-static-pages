const fs = require("fs");
const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");

class HtmlWebpackImportStaticPages {
	constructor(options) {
		const { blacklist = [], chunkAssign = {}, path = null } = options || {};
		this.options = {
			blacklist,
			chunkAssign,
			path
		};
	}

	apply(compiler) {
		const sourcePath = path.resolve(this.options.path || compiler.context);

		// Obtain all files within the source folder, and generate an array
		fs.readdirSync(sourcePath)
			// Filter through and compare with the blacklist
			.filter(
				(fileName) => fileName.endsWith(".html") && this.options.blacklist.indexOf(fileName.split(".html")[0]) == -1
			)
			// Run through each of the array item
			.map((pluginArrItem) => {
				// Alias for chunking
				let toChunk;

				// Loop through every item of [this.options.chunkAssign]
				Object.keys(this.options.chunkAssign).forEach((item) => {
					// If current item matches current fileName inside Map func,
					// It means there are chunks specified inside the plugin settings to be included along with the HTML file.
					// Update alias with the arrays for HtmlWebPackPlugin to include as chunk
					if (pluginArrItem.split(".html")[0] == item) {
						toChunk = this.options.chunkAssign[item];
					}
				});

				// Call HtmlWebPackPlugin for every fileName map item
				new HtmlWebPackPlugin({
					template: path.join(sourcePath, pluginArrItem),
					filename: pluginArrItem,
					inject: "body",
					chunksSortMode: "none",
					chunks: toChunk
				}).apply(compiler);
			});
	}
}

module.exports = HtmlWebpackImportStaticPages;
