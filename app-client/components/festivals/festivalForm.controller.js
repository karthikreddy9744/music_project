// app-client/components/festivals/festivalForm.controller.js
(function () {
    'use strict';

    function festivalFormCtrl($routeParams, $location, festivalsData) {
        var vm = this;
        vm.festivalid = $routeParams.festivalid;
        vm.isEdit = !!vm.festivalid;
        vm.message = "";
        vm.pageHeader = { 
            title: vm.isEdit ? 'Edit Festival' : 'Add New Festival' 
        };
        
        // Initial data structure matching the backend Festival model fields
        vm.festival = {
            name: '',
            address: '',
            description: '',
            startDate: new Date(), // Initialize for date input binding
            endDate: new Date(),
            location: {
                // Default coordinates (lng, lat) for LeafletMap
                longitude: 78.486671, 
                latitude: 17.385044
            }
        };

        if (vm.isEdit) {
            festivalsData.getFestivalById(vm.festivalid)
                .then(function (response) {
                    vm.festival = response.data;
                    // Format dates for HTML input[type="date"] binding
                    vm.festival.startDate = new Date(vm.festival.startDate);
                    vm.festival.endDate = new Date(vm.festival.endDate);
                })
                .catch(function (error) {
                    vm.message = "Error loading festival data for editing.";
                    console.error(error);
                });
        }
        
        vm.saveFestival = function () {
            if (!vm.festival.name || !vm.festival.address || !vm.festival.startDate || !vm.festival.endDate) {
                vm.message = "All main fields (Name, Address, Dates) are required.";
                return;
            }

            if (typeof vm.festival.location.latitude !== 'number' || typeof vm.festival.location.longitude !== 'number') {
                 vm.message = "Invalid location coordinates. Please confirm the pin on the map.";
                 return;
            }

            // Data structure to send to the Express controller
            const payload = {
                name: vm.festival.name,
                address: vm.festival.address,
                description: vm.festival.description,
                startDate: vm.festival.startDate,
                endDate: vm.festival.endDate,
                location: {
                    longitude: vm.festival.location.longitude,
                    latitude: vm.festival.location.latitude
                }
            };

            const savePromise = vm.isEdit 
                ? festivalsData.updateFestival(vm.festivalid, payload) 
                : festivalsData.addFestival(payload);

            savePromise
                .then(function (response) {
                    $location.path('/festivals/' + response.data._id);
                })
                .catch(function (error) {
                    vm.message = error.data && error.data.message || "Error saving festival.";
                    console.error(error);
                });
        };
    }

    angular.module('musicProjectApp').controller('festivalFormCtrl', festivalFormCtrl);
    festivalFormCtrl.$inject = ['$routeParams', '$location', 'festivalsData'];
})();