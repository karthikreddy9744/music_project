// app-client/components/auth/login.controller.js
// app-client/components/auth/login.controller.js
(function () {
    'use strict';

    function loginCtrl($http, $location, authService) {
        var vm = this;
        vm.credentials = {};
        vm.error = null;

        vm.login = function () {
            vm.error = null;
            if (!vm.credentials.email || !vm.credentials.password) {
                vm.error = "All fields are required.";
                return;
            }

            // POST /api/auth/login
            $http.post('/api/auth/login', vm.credentials)
                .then(function (response) {
                    if (response.data && response.data.token) {
                        authService.saveToken(response.data.token);
                        $location.path('/');
                    } else {
                        vm.error = "Login failed: No token received.";
                    }
                })
                .catch(function (error) {
                    vm.error = (error.data && error.data.message) || "Login failed due to a server error.";
                });
        };
    }

    angular.module('musicProjectApp').controller('loginCtrl', loginCtrl);
    loginCtrl.$inject = ['$http', '$location', 'authService'];
})();