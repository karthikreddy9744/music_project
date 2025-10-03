// app-client/components/chat/chat.controller.js
(function () {
    'use strict';

    function chatCtrl(chatService) {
        var vm = this;
        vm.pageHeader = {
            title: 'AI Chat Assistant'
        };

        vm.messages = [];
        vm.newMessage = '';
        vm.isLoading = false;

        vm.sendMessage = function () {
            if (!vm.newMessage.trim()) return;

            const userMessage = vm.newMessage;
            vm.messages.push({ role: 'user', text: userMessage });
            vm.newMessage = '';
            vm.isLoading = true;

            chatService.sendMessage(userMessage)
                .then(function (response) {
                    const aiReply = response.data.reply;
                    vm.messages.push({ role: 'model', text: aiReply });
                })
                .catch(function (err) {
                    vm.messages.push({ role: 'model', text: 'Sorry, I encountered an error. Please try again.' });
                })
                .finally(function () {
                    vm.isLoading = false;
                });
        };
    }

    angular.module('musicProjectApp').controller('chatCtrl', chatCtrl);
    chatCtrl.$inject = ['chatService'];
})();