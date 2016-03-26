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
    del([path.join(config.structure.build.path, '*')], {force: true});
    log(colors.yellow('Old build files is removed'));
    done();
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