// app-client/common/services/admin.service.js
(function () {
    'use strict';

    function adminData($http) {
        const api = '/api/admin';

        // GET /api/admin/stats (Admin protected)
        this.getStats = function () {
            return $http.get(api + '/stats');
        };
    }

    angular.module('musicProjectApp').service('adminData', adminData);
    adminData.$inject = ['$http'];
})();