import {task} from 'gulp'
import {log, colors} from 'gulp-util'
import webpack from 'webpack'
import nodemon from 'nodemon'

import serverWebpackConfig from '../config/webpack/server'
import nodemonConfig from '../config/nodemon'

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
                log(colors.blue('server patched'));
            });
        } else {
            nodemon.restart();
        }
    });
});