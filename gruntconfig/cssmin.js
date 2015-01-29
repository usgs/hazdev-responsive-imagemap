'use strict';

var config = require('./config');

var cssmin = {
  test: {
    expand: true,
    cwd: config.build + '/test',
    src: '**/*.css',
    dest: config.dist
  },
  src: {
    expand: true,
    cwd: config.build + '/src',
    src: '**/*.css',
    dest: config.dist
  }
};

module.exports = cssmin;
