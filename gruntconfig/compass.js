'use strict';

var config = require('./config');

var compass = {
  dev: {
    options: {
      sassDir: config.src,
      cssDir: config.build + '/' + config.src,
      specify: config.src + '/hazdev-svgimagemap.scss',
      environment: 'development'
    }
  }
};

module.exports = compass;
