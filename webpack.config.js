const path = require('path');
const UglifyJSPligin = require('uglifyjs-webpack-plugin');


module.export = {
    entry: ['./js/src/app.js'],
    output: {
        filename: './js/src/app.js',
        path: path.resolve(__dirname)
    },
    module: {
        rules: [
            {
                test:/\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        preset: ['babel-preset-env']
                    }
                }
            }
        ]
    },
    optimization: {
        minimizer: [
            //enable the js minification plugin
            new UglifyJSPligin({
                cache: true,
                parallel: true
            })
        ]
    }
};