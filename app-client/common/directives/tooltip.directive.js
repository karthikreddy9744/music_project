// app-client/common/directives/tooltip.directive.js
(function () {
    'use strict';

    function tooltip() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                $(element).tooltip();
            }
        };
    }

    angular.module('musicProjectApp').directive('tooltip', tooltip);
})();