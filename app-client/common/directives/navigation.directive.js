// app-client/common/directives/navigation.directive.js
// app-client/common/directives/navigation.directive.js
(function () {
    'use strict';

    function navigation() {
        return {
            restrict: 'EA',
            templateUrl: 'components/shared/navigation.view.html',
            controller: 'navigationCtrl',
            controllerAs: 'navvm'
        };
    }

    angular.module('musicProjectApp').directive('navigation', navigation);
})();