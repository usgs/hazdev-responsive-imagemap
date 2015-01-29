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
  'src/svgimagemap/SvgImageMap',
  'test/index',
  'example/index'
].forEach(function (bundle) {
  var targetFile = config.build + '/' + bundle + '.js';
  var sourceFile = bundle + '.js';

  browserify[bundle] = {files: {}};
  browserify[bundle].files[targetFile] = [sourceFile];
});

module.exports = browserify;
