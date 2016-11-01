(function(angular, smi2) {
	'use strict';

	angular.module(smi2.app.name).controller('SidebarController', SidebarController);
	SidebarController.$inject = ['$scope', 'API'];

	/**
	 * @ngdoc controller
	 * @name smi2.controller:SidebarController
	 * @description Контроллер бокового меню
	 */
	function SidebarController($scope, API) {
		$scope.vars = {
			loaded: false,
			selectedDatabase: null,
			tables: []
		};

		$scope.changeDatabase = function(database) {
			$scope.vars.selectedDatabase = database;
			API.setDatabase(database.name);
			API.query('show tables from ' + database.name).then(function(data) {
				$scope.vars.tables = data.data;
			});
		};


		API.query(
				'SELECT ' +
				'	database, ' +
				'	name ' +
				'FROM  ' +
				'	system.tables')
			.then(res => {
				let data = res.data || [];
				$scope.vars.databases = {
					focusStateEnabled:false,
					width: 200,
					itemTemplate:data=>`${data.html}&nbsp;<span>${data.text}</span>`
				};
				$scope.vars.databases.items = data.reduce((prev, item, id) => {
					for (let a of prev) {
						if (a.text == item.database) {
							a.items.push({
								id: a.id + '_' + a.items.length,
								html:'<i class="icon icon--grey icon--flat mdi mdi-table">',
								text: item.name
							});
							return prev;
						}
					}
					return [...prev, {
						id: id + 1,
						text: item.database,
						html:'<i class="icon icon--flat mdi mdi-database">',
						items: [{
							id: id + 1 + '_0',
							html:'<i class="icon icon--grey icon--flat mdi mdi-table">',
							text: item.name
						}]
					}];
				}, []);
				$scope.vars.loaded = true;
			});
	}
})(angular, smi2);
