// app-client/common/services/user.service.js
// app-client/common/services/user.service.js
(function () {
    'use strict';

    function userData($http) {
        const api = '/api';

        // GET /api/auth/me (Auth required)
        this.getProfile = function () {
            return $http.get(api + '/auth/me');
        };
        
        // Example only: Assume new endpoints are available for user CRUD
        // PUT /api/users/me (User-specific updates)
        this.updateProfile = function (data) {
            return $http.put(api + '/users/me', data);
        };

        // GET /api/users (Admin protected)
        this.getAllUsers = function () {
            return $http.get(api + '/users');
        };
    }

    angular.module('musicProjectApp').service('userData', userData);
    userData.$inject = ['$http'];
})();