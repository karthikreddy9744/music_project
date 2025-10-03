(function () {
    'use strict';

    function adminStatsCtrl(adminData) {
        var vm = this;
        vm.stats = {};
        vm.error = '';
        vm.loading = true;

        vm.pageHeader = {
            title: 'Admin Statistics'
        };

        const chartColors = {
            purpleFill: 'rgba(138, 77, 255, 0.2)',
            purpleBorder: 'rgba(138, 77, 255, 1)',
            blueFill: 'rgba(0, 191, 255, 0.2)',
            blueBorder: 'rgba(0, 191, 255, 1)'
        };

        // Chart.js global options for light background charts
        if (window.Chart) {
            Chart.defaults.global.defaultFontColor = '#333';
            Chart.defaults.global.legend.labels.fontColor = '#333';
            Chart.defaults.global.elements.line.tension = 0.3;
            Chart.defaults.global.elements.line.borderWidth = 2;
            Chart.defaults.global.elements.point.radius = 4;
            Chart.defaults.global.elements.point.hoverRadius = 6;
        }

        adminData.getStats()
            .then(function (response) {
                const stats = response.data;
                vm.stats = stats || {};

                // Ensure nested objects exist before trying to access their properties
                const userRegistrations = stats.userRegistrations || {};
                const dailyActive = stats.dailyActive || {};

                // Chart: User Registrations
                vm.userChart = {
                    labels: userRegistrations.labels || [],
                    data: [userRegistrations.data], // angular-chart.js expects an array of arrays
                    series: ['New Users'],
                    colors: [{
                        backgroundColor: chartColors.purpleFill,
                        borderColor: chartColors.purpleBorder,
                        pointBackgroundColor: '#fff',
                        pointBorderColor: chartColors.purpleBorder,
                        pointHoverBackgroundColor: chartColors.purpleBorder,
                        pointHoverBorderColor: '#fff'
                    }],
                    options: {
                        scales: {
                            yAxes: [{ ticks: { beginAtZero: true, stepSize: 1 } }],
                            xAxes: [{ gridLines: { display: false }, ticks: { autoSkip: true, maxTicksLimit: 10 } }]
                        }
                    }
                };

                // Chart: Daily Active Users
                vm.activeUserChart = {
                    labels: dailyActive.labels || [],
                    data: [dailyActive.data],
                    series: ['Active Users'],
                    colors: [{
                        backgroundColor: chartColors.blueFill,
                        borderColor: chartColors.blueBorder,
                        pointBackgroundColor: '#fff',
                        pointBorderColor: chartColors.blueBorder,
                        pointHoverBackgroundColor: chartColors.blueBorder,
                        pointHoverBorderColor: '#fff'
                    }],
                    options: {
                        scales: {
                            yAxes: [{ ticks: { beginAtZero: true, stepSize: 1 } }],
                            xAxes: [{ gridLines: { display: false }, ticks: { autoSkip: true, maxTicksLimit: 10 } }]
                        }
                    }
                };
            })
            .catch(function (err) {
                vm.error = 'Failed to load admin statistics. ' + err.message;
            }).finally(function() {
                vm.loading = false;
            });;
    }

    angular.module('musicProjectApp').controller('adminStatsCtrl', adminStatsCtrl);
    adminStatsCtrl.$inject = ['adminData'];
})();