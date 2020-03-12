let path = require('path');
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let conf = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, './dist/'),
        filename: 'main-page.js'
    },
    devtool: 'source-map',
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'styles.css',
        }),
        new HtmlWebpackPlugin({
            template: 'src/html/index.pug'
        }),
        new HtmlWebpackPlugin({
            filename: "boston/index.html",
            template: 'src/html/work/boston-ru.pug'
        }),
        new HtmlWebpackPlugin({
            filename: "art-guide/index.html",
            template: 'src/html/work/art-guide-ru.pug'
        }),
        new HtmlWebpackPlugin({
            filename: "chloe/index.html",
            template: 'src/html/work/chloe-ru.pug'
        }),
        new HtmlWebpackPlugin({
            filename: "info/index.html",
            template: 'src/html/info.pug'
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.(s|)css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: process.env.NODE_ENV === 'development',
                        }
                    },
                    "css-loader", // translates CSS into CommonJS
                    {
                        loader: "resolve-url-loader"
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                            sourceMapContents: false
                        }
                    }
                ]
            },
            {
                test: /\.(pug|jade)$/,
                loader: 'pug-loader',
                options: {
                    pretty: true
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                exclude: [
                    path.resolve(__dirname, 'src/fonts')
                ],
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            outputPath: 'img',
                            name: '[name][hash].[ext]',
                            limit: 10
                        },
                    },
                ],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'font',
                            name: '[name].[ext]',
                        },
                    },
                ]
            }
        ]
    },
    resolve: {
        alias: {
            src: path.join(__dirname, 'src'),
            pug: path.resolve(__dirname, 'src/html'),
            img: path.resolve(__dirname, 'src/img'),
            style: path.resolve(__dirname, 'src/scss')
        },
        extensions: [
            ".sass",
            ".scss",
            ".css",
            ".wasm",
            ".web.js",
            ".mjs",
            ".js",
            ".json",
            ".web.jsx",
            ".jsx"
        ],
    },
    devServer: {
        contentBase: "./dist"
    }
};

module.exports = conf;