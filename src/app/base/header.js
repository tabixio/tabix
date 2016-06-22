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
			smi2.app.services.userManager,
			function($scope, userManager) {
                $scope.user = '...';

                userManager.my().then(function (user) {
                    $scope.user = user.login;
                });
			}
		]);
})(angular, smi2);
