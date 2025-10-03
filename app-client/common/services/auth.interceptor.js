// app-client/common/services/auth.interceptor.js
(function () {
    'use strict';

    angular.module('musicProjectApp').factory('authInterceptor', authInterceptor);
    authInterceptor.$inject = ['authService'];
    function authInterceptor(authService) {
        return {
            request: function(config) {
                const token = authService.getToken();
                if (token) {
                    config.headers = config.headers || {};
                    config.headers.Authorization = 'Bearer ' + token;
                }
                return config;
            }
        };
    }
})();