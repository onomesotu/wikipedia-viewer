const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

gulp.task('sass', function(){
	gulp.src('sass/main.sass')
		.pipe(sass())
		.pipe(gulp.dest('css'))
		.pipe(browserSync.reload({
			stream: true
		}));
});

gulp.task('browser-sync', function(){
	browserSync.init({
		server: {
			baseDir: "wikipedia-viewer"
		}
	});
});

gulp.task('watch',['browserSync', 'sass'] function(){
	gulp.watch('sass/main.sass', ['sass']);
	gulp.watch('js/main.js', browserSync.reload);
	gulp.watch('index.html', browserSync.reload);
});