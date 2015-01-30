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
  'src/svgimagemap/SvgImageMap': {
    src: [],
    dest: config.build + '/' + config.src + '/hazdev-svgimagemap.js',
    options: {
      alias: [
        './' + config.src + '/svgimagemap/SvgImageMap.js:svgimagemap/SvgImageMap'
      ]
    }
  },
  'test/index': {
    src: config.test + '/index.js',
    dest: config.build + '/' + config.test + '/index.js'
  }
};

module.exports = browserify;
