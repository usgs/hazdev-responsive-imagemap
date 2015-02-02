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
    files: {}
  }
};

cssmin.src.files[config.dist + '/hazdev-svgimagemap.css'] =
    [config.build + '/' + config.src + '/**/*.css'];

module.exports = cssmin;
