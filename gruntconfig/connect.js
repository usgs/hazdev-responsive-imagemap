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
        config.build + '/' + config.example,
        config.build + '/' + config.src,
        config.data
      ],
      open: 'http://localhost:8000/'
    }
  },
  test: {
    options: {
      port: 8001,
      base: [
        config.build + '/' + config.test,
        config.build + '/' + config.src,
        config.data,
        'node_modules'
      ],
      open: 'http://localhost:8001/'
    }
  },
  dist: {
    options: {
      port: 8002,
      keepalive: true,
      base: [
        config.dist,
        config.data
      ],
      open: 'http://localhost:8002/'
    }
  }

};

module.exports = connect;
