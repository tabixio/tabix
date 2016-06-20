// all error messages
(function () {
    'use strict';

    angular
        .module('app.core')
        .constant('ErrorMessage', {
            '$SERVER': 'Server issue, please try later!',
            // login
            'LOGIN_WRONG_EMAIL_PASSWORD_PAIR': 'Incorrect email or password, please try again!',
            'LOGIN_USER_IN_LOCK': 'Your account is locked!',
            // phone
            'PHONE_QUERY_NOT_FOUND': 'Sorry, the phone you queryed can not be found!',
            'PHONE_UPDATE_NOT_FOUND': 'Sorry, the phone you updated can not be found!',
            'PHONE_DELETE_NOT_FOUND': 'Sorry, the phone you deleted can not be found!'
        });

})();
