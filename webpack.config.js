var path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve:{
        alias:{
            handlebars:'handlebars/dist/handlebars.min.js'
        }
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000
    },
    plugins: [
        // new HtmlwebpackPlugin({
        //     title: 'Webpack-demos',
        //     filename: 'index.html'
        // }),
        new OpenBrowserPlugin({
            url: 'http://localhost:9000'
        })
    ],
    module: {
        loaders: [
            {
                test: /\.scss$/,
                loader: 'style-loader!css-loader!autoprefixer-loader!sass-loader'
            },
            {
                test: /\.less$/,
                loader: 'style-loader!css-loader!autoprefixer-loader!less-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                loaders: [
                    'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
                    'image-webpack-loader'
                ]
            }
        ]
    }

}