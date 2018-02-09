import gulp from 'gulp';
import babel from 'gulp-babel';
import clean from 'gulp-clean';
import nodemon from 'gulp-nodemon';
import runSequence from 'run-sequence';
import env from 'gulp-env';
import gutil from 'gulp-util';

gulp.task('env:prod', () => {
    env.set({ NODE_ENV: 'production' })
});

gulp.task('env:ci', () => {
    env.set({ NODE_ENV: 'ci' })
});

gulp.task('env:dev', () => {
    env.set({ NODE_ENV: 'development' })
});

const paths = {
    source: ['./server/**/*.js'],
    dest: './dist',
    static: './static',
};

/**
 * compile es6/es7 code to es5
 */
gulp.task('babel', () => {
    let stream = gulp.src(paths.source);
    return stream.pipe(babel())
        .on('error', gutil.log)
        .pipe(gulp.dest(paths.dest));
});

/**
 * watch the source code and re-compile
 */
gulp.task('watch', ['babel'], () => {
    return gulp.watch(paths.source, ['babel']);
});

/**
 * clean the compiled code and api doc
 */
gulp.task('clean', function () {
    return gulp.src([paths.dest, paths.static], { read: false })
        .pipe(clean({ force: true }));
});

/**
 * build prod package
 */
gulp.task('prod', (cb)=> {
    runSequence('clean', 'babel', cb);
});

/**
 * build package
 */
gulp.task('build', (cb)=> {
    runSequence('clean', 'babel', cb);
});

const nodemonOptions = {
    script: 'dist',
    ext: 'js',
    env: { 'NODE_ENV': 'development' },
    verbose: false,
    ignore: [],
    watch: ['dist/*']
};

gulp.task('default', ['watch'], function () {
    nodemon(nodemonOptions)
        .on('restart', function () {
            console.log('server restarted!')
        });
});
