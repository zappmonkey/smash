var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
var cleanhtml = require('gulp-cleanhtml');

function js_dev() {
	return gulp.src(['./src/js/smash.js', './src/js/modules/**/*.js'])
		.pipe(sourcemaps.init())
		.pipe(concat('smash.js'))
		.pipe(uglify())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('./example/js'));
}

function sass_dev() {
	return gulp.src('./src/scss/smash.scss')
		// Initializes sourcemaps
		.pipe(sourcemaps.init())
		.pipe(sass({
			errLogToConsole: true
		}))
		.pipe(cssnano())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('./example/css'));
}

function js_dist() {
	return gulp.src(['./src/js/smash.js', './src/js/modules/**/*.js'])
		.pipe(concat('smash.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./dist/js'));
}

function sass_dist() {
	return gulp.src('./src/scss/smash.scss')
		// Initializes sourcemaps
		.pipe(sass({
			errLogToConsole: true
		}))
		.pipe(cssnano())
		.pipe(gulp.dest('./dist/css'));
}

// Generate file for distribution
gulp.task("dist", function() {
	// Setup the files
	sass_dist();
	js_dist();
});

// The Default task start go application and watches changes
gulp.task("default", function() {
	// Setup the files
	sass_dev();
	js_dev();

	// Start watching active development files
	gulp.watch(["./src/scss/**/*.{scss,sass}"]).on("change", function() { sass_dev(); });
	gulp.watch(["./src/js/**/*.js"]).on("change", function() { js_dev(); });
});
