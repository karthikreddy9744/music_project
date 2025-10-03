(function () {
    'use strict';

    function festivalDetailCtrl($routeParams, $location, $window, $rootScope, festivalsData, authService, $q) {
        var vm = this;
        vm.festivalid = $routeParams.festivalid;
        vm.isAdmin = authService.isAdmin();
        vm.error = ''; // Initialize error message
        vm.sidebarMessage = "Loading other festivals...";

        // Clear any previous context
        $rootScope.pageContext = null;

        const mainContentPromise = festivalsData.getFestivalById(vm.festivalid);
        const sidebarContentPromise = festivalsData.getFestivals();

        $q.all([mainContentPromise, sidebarContentPromise])
            .then(function (responses) {
                // Main festival data
                vm.data = { festival: responses[0].data };

                // CRITICAL FIX: Check if festival data exists before proceeding.
                if (!vm.data.festival) {
                    vm.error = "Festival not found.";
                    vm.sidebarMessage = "Could not load other festivals.";
                    return; // Stop execution to prevent errors
                }

                // Create a location object for the leaflet-map directive
                if (vm.data.festival.location && typeof vm.data.festival.location.latitude === 'number' && typeof vm.data.festival.location.longitude === 'number') {
                    vm.mapLocation = {
                        latitude: vm.data.festival.location.latitude,
                        longitude: vm.data.festival.location.longitude
                    };
                }

                vm.pageHeader = {
                    title: vm.data.festival.name
                };
                // Set the context for the AI chat widget, checking for optional fields
                if (vm.data.festival) {
                    let context = `Festival Name: ${vm.data.festival.name}`;
                    if (vm.data.festival.address) context += `, Location: ${vm.data.festival.address}`;
                    if (vm.data.festival.startDate) context += `, Starts: ${vm.data.festival.startDate}`;
                    if (vm.data.festival.endDate) context += `, Ends: ${vm.data.festival.endDate}`;
                    if (vm.data.festival.description) context += `, Description: ${vm.data.festival.description}`;
                    $rootScope.pageContext = context;
                }

                // Sidebar data: filter out current festival and take top 5
                vm.sidebarFestivals = responses[1].data
                    .filter(item => item._id !== vm.festivalid)
                    .slice(0, 5);

                if (vm.sidebarFestivals.length === 0) {
                    vm.sidebarMessage = "No other festivals found.";
                }
            })
            .catch(function (e) {
                vm.error = "Failed to load festival details. " + (e.data.message || e.message);
                vm.sidebarMessage = "Could not load other festivals.";
            });

        vm.deleteFestival = function() {
            $('#genericModalLabel').text('Delete Festival');
            $('#genericModalText').text(`Are you sure you want to delete the festival "${vm.data.festival.name}"? This action cannot be undone.`);
            $('#genericModalConfirmBtn').off('click').on('click', function () {
                festivalsData.deleteFestival(vm.festivalid)
                    .then(function() {
                        $('#genericModal').modal('hide');
                        $location.path('/'); // This requires $location
                    })
                    .catch(function(e) {
                        vm.error = "Failed to delete festival: " + e.data.message;
                    });
            });
            $('#genericModal').modal('show');
        };

        vm.goToGoogleMaps = function() {
            if (vm.mapLocation) {
                const lat = vm.mapLocation.latitude;
                const lng = vm.mapLocation.longitude;
                const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
                $window.open(googleMapsUrl, '_blank'); // This requires $window
            } else {
                vm.error = "Location data not available for directions.";
            }
        };
    }

    angular.module('musicProjectApp').controller('festivalDetailCtrl', festivalDetailCtrl);
    festivalDetailCtrl.$inject = ['$routeParams', '$location', '$window', '$rootScope', 'festivalsData', 'authService', '$q'];
})();