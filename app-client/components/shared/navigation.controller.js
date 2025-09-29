// app-client/components/shared/navigation.controller.js
// app-client/components/shared/navigation.controller.js
(function () {
    'use strict';

    function navigationCtrl(authService, $location) {
        var vm = this;

        vm.isLoggedIn = function () {
            return authService.isAuthenticated();
        };

        vm.isAdmin = function () {
            return authService.isAdmin();
        };

        vm.currentUsername = function () {
            var payload = authService.parseToken();
            return payload && payload.user && payload.user.email ? payload.user.email : 'Profile';
        };

        vm.logout = function () {
            authService.logout();
            $location.path('/login');
        };
    }

    angular.module('musicProjectApp').controller('navigationCtrl', navigationCtrl);
    navigationCtrl.$inject = ['authService', '$location'];
})();