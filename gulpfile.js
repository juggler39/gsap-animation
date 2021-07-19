const { src, dest, watch, series, parallel } = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-dart-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');

function browsersyncServe(cb) {
    browserSync.init({
        server: {
            baseDir: './app/',
        },
    });
    cb();
}

function watchTask() {
    watch(['./app/*.html']).on('change', browserSync.reload);
    watch(['./app/scss/*.scss']).on(
        'change',
        series(sassTask, browserSync.reload)
    );
    watch(['./app/src/js/*.js']).on(
        'change',
        series(jsTask, browserSync.reload)
    );
}

function typeScript() {
    return tsProject
        .src()
        .pipe(tsProject())
        .js.pipe(webpackStream(webpackConfig))
        .pipe(dest('./app/build/'));
}

function jsTask() {
    return src('./app/src/js/*.js')
        .pipe(webpackStream(webpackConfig))
        .pipe(dest('./app/build/js/'));
}

function sassTask() {
    return src('./app/scss/**/*.scss')
        .pipe(
            plumber({
                errorHandler: notify.onError(function (err) {
                    return {
                        title: 'Styles',
                        sound: false,
                        message: err.message,
                    };
                }),
            })
        )
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(sourcemaps.init())
        .pipe(dest('./app/css/'));
}

exports.default = parallel(browsersyncServe, watchTask, sassTask);
exports.typeScript = typeScript;
exports.js = jsTask;
