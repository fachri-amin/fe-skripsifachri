"use strict";

const path = require("path");
const loaders = require("./webpack/loaders");
const plugins = require("./webpack/plugins");

const applicationEntries =
  process.env.NODE_ENV === "development"
    ? ["webpack-hot-middleware/client?reload=true"]
    : [];

const mainEntry =
  process.env.NODE_ENV === "development"
    ? "./src/sample/index.tsx"
    : "./src/lib/index.tsx";

module.exports = {
  entry: [mainEntry].concat(applicationEntries),

  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js",
    publicPath: "/",
    sourceMapFilename: "[name].js.map",
    chunkFilename: "[id].chunk.js",
  },

  devtool:
    process.env.NODE_ENV === "production" ? "source-map" : "inline-source-map",

  resolve: {
    root: path.resolve("./src"),
    extensions: ["", ".webpack.js", ".web.js", ".tsx", ".ts", ".js", ".json"],
  },

  plugins: plugins,

  devServer: {
    historyApiFallback: { index: "/" },
  },

  module: {
    preLoaders: [loaders.tslint],
    loaders: [
      loaders.tsx,
      loaders.html,
      loaders.css,
      loaders.scss,
      loaders.eot,
      loaders.svg,
      loaders.ttf,
      loaders.woff,
      loaders.json,
      {
        test: /\.png$/,
        loader: "url-loader",
        query: { mimetype: "image/png" },
      },
    ],
  },

  externals: {
    "react/lib/ReactContext": "window",
    "react/lib/ExecutionEnvironment": true,
    "react/addons": true,
  },
};
