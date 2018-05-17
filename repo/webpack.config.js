const path = require("path")
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry: "./src/app.jsx",
    output: {
        filename: "bundle.js",
        path: path.resolve('dist'),
        publicPath: '/dist/'
    },
    resolve:{
        alias:{
            page:path.resolve('src/page'),
            components:path.resolve('src/components'),
            util:path.resolve('src/util'),
            service:path.resolve('src/service')
        }
    },
    module: {
        rules: [{
            test: /\.(js|jsx)?$/,
            exclude: /(node_modules)/,
            use: 'babel-loader',
        }, {
            test: /\.css$/,
            use: ExtractTextWebpackPlugin.extract({
                fallback: 'style-loader',
                use: 'css-loader'
            })
        }, {
            test: /\.(jpe?g|jpg|png|gif)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 8192,
                    outputPath: "images/"
                }
            }]
        }, {
            test: /\.(html|htm)$/,
            use: 'html-withimg-loader'
        }]
    },
    plugins: [
        new ExtractTextWebpackPlugin("css/style.css"),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template:'./src/index.html',
            hash:'true',
            favicon:"./favicon.ico"
        })
    ],
    devServer: {
        contentBase:"./dist",
        historyApiFallback: true,
        hot: true,
        open: true,
        port: 8086,
        proxy:{
            "/manage":{
                target:"http://admintest.happymmall.com",
                changeOrigin:true
            },
            '/user/logout.do' : {
                target: 'http://admintest.happymmall.com',
                changeOrigin : true
            }
        }
    },
    mode: "development"
}