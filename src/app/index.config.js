((angular, smi2) => {
    'use strict';


    /**
     * Providers configuration
     */
    angular
        .module(smi2.app.name)
        .config([
            '$locationProvider',
            '$httpProvider',
            '$sceProvider',
            '$urlRouterProvider',
            '$mdThemingProvider',
            'ThemeServiceProvider',
            function ($locationProvider,
                      $httpProvider,
                      $sceProvider,
                      $urlRouterProvider,
                      $mdThemingProvider,
                      ThemeService) {

                // Запуск HTML5 режима HISTORY API, без решетки
                $locationProvider.html5Mode(true).hashPrefix('!');

                // Проверка авторизации в httpInterceptor
                $httpProvider.interceptors.push('HttpInterceptor');

                // Разрешаю ng-bind-html
                $sceProvider.enabled(false);

                // Если state не найден - шлю 404
                $urlRouterProvider.otherwise(function ($injector) {
                    var $state = $injector.get("$state");
                    $state.transitionTo('404');
                });

                if (ThemeService.$get().isDark()) {
                    $mdThemingProvider
                        .theme('default')
                        .dark()
                        .primaryPalette('blue')
                        .accentPalette('blue', {
                            'default': '500'
                        });
                }
            }
        ])
        .config(['$translateProvider', function ($translateProvider) {
            $translateProvider.translations('en', {
                'Подключение': 'Connection',
                'Неверные данные':'some data is wrong',
                'название':'name',
                'хост:порт':'host:port',
                'логин':'login',
                'пароль': 'password',
                'Удалить': 'Delete',
                'Войти': 'Sing in',
                'не найдено': 'not found',
                'нет данных': 'no data',
                'Назад': 'Back',
                'Выход': 'Sing out',
                'Шрифт': 'font',
                'История запросов пуста': 'Requests\'s history is empty',
                'Структура':'Structure',
                'Данные':'Data',
                'Информация': 'Information',
                'Размер': 'Size',
                'Размер, байт': 'Size in bytes',
                'Первая запись': 'First record',
                'Последняя запись': 'Last record',
                'Название': 'name',
                'Тип': 'Type',
                'Default тип': 'Default type',
                'Значение': 'Default value',
                'Рабочий стол': 'Dashboard',
                'База': 'Database',
                'Выполнить ⌘ + ⏎': 'Run ⌘ + ⏎',
                'Таблица': 'Table',
                'Таблица ': 'Table ',
                'Хотите покинуть страницу?': 'Do you want to leave this page?',
                'Ошибка': 'Error',
                'Не введен SQL': 'SQL request is empty',
                'Выполнить выделенное ⌘ + ⏎': 'Run selected ⌘ + ⏎',
                'Выполнить все ⇧ + ⌘ + ⏎': 'Run all ⇧ + ⌘ + ⏎',
                'Просмотр': 'Preview',
                'Ошибка ': 'Error '
            });
            $translateProvider.translations('ru', {
            });

            $translateProvider.preferredLanguage('en');
})(angular, smi2);
