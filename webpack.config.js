const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const replace = require("buffer-replace");
const { v4: uuidv4 } = require('uuid');

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
        new CopyPlugin({
            patterns: [
                {
                    from: "./src/js/service-worker.js",
                    to: "service-worker.js",
                    transform(content, _) {
                        return replace(content, "--VERSION_PLACEHOLDER--", uuidv4());
                    }
                }
            ]
        }),
    ],
    mode: process.env.NODE_ENV,
    watch: process.env.NODE_ENV === "development",
    entry: "./src/js/index",
    output: {
        filename: (process.env.NODE_ENV === "production") ? "main.js?[contenthash]" : "main.js",
        path: path.resolve(__dirname, "build"),
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
        alias: {
            '@': path.resolve("./src/js"),
            vue: "vue/dist/vue.esm-bundler.js"
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
