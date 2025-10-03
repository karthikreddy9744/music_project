// app-client/common/services/user.service.js
(function () {
    'use strict';

    function userService($http, API_BASE) {
        const api = API_BASE;

        // GET /api/profile/me (Auth required)
        this.getProfile = function () {
            return $http.get(`${api}/profile/me`);
        };
        
        // PUT /api/profile/me (User-specific updates)
        this.updateProfile = function (data) {
            return $http.put(`${api}/profile/me`, data);
        };

        // GET /api/users (Admin protected)
        this.getAllUsers = function () {
            return $http.get(`${api}/users`);
        };
    }

    angular.module('musicProjectApp').service('userService', userService);
    userService.$inject = ['$http', 'API_BASE'];
})();