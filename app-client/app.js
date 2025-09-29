// app-client/app.js
// app-client/app.js
(function () {
  'use strict';

  angular.module('musicProjectApp', ['ngRoute'])
    .config(['$routeProvider', '$locationProvider', '$httpProvider', function ($routeProvider, $locationProvider, $httpProvider) {
      
      $locationProvider.html5Mode(true).hashPrefix('');
      $httpProvider.interceptors.push('authInterceptor'); // Attach token to requests

      // Route Guards (Resolvers)
      const requireAdmin = ['authService', '$location', function(authService, $location) {
          if (!authService.isAdmin()) {
              $location.path('/');
              return false;
          }
          return true;
      }];
      
      const requireAuth = ['authService', '$location', function(authService, $location) {
          if (!authService.isAuthenticated()) {
              $location.path('/login');
              return false;
          }
          return true;
      }];


      // Route Configuration
      $routeProvider
        // Home/Festivals (Public)
        .when('/', {
          templateUrl: 'components/home/home.view.html',
          controller: 'homeCtrl',
          controllerAs: 'vm'
        })
        .when('/festivals/:festivalid', {
          templateUrl: 'components/festivals/festivalDetail.view.html',
          controller: 'festivalDetailCtrl',
          controllerAs: 'vm'
        })

        // Auth (Public)
        .when('/login', {
          templateUrl: 'components/auth/login.view.html',
          controller: 'loginCtrl',
          controllerAs: 'vm'
        })
        .when('/register', {
          templateUrl: 'components/auth/register.view.html',
          controller: 'registerCtrl',
          controllerAs: 'vm'
        })

        // Admin/Auth Protected Routes
        .when('/festivals/add', {
            templateUrl: 'components/festivals/festivalForm.view.html',
            controller: 'festivalFormCtrl',
            controllerAs: 'vm',
            resolve: { adminCheck: requireAdmin }
        })
        .when('/festivals/:festivalid/edit', {
            templateUrl: 'components/festivals/festivalForm.view.html',
            controller: 'festivalFormCtrl',
            controllerAs: 'vm',
            resolve: { adminCheck: requireAdmin }
        })
        .when('/reviews/add', { // Post Review is separate from festival in backend
            templateUrl: 'components/reviews/reviewForm.view.html',
            controller: 'reviewFormCtrl',
            controllerAs: 'vm',
            resolve: { authCheck: requireAuth }
        })
        .when('/reviews/:reviewid/edit', {
            templateUrl: 'components/reviews/reviewForm.view.html',
            controller: 'reviewFormCtrl',
            controllerAs: 'vm',
            resolve: { authCheck: requireAuth }
        })

        // News (Public List/Detail, Admin Protected CRUD)
        .when('/news', {
          templateUrl: 'components/news/newsList.view.html',
          controller: 'newsListCtrl',
          controllerAs: 'vm'
        })
        .when('/news/add', {
            templateUrl: 'components/news/newsForm.view.html',
            controller: 'newsFormCtrl',
            controllerAs: 'vm',
            resolve: { adminCheck: requireAdmin }
        })
        .when('/news/:newsid', {
          templateUrl: 'components/news/newsDetail.view.html',
          controller: 'newsDetailCtrl',
          controllerAs: 'vm'
        })
        .when('/news/:newsid/edit', {
            templateUrl: 'components/news/newsForm.view.html',
            controller: 'newsFormCtrl',
            controllerAs: 'vm',
            resolve: { adminCheck: requireAdmin }
        })
        
        // Admin
        .when('/admin/stats', {
            templateUrl: 'components/admin/adminStats.view.html',
            controller: 'adminStatsCtrl',
            controllerAs: 'vm',
            resolve: { adminCheck: requireAdmin }
        })
        
        .otherwise({
          redirectTo: '/'
        });
    }]);

    // JWT Interceptor Factory
    angular.module('musicProjectApp').factory('authInterceptor', authInterceptor);
    authInterceptor.$inject = ['authService'];
    function authInterceptor(authService) {
        return {
            request: function(config) {
                const token = authService.getToken();
                if (token) {
                    config.headers = config.headers || {};
                    config.headers.Authorization = 'Bearer ' + token;
                }
                return config;
            }
        };
    }

})();