import * as webpack from "webpack";
import * as webpackDevServer from "webpack-dev-server";
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

const webpackConfig: webpack.Configuration = {
    entry: "./application.tsx",
    output: {
        filename: "[hash].js",
        path: __dirname + "/build",
        publicPath: "./"
    },
    resolve: { extensions: [".ts", ".tsx", ".js", ".json"] },
    module: {
        rules: [
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
            { test: /\.css$/, use: [{ loader: MiniCssExtractPlugin.loader }, "css-loader" ] },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: "file-loader",
                    options: {
                        name: "[name].[ext]",
                        outputPath: "fonts/"
                    }
                }]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [{
                    loader: "file-loader",
                    options: {
                        outputPath: "images/"
                    }
                }]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(["build"]),
        new webpack.ProvidePlugin({
            "React": "react",
            "ReactDOM": "react-dom",
        }),
        new MiniCssExtractPlugin({
            filename: "[contenthash].css",
        }),
        new HtmlWebpackPlugin({
            inject: false,
            hash: true,
            template: "./public/index.html",
            filename: "index.html"
        }),
    ]
}

module.exports = webpackConfig;
