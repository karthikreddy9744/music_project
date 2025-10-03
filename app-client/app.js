// app-client/app.js
(function () {
  'use strict';
  // Add 'angular.filter' for the groupBy filter in the admin dashboard
  angular.module('musicProjectApp', ['ngRoute', 'chart.js', 'angular.filter'])

    .value('API_BASE', '/api')
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

      const redirectIfAuth = ['authService', '$location', function(authService, $location) {
          if (authService.isAuthenticated()) {
              $location.path('/'); // Redirect to home if already logged in
              return false;
          }
          return true;
      }];

      // Route Configuration
      $routeProvider
        .when('/', {
          templateUrl: 'components/home/home.view.html',
          controller: 'homeCtrl',
          controllerAs: 'vm',
          resolve: { authCheck: requireAuth }
        })
        .when('/login', {
          templateUrl: 'components/auth/login.view.html',
          controller: 'loginCtrl',
          controllerAs: 'vm',
          resolve: { authCheck: redirectIfAuth }
        })
        .when('/register', {
          templateUrl: 'components/auth/register.view.html',
          controller: 'registerCtrl',
          controllerAs: 'vm',
          resolve: { authCheck: redirectIfAuth }
        })
         .when('/profile', {
            templateUrl: 'components/profile/profile.view.html',
            controller: 'profileCtrl',
            controllerAs: 'vm',
            resolve: { authCheck: requireAuth }
        })
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
        .when('/festivals/:festivalid', {
          templateUrl: 'components/festivals/festivalDetail.view.html',
          controller: 'festivalDetailCtrl',
          controllerAs: 'vm',
          resolve: { authCheck: requireAuth }
        })
        .when('/review/add/:itemType/:itemId', {
            templateUrl: 'components/reviews/reviewForm.view.html',
            controller: 'reviewFormCtrl',
            controllerAs: 'vm',
            resolve: { authCheck: requireAuth }
        })
        .when('/news', {
          templateUrl: 'components/news/newsList.view.html',
          controller: 'newsListCtrl',
          controllerAs: 'vm',
          resolve: { authCheck: requireAuth }
        })
        .when('/news/add', {
            templateUrl: 'components/news/newsForm.view.html',
            controller: 'newsFormCtrl',
            controllerAs: 'vm',
            resolve: { adminCheck: requireAdmin }
        })
        .when('/news/:newsId', {
          templateUrl: 'components/news/newsDetail.view.html',
          controller: 'newsDetailCtrl',
          controllerAs: 'vm',
          resolve: { authCheck: requireAuth }
        })
        .when('/news/:newsId/edit', {
            templateUrl: 'components/news/newsForm.view.html',
            controller: 'newsFormCtrl',
            controllerAs: 'vm',
            resolve: { adminCheck: requireAdmin }
        })
        .when('/reviews/search-music', {
            templateUrl: 'components/reviews/musicSearch.view.html',
            controller: 'musicSearchCtrl',
            controllerAs: 'vm',
            resolve: { authCheck: requireAuth }
        })
        .when('/music', {
          templateUrl: 'components/music/musicList.view.html',
          controller: 'musicListCtrl',
          controllerAs: 'vm',
          resolve: { authCheck: requireAuth }
        })
        .when('/music/add', {
            templateUrl: 'components/music/musicForm.view.html',
            controller: 'musicFormCtrl',
            controllerAs: 'vm',
            resolve: { adminCheck: requireAdmin }
        })
        .when('/music/:musicId', {
          templateUrl: 'components/music/musicDetail.view.html',
          controller: 'musicDetailCtrl',
          controllerAs: 'vm',
          resolve: { authCheck: requireAuth }
        })
        .when('/music/:musicId/edit', {
            templateUrl: 'components/music/musicForm.view.html',
            controller: 'musicFormCtrl',
            controllerAs: 'vm',
            resolve: { adminCheck: requireAdmin }
        })
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

})();