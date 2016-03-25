import webpack from 'webpack'
import {client as clientBabelConfig} from '../babel'
import config from '../app'

const serverUrl = 'http://localhost:8000';

export default {
    devtool: config.isDevelopment ? 'cheap-module-eval-source-map' : 'source-map',
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
        new webpack.NoErrorsPlugin()
    ],
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loaders: ['babel?' + JSON.stringify(clientBabelConfig)],
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
