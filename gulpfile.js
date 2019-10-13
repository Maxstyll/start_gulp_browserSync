const { series, parallel, watch, src, dest } = require('gulp');
var browserSync = require('browser-sync').create();
var sass  =  require('gulp-sass');


function sassTask (cb) {
    src(['node_modules/bootstrap/scss/bootstrap.scss','node_modules/font-awesome/scss/font-awesome.scss', 'public/scss/*.scss'])
    .pipe(sass())
    .pipe(dest("./public/css"))
    .pipe(browserSync.stream());
    
    cb();
};

function jsTask (cb) {
    src(['node_modules/bootstrap/dist/js/bootstrap.js', 
                     'node_modules/jquery/dist/jquery.js', 
                     'node_modules/popper.js/dist/umd/popper.js'])
    .pipe(dest("./public/js"))
    .pipe(browserSync.stream());
    
    cb();
};

function fontsTask (cb) {
    src(['node_modules/font-awesome/fonts/*.*'])
    .pipe(dest("./public/fonts"))
    .pipe(browserSync.stream());

    cb();
};

function defaultTask(cb) {
    browserSync.init({
        server: {
            baseDir: "./public"
        }
    });

    watch(['node_modules/bootstrap/scss/*.scss', 'node_modules/font-awesome/scss/*.scss', 'public/scss/*.scss'], sassTask);
    watch("./public/*.html").on('change', browserSync.reload);

    cb();
}

exports.default = series(parallel(fontsTask, jsTask, sassTask), defaultTask);
