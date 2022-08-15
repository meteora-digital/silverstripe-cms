// Import `src` and `dest` from gulp for use in the task.
const { src, dest } = require('gulp');

// Import Gulp plugins.
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass')(require('sass'));

// Concat SCSS
function scss() {
  return src('source/styles/**/*.scss')
    .pipe(plumber())
    .pipe(concat('index.scss'))
    .pipe(dest('./dist/styles'));
}

// Sass task
function css() {
  return src('source/styles/**/*.scss')
    .pipe(plumber())
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(concat('index.css'))
    .pipe(dest('dist/styles'));
}

// JavaScript task
function js() {
  return src('source/scripts/**/*.js')
    .pipe(plumber())
    .pipe(concat('index.js'))
    .pipe(babel(), {
      presets: ['@babel/preset-env']
    })
    .pipe(dest('dist/scripts'));
}

exports.default = function(done) {
  js();
  css();
  scss();
  done();
}

// // Gulp 4 uses exported objects as its tasks. Here we only have a
// // single export that represents the default gulp task.
// exports.default = function(done) {
//   // Compile the scripts
//   const scripts = src('source/scripts/**/*.js')
//     .pipe(plumber())
//     .pipe(babel(), {
//       presets: ['@babel/preset-env']
//     })
//     .pipe(dest('dist/scripts'));

//   // Compile the styles
//   const styles = src('source/styles/**/*.scss')
//     .pipe(plumber())
//     .pipe(sass())
//     .pipe(dest('dist/styles'));

//   // Return a merged stream to handle both tasks
//   return merge(scripts, styles);
// };
