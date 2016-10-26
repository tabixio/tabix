(function() {
	'use strict';

	var smi2 = window.smi2 = window.smi2 || {};
	smi2.app = {
		name: 'SMI2',
		build: '16.10.12'
	};

	// Подключение сторонних библиотек
	angular.module(smi2.app.name, [
		'ngAnimate',
		'ui.router',
		'LocalStorageModule',
		'lumx',
		'angularScreenfull',
		'ui.ace',
		'ui.grid',
		'ui.grid.autoResize'

	]).filter( 'filesize', function () {
		var units = [
			'bytes',
			'KB',
			'MB',
			'GB',
			'TB',
			'PB'
		];

		return function( bytes, precision ) {
			if ( isNaN( parseFloat( bytes )) || ! isFinite( bytes ) ) {
				return '?';
			}

			var unit = 0;

			while ( bytes >= 1024 ) {
				bytes /= 1024;
				unit ++;
			}

			return bytes.toFixed( + precision ) + ' ' + units[ unit ];
		};
	});


})();
