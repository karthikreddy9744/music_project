// app-client/common/services/media.service.js
(function () {
    'use strict';

    function mediaData($http, $window, API_BASE) {
        const api = API_BASE; 

        // Placeholder for a hypothetical backend route that accepts a file upload.
        // Based on the schema, this could be part of a larger POST/PUT to /api/news or /api/reviews
        this.uploadFile = function (file, type) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('mediaType', type);

            return $http.post(`${api}/media/upload`, formData, {
                transformRequest: angular.identity,
                headers: {
                    'Content-Type': undefined, // Express/Multer handles this automatically
                    'Authorization': 'Bearer ' + $window.localStorage.getItem('music_project_token')
                }
            });
        };
    }

    angular.module('musicProjectApp').service('mediaData', mediaData);
    mediaData.$inject = ['$http', '$window', 'API_BASE'];
})();