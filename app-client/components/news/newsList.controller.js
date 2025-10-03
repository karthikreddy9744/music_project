(function () {
    'use strict';

    function newsListCtrl(reviewsNewsData) {
        var vm = this;
        vm.pageHeader = {
            title: 'News & Reviews'
        };
        vm.message = "Loading news...";

        reviewsNewsData.getNewsList()
            .then(function (response) {
                vm.news = response.data;
                vm.message = vm.news.length > 0 ? "" : "No news found.";
            })
            .catch(function (e) {
                vm.message = "Sorry, something's gone wrong retrieving the news.";
            });
    }

    angular.module('musicProjectApp').controller('newsListCtrl', newsListCtrl);
    newsListCtrl.$inject = ['reviewsNewsData'];
})();