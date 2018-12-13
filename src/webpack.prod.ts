import * as webpack from "webpack";
const merge = require("webpack-merge");
const common = require("./webpack.config");

const prodConfig: webpack.Configuration = {
    mode: "production"
};

module.exports = merge(common, prodConfig);
