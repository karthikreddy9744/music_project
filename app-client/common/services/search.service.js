(function () {
    'use strict';

    function searchService($http, API_BASE) {
        const search = function (query) {
            return $http.get(`${API_BASE}/search`, {
                params: { q: query }
            });
        };

        return { search };
    }

    angular.module('musicProjectApp').service('searchService', searchService);
    searchService.$inject = ['$http', 'API_BASE'];
})();