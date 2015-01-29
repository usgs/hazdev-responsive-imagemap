'use strict';

var config = require('./config');

var copy = {
  build: {
    files: [{
      expand: true,
      cwd: config.test,
      src: [
        '**/*.html'
      ],
      dest: config.build + '/test'
    },
    {
      expand: true,
      cwd: config.example,
      src: [
        '**/*.html'
      ],
      dest: config.build + '/example'
    }]
  }
};

module.exports = copy;
