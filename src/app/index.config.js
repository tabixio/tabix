/*
 * Licensed under the Apache License, Version 2.0 Copyright 2017 Igor Strykhar,Ivan Kudinov,SMI2 LLC and other contributors
 */

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
            '$translateProvider',
            function ($locationProvider,
                      $httpProvider,
                      $sceProvider,
                      $urlRouterProvider,
                      $mdThemingProvider,
                      ThemeService,
                      $translateProvider) {

                // Запуск HTML5 режима HISTORY API, без решетки
                // $locationProvider.html5Mode(true).hashPrefix('!');

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
                'Неверные данные': 'some data is wrong',
                'Название': 'name',
                'Хост:порт': 'host:port',
                'Логин': 'login',
                'Пароль': 'password',
                'Удалить': 'Delete',
                'Войти': 'Sign in',
                'не найдено': 'not found',
                'нет данных': 'no data',
                'Назад': 'Back',
                'Выход': 'Sign out',
                'Шрифт': 'Font',
                'История запросов пуста': 'Request history is empty',
                'Структура': 'Structure',
                'Данные': 'Data',
                'Параметры': 'Params',
                'Информация': 'Information',
                'Размер': 'Size',
                'Размер, байт': 'Size, bytes',
                'Первая запись': 'First record',
                'Последняя запись': 'Last record',
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
                'Не введен SQL': 'SQL query is empty',
                'Выполнить выделенное ⌘ + ⏎': 'Run selected ⌘ + ⏎',
                'Выполнить все ⇧ + ⌘ + ⏎': 'Run all ⇧ + ⌘ + ⏎',
                'Просмотр': 'Preview',
                'Ошибка ': 'Error ',
                'Сохранить':'Save',
                'Лог запросов': 'Request\'s log',
                'Тема интерфейса': 'Theme',
                'Тема': 'Theme',
                'Максимум строк': 'Maximum lines',
                'Настройки редактора': 'Editor settings',
                'Закрыть': 'Close',
                'Размер шрифта': 'Font size',
                'Формат результатов': 'Result\'s format',
                'Тема редактора':'Editor theme',
                'Сохранять сессию': 'Save session',
                'На весь экран': 'Full screen',
                'Словари': 'Dictionaries',
                'CSV с заголовком': 'CSV with headers',
                'CSV без заголовка': 'CSV without headers',
                'Табулированный текст с заголовками': 'Tabulated text with headers',
                'Табулированный текст без заголовков': 'Tabulated text without headers',
                'время': 'time',
                'строк прочитано': 'rows read',
                'прочитано': 'read',
                'SQL изменен. Сохранить перед закрытием?': 'SQL was changed. Save it before exit?',
                'Да': 'Yes',
                'Нет': 'No',
                'Светлая тема': 'Light theme',
                'Темная тема': 'Dark theme',
                'с': 'from',
                'по': 'to',
                'Открыть таблицу': 'Open table',
                'Метрики': 'Metrics',
                'Метрики и список процессов': 'Metrics & Processes',
                'Поиск': 'Search',
                'Справка': 'Help',
                'Список процессов': 'Processes',
                'История зарпросов': 'Query log',
                ';; Двойной': ';; Double',
                '; Одинарный': '; Single',
                'Разделитель запросов': 'Query delimiter',
                'Сборка': 'Build',
                'СМИ2': 'Smi2',
                'Сервер': 'Server',
                'Config': 'Config',
                'Config Key': 'Config Key',
                'все права защищены': 'all rights reserved',
                'Привязка': 'Pinned',
                'Обновить': 'Refresh',
                'Очистить': 'Reset',
                'Максимально точек': 'Max points',
                'Частота обновления': 'Frequency',
                'сек': 'sec',
                'Обновление отключено': 'Refresh is disabled',
                'Логирование': 'Logs',
                'Перенос строк': 'Word wrap',
                'Искать на сервере': 'Search on server',
                'Обзор': 'Overview'
            })
            .translations('ru', {}).useMissingTranslationHandlerLog()//.useSanitizeValueStrategy('escape')
                .registerAvailableLanguageKeys(['en'], {
                // 'ru_*': 'ru',
                // 'ru-*': 'ru',
                '*': 'en'
            })
            .determinePreferredLanguage();
            // this line used for translation check
            //$translateProvider.useMissingTranslationHandlerLog();

        }]);
})(angular, smi2);
