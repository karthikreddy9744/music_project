(function () {
    'use strict';

    function reviewFormCtrl($routeParams, $location, reviewsNewsData, authService) {
        var vm = this;
        // The ID of the item being reviewed (can be a festival or content ID)
        vm.itemId = $routeParams.itemId; 
        // The type of item being reviewed ('festival' or 'content')
        vm.itemType = $routeParams.itemType;

        vm.pageHeader = {
            title: `Write a review`
        };

        vm.formData = {
            rating: 3 // Default rating
        };

        if (!vm.itemId || !vm.itemType) {
            vm.formError = "Cannot post a review without a target item. Please go back.";
        }

        vm.onSubmit = function () {
            vm.formError = "";
            if (!vm.formData.reviewText || !vm.formData.rating) {
                vm.formError = "Rating and review text are required.";
                return;
            }

            let action;
            if (vm.itemType === 'festival') {
                action = reviewsNewsData.addReviewToFestival(vm.itemId, vm.formData);
            } else if (vm.itemType === 'content') {
                action = reviewsNewsData.addReviewToContent(vm.itemId, vm.formData);
            } else {
                vm.formError = "Invalid item type for review.";
                return;
            }

            action.then(function () {
                // Redirect back to the item's detail page
                let redirectPath = '/';
                if (vm.itemType === 'festival') redirectPath = `/festivals/${vm.itemId}`;
                if (vm.itemType === 'content') redirectPath = `/music/${vm.itemId}`; // 'content' now implies 'music'

                $location.path(redirectPath);
            }).catch(function (err) {
                vm.formError = "Your review could not be saved. " + (err.data.message || '');
            });
        };
    }

    angular.module('musicProjectApp').controller('reviewFormCtrl', reviewFormCtrl);
    reviewFormCtrl.$inject = ['$routeParams', '$location', 'reviewsNewsData', 'authService'];
})();