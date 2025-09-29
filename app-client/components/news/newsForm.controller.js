// app-client/components/news/newsForm.controller.js
(function () {
    'use strict';

    function newsFormCtrl($routeParams, $location, reviewsNewsData) {
        var vm = this;
        vm.newsid = $routeParams.newsid;
        vm.isEdit = !!vm.newsid;
        vm.message = "";
        vm.pageHeader = { 
            title: vm.isEdit ? 'Edit News Article' : 'Create New News Article' 
        };
        vm.article = {};

        if (vm.isEdit) {
            // GET /api/news/:id
            reviewsNewsData.getNewsById(vm.newsid)
                .then(function (response) {
                    vm.article = response.data;
                })
                .catch(function (error) {
                    vm.message = "Error loading article for editing.";
                    console.error(error);
                });
        }
        
        vm.saveNews = function () {
            if (!vm.article.title || !vm.article.body) {
                vm.message = "Title and content are required.";
                return;
            }

            const payload = {
                title: vm.article.title,
                body: vm.article.body,
                // contentType is set in backend as 'news'
            };

            const savePromise = vm.isEdit 
                ? reviewsNewsData.updateNews(vm.newsid, payload) // PUT /api/news/:id
                : reviewsNewsData.addNews(payload); // POST /api/news

            savePromise
                .then(function () {
                    $location.path('/news');
                })
                .catch(function (error) {
                    vm.message = error.data && error.data.message || "Error saving news article.";
                    console.error(error);
                });
        };
    }

    angular.module('musicProjectApp').controller('newsFormCtrl', newsFormCtrl);
    newsFormCtrl.$inject = ['$routeParams', '$location', 'reviewsNewsData'];
})();