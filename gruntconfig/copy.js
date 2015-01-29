'use strict';

var config = require('./config');

var copy = {
  build: {
    files: [{
      expand: true,
      cwd: config.test,
      src: [
        '**/*.html',
        'data/**'
      ],
      dest: config.build + '/test'
    }]
  },
  dist: {
    files: [{
      expand: true,
      cwd: config.test,
      src: [
        'data/**'
      ],
      dest: config.dist
    }]
  }
};

module.exports = copy;
