var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();
var headerfooter = require('gulp-headerfooter');

// third party from /node_modules into /vendor
gulp.task('vendor', function(done){
	// Materialize
	gulp.src(['./node_modules/materialize-css/sass/**/*'])
	.pipe(gulp.dest('./vendor/materialize-css/sass'));

	gulp.src(['./node_modules/materialize-css/dist/js/*'])
	.pipe(gulp.dest('./vendor/materialize-css/js'))
	return done();
});


gulp.task('materialize', function(done){
	gulp.src(['./vendor/materialize-css/sass/**/*.scss'])
	.pipe(sass.sync({outputStyle: 'expanded'}))
	.pipe(gulp.dest('./vendor/materialize-css/css'))
	.pipe(browserSync.stream())
	return done();
});

gulp.task('materialize:min', function(){
	return gulp.src(['./vendor/materialize-css/css/*.css', '!./vendor/materialize-css/css/*.min.css'])
	.pipe(rename({
		suffix: '.min'
	}))
	.pipe(cleanCSS())
	.pipe(gulp.dest('./vendor/materialize-css/css'))
	.pipe(browserSync.stream());
})


gulp.task('css:compile', function(done){
	gulp.src(['./sass/**/*.scss'])
	.pipe(sass.sync({outputStyle: 'expanded'}))
	.pipe(gulp.dest('./css'))
	.pipe(browserSync.stream())
	return done();
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

gulp.task('partials', function (done) {
    gulp.src(['./partials/*.html', '!./partials/_header.html', '!./partials/_footer.html'])
        .pipe(headerfooter.header('./partials/_header.html'))
        .pipe(headerfooter.footer('./partials/_footer.html'))
        .pipe(gulp.dest('./'))
        .pipe(browserSync.stream())
        return done();
});

gulp.task('browserSync', function(){
	browserSync.init({
		server: {baserDir: "./"}
	});
});

gulp.task('dev', gulp.series('partials', 'css:compile', 'css:min', 'materialize', 'materialize:min', 'browserSync'), function(){
	gulp.watch('./vendor/materialize-css/sass/**/*.scss', gulp.series('materialize'));
	gulp.watch('./sass/**/*.scss', gulp.series('sass'));
	gulp.watch('./partials/*.html', gulp.series('partials'));
	gulp.watch('./*.html', browserSync.reload);
});


gulp.task('default',
	gulp.series('vendor', 'materialize', 'partials', 'materialize:min', 'css:compile', 'css:min'),
);

