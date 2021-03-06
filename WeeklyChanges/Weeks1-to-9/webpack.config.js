const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./application.tsx",
    output: {
        filename: "[chunkhash].js",
        path: __dirname + "/dist",
        publicPath: "/assets"
    },
    devtool: "source-map",
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
                use: [ "file-loader" ]
            }
        ]
    },
    plugins: [
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
        })
    ],
    devServer: {
        contentBase: "./dist",
        compress: true,
        host: "0.0.0.0",
        port: 3003,
        historyApiFallback: true
    }
}