const path = require("path");
const WebExtWebpackPlugin = require("@ianwalter/web-ext-webpack-plugin");

module.exports = {
  // No need for uglification etc.
  mode: "development",
  devtool: "source-map",
  module: {
    rules: [
      { test: /\.ts$/, use: "ts-loader", exclude: /node_modules/ },
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  entry: {
    background: path.resolve(path.dirname(__filename), "./src/background.ts"),
    content: path.resolve(path.dirname(__filename), "./src/content.ts"),
  },
  plugins: [
    new WebExtWebpackPlugin({
      browserConsole: true,
      startUrl: ["https://www.girlgeniusonline.com/comic.php?date=20021104"],
      sourceDir: path.resolve(path.dirname(__filename), "./"),
    }),
  ],
  output: {
    path: path.resolve(path.dirname(__filename), "build"),
    filename: "[name].js",
  },
};
