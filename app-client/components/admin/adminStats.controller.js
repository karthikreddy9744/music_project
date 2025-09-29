// app-client/components/admin/adminStats.controller.js
(function () {
    'use strict';

    function adminStatsCtrl(adminData) {
        var vm = this;
        vm.pageHeader = { title: 'Admin Dashboard' };
        vm.stats = {};
        vm.message = "Loading stats...";

        // GET /api/admin/stats
        adminData.getStats()
            .then(function (response) {
                vm.stats = response.data;
                vm.message = "";
            })
            .catch(function (error) {
                vm.message = "Failed to load admin stats. Check permissions.";
                console.error(error);
            });
    }

    angular.module('musicProjectApp').controller('adminStatsCtrl', adminStatsCtrl);
    adminStatsCtrl.$inject = ['adminData'];
})();