// 1. Install theme with _sassify
// 2. cd to theme folder
// 3. run 'npm init' --> proceed through prompt
// 4. run 'npm install gulp gulp-sass gulp-sourcemaps browser-sync --save-dev'
// 5. Update projectURL below to Local by Flywheel Project URL
// 6. Add style.min.css support to functions.php
// 7. Visual Studio Code pre-setup to add vendor prefixes and minify css

const projectURL = 'localhost:10028'; // Local by Flywheel Project URL

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync').create();


function style(){
    return gulp.src('sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass()).on('error', sass.logError)
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('.'))
    .pipe(browserSync.stream());
}


function watch() {
    browserSync.init({
        proxy: projectURL,
        open: 'true',
    });
    gulp.watch('sass/**/*.scss', style),
    gulp.watch('sass/**/*.scss').on('change',browserSync.reload);
    gulp.watch('*.php').on('change', browserSync.reload);
    gulp.watch('templates/*.php').on('change', browserSync.reload);
    gulp.watch('template-parts/*.php').on('change', browserSync.reload);
}


exports.style = style;
exports.watch = watch;