(function () {
    'use strict';

    function festivalFormCtrl($routeParams, $location, $timeout, $http, festivalsData) {
        var vm = this;
        vm.festivalid = $routeParams.festivalid;
        // Correctly determine if we are in "edit" mode. "add" is not an ID.
        vm.isEdit = vm.festivalid && vm.festivalid !== 'add';

        vm.pageHeader = {
            title: vm.isEdit ? 'Edit Festival' : 'Add New Festival'
        };

        vm.formData = {
            lineup: [],
            location: {
                latitude: 51.505, // Default Latitude
                longitude: -0.09   // Default Longitude
            }
        };

        // --- Map Initialization ---
        vm.map = { searchQuery: '' };
        $timeout(function() {
            const map = L.map('map-picker').setView([vm.formData.location.latitude, vm.formData.location.longitude], 13);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            // Fix typo: use location.latitude and location.longitude
            const marker = L.marker([vm.formData.location.latitude, vm.formData.location.longitude], { draggable: true }).addTo(map);

            marker.on('dragend', function(e) {
                const position = marker.getLatLng();
                $timeout(function() { // Use $timeout to apply changes to scope
                    vm.formData.location.latitude = position.lat;
                    vm.formData.location.longitude = position.lng;
                });
            });

            vm.map.instance = map;
            vm.map.marker = marker;
        }, 0); // Use $timeout to ensure DOM is ready


        if (vm.isEdit) {
            festivalsData.getFestivalById(vm.festivalid)
                .then(function (response) {
                    // Use Object.assign to create a mutable copy of the response data.
                    // This prevents the "readonly property" error.
                    vm.formData = Object.assign({}, response.data);

                    // Set map to existing coordinates if they exist
                    if (vm.formData.location && vm.formData.location.latitude && vm.formData.location.longitude) {
                        vm.map.instance.setView([vm.formData.location.latitude, vm.formData.location.longitude], 13);
                        vm.map.marker.setLatLng([vm.formData.location.latitude, vm.formData.location.longitude]);
                    }
                    // Ensure lineup is an array of strings for the form
                    if (vm.formData.lineup && typeof vm.formData.lineup === 'string') {
                        vm.formData.lineup = vm.formData.lineup.split(',').map(s => s.trim());
                    }
                    vm.formData.startDate = new Date(vm.formData.startDate); // For date input
                    vm.formData.endDate = new Date(vm.formData.endDate); // For date input
                })
                .catch(function (err) {
                    vm.formError = "Error loading festival data. " + err.message;
                });
        }

        vm.searchLocation = function() {
            if (!vm.map.searchQuery) return;
            const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(vm.map.searchQuery)}`;
            $http.get(url).then(function(response) {
                if (response.data && response.data.length > 0) {
                    const result = response.data[0];
                    const lat = parseFloat(result.lat);
                    const lon = parseFloat(result.lon);
                    vm.formData.location.latitude = lat;
                    vm.formData.location.longitude = lon;
                    vm.map.instance.setView([lat, lon], 13);
                    vm.map.marker.setLatLng([lat, lon]);
                } else {
                    alert('Location not found.');
                }
            });
        };

        vm.onSubmit = function (form) {
            vm.formError = "";
            if (form.$invalid) {
                vm.formError = "Please fill out all required fields.";
                return;
            }

            // Convert lineup string to array if needed
            if (typeof vm.formData.lineup === 'string') {
                vm.formData.lineup = vm.formData.lineup.split(',').map(s => s.trim());
            }

            const action = vm.isEdit ?
                festivalsData.updateFestival(vm.festivalid, vm.formData) :
                festivalsData.addFestival(vm.formData);

            action.then(function (response) {
                $location.path('/festivals/' + (vm.festivalid || response.data._id));
            }).catch(function (err) {
                vm.formError = "Your festival could not be saved. " + (err.data.message || '');
            });
        };
    }

    angular.module('musicProjectApp').controller('festivalFormCtrl', festivalFormCtrl);
    festivalFormCtrl.$inject = ['$routeParams', '$location', '$timeout', '$http', 'festivalsData'];
})();