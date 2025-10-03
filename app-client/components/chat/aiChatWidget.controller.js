// app-client/components/chat/aiChatWidget.controller.js
(function () {
    'use strict';

    function aiChatWidgetCtrl($rootScope, $scope, chatService) {
        var vm = this;
        vm.isOpen = false;
        vm.messages = [];
        vm.newMessage = '';
        vm.isLoading = false;

        vm.toggleChat = function () {
            vm.isOpen = !vm.isOpen;
        };

        vm.sendMessage = function () {
            if (!vm.newMessage.trim()) return;

            const userMessage = vm.newMessage;
            vm.messages.push({ role: 'user', text: userMessage });
            vm.newMessage = '';
            vm.isLoading = true;

            // Check for context provided by other controllers
            const pageContext = $rootScope.pageContext || null;

            chatService.sendMessage(userMessage, pageContext)
                .then(function (response) {
                    const aiReply = response.data.reply;
                    vm.messages.push({ role: 'model', text: aiReply });
                })
                .catch(function (err) {
                    vm.messages.push({ role: 'model', text: 'Sorry, I encountered an error. Please try again.' });
                })
                .finally(function () {
                    vm.isLoading = false;
                    // Scroll to the bottom of the chat window
                    setTimeout(function() {
                        const chatWindow = document.querySelector('.chat-widget-body');
                        if (chatWindow) {
                            chatWindow.scrollTop = chatWindow.scrollHeight;
                        }
                    }, 0);
                });
        };

        // Clear context when the route changes
        $scope.$on('$routeChangeSuccess', function () {
            $rootScope.pageContext = null;
        });
    }

    angular.module('musicProjectApp').controller('aiChatWidgetCtrl', aiChatWidgetCtrl);
    aiChatWidgetCtrl.$inject = ['$rootScope', '$scope', 'chatService'];
})();