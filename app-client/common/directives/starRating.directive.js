// app-client/common/directives/starRating.directive.js
(function () {
    'use strict';

    function starRating() {
        return {
            restrict: 'EA',
            scope: {
                ratingValue: '=ratingValue' 
            },
            template: '<span ng-repeat="star in vm.stars" ng-click="vm.toggle($index)">' +
                      '<i class="glyphicon" ng-class="{\'glyphicon-star\': star.filled, \'glyphicon-star-empty\': !star.filled}"></i>' +
                      '</span>',
            controller: function($scope) {
                var vm = this;
                vm.stars = [];

                function updateStars() {
                    vm.stars.length = 0;
                    for (let i = 0; i < 5; i++) {
                        vm.stars.push({
                            filled: i < $scope.ratingValue
                        });
                    }
                }

                vm.toggle = function (index) {
                    $scope.ratingValue = index + 1;
                };

                $scope.$watch('ratingValue', function (oldVal, newVal) {
                    if (newVal !== oldVal) {
                        updateStars();
                    }
                });

                updateStars(); 
            },
            controllerAs: 'vm'
        };
    }

    angular.module('musicProjectApp').directive('starRating', starRating);
})();