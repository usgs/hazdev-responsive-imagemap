/* global chai, describe, it */
'use strict';


var SvgImageMap = require('svgimagemap/SvgImageMap');


var expect = chai.expect;


describe('SvgImageMap', function () {

  describe('constructor', function () {
    it('can be instantiated', function () {
      var imageMap = SvgImageMap({
        imageUrl: 'data/usb000ldeh_ciim.jpg',
        mapUrl: 'data/usb000ldeh_ciim_imap.html'
      });

      /* jshint -W030 */
      expect(imageMap).to.not.be.null;
      /* jshint +W030 */
    });

    // This test reproduces usgs/hazdev-svgimagemap#9
    it('can be destroyed immediately', function (done) {
      var imageMap,
          originalSetSize;

      imageMap = SvgImageMap({
        imageUrl: 'data/usb000ldeh_ciim.jpg',
        mapUrl: 'data/usb000ldeh_ciim_imap.html'
      });

      originalSetSize = imageMap.setSize;
      imageMap.setSize = function () {
        // Call underlying method
        try {
          originalSetSize.apply(imageMap, arguments);
          done(); // Done, no error. Test passes.
        } catch (e) {
          done(e); // Done with error. Test fails.
        }
      };

      imageMap.destroy();
    });
  });


  describe('_getPath()', function () {

    it('handles "circle" shapes', function () {
      var circle = SvgImageMap.getPath({
        shape: 'circle',
        coords: ['X', 'Y', 'R'],
        href: '#HREF',
        title: 'TITLE'
      });

      expect(circle).to.equal(
          '<a xlink:href="#HREF">' +
            '<circle cx="X" cy="Y" r="R">' +
              '<title>TITLE</title>' +
            '</circle>' +
          '</a>');
    });

    it('handles "rect" shapes', function () {
      var rect = SvgImageMap.getPath({
        shape: 'rect',
        coords: [15, 16, 45, 47],
        href: '#HREF',
        title: 'TITLE'
      });

      expect(rect).to.equal(
          '<a xlink:href="#HREF">' +
            '<rect x="15" y="16" width="30" height="31">' +
              '<title>TITLE</title>' +
            '</rect>' +
          '</a>');
    });

    it ('handles "poly" shapes', function () {
      var poly = SvgImageMap.getPath({
        shape: 'poly',
        coords: [1, 2, 3, 4, 5, 6, 1, 2],
        href: '#HREF',
        title: 'TITLE'
      });

      expect(poly).to.equal(
          '<a xlink:href="#HREF">' +
            '<path d="M1,2L3,4L5,6L1,2Z">' +
              '<title>TITLE</title>' +
            '</path>' +
          '</a>');
    });

  });

});
