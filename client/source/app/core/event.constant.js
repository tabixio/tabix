// all events
(function () {
    'use strict';

    angular
        .module('app.core')
        .constant('Event', {
            'AUTH_LOGIN': 'auth_login_event',
            'AUTH_LOGOUT': 'auth_logout_event',
            'AUTH_SESSION_VALID': 'auth_session_valid_event'
        });

})();
