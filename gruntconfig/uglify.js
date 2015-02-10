'use strict';

var config = require('./config');

var uglify = {
  dist: {
    src: config.build + '/' + config.src + '/hazdev-svgimagemap.js',
    dest: config.dist + '/hazdev-svgimagemap.js'
  }
};

module.exports = uglify;
