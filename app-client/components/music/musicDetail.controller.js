(function () {
    'use strict';

    function musicDetailCtrl($routeParams, $location, $sce, $rootScope, reviewsNewsData, authService, $q) {
        var vm = this;
        vm.musicId = $routeParams.musicId;
        vm.isAdmin = authService.isAdmin();
        vm.sidebarMessage = "Loading other music...";

        // Clear any previous context
        $rootScope.pageContext = null;

        const mainContentPromise = reviewsNewsData.getMusicById(vm.musicId);
        const sidebarContentPromise = reviewsNewsData.getMusicList();

        $q.all([mainContentPromise, sidebarContentPromise])
            .then(function (responses) {
                const musicData = responses[0].data;
                // Sanitize media URLs
                if (musicData.media) {
                    musicData.media.forEach(m => m.trustedUrl = $sce.trustAsResourceUrl(m.url));
                }
                vm.data = { music: musicData };
                vm.pageHeader = {
                    title: vm.data.music.title
                };
                // Set the context for the AI chat widget
                $rootScope.pageContext = `Music Title: ${vm.data.music.title}, Body: ${vm.data.music.body}`;

                // Sidebar data
                vm.sidebarMusic = responses[1].data
                    .filter(item => item._id !== vm.musicId)
                    .slice(0, 5);

                if (vm.sidebarMusic.length === 0) {
                    vm.sidebarMessage = "No other music found.";
                }
            })
            .catch(function (e) {
                vm.error = "Failed to load music entry.";
                vm.sidebarMessage = "Could not load other music.";
                console.log(e);
            });

        vm.deleteMusic = function() {
            $('#genericModalLabel').text('Delete Music Entry');
            $('#genericModalText').text(`Are you sure you want to delete the entry "${vm.data.music.title}"? This action cannot be undone.`);
            $('#genericModalConfirmBtn').off('click').on('click', function () {
                reviewsNewsData.deleteMusic(vm.musicId)
                    .then(function() {
                        $('#genericModal').modal('hide');
                        $location.path('/music'); // This requires $location
                    })
                    .catch(function(e) {
                        vm.error = "Failed to delete entry: " + e.data.message;
                    });
            });
            $('#genericModal').modal('show');
        };
    }

    angular.module('musicProjectApp').controller('musicDetailCtrl', musicDetailCtrl);
    musicDetailCtrl.$inject = ['$routeParams', '$location', '$sce', '$rootScope', 'reviewsNewsData', 'authService', '$q'];
})();