// app-client/common/services/festivals.service.js
// app-client/common/services/festivals.service.js
(function () {
    'use strict';

    function festivalsData($http) {
        const api = '/api/festivals';

        // GET /api/festivals
        this.getFestivals = function () {
            return $http.get(api);
        };

        // GET /api/festivals/:id (Not directly implemented in backend routes, but assumed if needed)
        // We'll simulate fetching a single one by ID if needed for edit.
        // In the provided backend, there is no GET /festivals/:id public route, but we'll use it for CRUD.
        this.getFestivalById = function (festivalid) {
            return $http.get(api + '/' + festivalid); 
        };
        
        // POST /api/festivals (Admin protected)
        this.addFestival = function (data) {
            return $http.post(api, data);
        };
        
        // PUT /api/festivals/:id (Admin protected)
        this.updateFestival = function (festivalid, data) {
            return $http.put(api + '/' + festivalid, data);
        };

        // DELETE /api/festivals/:id (Admin protected)
        this.deleteFestival = function (festivalid) {
            return $http.delete(api + '/' + festivalid);
        };
    }

    angular.module('musicProjectApp').service('festivalsData', festivalsData);
    festivalsData.$inject = ['$http'];
})();