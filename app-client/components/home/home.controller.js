// app-client/components/home/home.controller.js
// app-client/components/home/home.controller.js
(function () {
    'use strict';

    function homeCtrl(festivalsData) {
        var vm = this;
        vm.pageHeader = { title: 'Upcoming Music Festivals' };
        vm.festivals = [];
        vm.message = "Loading festival list...";

        // GET /api/festivals
        festivalsData.getFestivals()
            .then(function (response) {
                vm.festivals = response.data;
                vm.message = vm.festivals.length > 0 ? "" : "No festivals found.";
            })
            .catch(function (error) {
                vm.message = "Error loading festival data.";
                console.error(error);
            });
    }

    angular.module('musicProjectApp').controller('homeCtrl', homeCtrl);
    homeCtrl.$inject = ['festivalsData'];
})();