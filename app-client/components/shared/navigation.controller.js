// app-client/components/shared/navigation.controller.js
// app-client/components/shared/navigation.controller.js
(function () {
  'use strict';
  function navigationCtrl($location, authService, searchService, $timeout) {
    var vm = this;
    vm.isLoggedIn = function() {
      return authService.isAuthenticated();
    };
    vm.isAdmin = authService.isAdmin; // This can remain a direct reference

    vm.currentUsername = function() {
      const user = authService.getUser();
      return user ? user.name : 'Profile';
    };

    vm.logout = function () {
      authService.logout();
      $location.path('/login');
    };

    // --- Global Search ---
    vm.searchQuery = '';
    vm.searchResults = null;

    vm.onSearchChange = function() {
      if (!vm.searchQuery || vm.searchQuery.length < 2) {
        vm.searchResults = null;
        return;
      }
      vm.searchResults = 'searching'; // Show loading state
      searchService.search(vm.searchQuery)
        .then(function(response) {
          vm.searchResults = response.data;
        });
    };

    vm.clearSearch = function() {
      // Use a small timeout. This allows the browser to follow the link's href
      // before the dropdown is removed from the DOM by Angular.
      $timeout(function() {
        vm.searchQuery = '';
        vm.searchResults = null;
      }, 150); // A 150ms delay is sufficient for the click to register.
    };
  }
  angular.module('musicProjectApp').controller('navigationCtrl', navigationCtrl).$inject = ['$location', 'authService', 'searchService', '$timeout'];
})();