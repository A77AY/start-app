import webpack from 'webpack'
import path from 'path'
import fs from 'fs'
import {server as serverBabelConfig} from '../babel'
import config from '../app'

const nodeModules = fs.readdirSync(path.join(config.root, 'node_modules'))
    .filter(x => {
        return ['.bin', '_', '.tmp'].indexOf(x) === -1;
    });

export default {
    debug: config.isDevelopment,
    devtool: config.isDevelopment ? '#cheap-module-eval-source-map' : '#source-map',
    entry: {
        server: [
            'webpack/hot/signal.js',
            './src/server.jsx'
        ]
    },
    target: 'node',
    output: {
        path: config.structure.build.path,
        filename: '[name].js'
    },
    node: {
        __dirname: true,
        __filename: true
    },
    externals: [
        function (context, request, cb) {
            if (nodeModules.indexOf(request.split('/')[0]) >= 0 && request != 'webpack/hot/signal.js') return cb(null, "commonjs " + request);
            cb();
        }
    ],
    recordsPath: path.join(config.structure.build.path, '_records'),
    plugins: [
        new webpack.IgnorePlugin(/\.(css|less)$/),
        new webpack.BannerPlugin('require("source-map-support").install();', {raw: true, entryOnly: false}),
        new webpack.HotModuleReplacementPlugin({quiet: true})
    ],
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loaders: ['monkey-hot?sourceType=module', 'babel?' + JSON.stringify(serverBabelConfig)],
                //exclude: /node_modules/,
                include: [config.structure.src.path, config.structure.config.path, path.join(config.root, 'node_modules/_')]
            }
        ]
    }
};