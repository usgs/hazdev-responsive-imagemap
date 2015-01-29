'use strict';

var config = require('./config');

var uglify = {
  dist: {
    files: {}
  }
};

var files = uglify.dist.files;
files[config.dist + '/svgimagemap/SvgImageMap.js'] =
    config.build + '/src/svgimagemap/SvgImageMap.js';
files[config.dist + '/index.js'] = config.build + '/example/index.js';

module.exports = uglify;
