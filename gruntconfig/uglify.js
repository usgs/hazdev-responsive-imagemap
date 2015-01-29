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
files[config.dist + '/example.js'] = config.build + '/test/example.js';

module.exports = uglify;
