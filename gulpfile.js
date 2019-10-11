const { series, parallel, watch, src, dest } = require('gulp');
var browserSync = require('browser-sync').create();
var sass  =  require('gulp-sass');


function sassTask (cb) {
    src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'])
    .pipe(sass())
    .pipe(dest("src/css"))
    .pipe(browserSync.stream());
    
    cb();
};

function jsTask (cb) {
    src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 
                     'node_modules/jquery/dist/jquery.min.js', 
                     'node_modules/popper.js/dist/umd/popper.min.js'])
    .pipe(dest("src/js"))
    .pipe(browserSync.stream());
    
    cb();
};

function defaultTask(cb) {
    browserSync.init({
        server: {
            baseDir: "./src"
        }
    });

    watch(['node_modules/bootstrap/scss/*.scss', 'src/scss/*.scss'], sassTask);
    watch("*.html").on('change', browserSync.reload);

    cb();
}

exports.default = series(parallel(jsTask, sassTask), defaultTask);
