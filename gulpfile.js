const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const cleanCSS = require('gulp-clean-css');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

function transpileAndCompress() {
  return gulp.src('src/*.js')
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
}

function minifyCSS() {
  return gulp.src('src/*.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist/css'));
}

function sync() {
  browserSync.init({
    server: {
      baseDir: "./dist"
    }
  });
}

function copyHTML() {
  return gulp.src('index.html')
    .pipe(gulp.dest('dist'));
}

exports.default = function() {
  gulp.watch('src/*.css', minifyCSS);
  gulp.watch('src/*.js', transpileAndCompress);
  gulp.watch('index.html', copyHTML);
  minifyCSS();
  transpileAndCompress();
  copyHTML();
  sync();
};