var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');

var scssFiles = 'view/assets/scss/**/*.scss';
var cssDest = 'view/css';

var sassDevOptions = {
  outputStyle: 'expanded'
}

var sassProdOptions = {
  outputStyle: 'compressed'
}

gulp.task('sassdev', function() {
  return gulp.src(scssFiles)
    .pipe(sass(sassDevOptions).on('error', sass.logError))
    .pipe(gulp.dest(cssDest));
});

gulp.task('sassprod', function() {
  return gulp.src(scssFiles)
    .pipe(sass(sassProdOptions).on('error', sass.logError))
    .pipe(rename('main.min.css'))
    .pipe(gulp.dest(cssDest));
});


gulp.task('watch', function() {
  gulp.watch(scssFiles, ['sassdev']);
});



gulp.task('default', ['sassdev', 'watch']);