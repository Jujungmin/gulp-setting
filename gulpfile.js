const { src, dest, series, parallel, watch } = require('gulp');
const del = require('del');
const fileInclude = require('gulp-file-include');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));
const soruceMaps = require('gulp-sourcemaps');


// PC 작업용 폴더 파일 path
const pathPc = {
  scss: 'src/pc/css/*.scss',
  js: 'src/pc/js/*.js',
  html: 'src/pc/html/*.html'
}

// dist 폴더 정리
function clean() {
  return del(['dist']);
}

function buildStatus() {
  return src([
    'src/status.html',
  ])
  .pipe(dest('dist'))
  .pipe(browserSync.stream())
}

function commonCss() {
  return src([
    'src/common/css/**/*.css',
  ])
  .pipe(dest('dist/common/css'))
  .pipe(browserSync.stream())
}

function commonJs() {
  return src([
    'src/common/js/**/*.js'
  ])
  .pipe(uglify({
    mangle: false,
    compress: { drop_console: false },
    output: {
      comments: 'some',
      beautify: false
    },
  }))
  .pipe(dest('dist/common/js'))
  .pipe(browserSync.stream())
}

function buildStyle() {
  return src([
    pathPc.scss,
    // 'src/pc/css/**/*.css'
  ])
  .pipe(soruceMaps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(concat('pc-common.css'))
  .pipe(soruceMaps.write())
  .pipe(dest('dist/pc/css'))
  .pipe(browserSync.stream())
}

function buildHtml() {
  return src([
    pathPc.html,
    // 'src/pc/html/include/*.html'
  ])
  .pipe(fileInclude({
      prefix: '@@',
    }))
  .pipe(dest('dist/pc/html'))
  .pipe(browserSync.stream())
}

function buildScript() {
  return src(pathPc.js)
  .pipe(uglify({
    mangle: false,
    compress: { drop_console: false },
    output: {
      comments: 'some',
      beautify: false
    },
  }))
  .pipe(concat('pc-common.js'))
  .pipe(dest('dist/pc/js'))
  .pipe(browserSync.stream())
}

function setBrowserSync() {
  browserSync.init({
    server: {
      baseDir: './dist', // 서버 루트 디렉토리
      index: 'status.html'
    },
    port: 3000,
    open: true,
  })
}

function fileWatch() {
  watch('src/status.html', buildStatus);
  watch('src/common/css/*.css', commonCss);
  watch('src/common/js/**/*.js', commonJs);
  watch(pathPc.scss, buildStyle);
  watch(pathPc.html, buildHtml);
  watch(pathPc.js, buildScript);
}

exports.default = series(
  clean,
  parallel(buildStatus, commonCss, commonJs, buildStyle, buildHtml, buildScript),
  parallel(setBrowserSync, fileWatch)
)