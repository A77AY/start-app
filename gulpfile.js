var gulp = require('gulp');
var parallel = gulp.parallel;
var series = gulp.series;

var path = require('path');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var nodemon = require('nodemon');

var serverConfig = require('./server');


gulp.task('watch', function (done) {
    var firstRun = true;
    var firedDone = false;
    webpack(serverConfig).watch(100, function (err, stats) {
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
                script: path.join(serverConfig.output.path, 'server.js'),
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