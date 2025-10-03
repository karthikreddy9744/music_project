// app-client/components/shared/root.controller.js
(function () {
    'use strict';

    function rootCtrl(authService) {
        var vm = this;

        vm.isLoggedIn = function() {
            return authService.isAuthenticated();
        };
        vm.currentUsername = authService.currentUsername;

        
    }

    angular.module('musicProjectApp').controller('rootCtrl', rootCtrl);
    rootCtrl.$inject = ['authService'];
})();