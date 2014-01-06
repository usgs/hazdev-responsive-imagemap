/* global define */

define([
	'util/Util',
	'util/Xhr'
], function (
	Util,
	Xhr
) {
	'use strict';


	var DEFAULTS = {
		// container element
		el: null,
		// image url
		imageUrl: null,
		// image alt,
		imageAlt: null,
		// imagemap url
		mapUrl: null,
		// imagemap name (optional)
		mapName: null,
		// if imagemap is already as svg
		svgUrl: null
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
		options = Util.extend({}, DEFAULTS, options);
		this.el = options.el;
		this._options = options;
		this.setAreas(options.areas);
		// process additional options
		this.initialize(options);
	};


	/**
	 * Free references to everything.
	 */
	SvgImageMap.prototype.destroy = function () {
		this.el = null;
		this._options = null;
		this._areas = null;
		this._width = null;
		this._height = null;
	};

	/**
	 * Request image size and map
	 *
	 * @param options {Object}
	 */
	SvgImageMap.prototype.initialize = function (options) {
		var _this = this,
		    image,
		    el;

		// container element
		el = options.el || document.createElement('div');
		el.classList.add('svgimagemap');
		if (options.className) {
			el.classList.add(options.className);
		}
		this.el = el;

		// load image
		image = new Image();
		image.addEventListener('load', function _imageOnLoad() {
			_this.setSize(image.naturalWidth, image.naturalHeight);
			// clean up load event listener
			image.removeEventListener('load', _imageOnLoad);
		});
		image.setAttribute('alt', options.imageAlt || '');
		el.appendChild(image);
		image.src = options.imageUrl;

		// load imagemap
		if (options.svgUrl) {
			// load svg
			Xhr.ajax({
				url: options.svgUrl,
				success: function (response/*, xhr*/) {
					_this.setSvg(response);
				}
			});
		} else if (options.mapUrl) {
			// load imagemap
			Xhr.ajax({
				url: options.mapUrl,
				success: function (response/*, xhr*/) {
					_this.setAreas(_this.parseMap(response, options.mapName));
				}
			});
		}
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
	SvgImageMap.prototype.parseMap = function (html, mapName) {
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
		}

		return parsed;
	};


	/**
	 * Set the image map areas.
	 *
	 * Calls render() after setting areas.
	 *
	 * @param areas {Array<Area>}
	 */
	SvgImageMap.prototype.setAreas = function (areas) {
		this._areas = areas;
		this.render();
	};

	/**
	 * Set the image map size.
	 *
	 * @param width width of image.
	 * @param height height of image.
	 */
	SvgImageMap.prototype.setSize = function (width, height) {
		// save for svg
		this._width = width;
		this._height = height;

		if (width && height) {
			// set element size
			var el = this.el;
			el.setAttribute('width', width);
			el.setAttribute('height', height);
		}

		// redraw svg
		this.render();
	};

	/**
	 * Set the svg content.
	 *
	 * @param svg {String|SVGElement}
	 *        svg content to set.
	 */
	SvgImageMap.prototype.setSvg = function (svg) {
		var el = this.el,
		    oldSvg = el.querySelector('svg'),
		    parseEl;

		// remove existing svg
		if (oldSvg !== null) {
			el.removeChild(oldSvg);
		}

		// convert svg string to svg element
		if (typeof svg === 'string' && svg !== '') {
			parseEl = document.createElement('div');
			parseEl.innerHTML = svg;
			svg = parseEl.childNodes[0];
			parseEl = null;
		}

		// add svg element
		if (svg) {
			el.appendChild(svg);
		}
	};

	/**
	 * Update the svg based on current areas, width, and height.
	 */
	SvgImageMap.prototype.render = function () {
		var buf = [],
				areas = this._areas,
				width = this._width,
				height = this._height,
				len,
				i;
		if (width && height && areas) {
			// update svg
			this.setSvg(this._getSvg(areas, width, height));
		}
	};

	/**
	 * Convert an array of areas to svg.
	 *
	 * @param areas {Array<Area>}
	 *        area objects to add to svg.
	 * @param width {Number|String}
	 *        svg element and viewBox width.
	 * @param height {Number|String}
	 *        svg element and viewBox height.
	 */
	SvgImageMap.prototype._getSvg = function (areas, width, height) {
		var buf = [],
		    len = areas.length,
		    i;

		if (len > 0 && width && height) {
			// open svg element
			buf.push('<svg',
					' xmlns="http://www.w3.org/2000/svg"',
					' xmlns:xlink="http://www.w3.org/1999/xlink"',
					' width="', width, '"',
					' height="', height, '"',
					' viewBox="0,0,', width, ',', height, '"',
					' preserveAspectRatio="xMinYMin"',
					'>');

			// add imagemap areas
			for (i = 0; i < len; i++) {
				buf.push(this._getPath(areas[i]));
			}

			// close svg element
			buf.push('</svg>');
		}

		return buf.join('');
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
	SvgImageMap.prototype._getPath = function (area) {
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


	// return constructor
	return SvgImageMap;
});
