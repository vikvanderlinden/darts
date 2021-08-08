const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
    plugins: [
        new MiniCssExtractPlugin(),
        new VueLoaderPlugin()
    ],
    mode: process.env.NODE_ENV,
    watch: process.env.NODE_ENV === "development",
    entry: './src/js/index.js',
    output: {
        filename: 'main.js',
        path: (process.env.NODE_ENV === "production") ?
            path.resolve(__dirname, 'docs') :
            path.resolve(__dirname, 'dist'),
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            '@': path.resolve('./src/js')
        },
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.vue$/,
                use: ['vue-loader']
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
