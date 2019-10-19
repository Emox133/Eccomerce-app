const path = require('path');

module.exports = {
    entry: ['babel-polyfill','./src/js/app.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: './js/bundle.js'
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000
      },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    }
};