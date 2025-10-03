(function () {
    'use strict';

    function musicFormCtrl($routeParams, $location, reviewsNewsData, mediaData) {
        var vm = this;
        vm.musicId = $routeParams.musicId;
        vm.isEdit = !!vm.musicId;

        vm.pageHeader = {
            title: vm.isEdit ? 'Edit Music Entry' : 'Add New Music Entry'
        };

        vm.formData = {};

        if (vm.isEdit) {
            reviewsNewsData.getMusicById(vm.musicId)
                .then(function (response) {
                    vm.formData = response.data;
                })
                .catch(function (err) {
                    vm.formError = "Error loading music data. " + err.message;
                });
        }

        vm.onSubmit = function (form) {
            vm.formError = "";
            if (form.$invalid) { return; }

            const saveMusic = function(musicData) {
                const action = vm.isEdit ?
                    reviewsNewsData.updateMusic(vm.musicId, musicData) :
                    reviewsNewsData.addMusic(musicData);

                action.then(function (response) {
                    $location.path('/music/' + (vm.musicId || response.data._id));
                }).catch(function (err) {
                    vm.formError = "Your entry could not be saved. " + (err.data.message || '');
                });
            };

            if (vm.musicFile) {
                vm.formError = "Uploading file...";
                mediaData.uploadFile(vm.musicFile, 'audio')
                    .then(function(response) {
                        // When uploading a new file, it should replace any existing media.
                        // This prevents multiple audio players from appearing.
                        vm.formData.media = [response.data];
                        saveMusic(vm.formData);
                    }).catch(function(err) {
                        vm.formError = "File upload failed. " + (err.data.message || 'Please try again.');
                    });
            } else {
                saveMusic(vm.formData);
            }
        };
    }

    angular.module('musicProjectApp').controller('musicFormCtrl', musicFormCtrl);
    musicFormCtrl.$inject = ['$routeParams', '$location', 'reviewsNewsData', 'mediaData'];
})();