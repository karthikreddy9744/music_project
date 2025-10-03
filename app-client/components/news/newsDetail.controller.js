(function () {
    'use strict';

    function newsDetailCtrl($routeParams, $location, reviewsNewsData, authService, $q) {
        var vm = this;
        vm.newsId = $routeParams.newsId;
        vm.isAdmin = authService.isAdmin();
        vm.error = '';
        vm.sidebarMessage = "Loading recent news...";

        const mainContentPromise = reviewsNewsData.getNewsById(vm.newsId);
        const sidebarContentPromise = reviewsNewsData.getNewsList();

        $q.all([mainContentPromise, sidebarContentPromise])
            .then(function (responses) {
                // Main article data
                vm.data = { news: responses[0].data };
                vm.pageHeader = {
                    title: vm.data.news.title
                };

                // Sidebar data: filter out current article and take top 5
                vm.sidebarNews = responses[1].data
                    .filter(item => item._id !== vm.newsId)
                    .slice(0, 5);

                if (vm.sidebarNews.length === 0) {
                    vm.sidebarMessage = "No other news articles found.";
                }
            })
            .catch(function (e) {
                vm.error = "Failed to load news article. " + (e.data.message || e.message);
                vm.sidebarMessage = "Could not load recent news.";
            });

        vm.deleteNews = function() {
            $('#genericModalLabel').text('Delete News Article');
            $('#genericModalText').text(`Are you sure you want to delete the article "${vm.data.news.title}"? This action cannot be undone.`);
            $('#genericModalConfirmBtn').off('click').on('click', function () {
                reviewsNewsData.deleteNews(vm.newsId)
                    .then(function() {
                        $('#genericModal').modal('hide');
                        $location.path('/news');
                    })
                    .catch(function(e) {
                        vm.error = "Failed to delete article: " + e.data.message;
                    });
            });
            $('#genericModal').modal('show');
        };
    }

    angular.module('musicProjectApp').controller('newsDetailCtrl', newsDetailCtrl);
    newsDetailCtrl.$inject = ['$routeParams', '$location', 'reviewsNewsData', 'authService', '$q'];
})();