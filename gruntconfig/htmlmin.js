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

htmlmin.dist.files[config.dist + '/example.html'] =
    config.build + '/test/example.html';

module.exports = htmlmin;
