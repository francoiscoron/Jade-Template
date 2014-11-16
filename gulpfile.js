var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    jade = require('gulp-jade'),
    sass = require('gulp-ruby-sass');

gulp.task('jade', function(){
    gulp.src('src/templates/*.jade')
        .pipe(plumber())
        .pipe(jade({pretty: true}))
        .pipe(gulp.dest('dist/'));
});

gulp.task('sass', function(){
    gulp.src('src/styles/app.scss')
        .pipe(plumber())
        .pipe(sass({
            sourcemapPath: '../sass',
            sourcemap: true
        }))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('default', ['jade','sass'], function(){});

gulp.task('watch', ['jade','sass'], function(){
    gulp.watch('src/templates/**/*.jade', ['jade'])
    gulp.watch('src/styles/**/*.scss', ['sass'])
});