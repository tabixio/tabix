((angular, smi2) => {
	'use strict';

	angular.module(smi2.app.name).service('HttpInterceptor', HttpInterceptor);
	HttpInterceptor.$inject = ['$q', '$injector'];

	/**
	 * @ngdoc service
	 * @name smi2.service:HttpInterceptor
	 * @description
	 * Service from handle HTTP requests
	 */
	function HttpInterceptor($q, $injector) {
		return {
			/**
			 * @ngdoc
			 * @name responseError
			 * @description Handle HTTP errors
			 * @param {mixed} rejection
			 * @methodOf smi2.service:HttpInterceptor
			 * @return {promise} $q promise
			 */
			responseError: (rejection) => {

				// If not authorized -> go to login page
				if (rejection.status == 401) {
					$injector.get('$state').go('login');
				}
				return $q.reject(rejection);
			}
		};
	}
})(angular, smi2);
