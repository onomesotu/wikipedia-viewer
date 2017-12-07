const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

gulp.task('sass', function(){
	gulp.src('./sass/*.+(sass|scss)')
		.pipe(sass())
		.pipe(gulp.dest('./css'))
		.pipe(browserSync.reload({
			stream: true
		}));
});

gulp.task('browserSync', function(){
	browserSync.init({
		server: {
			baseDir: "./"
		}
	});
});

gulp.task('start',['browserSync', 'sass'], function(){
	gulp.watch('./sass/*.+(sass|scss)', ['sass']);
	gulp.watch('./js/main.js', browserSync.reload);
	gulp.watch('index.html', browserSync.reload);
});