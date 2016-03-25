import {task} from 'gulp'
import {log, colors} from 'gulp-util'
import del from 'del'
import webpack from 'webpack'
import nodemon from 'nodemon'
import path from 'path'
import serverWebpackConfig from '../config/webpack/server'
import nodemonConfig from '../config/nodemon'
import config from '../config/app'

task('server:clear', (done) => {
    return del([
        path.join(config.structure.build.path, '*'),
        '!' + path.join(config.structure.build.path, 'server.js')
    ], {force: true});
});

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
            nodemon(nodemonConfig).on('restart', () => {
                log(colors.blue('Server code patched'));
            });
        } else {
            nodemon.restart();
        }
    });
});