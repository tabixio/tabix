(function(angular, smi2) {
	'use strict';

	/**
	 * @ngdoc controller
	 * @name smi2.controller:header
	 * @description
	 */
	angular.module(smi2.app.name)
		.controller(smi2.app.controllers.header, [
			'$scope',
			smi2.app.services.api,
			function($scope, api) {
                $scope.user = api.getConnection().name;
			}
		]);
})(angular, smi2);
