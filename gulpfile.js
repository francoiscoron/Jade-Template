var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    jade = require('gulp-jade'),
    sass = require('gulp-ruby-sass');

gulp.task('jade', function(){
    gulp.src('templates/*.jade')
        .pipe(plumber())
        .pipe(jade({pretty: true}))
        .pipe(gulp.dest(''));
});

gulp.task('sass', function(){
    gulp.src('stylesheets/sass/app.scss')
        .pipe(plumber())
        .pipe(sass({
            sourcemapPath: '../sass',
            sourcemap: true
        }))
        .pipe(gulp.dest('stylesheets/css'));
});

gulp.task('watch', ['jade','sass'], function(){
    gulp.watch('templates/**/*.jade', ['jade'])
    gulp.watch('stylesheets/**/*.scss', ['sass'])
});