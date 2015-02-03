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
        config.build + '/' + config.src,
        config.example,
        config.etc
      ],
      open: 'http://localhost:8000/example.html'
    }
  },
  test: {
    options: {
      port: 8001,
      base: [
        config.build + '/' + config.test,
        config.build + '/' + config.src,
        config.etc,
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
        config.example,
        config.etc
      ],
      open: 'http://localhost:8002/example.html'
    }
  }

};

module.exports = connect;
