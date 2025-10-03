// app-client/common/services/auth.service.js
// app-client/common/services/auth.service.js
(function () {
    'use strict';

    function authService($window, $injector, API_BASE) {
        var tokenKey = 'music_project_token';
        var userKey = 'music_project_user'; // <-- New key for storing user data
        var self = this; // Capture the 'this' context
        const api = `${API_BASE}/auth`;

        this.login = function(credentials) {
            // Lazily inject $http to avoid circular dependency
            const $http = $injector.get('$http');
            return $http.post(`${api}/login`, credentials).then((response) => {
                if (response.data.token && response.data.user) {
                    self.saveToken(response.data.token, response.data.user);
                }
                return response;
            });
        };

        this.register = function(credentials) {
            // Lazily inject $http to avoid circular dependency
            const $http = $injector.get('$http');
            return $http.post(`${api}/register`, credentials).then((response) => {
                // The register endpoint might also return a token for immediate login
                return response;
            });
        };
        this.saveToken = function (token, user) { // <-- ADDED 'user' argument
            token ? $window.localStorage.setItem(tokenKey, token) : $window.localStorage.removeItem(tokenKey);
            
            // Store user data (including roles) in local storage
            if (user) {
                $window.localStorage.setItem(userKey, JSON.stringify(user));
            } else {
                $window.localStorage.removeItem(userKey);
            }
        };

        this.getToken = function () {
            return $window.localStorage.getItem(tokenKey);
        };
        
        this.getUser = function () { // <-- New method to retrieve user data
            const userJson = $window.localStorage.getItem(userKey);
            return userJson ? JSON.parse(userJson) : null;
        };

        this.logout = function () {
            $window.localStorage.removeItem(tokenKey);
            $window.localStorage.removeItem(userKey); // <-- Clear user data on logout
        };

        // parseToken is generally safe, but rely on getUser() for roles.
        // ... (parseToken function remains the same) ...

        this.isAdmin = function () {
            const user = self.getUser(); // <-- Use the captured 'self' context
            // Check if user object exists, has roles, and if any role name is 'admin'
            return user && user.roles && user.roles.some(role => role.name === 'admin');
        };

        this.isAuthenticated = function () {
            return !!this.getToken();
        };
    }

    angular.module('musicProjectApp').service('authService', authService);
    authService.$inject = ['$window', '$injector', 'API_BASE'];
})();