import gulp from 'gulp';
import autoprefixer from 'gulp-autoprefixer';
import browserSync from 'browser-sync';
import del from 'del';
import plumber from 'gulp-plumber';
import sass from 'gulp-sass';
import {stream as wiredep} from 'wiredep';

const reload = browserSync.reload;

// Compile & autoprefix scss files
gulp.task('styles', () => {
	return gulp.src('app/assets/styles/main.scss')
		.pipe(plumber())
		.pipe(sass.sync({
			outputStyle: 'expanded',
			precision: 10,
			includePaths: ['.']
		})).on('error', sass.logError)
		.pipe(autoprefixer())
		.pipe(gulp.dest('.tmp/assets/styles'))
		.pipe(reload({stream: true}));
});

// Wire Bower dependencies
gulp.task('wiredep', () => {
	return gulp.src('app/*.html')
		.pipe(wiredep())
		.pipe(gulp.dest('app'));
});

// Clean .tmp directory
gulp.task('clean', () => {
	return del('.tmp/**');
});

// Run a development server with browsersync
gulp.task('serve', ['styles', 'wiredep'], () => {
	browserSync({
		server: {
			baseDir: ['.tmp', 'app'],
			routes: {
				'/bower_components': 'bower_components'
			}
		}
	});

	// watch for changes
	gulp.watch([
		'app/*.html',
		'app/scripts/**/*.js',
		'app/images/**/*'
	]).on('change', reload);

	gulp.watch('app/assets/styles/**/*.scss', ['styles']);
	gulp.watch('bower.json', ['wiredep']);
});

gulp.task('default', ['serve']);
