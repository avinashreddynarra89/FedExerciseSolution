// Karma configuration
// Generated on Tue Nov 03 2015 22:54:59 GMT-0500 (EST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'chai', 'browserify', 'sinon', 'chai-sinon'],


    // list of files / patterns to load in the browser
    files: [

      // Vendor files
      'source/bower_components/angular/angular.js',
      'source/bower_components/angular-ui-router/release/angular-ui-router.min.js',
      'source/bower_components/angular-mocks/angular-mocks.js',
      'source/bower_components/angular-animate/angular-animate.min.js',
      'source/bower_components/angular-aria/angular-aria.min.js',
      'source/bower_components/angular-cookies/angular-cookies.min.js',
      'source/bower_components/angular-material/angular-material.min.js',
      'source/bower_components/angular-messages/angular-messages.min.js',
      'source/bower_components/moment/min/moment.min.js',
      'source/bower_components/mocha/mocha.js',
      'source/bower_components/chai/chai.js',
      'source/bower_components/angular-material-data-table/dist/md-data-table.min.js',
      'source/bower_components/angular-resource/angular-resource.min.js',
      'source/bower_components/karma-read-json/karma-read-json.js',

      // Library files
      'source/lib/js/ng-stomp.standalone.min.js',

      // HTML templates
      'source/assets/js/templates.min.js',

      // Test config file
      'config/test-config.js',
      {pattern: 'config/**/*.json', included: false},

      // Source files
      'source/app/app.module.js',
      'source/app/**/*.module.js',
      'source/app/**/!(*.spec|*.mock).js',

      // Test files
      'source/app/app.spec.js',
      'source/app/**/*.mock.js',
      'source/app/**/*.spec.js',


      // Mocha spec helper
      'source/lib/test/spec-helper.js'
    ],


    // list of files to exclude
    exclude: [
      'source/app/**/*.directive.js',
      'source/app/**/*.component.js'
    ],

    preprocessors: {
      'source/app/**/!(*.spec|*.mock).js': ['coverage']
    },

    coverageReporter: {
      type: 'lcov',
      dir: 'coverage',
      subdir : 'PhantomJS'
    },
    dest: 'coverage/PhantomJS',

    browserify: {
      debug: true,
      transform: ['brfs']
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha', 'coverage'],

    hostname: 'localhost.homedepot.com',

    // web server port
    port: 9877,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // proxies
    proxies:{

    },


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    //browsers: ['Chrome', 'Firefox', 'Safari', 'IE', 'Opera', 'PhantomJS'],
    browsers: ['PhantomJS'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultanous
    concurrency: Infinity
  });
};
