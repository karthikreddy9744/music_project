// app-client/components/news/newsList.controller.js
(function () {
    'use strict';

    function newsListCtrl(reviewsNewsData, authService) {
        var vm = this;
        vm.pageHeader = { title: 'News and User Reviews' };
        vm.contentList = [];
        vm.message = "Loading news and reviews...";
        vm.isAdmin = authService.isAdmin();

        vm.loadContent = function() {
            // Fetch all content. Since both news and reviews API return Content documents,
            // we will primarily rely on the reviews endpoint for now, assuming it returns everything.
            // If the backend has separate tables, a dedicated "all content" API is usually better.
            
            reviewsNewsData.getReviewsList() // GET /api/reviews
                .then(function (response) {
                    vm.contentList = response.data;
                    vm.message = vm.contentList.length ? "" : "No news or reviews found.";
                })
                .catch(function (error) {
                    vm.message = "Error loading content.";
                    console.error(error);
                });
        };

        vm.deleteContent = function(id, contentType) {
            if (!vm.isAdmin || !confirm("Are you sure you want to delete this " + contentType + "?")) {
                return;
            }

            const deletePromise = contentType === 'news'
                ? reviewsNewsData.deleteNews(id) // DELETE /api/news/:id
                : reviewsNewsData.deleteReview(id); // DELETE /api/reviews/:id

            deletePromise
                .then(vm.loadContent)
                .catch(function(error) {
                    vm.message = "Error deleting content.";
                    console.error(error);
                });
        };

        vm.loadContent();
    }

    angular.module('musicProjectApp').controller('newsListCtrl', newsListCtrl);
    newsListCtrl.$inject = ['reviewsNewsData', 'authService'];
})();