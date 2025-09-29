// app-client/components/news/newsDetail.controller.js
(function () {
    'use strict';

    function newsDetailCtrl($routeParams, reviewsNewsData, authService) {
        var vm = this;
        vm.newsid = $routeParams.newsid;
        vm.article = null;
        vm.message = "Loading article...";
        vm.isAdmin = authService.isAdmin();

        vm.pageHeader = { title: 'News Article' };

        // GET /api/news/:id
        reviewsNewsData.getNewsById(vm.newsid)
            .then(function (response) {
                vm.article = response.data;
                vm.pageHeader.title = vm.article.title;
                vm.message = "";
            })
            .catch(function (error) {
                vm.message = "Sorry, couldn't load the article.";
                console.error(error);
            });
    }

    angular.module('musicProjectApp').controller('newsDetailCtrl', newsDetailCtrl);
    newsDetailCtrl.$inject = ['$routeParams', 'reviewsNewsData', 'authService'];
})();