/* global define,describe,it */

define([
	'chai',
	'svgimagemap/SvgImageMap'
], function (
	chai,
	SvgImageMap
) {
	'use strict';
	var expect = chai.expect;


	describe('SvgImageMap', function () {

		it('exists', function () {
			new SvgImageMap({
				imageUrl: 'data/usb000ldeh_ciim.jpg',
				mapUrl: 'data/usb000ldeh_ciim_imap.html'
			});
		});

	});

});