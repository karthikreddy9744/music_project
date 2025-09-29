// app-client/components/reviews/reviewForm.controller.js
(function () {
    'use strict';

    function reviewFormCtrl($routeParams, $location, reviewsNewsData, authService) {
        var vm = this;
        vm.reviewid = $routeParams.reviewid;
        vm.isEdit = !!vm.reviewid;
        vm.review = { rating: 3, track: {} };
        vm.formError = "";
        vm.pageHeader = { title: vm.isEdit ? 'Edit Review' : 'Post a New Review' };
        
        if (!authService.isAuthenticated()) {
            $location.path('/login');
            return;
        }

        if (vm.isEdit) {
            // GET /api/reviews/:id
            reviewsNewsData.getReviewById(vm.reviewid)
                .then(function(response) {
                    vm.review = response.data;
                })
                .catch(function(error) {
                    vm.formError = "Error fetching review for editing.";
                    console.error(error);
                });
        }
        
        vm.saveReview = function () {
            if (!vm.review.title || !vm.review.body || !vm.review.rating) {
                vm.formError = "Title, content, and rating are required.";
                return;
            }

            const payload = {
                title: vm.review.title,
                body: vm.review.body,
                rating: vm.review.rating,
                track: vm.review.track // Expects { spotifyId, title, artist, album, ... }
            };

            const savePromise = vm.isEdit
                ? reviewsNewsData.updateReview(vm.reviewid, payload)
                : reviewsNewsData.addReview(payload);

            savePromise
                .then(function() {
                    $location.path('/news'); // Navigate to the page listing reviews/news
                })
                .catch(function(error) {
                    vm.formError = (error.data && error.data.message) || "Error saving review.";
                    console.error(error);
                });
        };
    }

    angular.module('musicProjectApp').controller('reviewFormCtrl', reviewFormCtrl);
    reviewFormCtrl.$inject = ['$routeParams', '$location', 'reviewsNewsData', 'authService'];
})();