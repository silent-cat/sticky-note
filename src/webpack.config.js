const webpack = require("webpack");
const path = require("path");

module.exports = {
  mode: "development",
  entry: path.join(__dirname, "js/app/index.js"),
  output: {
    path: path.join(__dirname, "../public/js"),
    filename: "index.js",
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  // 重命名
  resolve: {
    alias: {
      jquery: path.join(__dirname, "js/libs/jquery.min.js"),
    },
  },
};
