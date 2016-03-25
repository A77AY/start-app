import {parallel, series, task} from 'gulp'
import {log, colors} from 'gulp-util'
import requireDir from 'require-dir'

requireDir('./tasks');

log('Enviroment:', colors.green(process.env.NODE_ENV));

task('default', series('server:clear', 'server:watch'));