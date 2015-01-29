'use strict';

var config = require('./config');

var compass = {
  dev: {
    options: {
      sassDir: config.src,
      cssDir: config.build + '/' + config.src,
      environment: 'development'
    }
  },
  example: {
    options: {
      sassDir: config.example,
      cssDir: config.build + '/' + config.example,
      environment: 'development'
    }
  }
};

module.exports = compass;
