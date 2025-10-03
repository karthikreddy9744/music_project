// app-client/common/services/chat.service.js
(function () {
    'use strict';

    function chatService($http, API_BASE) {
        this.sendMessage = function (message, context) {
            return $http.post(`${API_BASE}/chat`, { message: message, context: context });
        };
    }

    angular.module('musicProjectApp').service('chatService', chatService);
    chatService.$inject = ['$http', 'API_BASE'];
})();