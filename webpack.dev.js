/**
 * @Author: harsha
 * @Date:   2019-06-11T23:26:30+05:30
 * @Last modified by:   harsha
 * @Last modified time: 2019-06-13T20:05:10+05:30
 */

const path = require("path");
const merge = require("webpack-merge");
const webpack = require("webpack");

const base = require("./webpack.base.js");

module.exports = merge(base, {
  mode: "development",
  devtool: "source-map",
  plugins: [new webpack.HotModuleReplacementPlugin()],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    hot: true,
    compress: true
  }
});
