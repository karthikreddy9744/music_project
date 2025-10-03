(function () {
    'use strict';

    function scrollFadeIn($window) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var offset = parseInt(attrs.scrollFadeInOffset) || 100;

                function checkInView() {
                    var docViewTop = angular.element($window).scrollTop();
                    var docViewBottom = docViewTop + angular.element($window).height();
                    var elemTop = element.offset().top;

                    if (docViewBottom - offset >= elemTop) {
                        element.addClass('is-visible');
                        // Unbind the event after the element is visible to improve performance
                        angular.element($window).off('scroll', checkInView);
                    }
                }

                // Initial check
                checkInView();
                // Check on scroll
                angular.element($window).on('scroll', checkInView);
            }
        };
    }

    angular.module('musicProjectApp').directive('scrollFadeIn', scrollFadeIn);
    scrollFadeIn.$inject = ['$window'];
})();