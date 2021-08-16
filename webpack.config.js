const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    plugins: [
        new MiniCssExtractPlugin({
            filename: (process.env.NODE_ENV === "production") ? "main.css?[contenthash]" : "main.css",
        }),
        new VueLoaderPlugin(),
        new WebpackManifestPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "./src/html/index.html"),
        }),
    ],
    mode: process.env.NODE_ENV,
    watch: process.env.NODE_ENV === "development",
    entry: './src/js/index',
    output: {
        filename: (process.env.NODE_ENV === "production") ? "main.js?[contenthash]" : "main.js",
        path: path.resolve(__dirname, "build"),
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
        alias: {
            '@': path.resolve("./src/js")
        },
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.vue$/,
                use: ["vue-loader"]
            },
            {
                test: /\.css$/i,
                include: path.resolve(__dirname, 'src'),
                use: [
                    MiniCssExtractPlugin.loader,
                    { loader: "css-loader", options: { importLoaders: 1 } },
                    "postcss-loader"
                ],
            },
            {
                test: /\.html$/,
                loader: "raw-loader"
            }
        ],
    },
};
