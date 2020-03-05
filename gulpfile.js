const { parallel,searies, task, src, dest, watch } = require('gulp');

const uglify = require('gulp-uglify'), // 压缩js文件
    sass = require('gulp-sass'), // 编译sass
    cleanCSS = require('gulp-clean-css'), // 压缩css文件
    rename = require('gulp-rename'); // 文件重命名

task('scripts', function(cb){
    src('dev/js/index.js')
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(dest('assets/js'));
    cb()
});

task('sass', function(cb){
    src('dev/sass/app.scss')
        .pipe(sass())
        .pipe(dest('assets/css'))
        .pipe(cleanCSS())
        .pipe(rename({suffix: '.min'}))
        .pipe(dest('assets/css'));
    cb()
});

task('watch', function(cb){
    watch('dev/sass/*.scss', ['sass']);
    watch('dev/js/*.js', ['scripts']);
    cb()
});


exports.default = parallel('scripts', 'sass');