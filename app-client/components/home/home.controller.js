(function () {
    'use strict';

    function homeCtrl(festivalsData, reviewsNewsData, $q) {
        var vm = this;
        vm.pageHeader = {
            title: 'Music Festivals',
            strapline: 'Find the best upcoming music festivals!'
        };
        vm.message = "Checking for festivals...";
        vm.sidebarMessage = "Loading recent news...";

        const festivalsPromise = festivalsData.getFestivals();
        const newsPromise = reviewsNewsData.getNewsList();

        $q.all([festivalsPromise, newsPromise])
            .then(function (responses) {
                // Festivals data for main content
                vm.festivals = responses[0].data;
                vm.message = vm.festivals.length > 0 ? "" : "No festivals found.";

                // News data for sidebar, take the top 5
                vm.sidebarNews = responses[1].data.slice(0, 5);
                if (vm.sidebarNews.length === 0) {
                    vm.sidebarMessage = "No recent news to display.";
                }
            })
            .catch(function (e) {
                vm.message = "Sorry, something's gone wrong loading festivals.";
                vm.sidebarMessage = "Could not load recent news.";
                console.error(e);
            });
    }

    angular.module('musicProjectApp').controller('homeCtrl', homeCtrl);
    homeCtrl.$inject = ['festivalsData', 'reviewsNewsData', '$q'];
})();