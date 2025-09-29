// app-client/common/services/reviews.news.service.js
(function () {
    'use strict';

    function reviewsNewsData($http) {
        const apiReviews = '/api/reviews';
        const apiNews = '/api/news';

        // --- Reviews (/api/reviews) ---

        // GET /api/reviews
        this.getReviewsList = function () {
            return $http.get(apiReviews);
        };
        
        // POST /api/reviews (Auth required) - Creates a new review
        this.addReview = function (reviewData) {
            return $http.post(apiReviews, reviewData);
        };

        // GET /api/reviews/:id (Not in backend routes, but necessary for edit form)
        this.getReviewById = function (reviewid) {
            return $http.get(apiReviews + '/' + reviewid); 
        };
        
        // PUT /api/reviews/:id (Auth required)
        this.updateReview = function (reviewid, data) {
            return $http.put(apiReviews + '/' + reviewid, data);
        };

        // DELETE /api/reviews/:id (Auth required)
        this.deleteReview = function (reviewid) {
            return $http.delete(apiReviews + '/' + reviewid);
        };

        // --- News (/api/news) ---

        // GET /api/news
        this.getNewsList = function () {
            return $http.get(apiNews);
        };

        // GET /api/news/:id
        this.getNewsById = function (newsid) {
            return $http.get(apiNews + '/' + newsid);
        };
        
        // POST /api/news (Admin protected)
        this.addNews = function (data) {
            return $http.post(apiNews, data);
        };
        
        // PUT /api/news/:id (Admin protected)
        this.updateNews = function (newsid, data) {
            return $http.put(apiNews + '/' + newsid, data);
        };

        // DELETE /api/news/:id (Admin protected)
        this.deleteNews = function (newsid) {
            return $http.delete(apiNews + '/' + newsid);
        };
    }

    angular.module('musicProjectApp').service('reviewsNewsData', reviewsNewsData);
    reviewsNewsData.$inject = ['$http'];
})();