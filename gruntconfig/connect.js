'use strict';

var config = require('./config');

var connect = {
  options: {
    hostname: '*'
  },
  dev: {
    options: {
      port: 8000,
      base: [
        config.build + '/test',
        config.build + '/src',
        'node_modules'
      ]
    }
  },
  dist: {
    options: {
      port: 8002,
      keepalive: true,
      base: [
        config.dist
      ]
    }
  }

};

module.exports = connect;
