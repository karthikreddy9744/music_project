// app-client/components/festivals/festivalDetail.controller.js
(function () {
    'use strict';

    function festivalDetailCtrl($routeParams, $location, festivalsData, authService) {
        var vm = this;
        vm.festivalid = $routeParams.festivalid;
        vm.festival = null;
        vm.message = "Loading festival details...";
        vm.isAdmin = authService.isAdmin();

        vm.pageHeader = { title: 'Festival Details' };

        vm.getFestival = function () {
            // GET /api/festivals/:id
            festivalsData.getFestivalById(vm.festivalid)
                .then(function (response) {
                    vm.festival = response.data;
                    vm.pageHeader.title = vm.festival.name;
                    vm.message = "";
                })
                .catch(function (error) {
                    vm.message = "Sorry, couldn't load festival details.";
                    console.error(error);
                });
        };

        vm.deleteFestival = function() {
            if (!vm.isAdmin) return;
            
            if (confirm("Are you sure you want to delete this festival?")) {
                // DELETE /api/festivals/:id
                festivalsData.deleteFestival(vm.festivalid)
                    .then(() => $location.path('/'))
                    .catch((error) => {
                        vm.message = "Error deleting festival.";
                        console.error(error);
                    });
            }
        };

        vm.getFestival();
    }

    angular.module('musicProjectApp').controller('festivalDetailCtrl', festivalDetailCtrl);
    festivalDetailCtrl.$inject = ['$routeParams', '$location', 'festivalsData', 'authService'];
})();