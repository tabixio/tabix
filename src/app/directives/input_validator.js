(function(angular, smi2) {
	'use strict';
	/**
	 * @ngdoc directive
	 * @name smi2.directive:drValidator
	 * @restrict A
	 * @element INPUT
	 * @function
	 * @param {string} name Название поля, обязательный
	 * @param {string} ng-model Поле модели, обязательный
	 * @param {string} dr-validator Сама модель, обязательный
	 * @description
	 * Директива позволяет проводить валидацию одного поля модели.
	 *
	 * Не смотри в USAGE, там кака. Сюда смотри.
	 * ```html
	 * <form name="loginForm">
	 *   <input ng-model="vars.user.username" name="username" type="text" dr-validator="vars.user" />
	 *   <div ng-messages="loginForm.username">
	 *     <div ng-message="$invalid">{{::vars.user.fields.username.validateMessage}}</div>
	 *   </div>
	 * </form>
	 * ```
	 */
	angular.module(smi2.app.name)
		.directive(smi2.app.directives.validator, [
			function() {
				return {
					restrict: 'A',
					require: 'ngModel',

					scope: {
						drValidator: '='
					},

					link: function($scope, element, attr, ctrl) {

						var unbindWatch = $scope.$watch('drValidator', function(model) {

							// Модель передали?
							if (angular.isUndefined(model) || !model) {
								return;
							}

							// Проверяю модель ли это
							if (angular.isUndefined(model.fields)) {
								console.warn('Not a model!', attr.drValidator);
								return;
							}

							// Проверка что есть аттрибут name
							if (angular.isUndefined(attr.name)) {
								console.warn('No name in ng-model =', attr.ngModel);
								return;
							}

							// Проверка кривого поля
							if (!model.fields[attr.name]) {
								console.warn('Model does not contain field =', attr.name, ', see input =', element[0]);
								return;
							}

							// Поиск функции валидации
							var validate = function() {
								return true;
							};
							if (model.fields[attr.name].validate) {
								if (angular.isFunction(model.fields[attr.name].validate)) {
									validate = model.fields[attr.name].validate;
								}
								if (model.fields[attr.name].validate instanceof RegExp) {
									var regex = model.fields[attr.name].validate;
									validate = function(value) {
										return angular.isDefined(value) && regex.test(value);
									};
								}
							}

							// Пополнение очереди валидаторов своим валидатором
							ctrl.$parsers.unshift(function(value) {
								// Костыль!!! Данные в модели появляются
								// позже вызова этого парсера! Пришлось установить
								// атрибут руками
								model[attr.name] = value;

								var valid = validate(value);
								ctrl.$setValidity(attr.name, valid);
								return valid ? value : undefined;
							});

							// отсоединяю watch
							unbindWatch();
						});
					}
				};
			}
		]);
})(angular, smi2);
