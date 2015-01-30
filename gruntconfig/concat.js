'use strict';

var config = require('./config');

var concat = {
  css: {
    src: [config.build + '/' + config.src + '/**/*.css'],
    dest: config.build + '/' + config.src + '/hazdev-svgimagemap.css'
  }
};

module.exports = concat;
