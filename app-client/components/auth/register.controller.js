(function () {
    'use strict';

    function registerCtrl($location, authService) {
        var vm = this;

        vm.pageHeader = {
            title: 'Create a new account'
        };

        vm.credentials = {
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        };

        vm.returnPage = $location.search().page || '/';

        vm.onSubmit = function (registerForm) {
            vm.formError = '';
            if (registerForm.$invalid) {
                // If the form is invalid (e.g., required fields are empty), do nothing.
                // The view will show the specific field errors.
                return;
            }
            
            vm.passwordsMismatch = vm.credentials.password !== vm.credentials.confirmPassword;
            if (vm.passwordsMismatch) {
                vm.formError = 'Passwords do not match, please try again';
            } else {
                authService
                    .register(vm.credentials)
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
    angular.module('musicProjectApp').controller('registerCtrl', registerCtrl);
    registerCtrl.$inject = ['$location', 'authService'];
})();