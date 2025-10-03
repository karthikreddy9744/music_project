(function () {
    'use strict';

    function profileCtrl(userService, mediaData) {
        var vm = this;
        vm.pageHeader = {
            title: 'Your Profile'
        };
        vm.isEditMode = false;
        vm.formData = {};
        vm.profileData = {};
        vm.message = "Loading profile...";

        function loadProfile() {
            userService.getProfile()
                .then(function(response) {
                    vm.profileData = response.data;
                    // Add a check to ensure profile data exists before processing
                    if (!vm.profileData) {
                        vm.message = "Could not load your profile data.";
                        return;
                    }

                    // For arrays, convert to comma-separated string for the form
                    if (Array.isArray(vm.profileData.interests)) {
                        vm.profileData.interestsStr = vm.profileData.interests.join(', ');
                    }
                    if (Array.isArray(vm.profileData.hobbies)) {
                        vm.profileData.hobbiesStr = vm.profileData.hobbies.join(', ');
                    }
                    vm.message = "";
                })
                .catch(function(err) {
                    vm.message = "Could not load your profile. " + (err.data.message || err.message);
                });
        }

        vm.onSubmit = function(form) {
            vm.formError = "";
            if (form.$invalid) {
                return;
            }

            // Convert comma-separated strings back to arrays
            if (vm.profileData.interestsStr) {
                vm.profileData.interests = vm.profileData.interestsStr.split(',').map(s => s.trim());
            }
            if (vm.profileData.hobbiesStr) {
                vm.profileData.hobbies = vm.profileData.hobbiesStr.split(',').map(s => s.trim());
            }

            const saveProfile = function(profileData) {
                userService.updateProfile(profileData)
                    .then(function(response) {
                        loadProfile(); // Reload profile to show updated data
                        vm.formError = "Profile saved successfully!";
                    })
                    .catch(function(err) {
                        vm.formError = "Could not save your profile. " + (err.data.message || '');
                    });
            };

            if (vm.profilePictureFile) {
                vm.formError = "Uploading profile picture...";
                mediaData.uploadFile(vm.profilePictureFile, 'image')
                    .then(function(response) {
                        vm.profileData.profilePicture = response.data.url;
                        saveProfile(vm.profileData);
                    }).catch(function(err) {
                        vm.formError = "Image upload failed. " + (err.data.message || 'Please try again.');
                    });
            } else {
                saveProfile(vm.profileData);
            }
        };

        loadProfile();
    }

    angular.module('musicProjectApp').controller('profileCtrl', profileCtrl);
    profileCtrl.$inject = ['userService', 'mediaData'];
})();