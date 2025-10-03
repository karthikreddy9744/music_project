// app-client/common/directives/fileModel.directive.js
(function () {
    'use strict';

    function fileModel($parse) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var model = $parse(attrs.fileModel);
                var modelSetter = model.assign;

                element.bind('change', function () {
                    scope.$apply(function () {
                        // Pass the raw file object to the scope
                        modelSetter(scope, element[0].files[0]);
                    });
                });
            }
        };
    }

    angular.module('musicProjectApp').directive('fileModel', fileModel);
    fileModel.$inject = ['$parse'];
})();