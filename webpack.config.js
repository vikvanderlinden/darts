const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
    plugins: [
        new MiniCssExtractPlugin(),
        new VueLoaderPlugin()
    ],
    mode: process.env.NODE_ENV,
    watch: true,
    entry: './src/js/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        alias: {
            '@': path.resolve('./src/js')
        }
    },
    module: {
        rules: [
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
