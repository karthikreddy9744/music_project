// app-client/common/services/auth.service.js
// app-client/common/services/auth.service.js
(function () {
    'use strict';

    function authService($window) {
        var tokenKey = 'music_project_token';

        this.saveToken = function (token) {
            token ? $window.localStorage.setItem(tokenKey, token) : $window.localStorage.removeItem(tokenKey);
        };

        this.getToken = function () {
            return $window.localStorage.getItem(tokenKey);
        };

        this.logout = function () {
            $window.localStorage.removeItem(tokenKey);
        };

        this.parseToken = function () {
            const token = this.getToken();
            if (!token) return null;

            try {
                var payload = token.split('.')[1];
                payload = payload.replace(/-/g, '+').replace(/_/g, '/');
                payload = decodeURIComponent(atob(payload).split('').map(function(c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                }).join(''));
                
                return JSON.parse(payload);
            } catch (e) {
                return null;
            }
        };

        this.getRole = function () {
            // Assumes JWT payload includes role information (e.g., set during login/register in authController.js)
            const payload = this.parseToken();
            // The actual field might be different; here we assume roles are included in the payload on login.
            // If the backend doesn't send role in JWT, this would need to be fetched via /api/auth/me.
            if (payload && payload.user && payload.user.roles && payload.user.roles.length) {
                return payload.user.roles[0].name; // Using the first role name
            }
            return null;
        };

        this.isAdmin = function () {
            const payload = this.parseToken();
            // This is a robust check, assuming the backend passes roles array in the token payload after lookup.
            return payload && payload.user && payload.user.roles && payload.user.roles.some(r => r.name === 'admin');
        };

        this.isAuthenticated = function () {
            return !!this.getToken();
        };
    }

    angular.module('musicProjectApp').service('authService', authService);
    authService.$inject = ['$window'];
})();