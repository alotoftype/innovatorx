const path = require('path');
const UglifyJSPligin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractWebpackPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const NonJsEntryCleanupPlugin = require('./non-js-entry-cleanup-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const { context, entry, devtool, outputFolder, publicFolder } = require('./config');
const HMR = require('./hmr');
const getPublicPath = require('./publicPath');


const sass_loader = {
    test: /\.(sa|sc|c)ss$/,
    //exclude: /node_modules/,
    use: [
        ...(dev ? [{ loader: 'cache-loader' },
            { loader: 'style-loader', options: { soureMap: dev } }
        ] : [MiniCssExtractWebpackPlugin.loader]),
        { loader: 'css-loader', options: { sourceMap: dev } },
        { loader: 'postcss-loader', options: { ident: 'postcss', soureMap: dev, config: { ctx: { dev } } } },
        { loader: 'resove-url-loader', options: { sourceMap: dev } },
        { loader: 'sass-loader', options: { sourceMap: true, sourceMapContents: dev } }
    ]
};

const js_loader = {
    test: /\.js$/,
    exclude: /node_modules/,
    use: [
        ...(dev ? [{ loader: 'cache-loader' }] : []),
        { loader: 'babel-loader' }
    ]
}
const file_loader = {
    test: /\.(ttf|otf|eot|woff2?|png| jpe?g|gif|svg|ico|mp4|webm)$/,
    use: [{
        loader: 'file-loader',
        options: {
            name: '[path][name].[ext]',
        }
    }]
}


module.export = (options) => {
    const { dev } = options;
    const hmr = HMR.getClient();

    return {
        mode: dev ? 'development' : 'production',
        devtool: dev ? devtool : false,
        context: path.resolve(context),
        entry: {
            'styles/main': dev ? [hmr, entry.styles] : entry.styles,
            'scripts/main': dev ? [hmr, entry.scripts] : entry.scripts
        },
        output: {
            path: path.resolve(outputfolder),
            publicPath: getPublicPath(publicFolder),
            filename: '[name].js'
        },
        modules: {
            rules: [js_loader, sass_loader, file_loader]
        },
        plugins: [
            ...(dev ? [new webpack.HotModuleReplacementPlugin(), new FriendlyErrorsWebpackPlugin()] :
                [new MiniCssExtractWebpackPlugin({ filename: '[name].css' }),
                    new NonJsEntryCleanupPlugin({
                        context: 'styles',
                        extension: 'js',
                        includeSubfolders: true
                    }),
                    new CopyWebpackPlugin([path.resolve(outputFolder)], { allowExternal: true, beforeEmit: true }),
                    new CopyWebpackPlugin([{
                        from: path.resolve(`${context}/**/*`),
                        to: path.resolve(outputFolder),
                    }], {
                        ignore: ['*.js', '*.scss', '*css']
                    })
                ]
            )
        ]

    }
};