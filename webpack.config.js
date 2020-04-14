const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports = {
    entry: ['babel-polyfill','./src/client/index.jsx'],
    output: {
        path: __dirname + '/www',
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.json$/,
                use: 'json-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            }
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json']
    },
    plugins: [
        new HtmlWebpackPlugin({template: __dirname + '/index.html'}),
        //  new CleanWebpackPlugin(['dist']),
        new CleanWebpackPlugin(),
    ],
    devtool: 'inline-source-map',
    devServer: {
        proxy: {
            "/api": {
                target: "http://localhost:3000",
                pathRewrite: {"^/api" : ""}
            }
        }
    },
}
