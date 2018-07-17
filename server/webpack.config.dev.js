var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './client/index.js',
    output: {
        path: __dirname + '/server/public',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: [  'babel-loader' ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './server/index.html',
            inject: "body"
        })
    ]

}