'use strict';

var config = require('./config');

var cssmin = {
  example: {
    expand: true,
    cwd: config.build + '/' + config.example,
    src: '**/*.css',
    dest: config.dist
  },
  src: {
    expand: true,
    cwd: config.build + '/' + config.src,
    src: '**/*.css',
    dest: config.dist
  }
};

module.exports = cssmin;
