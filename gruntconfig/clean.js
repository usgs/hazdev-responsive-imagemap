'use strict';

var config = require('./config');

var clean = {
  build: [
    config.build,
    config.dist,
    '.sass-cache'
  ]
};

module.exports = clean;