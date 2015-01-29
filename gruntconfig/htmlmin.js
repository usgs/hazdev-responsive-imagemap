'use strict';

var config = require('./config');

var htmlmin = {
  dist: {
    options: {
      removeComments: true,
      collapseWhitespace: true
    },
    files: {}
  }
};

htmlmin.dist.files[config.dist + '/index.html'] =
    config.build + '/example/index.html';

module.exports = htmlmin;
