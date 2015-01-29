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
        config.data,
        'node_modules'
      ]
    }
  },
  dist: {
    options: {
      port: 8002,
      keepalive: true,
      base: [
        config.dist,
        config.data
      ]
    }
  }

};

module.exports = connect;
