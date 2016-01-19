var im = require('imagemagick'),
	path = require('path'),
	mkdirp = require('mkdirp'),
	formats = {
		'apple-touch-icon-57x57.png' : 57,
		'apple-touch-icon-114x114.png' : 114,
		'apple-touch-icon-72x72.png' : 72,
		'apple-touch-icon-144x144.png' : 144,
		'apple-touch-icon-60x60.png' : 60,
		'apple-touch-icon-120x120.png' : 120,
		'apple-touch-icon-76x76.png' : 76,
		'apple-touch-icon-152x152.png' : 152,
		'apple-touch-icon-180x180.png' : 180,

		'favicon-192x192.png' : 192,
		'favicon-160x160.png' : 160,
		'favicon-96x96.png' : 96,
		'favicon-16x16.png' : 16,
		'favicon-32x32.png' : 32,

		'mstile-144x144.png' : 144
	}
;

window.ondragover = window.ondrop = function(e) {
	e.preventDefault();
	return false;
}

var el = document.querySelector('#drop');

el.ondragover = function() {
	this.className = "hover";
	this.innerHTML = "Drop the file";
	return false;
};

el.ondragleave = function() {
	this.className = '';
	this.innerHTML = "Drop your icon here."
	return false;
}

el.ondrop = function(e) {
	e.preventDefault();

	for (var i = 0; i < e.dataTransfer.files.length; i++) {
		var file = e.dataTransfer.files[i].path,
			converted = 0;

		mkdirp(path.dirname(file) + path.sep + 'icons', function(err) { 

			for(var format in formats) {

				var size = formats[format],
					output = path.dirname(file) + path.sep + 'icons' + path.sep + format;

				im.convert([file, '-resize', size+'x'+size, output], function(err, stdout) {

					if(err) throw err;

					converted++;
					if(converted == Object.keys(formats).length) {
						el.className = "";
						el.innerHTML = 'travail terminé';
					}
				});
			}

		});

	};
}
