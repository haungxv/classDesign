const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const htmlPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDev = process.env.NODE_ENV === "development";

const config = {
    mode: process.env.NODE_ENV || "production",
    target: 'web',
    entry: path.join(__dirname, 'index.js'),
    output: {
        filename: "bundle.[hash:8].js",
        path: path.join(__dirname, 'classDesign'),
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.(ttf|eot|svg|woff|woff2)$/,
                use: 'url-loader'
            },
            {
                test: /\.vue$/,
                use: 'vue-loader'
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new htmlPlugin({
            template: path.join(__dirname, 'index.html')
        })
    ]
}

if (isDev) {
    config.devServer = {
        port: '8002',
        host: '0.0.0.0',
        overlay: {
            errors: true
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
            'css-loader'
        ]
    });
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin()
    )

} else {
    config.entry = {
        app: path.join(__dirname, 'index.js')
    };
    config.output = {
        filename: "[name].[chunkhash:8].js",
        path: path.join(__dirname, 'classDesign'),
        publicPath: "/"
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
            filename: 'styles/[name].[contenthash:8].css'
        })
    );
    config.optimization = {
        splitChunks: {
            chunks: 'all'
        },
        runtimeChunk: true
    }

}

module.exports = config;