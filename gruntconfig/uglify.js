'use strict';

var config = require('./config');

var uglify = {
  dist: {
    files: {}
  }
};

var files = uglify.dist.files;
files[config.dist + '/svgimagemap/SvgImageMap.js'] =
    config.build + '/' + config.src + '/svgimagemap/SvgImageMap.js';
files[config.dist + '/index.js'] =
    config.build + '/' + config.example + '/index.js';

module.exports = uglify;
