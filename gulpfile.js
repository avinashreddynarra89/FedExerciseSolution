var gulp = require('gulp'),
    gutil = require('gulp-util'),
    artifactoryUpload = require('gulp-artifactory-upload'),
    browserSync = require('browser-sync'),
    bump = require('gulp-bump'),
    compression = require('compression'),
    concat = require('gulp-concat'),
    fs = require('fs'),
    gzip = require('gulp-gzip'),
    jshint = require('gulp-jshint'),
    karma = require('karma').Server,
    minifyCss = require('gulp-minify-css'),
    ngHtml2Js = require("gulp-ng-html2js"),
    nodemon = require('gulp-nodemon'),
    reload = browserSync.reload,
    rename = require('gulp-rename'),
    replace = require('gulp-replace'),
    runSequence = require('run-sequence'),
    sass = require('gulp-sass'),
    shortid = require('shortid'),
    sourcemaps = require('gulp-sourcemaps'),
    tar = require('gulp-tar'),
    scaffolding = require('scaffolding-angular'),
    htmlhint = require("gulp-htmlhint"),
    sonar = require('gulp-sonar'),

    configLoc = './config/config.json',
    versionLoc = './config/version.json',
    versionJsLoc = './config/version.js',


    input = {
        'source_sass_all': 'source/app/**/*.css',
        'source_sass_main': 'source/app/**/*.css',
        'source_js': [
            
            'source/app/**/**/*.js'
        ],
//        'lib_css': 'source/lib/sass/**/*.scss',
//        'lib_js': 'source/lib/js/**/*.js',
//        'lib_np_js': 'source/lib/non-prod/**/*.js',
//        'lib_prod_js': 'source/lib/prod/**/*.js',
        'vendor_css': [
            'source/bower_components/components-font-awesome/css/font-awesome.min.css',
            'source/bower_components/open-sans-fontface/open-sans.css',
            'source/bower_components/nvd3/build/nv.d3.min.css',
            'source/bower_components/angular-material-data-table/dist/md-data-table.min.css',
            "source/bower_components/angular-bootstrap/ui-bootstrap.csp.css",
            "source/bower_components/bootstrap/dist/css/bootstrap.css"
        ],
        'vendor_js': [
                      "source/bower_components/jquery/dist/jquery.js",
            
            'source/bower_components/angular/angular.js',
            'source/bower_components/angular-material/angular-material.js',
            'source/bower_components/bootstrap/dist/js/bootstrap.js',
            "source/bower_components/angular-ui-router/release/angular-ui-router.js",
            "source/bower_components/angular-bootstrap/ui-bootstrap.js",
            "source/bower_components/angular-bootstrap/ui-bootstrap-tpls.js",
            'source/bower_components/angular-ui-router/release/angular-ui-router.js',
            'source/bower_components/angular-animate/angular-animate.js',
            'source/bower_components/angular-aria/angular-aria.js',
            'source/bower_components/angular-cookies/angular-cookies.js',
            'source/bower_components/moment/min/moment.js',
            'source/bower_components/angular-messages/angular-messages.js',
            'source/bower_components/angular-resource/angular-resource.js',
            'source/bower_components/d3/d3.js',
            'source/bower_components/angular-material-data-table/dist/md-data-table.js',
            'source/bower_components/innersvg-polyfill/innersvg.js'
        ],
        'html': 'source/app/**/*.html',
        'images': ['source/app/images/*'],
        'fonts': [
            'source/bower_components/open-sans-fontface/fonts/**/*',
            'source/bower_components/components-font-awesome/fonts/*',
            'source/bower_components/bootstrap/fonts/*',
            'source/fonts/**/*'
        ]
    },
    output = {
        'stylesheets': 'source/assets/css',
        'javascript': 'source/assets/js',
        'images': 'source/assets/images',
        'fonts': 'source/assets/fonts'
    },
    zipFiles = [
        "./**/*",
        "!./node_modules/**",
        "!./dist/**",
        "!./config/**",
        "!karma.conf.js",
        "!manifest.yml.template",
        "!public/ux-style-guide.html",
        ".cfignore",
        ".bowerrc",
        ".gitignore"
    ];

/* Start up browser syncing for local dev */
gulp.task('browser-sync', function () {
    browserSync({
        proxy: "localhost:3000", // local node app address
        port: 3001, // use *different* port than above
        notify: false,
        host: 'localhost',
        open: 'external',
        middleware: [compression()]
    });
});

function generateConfig() {
    var NODE_ENV = gutil.env.NODE_ENV;
    if (!NODE_ENV) gutil.env.NODE_ENV = NODE_ENV = "FedExerciseSolution";
    var configJson = fs.readFileSync(configLoc, 'utf8');
    configJson = JSON.parse(JSON.stringify(configJson));
    var appConfig = JSON.parse(configJson)[NODE_ENV];

    return appConfig;
}

/* Start up local dev server */
gulp.task('nodemon', function (cb) {
    var called = false;
    var appConfig = generateConfig();
    return nodemon({
        script: 'server.js',
        env: {
            'NODE_ENV': 'dev',
            'config': JSON.stringify(appConfig)
        },
        ignore: [
            'gulpfile.js',
            'node_modules/',
            'bower_components'
           //'public/assets/'
        ]
    })
        .on('start', function () {
            if (!called) {
                called = true;
                cb();
            }
        })
        .on('restart', function () {
            setTimeout(function () {
                reload({
                    stream: false
                });
            }, 1000);
        });
});

/* Run app javascript through jshint */
gulp.task('jshint', function () {
    return gulp.src(input.source_js)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

/* Executes all build tasks to build all source files */
gulp.task('build', function () {
    runSequence(
        'build-vendor-js',
        'build-vendor-css', ['build-source-js', 'build-source-sass', 'html2js', 'version', 'htmlhint']
    );
});

/* Compile css and scss files */
gulp.task('build-source-sass', function () {
    return gulp.src(input.source_sass_main)
        .pipe(gutil.env.NODE_ENV === 'FedExerciseSolution' ? sourcemaps.init() : gutil.noop())
        .pipe(sass())
        .pipe(concat('source.min.css'))
        .pipe(gutil.env.NODE_ENV !== 'FedExerciseSolution' ? minifyCss() : gutil.noop())
        .pipe(gutil.env.NODE_ENV === 'FedExerciseSolution' ? sourcemaps.write() : gutil.noop())
        .pipe(gulp.dest(output.stylesheets))
        .pipe(browserSync.stream());
});

/* Concat app javascript files */
gulp.task('build-source-js', function () {
    return gulp.src(input.source_js)
        
         .pipe(concat('source.min.js'))
        .pipe(gulp.dest(output.javascript));
});


/* Process and concat vendor css and scss files */
gulp.task('build-vendor-css', function () {
	gulp.src([
	          
	      ])
        .pipe(gulp.dest(output.stylesheets));
    return gulp.src(input.vendor_css)
        .pipe(concat('vendor.min.css'))
        .pipe(replace('./fonts/', '../fonts/'))
        .pipe(replace('.../fonts/', '../fonts/'))
        .pipe(gulp.dest(output.stylesheets))
        .pipe(browserSync.stream());
});

/* Concat vendor javascript files */
gulp.task('build-vendor-js', function () {
	gulp.src([
	          
	      ])
        .pipe(gulp.dest(output.javascript));
    return gulp.src(input.vendor_js)
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest(output.javascript));
});

/* Converts html to javascript templateCache */
gulp.task('html2js', function () {
    return gulp.src(input.html)
        .pipe(ngHtml2Js({
            moduleName: 'html-templates'
        }))
        .pipe(concat("templates.min.js"))

        .pipe(gulp.dest(output.javascript))
        .pipe(browserSync.stream());
});

/**
 * Compress images
 * @return {Stream}
 */
gulp.task('images', function () {
    return gulp
        .src(input.images)
        .pipe(gulp.dest(output.images));
});

/* Copy fonts to public */
gulp.task('fonts', function () {
    return gulp
        .src(input.fonts)
        .pipe(gulp.dest(output.fonts));
});

/* Genreate version.js and copy to public */
gulp.task('version', function () {
    return gulp.src(versionJsLoc)
        .pipe(replace('$version', "'" + generateVersion() + "'"))
        .pipe(gulp.dest(output.javascript));
});

/* Running test specs via command prompt, single run */
gulp.task('test', ['html2js'], function (done) {
   
});

/* Running test specs via command prompt, watch */
gulp.task('autotest', ['html2js'], function (done) {
    
});

/* Scaffolding UI **/
gulp.task('scaffolding', function (done) {
    scaffolding.appStart(__dirname);
});


/* Run the watch task when gulp is called without arguments */
gulp.task('default', function () {
    gutil.env.NODE_ENV = 'dev';
    runSequence(
        'build',
        'images',
        'fonts',
        'nodemon',
        'browser-sync'
    );
   
    gulp.watch(input.source_js, ['jshint', 'build-source-js'], reload);
    gulp.watch(input.source_sass_all, ['build-source-sass'], reload);
    gulp.watch(input.lib_js, ['build-lib-js'], reload);
    gulp.watch(input.lib_css, ['build-source-sass'], reload);
    gulp.watch(input.html, ['html2js'], reload);
});



function buildSequence() {
    runSequence(
        'build',
        'images',
        'fonts'
    );
}

function buildPackageSequence() {
    runSequence(
        'build', 
        'images',
        'fonts',
        'package'
    );
}


function generateVersion() {
    var versionJson = fs.readFileSync(versionLoc, 'utf8');
    versionJson = JSON.parse(versionJson);

    var version = versionJson.majorVersion +
        "." + versionJson.minorVersion +
        "." + versionJson.tertiaryVersion;

    return version;
}
/* HTML Clean Up*/
gulp.task('htmlhint', function () {
    var rules = {
        "tagname-lowercase": true,
        "attr-lowercase": true,
        "attr-value-double-quotes": true,
        "doctype-first": false,
        "tag-pair": true,
        "spec-char-escape": true,
        "id-unique": true,
        "src-not-empty": true,
        "attr-no-duplication": true,
        "title-require": true
    };
    gulp.src('source/app/**/*.html')
        .pipe(htmlhint(rules))
        .pipe(htmlhint.reporter())
});

