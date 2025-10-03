// app-client/common/directives/aiChatWidget.directive.js
(function () {
    'use strict';

    function aiChatWidget() {
        return {
            restrict: 'E',
            templateUrl: 'components/chat/aiChatWidget.view.html',
            controller: 'aiChatWidgetCtrl',
            controllerAs: 'chatvm'
        };
    }

    angular.module('musicProjectApp').directive('aiChatWidget', aiChatWidget);
})();