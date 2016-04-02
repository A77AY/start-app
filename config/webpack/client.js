import webpack from 'webpack'
import path from 'path'
import {client as clientBabelConfig} from '../babel'
import config from '../app'

const serverUrl = 'http://localhost:8888';

export default {
    devtool: config.isDevelopment ? '#cheap-module-eval-source-map' : '#source-map',
    debug: config.isDevelopment,
    entry: {
        client: [
            'eventsource-polyfill', // for hot reloading with IE
            'webpack-dev-server/client?' + serverUrl,
            'webpack/hot/only-dev-server',
            './src/client.jsx'
        ]
    },
    output: {
        path: config.structure.public.path,
        publicPath: serverUrl + '/',
        filename: '[name].js'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            IS_SERVER: false,
            IS_CLIENT: true
        }),
        new webpack.NormalModuleReplacementPlugin(
            /.*\.server\..*/g,
            (res) => {
                const file = path.parse(res.resource);
                const name = file.name.split('.');
                name[name.length - 1] = 'client';
                res.resource = path.join(file.dir, name.join('.') + file.ext);
            }
        )
    ],
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loaders: ['babel?' + JSON.stringify(clientBabelConfig)],
                //exclude: /node_modules/,
                include: [config.structure.src.path, config.structure.config.path, path.join(config.root, 'node_modules/_')]
            },
            {
                test: /\.css$/,
                loaders: [
                    'style?sourceMap',
                    'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]'
                ],
                exclude: /node_modules/
            }
        ]
    },
    devServer: {
        publicPath: serverUrl + '/',
        noInfo: true,
        hot: true,
        stats: {
            colors: true
        }
    }
};
