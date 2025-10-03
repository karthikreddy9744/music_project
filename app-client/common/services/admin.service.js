// app-client/common/services/admin.service.js
(function () {
    'use strict';

    function adminData($http, API_BASE) {
        const api = `${API_BASE}/admin`;

        // GET /api/admin/stats (Admin protected)
        this.getStats = function () {
            // The JWT token (with role info) is automatically attached by authInterceptor
            return $http.get(`${api}/stats`);
        };
    }

    angular.module('musicProjectApp').service('adminData', adminData);
    adminData.$inject = ['$http', 'API_BASE'];
})();