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
    src: config.build + '/' + config.src + '/**/*.css',
    dest: config.dist + '/hazdev-svgimagemap.css'
  }
};

module.exports = cssmin;
