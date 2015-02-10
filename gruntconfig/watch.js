'use strict';

var config = require('./config');

var watch = {
  scss: {
    files: [
      config.src + '/**/*.scss',
      config.example + '/**/*.scss'
    ],
    tasks: ['compass:dev']
  },
  scripts: {
    files: [config.src + '/**/*.js'],
    tasks: [
      'concurrent:scripts',
      'mocha_phantomjs'
    ]
  },
  tests: {
    files: [
      config.test + '/*.html',
      config.test + '/**/*.js'
    ],
    tasks: [
      'concurrent:tests',
      'mocha_phantomjs'
    ]
  },
  example: {
    files: config.example + '/**/*',
    tasks: ['jshint:example'],
    options: {
      livereload: true
    }
  },
  gruntfile: {
    files: [
      'Gruntfile.js',
      'gruntfile/**/*.js'
    ],
    tasks: ['jshint:gruntfile']
  },
  livereload: {
    files: config.build + '/**/*',
    options: {
      livereload: true
    }
  }
};

module.exports = watch;
