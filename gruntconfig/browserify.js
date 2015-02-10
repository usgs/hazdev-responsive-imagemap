'use strict';

var config = require('./config');

var browserify = {
  options: {
    browserifyOptions: {
      debug: true,
      paths: [
        process.cwd() + '/' + config.src,
        process.cwd() + '/node_modules/hazdev-webutils/src'
      ]
    }
  },
  source: {
    src: [],
    dest: config.build + '/' + config.src + '/hazdev-svgimagemap.js',
    options: {
      alias: [
        './' + config.src + '/svgimagemap/SvgImageMap.js:svgimagemap/SvgImageMap'
      ]
    }
  },
  test: {
    src: config.test + '/test.js',
    dest: config.build + '/' + config.test + '/test.js',
    options: {
      external: [
        'svgimagemap/SvgImageMap'
      ]
    }
  }
};

module.exports = browserify;
