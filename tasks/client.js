import {task} from 'gulp'
import {log, colors} from 'gulp-util'
import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import clientWebpackConfig from '../config/webpack/client'

task('client:watch', () => {
    const webpackCompiler = webpack(clientWebpackConfig);
    const webpackDevServer = new WebpackDevServer(webpackCompiler, clientWebpackConfig.devServer);
    const [host, port] = clientWebpackConfig.devServer.publicPath.split('/')[2].split(':');
    return webpackDevServer.listen(port, host, (err, result) => {
        if (err) console.log(err);
        log(colors.blue(`Client code HRM run on ${clientWebpackConfig.devServer.publicPath}`));
    });
});