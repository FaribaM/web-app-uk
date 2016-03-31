/***
 *
 * AAT GulpJS file v.0.6
 *
 * @author : Mark Rushton <mark@modernfidelity.co.uk>
 *
 * @type {*|exports|module.exports}
 *
 */

'use strict';

// Include Gulp
var gulp = require('gulp');

// Include Plugins
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var jsdoc = require('gulp-jsdoc3');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var Server = require('karma').Server;
var addStream = require('add-stream');
var angularTemplateCache = require('gulp-angular-templatecache');
var minifyCSS = require('gulp-minify-css');
var minifyHTML = require('gulp-minify-html');
var sourcemaps = require('gulp-sourcemaps');
var gzip = require('gulp-gzip');

// Build Destination
var dest = 'build';

// Vendor JS files
var vendorJsFiles = [
  'src/client/app/bower_components/angular/angular.js',
  'src/client/app/bower_components/angular-route/angular-route.js',
  'src/client/app/bower_components/angular-animate/angular-animate.js',
  'src/client/app/bower_components/angular-sanitize/angular-sanitize.js',
  'src/client/app/bower_components/angular-jwt/dist/angular-jwt.js',
  'src/client/app/bower_components/a0-angular-storage/dist/angular-storage.js',
  //'app/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',

  'src/client/app/bower_components/api-check/dist/api-check.js',
  'src/client/app/bower_components/angular-formly/dist/formly.js',
  'src/client/app/bower_components/angular-formly-templates-bootstrap/dist/angular-formly-templates-bootstrap.js'

  //'app/bower_components/slick-carousel/slick/slick.js',
  //'app/bower_components/angular-slick/dist/slick.js',

];

// Source JS files
var customJsFiles = [

  // SHARED
  //'app/site/shared/shared.js',

  //'app/site/shared/directives/component/component.js',
  //
  //'app/site/shared/directives/mobile-menu/mobile-menu.js',
  //'app/site/shared/directives/search-bar/search-bar.js',
  //'app/site/shared/meta/meta.js',
  //
  //'app/site/shared/directives/menu/menu.js',
  //'app/site/shared/directives/landing-page/landing-page.js',
  //
  //'app/site/shared/directives/hero/hero.js',
  //'app/site/shared/directives/steps/steps.js',
  //'app/site/shared/directives/campaign-cta/campaign-cta.js',
  //'app/site/shared/directives/secondary-cta/secondary-cta.js',
  //'app/site/shared/directives/html/html.js',
  //'app/site/shared/directives/social/social.js',
  //'app/site/shared/directives/image/image.js',
  //'app/site/shared/directives/module/module.js',
  //'app/site/shared/directives/slideshow/slideshow.js',
  //'app/site/shared/directives/spotlights/spotlights.js',
  //'app/site/shared/directives/title/title.js',
  //
  //'app/site/shared/directives/404/404.js',

  // CUSTOM
  'src/client/app/components/frontpage/frontpage.js',
  //'app/site/components/bookmarks/bookmarks.js',
  //'app/site/components/auth/auth.js',
  //'app/site/components/news/news.js',
  //'app/site/components/about/about.js',
  //'app/site/components/dashboard/dashboard.js',
  //'app/site/components/contact/contact.js',
  //'app/site/components/login/login.js',
  //'app/site/components/user/user.js',

  // MAIN
  'src/client/app/app.js'
];

var sourceJsFiles = vendorJsFiles.concat(customJsFiles);

// Source SCSS files
var sassFiles = [
  './src/client/app/sass/app.scss'
];

// Compile CSS from SCSS files
gulp.task('css', function() {
  return gulp
    .src([
      './src/client/app/sass/app.scss'
    ])
    .pipe(sass().on('error', sass.logError))
    .pipe(minifyCSS())
    .pipe(sourcemaps.write('source-maps'))
    .pipe(rename('build.css'))
    .pipe(gulp.dest(dest + '/css'));
});

// Concatenate/Uglify JS Files
gulp.task('scripts', ['css'], function() {
  return gulp
    .src(sourceJsFiles)
    //.pipe(sourcemaps.write('.map'))
    .pipe(addStream.obj(prepareTemplates()))
    .pipe(concat('build.js'))
    //.pipe(rename({suffix: '.min'}))
    //.pipe(uglify())
    .pipe(gulp.dest(dest + '/js'));

});

// Linting
gulp.task('lint', [], function() {
  return gulp
    .src(customJsFiles)
    .pipe(jshint())
    .pipe(jshint.reporter('default', {verbose: true}));
});

// Code styling
gulp.task('style', ['scripts', 'css', 'docs', 'lint'], function() {
  return gulp
    .src(customJsFiles)
    .pipe(jscs())
    .pipe(jscs.reporter());
});

// HTML
gulp.task('html', function() {
  var opts = {
    conditionals: true,
    spare: true
  };
  return gulp
    .src('./app/index.html')
    //.pipe(minifyHTML(opts))
    .pipe(rename('index.html'))
    .pipe(gulp.dest('./build/'));
});


/// Documentation (JSDoc)
gulp.task('docs', ['scripts'], function(callback) {
  gulp
    .src(
      ['README.md'].concat(customJsFiles)
      , {read: false})
    .pipe(jsdoc(callback));
});



// Angular Template Cache
function prepareTemplates() {
  return gulp
    .src([
      './src/client/app/**/*.tpl.html'
    ])
    .pipe(angularTemplateCache());
}


// WATCHERS
gulp.task('watch', function() {

  gulp.watch([
      './src/client/app/sass/**/*.scss',
      './src/client/app/shared/directives/**/*.scss'
    ],
    ['css']
  );

  gulp.watch([
    './src/client/app/components/**/*.js',
    './src/client/app/shared/**/*.js',
    './src/client/app/app.js'
  ], ['lint', 'style', 'docs', 'scripts']);

  gulp.watch('./src/client/app/**/*.tpl.html', ['lint', 'style', 'docs', 'scripts']);

  gulp.watch(['./src/client/app/index.html'], ['html']);

});

// Default
gulp.task('default', [
  'scripts', 'css', 'lint', 'style', 'docs', 'html', 'watch'
]);

// @todo : deployment task
