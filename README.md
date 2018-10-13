# HTML webpack import static HTML pages

Dynamically import static HTML pages for HTMLWebpack plugin without having to manually specify every path within your project.

This is an extension to the [webpack](http://webpack.github.io) plugin [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin).

## Installation

```
npm install -D html-webpack-import-static-pages
```

Plugin requires [webpack](http://webpack.github.io) (v4 or higher), and [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin) (v4 or higher - installed as a dependency).

## Basic Usage

```jsx
const HtmlWebpackImportStaticPages = require("html-webpack-import-static-pages");

module.exports = {
	entry: {
		app: path.resolve(__dirname, "src/js/index.js"),
		landing: path.resolve(__dirname, "src/js/views/landing/page-landing.js"),
	},
}

...

plugins: [
    new HtmlWebpackImportStaticPages({
		path: path.resolve(__dirname, 'dev/html'),
        blacklist: ['HTMLPageToBlacklist'],
        chunkAssign: {
            HTMLPageName: ['app', 'landing']
        }
    }),

...
]
```

## Configuration

- `path`: A path to search for `.html` files - Defaults to `webpack.context/src`
- `blacklist`: Accepts HTML file names - HTML pages specified here would not be generated via HTMLWebpackPlugin
- `chunkAssign`: Accepts HTML file names and chunk array - Assign chunks to be included into specific HTML pages

## Version

v1.1.x

- Added custom paths

v1.0.x

- initial release
