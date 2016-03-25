import gulp, {task} from 'gulp'
import gutil, {log, colors} from 'gulp-util'
import path from 'path'
import webpack from 'webpack'
import nodemon from 'nodemon'

import serverWebpackConfig from '../config/webpack/server'

task('server:watch', (done) => {
    let firstRun = true;
    let firedDone = false;
    webpack(serverWebpackConfig).watch(100, (err, stats) => {
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
                log(colors.blue('server patched'));
            });
        } else {
            nodemon.restart();
        }
    });
});

