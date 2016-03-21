'use strict';

var View = require('mvc/View');
var Util = require('util/Util');
var Xhr = require('util/Xhr');


var DEFAULTS = {
  // container element
  el: null,
  // image url
  imageUrl: null,
  // image alt,
  imageAlt: '',
  // imagemap url
  mapUrl: null,
  // imagemap name (optional)
  mapName: null,
  // if imagemap is already as svg
  svgUrl: null,
  // width of imagemap
  width: null,
  // height of imagemap
  height: null,
  // areas of imagemap
  areas: null
};



/**
 * Parse an image map from an HTML string.
 *
 * Calls setAreas() with parsed area elements.
 *
 * @param html {String}
 *        html string containing imagemap.
 * @param mapName {String}
 *        optional, value of name attribute.
 *        by default, the first imagemap in html is parsed.
 * @return
 */
var parseMap = function(html, mapName) {
  var parsed = [],
      selector = 'map',
      parseEl = document.createElement('div'),
      el, areas, i, len;

  // insert into element to parse.
  parseEl.innerHTML = html;
  // find imagemap
  if (mapName) {
    selector += '[name=\'' + mapName + '\']';
  }
  el = parseEl.querySelector(selector);
  if (el) {
    // find areas
    areas = el.querySelectorAll('area');
    for (i=0, len=areas.length; i<len; i++) {
      el = areas[i];
      parsed.push({
        'shape': el.getAttribute('shape'),
        'coords': el.getAttribute('coords').split(','),
        'title': el.getAttribute('title'),
        'href': el.getAttribute('href')
      });
    }
    areas = null;
  }
  parseEl = null;

  return parsed;
};

/**
 * Convert an area object to a svg path element string.
 *
 * @param area {Object}
 * @param area.shape {String}
 *        'circle', 'rect', and 'poly' are supported.
 * @param area.coords {Array<String>}
 *        an array of coordinates, meaning depends on shape
 * @param area.title {String}
 *        optional.  title for area, shown on mouseover.
 * @param area.href {String}
 *        optional.  link for area, activated on click.
 * @return {String} svg circle, rect, or path, markup as string.
 */
var getPath = function (area) {
  var buf = [],
      shape = area.shape,
      coords = area.coords,
      title = area.title,
      href = area.href;

  // href and title are optional, but work the same for every shape
  href = (href === null ? '' : ' xlink:href="' + href + '"');
  title = (title === null ? '' : '<title>' + title + '</title>');

  if (shape === 'circle') {
    // circle coords are x,y,radius
    buf.push(
        '<circle',
        ' cx="', coords[0], '"',
        ' cy="', coords[1], '"',
        ' r="', coords[2], '"',
        href,
        '>', title, '</circle>');
  } else if (shape === 'rect') {
    // rectangle coords are x1,y1,x2,y2
    buf.push(
        '<rect',
        ' x="', coords[0], '"',
        ' y="', coords[1], '"',
        ' width="', coords[2]-coords[0], '"',
        ' height="', coords[3]-coords[1], '"',
        href,
        '>', title, '</rect>');
  } else if (shape === 'poly') {
    // poly coords are x1,y1,x2,y2,...xN,yN
    // convert area coordinate list to svg path
    var points = [];
    for (var i=0, len=coords.length; i<len; i+=2) {
      // svg "M" is move to, "L" is line to
      points.push((i === 0 ? 'M' : 'L'), coords[i], ',', coords[i+1]);
    }
    // svg "Z" is close path
    points.push('Z');
    buf.push(
        '<path',
        ' d="', points.join(''), '"',
        href,
        '>', title, '</path>');
  }

  return buf.join('');
};



/**
 * Create a new SvgImageMap.
 *
 * @param options {Object}
 * @param options.imageUrl {String}
 *        url to image
 * @param options.imageAlt {String}
 *        alt attribute for image.
 * @param options.className {String}
 *        classname for wrapper element.
 *
 * Other parameters configure how to load the image map:
 *
 * - From an existing SVG File:
 *
 * @param options.svgUrl {String}
 *        optiona, url to svg imagemap.
 *
 * - Programatically, either at construction or via setAreas():
 *
 * @param options.areas {Array<Area>}
 *        areas for imagemap.
 *
 * - From an existing HTML imagemap:
 *
 * @param options.mapUrl {String}
 *        url to html with imagemap
 * @param options.mapName {String}
 *        optional, specify the imagemap name in case there are many.
 */
var SvgImageMap = function (options) {
  var _this,
      _initialize,

      _areas,
      _className,
      _el,
      _height,
      _imageAlt,
      _imageUrl,
      _mapName,
      _mapUrl,
      _svgUrl,
      _width,

      _parentDestroy,
      _setSvg;

  _this = Object.create(View(options));

  _initialize = function () {
    var image,
        imageOnLoad;
    // parse options
    options = Util.extend({}, DEFAULTS, options);
    _areas = options.areas || [];
    _className = options.className;
    _height = options.height;
    _imageAlt = options.imageAlt;
    _imageUrl = options.imageUrl;
    _mapName = options.mapName;
    _mapUrl = options.mapUrl;
    _svgUrl = options.svgUrl;
    _width = options.width;
    // container element classes
    _el = _this.el;
    _el.classList.add('svgimagemap');
    if (_className) {
      _el.classList.add(_className);
    }
    // load image
    imageOnLoad = function () {
      _this.setSize(image.naturalWidth, image.naturalHeight);
      image.removeEventListener('load', imageOnLoad);
      imageOnLoad = null;
    };
    image = new Image();
    image.addEventListener('load', imageOnLoad);
    image.setAttribute('alt', _imageAlt);
    image.src = _imageUrl;
    _el.appendChild(image);
    // load imagemap
    if (_svgUrl) {
      Xhr.ajax({
        url: _svgUrl,
        success: function (response/*, xhr*/) {
          _this.setSvg(response);
        }
      });
    } else if (_mapUrl) {
      Xhr.ajax({
        url: _mapUrl,
        success: function (response/*, xhr*/) {
          _this.setAreas(parseMap(response, _mapName));
        }
      });
    }
    // clear options
    options = null;
  };

  // save reference to parent destroy method
  _parentDestroy = _this.destroy;
  _this.destroy = function () {
    _areas = null;
    _className = null;
    _el = null;
    _height = null;
    _mapUrl = null;
    _mapName = null;
    _svgUrl = null;
    _width = null;

    if (typeof _parentDestroy === 'function') {
      _parentDestroy();
    }
  };

  /**
   * Access the areas array.
   */
  _this.getAreas = function () {
    return _areas;
  };

  /**
   * Set the image map areas.
   *
   * Calls render() after setting areas.
   *
   * @param areas {Array<Area>}
   */
  _this.setAreas = function (areas) {
    _areas = areas;
    // redraw svg
    _this.render();
  };

  /**
   * Set the image map size.
   *
   * Calls render() after setting size.
   *
   * @param width width of image.
   * @param height height of image.
   */
  _this.setSize = function (width, height) {
    // save for svg
    _width = width;
    _height = height;
    if (width && height) {
      // set element size
      _el.setAttribute('width', width);
      _el.setAttribute('height', height);
    }
    // redraw svg
    _this.render();
  };

  /**
   * Update the rendered imagemap based on width, height, and areas.
   */
  _this.render = function () {
    var buf,
        i,
        len;

    if (!_width || !_height || !_areas || _areas.length === 0) {
      return;
    }

    // build svg
    buf = [];
    // open svg element
    buf.push('<svg',
        ' xmlns="http://www.w3.org/2000/svg"',
        ' xmlns:xlink="http://www.w3.org/1999/xlink"',
        ' width="', _width, '"',
        ' height="', _height, '"',
        ' viewBox="0,0,', _width, ',', _height, '"',
        ' preserveAspectRatio="xMinYMin"',
        '>');
    // add imagemap areas
    len = _areas.length;
    for (i = 0; i < len; i++) {
      buf.push(getPath(_areas[i]));
    }
    // close svg element
    buf.push('</svg>');
    _setSvg(buf.join(''));
  };

  /**
   * Remove any existing svg element, and insert an svg element.
   *
   * @param svg {String|Element}
   *        the svg to insert.
   *        if a String, converted to an Element before insertion.
   */
  _setSvg = function (svg) {
    var oldSvg,
        parseEl;
    // remove any existing svg
    oldSvg = _this.el.querySelector('svg');
    if (oldSvg) {
      _el.removeChild(oldSvg);
    }
    // convert svg string to svg element
    if (typeof svg === 'string') {
      parseEl = document.createElement('div');
      parseEl.innerHTML = svg;
      svg = parseEl.children[0];
      parseEl = null;
    }
    // insert svg
    if (svg) {
      _el.appendChild(svg);
    }
  };


  _initialize();
  return _this;
};


SvgImageMap.getPath = getPath;
SvgImageMap.parseMap = parseMap;


module.exports = SvgImageMap;
