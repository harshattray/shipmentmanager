/**
 * @Author: harsha
 * @Date:   2019-06-11T23:26:30+05:30
 * @Last modified by:   harsha
 * @Last modified time: 2019-06-13T20:05:05+05:30
 */

const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const autoprefixer = require("autoprefixer");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[hash].bundle.js",
    publicPath: "/"
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html"
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
    })
  ],
  optimization: {
    splitChunks: {
      name: true,
      cacheGroups: {
        markers: {
          chunks: "all",
          test: /[\\/]node_modules[\\/]/,
          priority: 1
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          "babel-loader",
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/react"],
              plugins: ["@babel/plugin-proposal-class-properties"]
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              plugins: () => [autoprefixer]
            }
          },
          "sass-loader"
        ]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: "url-loader",
            options: {}
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/,
        use: ["url-loader?limit=100000"]
      }
    ]
  },
  devServer: {
    historyApiFallback: true
  },
  resolve: {
    modules: ["node_modules", path.join("test"), path.join("src")],
    extensions: ["*", ".js", ".jsx"]
  }
};
