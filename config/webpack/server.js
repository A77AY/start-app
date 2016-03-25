import webpack from 'webpack'
import path from 'path'
import fs from 'fs'

var isDevelopment = process.env.NODE_ENV !== 'production';

var nodeModules = fs.readdirSync('node_modules')
    .filter(function (x) {
        return ['.bin'].indexOf(x) === -1;
    });

var root = path.resolve(__dirname, '../../');

module.exports = {
    devtool: isDevelopment ? 'cheap-module-eval-source-map' : 'source-map',
    debug: isDevelopment,
    entry: [
        'webpack/hot/signal.js',
        './src/server.js'
    ],
    target: 'node',
    output: {
        path: path.join(root, 'build'),
        filename: 'server.js'
    },
    node: {
        __dirname: true,
        __filename: true
    },
    externals: [
        function (context, request, callback) {
            var pathStart = request.split('/')[0];
            if (nodeModules.indexOf(pathStart) >= 0 && request != 'webpack/hot/signal.js') {
                return callback(null, "commonjs " + request);
            }
            callback();
        }
    ],
    recordsPath: path.join(root, 'build/_records'),
    plugins: [
        new webpack.IgnorePlugin(/\.(css|less)$/),
        new webpack.BannerPlugin({banner: 'require("source-map-support").install();', raw: true, entryOnly: false}),
        new webpack.HotModuleReplacementPlugin({quiet: true})
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: ['monkey-hot?sourceType=module', 'babel']
            }
        ]
    }
};