(function () {
    'use strict';

    function musicListCtrl(reviewsNewsData) {
        var vm = this;
        vm.pageHeader = {
            title: 'Music'
        };
        vm.message = "Loading music...";

        reviewsNewsData.getMusicList()
            .then(function (response) {
                vm.music = response.data;
                vm.message = vm.music.length > 0 ? "" : "No music found.";
            })
            .catch(function (e) {
                vm.message = "Sorry, something's gone wrong retrieving the music.";
            });
    }

    angular.module('musicProjectApp').controller('musicListCtrl', musicListCtrl);
    musicListCtrl.$inject = ['reviewsNewsData'];
})();