'use strict';

var csvImport = angular.module('ngCsvImport', []);

csvImport.directive('ngCsvImport', function() {
	return {
		restrict: 'E',
		transclude: true,
		replace: true,
		scope:{
			content:'=?',
			header: '=?',
			headerVisible: '=?',
			separator: '=?',
			separatorVisible: '=?',
			result: '=?',
			encoding: '=?',
			encodingVisible: '=?',
			accept: '=?',
			acceptSize: '=?',
			acceptSizeExceedCallback: '=?',
			callback: '=?',
			mdButtonClass: '@?',
			mdInputClass: '@?',
			mdButtonTitle: '@?',
			mdSvgIcon: '@?',
			uploadButtonLabel: '='
		},
		template: function(element, attrs) {
			var material = angular.isDefined(attrs.material);
			var multiple = angular.isDefined(attrs.multiple);
			return '<div class="ng-csv-import">'+
		  	'<div ng-show="headerVisible"><div class="label">Header</div>' +
		  	(material ? '<input type="checkbox" ng-model="header"></div>' :
		  		'<md-switch class="ng-csv-import-header-switch" ng-model="header"></md-switch>') +
			'<div ng-show="encoding"><div class="label">Encoding</div><span>{{encoding}}</span></div>'+
			'<div ng-show="separatorVisible">'+
			'<div class="label">Seperator</div>'+
			'<span><input class="separator-input ' + (material ? '_md md-input' : '')  + ' " type="text" ng-change="changeSeparator" ng-model="separator"><span>'+
			'</div>'+
			'<div>' +
			'<input class="btn cta gray" upload-button-label="{{uploadButtonLabel}}" type="file" '+ (multiple ? 'multiple' : '') +' accept="{{accept}}"/>' +
			(material ? '<md-button ng-click="onClick($event)" class="_md md-button {{mdButtonClass}}"><md-icon md-svg-icon="{{mdSvgIcon}}"></md-icon> {{mdButtonTitle}}</md-button><md-input-container style="margin:0;"><input type="text" class="_md md-input-readable md-input {{mdInputClass}}" ng-click="onClick($event)" ng-model="filename"></md-input-container>' : '') +
			'</div>'+
			'</div>';
		},
		link: function(scope, element, attrs) {
			scope.separatorVisible = !!scope.separatorVisible;
			scope.headerVisible = !!scope.headerVisible;
			scope.acceptSize = scope.acceptSize || Number.POSITIVE_INFINITY;
			scope.material = angular.isDefined(attrs.material);
			scope.multiple = angular.isDefined(attrs.multiple);
			if (scope.multiple) {
				throw new Error("Multiple attribute is not supported yet.");
			}
			var input = angular.element(element[0].querySelector('input[type="file"]'));
			var inputContainer = angular.element(element[0].querySelector('md-input-container'));

			if (scope.material && input) {
				input.removeClass("ng-show");
				input.addClass("ng-hide");
				if (inputContainer) {
					var errorSpacer = angular.element(inputContainer[0].querySelector('div.md-errors-spacer'));
					if (errorSpacer) {
						errorSpacer.remove();
					}
				}
				scope.onClick = function() {
					input.click();
				};
			}

			angular.element(element[0].querySelector('.separator-input')).on('keyup', function(e) {
				if ( scope.content != null ) {
					var content = {
						csv: scope.content,
						header: scope.header,
						separator: e.target.value,
						encoding: scope.encoding
					};
					scope.result = csvToJSON(content);
					scope.$apply();
					if ( typeof scope.callback === 'function' ) {
						scope.callback(e);
					}
				}
			});

			element.on('change', function(onChangeEvent) {
				if (!onChangeEvent.target.files.length){
					return;
				}

				if (onChangeEvent.target.files[0].size > scope.acceptSize){
					if ( typeof scope.acceptSizeExceedCallback === 'function' ) {
						scope.acceptSizeExceedCallback(onChangeEvent.target.files[0]);
					}
					return;
				}

				scope.filename = onChangeEvent.target.files[0].name;
				var reader = new FileReader();
				reader.onload = function(onLoadEvent) {
					scope.$apply(function() {
						var content = {
							csv: onLoadEvent.target.result.replace(/\r\n|\r/g,'\n'),
							header: scope.header,
							separator: scope.separator
						};
						scope.content = content.csv;
						scope.result = csvToJSON(content);
						scope.result.filename = scope.filename;
						scope.$$postDigest(function(){
							if ( typeof scope.callback === 'function' ) {
								scope.callback(onChangeEvent);
							}
						});
					});
				};

				if ( (onChangeEvent.target.type === "file") && (onChangeEvent.target.files != null || onChangeEvent.srcElement.files != null) )  {
					reader.readAsText((onChangeEvent.srcElement || onChangeEvent.target).files[0], scope.encoding);
				} else {
					if ( scope.content != null ) {
						var content = {
							csv: scope.content,
							header: !scope.header,
							separator: scope.separator
						};
						scope.result = csvToJSON(content);
						scope.$$postDigest(function(){
							if ( typeof scope.callback === 'function' ) {
								scope.callback(onChangeEvent);
							}
						});
					}
				}
			});

			var csvToJSON = function(content) {
				var lines=content.csv.split(new RegExp('\n(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)'));
				var result = [];
				var start = 0;
				var columnCount = lines[0].split(content.separator).length;

				var headers = [];
				if (content.header) {
					headers=lines[0].split(content.separator);
					start = 1;
				}

				for (var i=start; i<lines.length; i++) {
					var obj = {};
					var currentline=lines[i].split(new RegExp(content.separator+'(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)'));
					if ( currentline.length === columnCount ) {
						if (content.header) {
							for (var j=0; j<headers.length; j++) {
								obj[headers[j]] = cleanCsvValue(currentline[j]);
							}
						} else {
							for (var k=0; k<currentline.length; k++) {
								obj[k] = cleanCsvValue(currentline[k]);
							}
						}
						result.push(obj);
					}
				}
				return result;
			};

			var cleanCsvValue = function(value) {
				return value
					.replace(/^\s*|\s*$/g,"") // remove leading & trailing space
					.replace(/^"|"$/g,"") // remove " on the beginning and end
					.replace(/""/g,'"'); // replace "" with "
			};
		}
	};
});
