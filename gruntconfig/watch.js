'use strict';

var config = require('./config');

var watch = {
  scss: {
    files: [config.src + '/**/*.scss'],
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
  gruntfile: {
    files: [
      'Gruntfile.js',
      'gruntfile/**/*.js'
    ],
    tasks: ['jshint:gruntfile']
  }
};

module.exports = watch;
