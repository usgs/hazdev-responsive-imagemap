'use strict';

var config = require('./config');

var replace = {
  dist: {
    options: {
      patterns: [
        {
          match: /svgimagemap\/SvgImageMap.css/g,
          replacement: 'hazdev-svgimagemap.css'
        }
      ]
    },
    files: [{
      expand: true,
      flatten: false,
      cwd: config.dist,
      src: ['*.html'],
      dest: config.dist
    }]
  }
};

module.exports = replace;
