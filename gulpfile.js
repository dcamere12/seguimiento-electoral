'use strict';

let gulp = require("gulp");
let pug = require("gulp-pug");
let sass = require("gulp-sass");
let concat = require("gulp-concat");
let autoprefixer = require('gulp-autoprefixer');
let browserSync = require("browser-sync").create();
let minify = require("gulp-babel-minify");
let babel = require("gulp-babel");
const reload = browserSync.reload;

const path = {
    data: ['source/data/*.*'],
    pug: ['source/templates/*.pug'],
    pugall: ['source/templates/**/*.pug'],
    sass: ['source/styles/**/*.scss'],
    jsbase: ['source/scripts/base.js', 'source/scripts/components/*.js'],
    jslibs: ['source/scripts/libs/*.js'],
    jssections: ['source/scripts/*.js', '!source/scripts/base.js'],
    images: ['source/images/**/*.*'],
    fonts: ['source/fonts/*.*'],
    manifest: ['source/manifest.json'],
    sw: ['source/sw.js'],
    app: 'app/',
    production: 'prod/',
};

const AUTOPREFIXER_BROWSERS = [
    'last 2 version'
];

// Tarea que procesa el archivo manifest.json
gulp.task('manifest', () => {
    return gulp.src(path.manifest)
        .pipe(gulp.dest(path.app));
});

// Tarea que procesa el service worker sw.js
gulp.task('sw', () => {
    return gulp.src(path.sw)
        .pipe(gulp.dest(path.app));
});

// Tarea para generar los html
gulp.task('html', () => {
    return gulp.src(path.pug)
        .pipe(pug({ pretty: true }))
        .pipe(gulp.dest(path.app))
});

// Tarea que procesa los cambios en los .json
gulp.task('data', () => {
    return gulp.src(path.data)
        .pipe(gulp.dest(path.app + 'data'));
});

// Tarea para generar los css
gulp.task('sass', () => {
    return gulp.src(path.sass)
        .pipe(sass({
            outputStyle: 'expanded',
            indentWidth: 4,
            precision: 10
        }).on('error', sass.logError))
        .pipe(autoprefixer(AUTOPREFIXER_BROWSERS))
        .pipe(gulp.dest(path.app + 'styles'))
});

// Tarea que procesa los cambios en las imágenes
gulp.task('images', () => {
    return gulp.src(path.images)
        .pipe(gulp.dest(path.app + 'images'));
});

// Tarea que procesa los cambios en las fuentes
gulp.task('fonts', () => {
    return gulp.src(path.fonts)
        .pipe(gulp.dest(path.app + 'fonts'));
});

// Tarea para unir todos los componentes JS en base.js
gulp.task('js', () => {
    return gulp.src(path.jsbase)
        .pipe(babel())
        .pipe(concat('base.js'))
        .pipe(gulp.dest(path.app + 'scripts'))
});

// Tarea para unir todas las librerías JS en libs.js
gulp.task('libs', () => {
    return gulp.src(path.jslibs)
        .pipe(babel())
        .pipe(concat('libs.js'))
        .pipe(gulp.dest(path.app + 'scripts'))
});

// Tarea que procesa los cambios en los JS de cada sección
gulp.task('sections', () => {
    return gulp.src(path.jssections)
        .pipe(babel())
        .pipe(gulp.dest(path.app + 'scripts'))
});

// Static server
gulp.task('webserver', ['watch'], () => {
    browserSync.init({
        notify: false,
        server: {
            baseDir: "./app"
        }
    });
});

// Tarea para observar todos los cambios
gulp.task('watch', () => {
    gulp.watch(path.pugall, ['html', reload]);
    gulp.watch(path.data, ['data', reload]);
    gulp.watch(path.sass, ['sass', reload]);
    gulp.watch(path.images, ['images', reload]);
    gulp.watch(path.fonts, ['fonts', reload]);
    gulp.watch(path.jsbase, ['js', reload]);
    gulp.watch(path.jslibs, ['libs', reload]);
    gulp.watch(path.jssections, ['sections', reload]);
    gulp.watch(path.sw, ['sw', reload]);
});

/* ---------------------------------------
 *         TAREAS PARA PRODUCCION
 * ---------------------------------------*/

gulp.task('manifest:release', () => {
    return gulp.src(path.manifest)
        .pipe(gulp.dest(path.production));
});

gulp.task('sw:release', () => {
    return gulp.src(path.sw)
        .pipe(gulp.dest(path.production));
});

gulp.task('html:release', () => {
    return gulp.src(path.pug)
        .pipe(pug({ pretty: true }))
        .pipe(gulp.dest(path.production))
});

gulp.task('data:release', () => {
    return gulp.src(path.data)
        .pipe(gulp.dest(path.production + 'data'));
});

gulp.task('sass:release', () => {
    return gulp.src(path.sass)
        .pipe(sass({
            outputStyle: 'compressed',
            precision: 10
        }).on('error', sass.logError))
        .pipe(autoprefixer(AUTOPREFIXER_BROWSERS))
        .pipe(gulp.dest(path.production + 'styles'))
});

gulp.task('images:release', () => {
    return gulp.src(path.images)
        .pipe(gulp.dest(path.production + 'images'));
});

gulp.task('fonts:release', () => {
    return gulp.src(path.fonts)
        .pipe(gulp.dest(path.production + 'fonts'));
});

gulp.task('js:release', () => {
    return gulp.src(path.jsbase)
        .pipe(babel())
        .pipe(concat('base.js'))
        .pipe(minify({
            removeConsole: true
        }))
        .pipe(gulp.dest(path.production + 'scripts'))
});

gulp.task('libs:release', () => {
    return gulp.src(path.jslibs)
        .pipe(babel())
        .pipe(concat('libs.js'))
        .pipe(minify({
            removeConsole: true
        }))
        .pipe(gulp.dest(path.production + 'scripts'))
});

gulp.task('sections:release', () => {
    return gulp.src(path.jssections)
        .pipe(babel())
        .pipe(minify({
            removeConsole: true
        }))
        .pipe(gulp.dest(path.production + 'scripts'))
});


// Define gulp workflows
gulp.task('build', ['html', 'data', 'sass', 'images', 'fonts', 'js', 'libs', 'sections', 'manifest', 'sw']);
gulp.task('run', ['webserver', 'watch']);
gulp.task('release', ['html:release', 'data:release', 'sass:release', 'images:release', 'fonts:release', 'js:release', 'libs:release', 'sections:release', 'manifest:release', 'sw:release']);
