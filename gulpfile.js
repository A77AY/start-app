import gulp, {parallel, series} from 'gulp'
import path from 'path'
import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import nodemon from 'nodemon'

import serverWebpackConfig from './config/webpack/server'

gulp.task('watch', function (done) {
    var firstRun = true;
    var firedDone = false;
    webpack(serverWebpackConfig).watch(100, function (err, stats) {
        if (!firedDone) {
            firedDone = true;
            done();
        }
        if (firstRun) {
            firstRun = false;
            nodemon({
                execMap: {
                    js: 'node'
                },
                script: path.join(serverWebpackConfig.output.path, 'server.js'),
                ignore: ['*'],
                watch: ['foo/'],
                ext: 'noop'
            }).on('restart', function () {
                console.log('server patched');
            });
            console.log('watch: server');
        } else {
            nodemon.restart();
        }
    });
});

gulp.task('default', series('watch'));