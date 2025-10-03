(function () {
    'use strict';

    function loginCtrl($location, authService) {
        var vm = this;

        vm.pageHeader = {
            title: 'Sign in to Music Project'
        };

        vm.credentials = {
            email: '',
            password: ''
        };

        vm.returnPage = $location.search().page || '/';

        vm.onSubmit = function (loginForm) {
            vm.formError = '';
            if (loginForm.$invalid) {
                return;
            } else {
                authService
                    .login(vm.credentials)
                    .then(function () {
                        $location.search('page', null);
                        $location.path(vm.returnPage);
                    })
                    .catch(function (err) {
                        vm.formError = err.data.message || "Something went wrong, please try again.";
                    });
            }
        };
    }
    angular.module('musicProjectApp').controller('loginCtrl', loginCtrl);
    loginCtrl.$inject = ['$location', 'authService'];
})();