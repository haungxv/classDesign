const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


const isDev = process.env.NODE_ENV === 'development';

const config = {
    mode: process.env.NODE_ENV || "production",
    target: 'web',
    entry: path.join(__dirname, 'index.js'),
    output: {
        filename: 'bundle.[hash:8].js',
        path: path.join(__dirname, 'OA'),
        publicPath: "/"
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    "style-loader",//将js字符串生成为style节点
                    "css-loader",//将css转化成CommonJs模块
                    "sass-loader",//将sass编译成css
                ]
            },
            {
                test: /\.(ttf|eot|svg|woff|woff2)$/,
                use: 'url-loader'
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024,
                            name: '[name].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlPlugin({
            template: path.join(__dirname, 'template.html')
        }),
        // new webpack.DefinePlugin({
        //     'process.env': {
        //         NODE_ENV: isDev ? '"development"' : 'production'
        //     }
        // }),
    ],
};

if (isDev) {
    config.devServer = {
        port: '8083',
        host: '0.0.0.0',
        overlay: {
            errors: true,
        },
        historyApiFallback: {
            index: '/index.html'
        },
        hot: true,
    };
    config.module.rules.push({
        test: /\.css$/,
        use: [
            'style-loader',
            'css-loader',
        ]
    });
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
    );
} else {
    config.entry = {
        app: path.join(__dirname, 'index.js'),
    };
    config.output = {
        filename: '[name].[chunkhash:8].js',
        path: path.join(__dirname, 'OA'),
        publicPath: '/'
    };
    config.module.rules.push({
        test: /\.css$/,
        use: [
            {
                loader: MiniCssExtractPlugin.loader,
                options: {
                    publicPath: '../'
                }
            },
            "css-loader"
        ]
    });
    config.plugins.push(
        new MiniCssExtractPlugin({
            filename: "styles/[name].[contenthash:8].css",
            // chunkFilename: "[id].css"
        }),
    );
    config.optimization = {
        splitChunks: {
            chunks: 'all'
        },
        runtimeChunk: true
    };
    // config.externals = {
    //     'vue': 'Vue',
    //     'vue-router': 'VueRouter',
    //     'vuex': 'Vuex',
    //     'axios': 'axios'
    // }
}

module.exports = config;