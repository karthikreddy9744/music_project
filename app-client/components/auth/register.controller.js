// app-client/components/auth/register.controller.js
(function () {
    'use strict';

    function registerCtrl($http, $location, authService) {
        var vm = this;
        vm.credentials = {};
        vm.error = null;

        vm.register = function () {
            vm.error = null;

            if (!vm.credentials.name || !vm.credentials.email || !vm.credentials.password) {
                vm.error = "All fields are required.";
                return;
            }
            
            // POST /api/auth/register
            $http.post('/api/auth/register', vm.credentials)
                .then(function (response) {
                    if (response.data && response.data.token) {
                        authService.saveToken(response.data.token);
                        $location.path('/');
                    } else {
                        // Fallback: If token not returned, redirect to login
                        $location.path('/login');
                    }
                })
                .catch(function (error) {
                    vm.error = (error.data && error.data.message) || "Registration failed.";
                });
        };
    }

    angular.module('musicProjectApp').controller('registerCtrl', registerCtrl);
    registerCtrl.$inject = ['$http', '$location', 'authService'];
})();