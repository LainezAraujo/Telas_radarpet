var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();

// third party from /node_modules into /vendor
gulp.task('vendor', function(){
	// Materialize
	gulp.src(['./node_modules/materialize-css/sass/**/*'])
	.pipe(gulp.dest('./vendor/materialize-css/sass'));

	gulp.src(['./node_modules/materialize-css/dist/js/*'])
	.pipe(gulp.dest('./vendor/materialize-css/js'));
});


gulp.task('materialize', ['materialize:min'], function(){
	gulp.src(['./vendor/materialize-css/sass/**/*.scss'])
	.pipe(sass.sync({outputStyle: 'expanded'}))
	.pipe(gulp.dest('./vendor/materialize-css/css'))
	.pipe(browserSync.stream());
});

gulp.task('materialize:min',function(){
	return gulp.src(['./vendor/materialize-css/css/*.css', '!./vendor/materialize-css/css/*.min.css'])
	.pipe(rename({
		suffix: '.min'
	}))
	.pipe(cleanCSS())
	.pipe(gulp.dest('./vendor/materialize-css/css'))
	.pipe(browserSync.stream());
})

gulp.task('sass', ['css:min'], function(){
	gulp.src(['./sass/**/*.scss'])
	.pipe(sass.sync({outputStyle: 'expanded'}))
	.pipe(gulp.dest('./css'))
	.pipe(browserSync.stream());
});


gulp.task('css:min',function(){
	return gulp.src(['./css/*.css', '!./css/*.min.css'])
	.pipe(rename({
		suffix: '.min'
	}))
	.pipe(cleanCSS())
	.pipe(gulp.dest('./css'))
	.pipe(browserSync.stream());
});

gulp.task('browserSync', function(){
	browserSync.init({
		server: {baserDir: "./"}
	});
});

gulp.task('dev', ['sass', 'materialize', 'browserSync'], function(){
	gulp.watch('./vendor/materialize-css/sass/**/*.scss', ['materialize']);
	gulp.watch('./sass/**/*.scss', ['sass']);
	gulp.watch('./*.html', browserSync.reload);
});

