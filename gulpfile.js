var gulp    = require('gulp'),
    plumber = require('gulp-plumber'),
    rimraf  = require('rimraf'),
    imageop = require('gulp-image-optimization'),
    connect = require('gulp-connect'),
    jade    = require('gulp-jade'),
    sass    = require('gulp-ruby-sass');

// Clean dist folder
gulp.task('clean', function (cb) {
    rimraf('dist/', cb);
});

gulp.task('jade', function(){
    gulp.src('src/templates/*.jade')
        .pipe(plumber())
        .pipe(jade({pretty: true}))
        .pipe(gulp.dest('dist/'))
        .pipe(connect.reload());
});

gulp.task('sass', function(){
    gulp.src('src/styles/app.scss')
        .pipe(plumber())
        .pipe(sass({
            sourcemapPath: 'src/styles'
        }))
        .pipe(gulp.dest('dist/css'))
        .pipe(connect.reload());
});

// Images
gulp.task('images', function() {
    gulp.src('src/images/**/**')
        .pipe(imageop({
            optimizationLevel: 5,
            progressive: true,
            interlaced: true
        }))
        .pipe(gulp.dest('dist/img/'));
});

gulp.task('server', function(){
    connect.server({
        root: 'dist',
        port: 8000,
        livereload: true
    })
})

gulp.task('dist',['images','jade','sass'], function(){

})

gulp.task('watch', ['dist'], function(){
    gulp.watch('src/templates/**/*.jade', ['jade'])
    gulp.watch('src/styles/**/*.scss', ['sass'])
});

gulp.task('default', ['server','watch']);