/**
 * Created by appian on 2017/4/12.
 */
var sass         = require('gulp-sass');
var gulp         = require('gulp');
var postcss      = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var precss       = require('precss');
var cssnano      = require('cssnano');
var sourcemaps   = require('gulp-sourcemaps');
var fs           = require('fs');
var browserSync  = require('browser-sync').create();
var px2rem = require('gulp-px2rem-plugin')
var reload       = browserSync.reload;

gulp.task('serve', ['scssToCss'], function () {
	browserSync.init({
		server: "./"
	});
	gulp.watch("./client/scss/*.scss", ['scssToCss']).on('change', reload);
	gulp.watch("./client/js/*.js").on('change', reload);
	gulp.watch("./client/views/*.html").on('change', reload);
});

var process = [
	autoprefixer({ browsers: ['last 2 version', 'safari 5', 'opera 12.1', 'ios 6', 'android 4', '> 10%'] }),
	precss,
	// cssnano
];

gulp.task('scssToCss', function () {
	return gulp.src(['./client/scss/*.scss'])
	.pipe(sourcemaps.init())
	.pipe(sass().on('error', sass.logError))
	.pipe(postcss(process))
	// .pipe(sourcemaps.write('.'))
	.pipe(px2rem({'width_design':750,'valid_num':6,'pieces':10,'ignore_px':[1,2],'ignore_selector':['.class1']}))
	.pipe(gulp.dest('./client/css/'))
	.pipe(browserSync.reload({ stream: true }));
});
gulp.task('default', ['serve']); //默认任务
