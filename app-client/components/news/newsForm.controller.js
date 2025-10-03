(function () {
    'use strict';

    function newsFormCtrl($routeParams, $location, reviewsNewsData, mediaData) {
        var vm = this;
        vm.newsId = $routeParams.newsId;
        vm.isEdit = !!vm.newsId;

        vm.pageHeader = {
            title: vm.isEdit ? 'Edit News Article' : 'Add New News Article'
        };

        vm.formData = {};

        if (vm.isEdit) {
            reviewsNewsData.getNewsById(vm.newsId)
                .then(function (response) {
                    vm.formData = response.data;
                })
                .catch(function (err) {
                    vm.formError = "Error loading news data. " + err.message;
                });
        }

        vm.onSubmit = function (form) {
            vm.formError = "";
            if (form.$invalid) { return; }

            const saveNews = function(newsData) {
                const action = vm.isEdit ?
                    reviewsNewsData.updateNews(vm.newsId, newsData) :
                    reviewsNewsData.addNews(newsData);

                action.then(function (response) {
                    $location.path('/news/' + (vm.newsId || response.data._id));
                }).catch(function (err) {
                    vm.formError = "Your entry could not be saved. " + (err.data.message || '');
                });
            };

            if (vm.imageFile) {
                vm.formError = "Uploading image...";
                mediaData.uploadFile(vm.imageFile, 'image')
                    .then(function(response) {
                        // Replace existing media with the new image
                        vm.formData.media = [response.data];
                        saveNews(vm.formData);
                    }).catch(function(err) {
                        vm.formError = "Image upload failed. " + (err.data.message || 'Please try again.');
                    });
            } else {
                saveNews(vm.formData);
            }
        };
    }

    angular.module('musicProjectApp').controller('newsFormCtrl', newsFormCtrl);
    newsFormCtrl.$inject = ['$routeParams', '$location', 'reviewsNewsData', 'mediaData'];
})();