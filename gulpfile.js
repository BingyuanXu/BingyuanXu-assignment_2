const gulp = require('gulp');
const { parallel } = require('gulp');
const browserSync = require('browser-sync').create();
const cleanCSS = require('gulp-clean-css');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

function transpileAndCompress(cb) {
  gulp.src('src/*.js')
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))

  cb();
}

function minifyCSS(cb) {
  gulp.src('src/*.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist/css'));

  cb();
}

function sync(cb) {
  browserSync.init({
    server: {
      baseDir: "./dist"
    }
  });

  cb();
}

function copyHTML(cb) {
  gulp.src('index.html')
    .pipe(gulp.dest('dist'));

  cb();
}

function watch() {
  gulp.watch('src/*.css', minifyCSS);
  gulp.watch('src/*.js', transpileAndCompress);
  gulp.watch('index.html', copyHTML);
}

exports.default = parallel(
  watch,
  minifyCSS,
  transpileAndCompress,
  copyHTML,
  sync
)