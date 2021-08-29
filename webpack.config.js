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
            filename: 'styles.[hash].css',
        }),
        new HtmlWebpackPlugin({
            template: 'src/html/index.pug'
        }),
        new HtmlWebpackPlugin({
            filename: "ru/index.html",
            template: 'src/html/ru/index.pug'
        }),
        new HtmlWebpackPlugin({
            filename: "ru/boston.html",
            template: 'src/html/ru/work/boston-ru.pug'
        }),
        new HtmlWebpackPlugin({
            filename: "ru/art-guide.html",
            template: 'src/html/ru/work/art-guide-ru.pug'
        }),
        new HtmlWebpackPlugin({
            filename: "ru/chloe.html",
            template: 'src/html/ru/work/chloe-ru.pug'
        }),
        new HtmlWebpackPlugin({
            filename: "ru/info.html",
            template: 'src/html/ru/info.pug'
        }),
        new HtmlWebpackPlugin({
            filename: "ru/unique.html",
            template: 'src/html/ru/work/unique-ru.pug'
        }),
        new HtmlWebpackPlugin({
            filename: "ru/jcb.html",
            template: 'src/html/ru/work/jcb-ru.pug'
        }),
        new HtmlWebpackPlugin({
            filename: "en/unique.html",
            template: 'src/html/en/work/unique-ru.pug'
        }),
        new HtmlWebpackPlugin({
            filename: "en/index.html",
            template: 'src/html/en/index.pug'
        }),
        new HtmlWebpackPlugin({
            filename: "en/boston.html",
            template: 'src/html/en/work/boston-ru.pug'
        }),
        new HtmlWebpackPlugin({
            filename: "en/art-guide.html",
            template: 'src/html/en/work/art-guide-ru.pug'
        }),
        new HtmlWebpackPlugin({
            filename: "en/chloe.html",
            template: 'src/html/en/work/chloe-ru.pug'
        }),
        new HtmlWebpackPlugin({
            filename: "en/info.html",
            template: 'src/html/en/info.pug'
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
                            name: '[name].[hash].[ext]',
                            publicPath: '/images/',
                            outputPath: 'images/',
                            limit: 20
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
            style: path.resolve(__dirname, 'src/scss'),
            "animation.gsap": path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js'),
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
