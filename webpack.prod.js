/**
 * @Author: harsha
 * @Date:   2019-06-11T23:26:30+05:30
 * @Last modified by:   harsha
 * @Last modified time: 2019-06-13T20:05:18+05:30
 */

const merge = require("webpack-merge");
const base = require("./webpack.base.js");

module.exports = merge(base, {
  mode: "production"
});
