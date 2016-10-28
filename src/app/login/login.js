(function(angular, smi2) {
	'use strict';

	angular.module(smi2.app.name).controller('LoginController', LoginController);
	LoginController.$inject = ['$scope', '$state', '$filter', 'localStorageService', 'API'];

	/**
	 * @ngdoc controller
	 * @name smi2.controller:LoginController
	 * @description Login page controller
	 */
	function LoginController($scope, $state, $filter, localStorageService, API) {

		var ALL_BASES_KEY = 'basesConfig';

		$scope.vars = {
			bases: localStorageService.get(ALL_BASES_KEY) || [],
			db: {},
			error: false,
			build: smi2.app.build
		};

        $scope.widget = {
            name: {
                showClearButton: true,
                onValueChanged: (data) => ($scope.vars.db.name = data)
            },
            host: {
                showClearButton: true,
                onValueChanged: (data) => ($scope.vars.db.host = data)
            },
            login: {
                showClearButton: true,
                onValueChanged: (data) => ($scope.vars.db.login = data)
            },
            password: {
                mode: 'password',
                showClearButton: true,
                onValueChanged: (data) => ($scope.vars.db.password = data)
            },
            button: {
                text: "Вход",
                onClick: $scope.login
            }
        };

        $scope.toolbarOptions = {
            items: [{
                location: 'before',
                widget: 'dxButton',
                options: {
                    type: 'back',
                    text: 'Back',
                    onClick: function() {
                        DevExpress.ui.notify("Back button has been clicked!");
                    }
                }
            }, {
                location: 'before',
                widget: 'dxButton',
                locateInMenu: 'auto',
                options: {
                    icon: "refresh",
                    onClick: function() {
                        DevExpress.ui.notify("Refresh button has been clicked!");
                    }
                }
            }, {
                location: 'center',
                locateInMenu: 'never',
                template: function() {
                    return $("<div class='toolbar-label'><b>Tom's Club</b> Products</div>");
                }
            }, {
                location: 'after',
                widget: 'dxSelectBox',
                locateInMenu: 'auto',
                options: {
                    width: 140,
                    items: [],
                    valueExpr: "id",
                    displayExpr: "text",
                    value: 123,
                    onValueChanged: function(args) {
                        if(args.value > 1) {
                            productsStore.filter("type" , "=", args.value);
                        } else {
                            productsStore.filter(null);
                        }
                        productsStore.load();
                    }
                }
            }, {
                location: 'after',
                widget: 'dxButton',
                locateInMenu: 'auto',
                options: {
                    icon: "plus",
                    onClick: function() {
                        DevExpress.ui.notify("Add button has been clicked!");
                    }
                }
            }, {
                locateInMenu: 'always',
                text: 'Save',
                onClick: function() {
                    DevExpress.ui.notify("Save option has been clicked!");
                }
            }, {
                locateInMenu: 'always',
                text: 'Print',
                onClick: function() {
                    DevExpress.ui.notify("Print option has been clicked!");
                }
            }, {
                locateInMenu: 'always',
                text: 'Settings',
                onClick: function() {
                    DevExpress.ui.notify("Settings option has been clicked!");
                }
            }
            ]
        };


        /**
         * Login with saving connection settings
         */
		$scope.login = () => {
			$scope.vars.error = false;

			// Saving to LocalStorage
			if ($scope.vars.db.id) {
				for (var i = 0; i < $scope.vars.bases.length; i++) {
					if ($scope.vars.bases[i].id == $scope.vars.db.id) {
						$scope.vars.bases[i] = $scope.vars.db;
						break;
					}
				}
			} else {
				$scope.vars.db.id = (new Date()).getTime();
				$scope.vars.bases.push($scope.vars.db);
			}
			localStorageService.set(ALL_BASES_KEY, $scope.vars.bases);

			API.setConnection($scope.vars.db);
			API.query('SELECT \'login success\'').then(() => $state.go('dashboard'), () => {$scope.vars.error = true});
		};

		/**
		 * Remove connection item
		 */
		$scope.remove = function() {
			for (var i = 0; i < $scope.vars.bases.length; i++) {
				if ($scope.vars.bases[i].id == $scope.vars.db.id) {
					$scope.vars.bases.splice(i, 1);
					break;
				}
			}
			localStorageService.set(ALL_BASES_KEY, $scope.vars.bases);
			$scope.vars.db = {};
		};
	}
})(angular, smi2);
