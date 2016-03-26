import {parallel, series, task} from 'gulp'
import {log, colors} from 'gulp-util'
import requireDir from 'require-dir'

requireDir('./tasks');

log(colors.green(`Enviroment: ${process.env.NODE_ENV}`));

task('default', series(parallel('server:clear', 'app:index,routes'), parallel('server:watch', 'client:watch')));