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
  }
};

// bundles
[
  config.src + '/svgimagemap/SvgImageMap',
  config.test + '/index',
  config.example + '/index'
].forEach(function (bundle) {
  var targetFile = config.build + '/' + bundle + '.js';
  var sourceFile = bundle + '.js';

  browserify[bundle] = {files: {}};
  browserify[bundle].files[targetFile] = [sourceFile];
});

module.exports = browserify;
