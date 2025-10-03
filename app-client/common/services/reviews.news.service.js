// app-client/common/services/reviews.news.service.js
(function () {
    'use strict';

    function reviewsNewsData($http, API_BASE) {
        const apiReviews = `${API_BASE}/reviews`;
        const apiNews = `${API_BASE}/news`;
        const apiMusic = `${API_BASE}/music`;

        // --- Reviews (/api/reviews) ---

        // POST /api/reviews/content/:contentId
        this.addReviewToContent = function (contentId, reviewData) {
            return $http.post(`${apiReviews}/content/${contentId}`, reviewData);
        };
 
        // POST /api/reviews/festivals/:festivalId
        this.addReviewToFestival = function (festivalId, reviewData) {
            return $http.post(`${apiReviews}/festivals/${festivalId}`, reviewData);
        };

        // --- News (/api/news) ---

        // GET /api/news
        this.getNewsList = function () {
            return $http.get(apiNews);
        };

        // GET /api/news/:id
        this.getNewsById = function (newsid) {
            return $http.get(`${apiNews}/${newsid}`);
        };
        
        // POST /api/news (Admin protected)
        this.addNews = function (data) {
            return $http.post(apiNews, data);
        };
        
        // PUT /api/news/:id (Admin protected)
        this.updateNews = function (newsid, data) {
            return $http.put(`${apiNews}/${newsid}`, data);
        };

        // DELETE /api/news/:id (Admin protected)
        this.deleteNews = function (newsid) {
            return $http.delete(`${apiNews}/${newsid}`);
        };

        // --- Music (/api/music) ---

        this.getMusicList = function () {
            return $http.get(apiMusic);
        };

        this.getMusicById = function (musicId) {
            return $http.get(`${apiMusic}/${musicId}`);
        };

        this.addMusic = function (data) {
            return $http.post(apiMusic, data);
        };

        this.updateMusic = function (musicId, data) {
            return $http.put(`${apiMusic}/${musicId}`, data);
        };

        this.deleteMusic = function (musicId) {
            return $http.delete(`${apiMusic}/${musicId}`);
        };

    }

    angular.module('musicProjectApp').service('reviewsNewsData', reviewsNewsData);
    reviewsNewsData.$inject = ['$http', 'API_BASE'];
})();