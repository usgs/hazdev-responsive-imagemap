'use strict';

var concurrent = {
  build: [
    'browserify',
    'compass',
    'copy:build',
    'jshint'
  ],
  scripts: [
    'browserify',
    'jshint:scripts'
  ],
  tests: [
    'browserify',
    'jshint:tests'
  ],
  dist: [
    'cssmin',
    'uglify'
  ]
};

module.exports = concurrent;
