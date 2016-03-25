import gulp, {parallel, series} from 'gulp'
import requireDir from 'require-dir'

requireDir('./tasks');
gulp.task('default', series('server:watch'));