var gulp = require('gulp');
var gutil = require('gulp-util');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('browserify', function(){
  gulp.src('src/js/main.js')
    .pipe(browserify({transform: 'reactify'}))
    .on('error', function(err){
      gutil.beep();
      gutil.log(gutil.colors.red('Error'), err.message);
    })
    .pipe(concat('main.js'))
    //.pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('copy', function(){
  gulp.src('src/index.html')
    .pipe(gulp.dest('dist'));
});

gulp.task('default',['browserify', 'copy', 'watch']);

gulp.task('watch', function(){
  gulp.watch('src/**/*.*', ['browserify', 'copy']);
})