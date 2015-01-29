var SvgImageMap = require('svgimagemap/SvgImageMap');

new SvgImageMap({
  el: document.querySelector('.testsvg'),
  imageUrl: 'data/usb000ldeh_ciim.jpg',
  mapUrl: 'data/usb000ldeh_ciim_imap.html'
});
