var gulp = require('gulp');
var sass = require('gulp-sass');
// var cleanCSS = require('gulp-clean-css');
// var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();

// third party from /node_modules into /vendor
gulp.task('vendor', function(){
	// Materialize
	gulp.src(['./node_modules/materialize-css/sass/**/*'])
	.pipe(gulp.dest('./vendor/materialize-css/sass'));

	gulp.src(['./node_modules/materialize-css/dist/js/*'])
	.pipe(gulp.dest('./vendor/materialize-css/js'));
});

gulp.task('browserSync', function(){
	browserSync.init({
		server: {baserDir: "./"}
	});
});

gulp.task('sass', function(){
	gulp.src(['./vendor/materialize-css/sass/**/*.scss'])
	.pipe(sass.sync({outputStyle: 'expanded'}))
	.pipe(gulp.dest('./vendor/materialize-css/css'))
	.pipe(browserSync.stream());
});

gulp.task('dev', ['sass', 'browserSync'], function(){
	gulp.watch('./vendor/materialize-css/sass/**/*.scss', ['sass']);
	gulp.watch('./*.html', browserSync.reload);
});

