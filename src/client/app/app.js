/**
 *
 * WEB APP SA
 *
 * @author David Breuer <David.Breuer@aat.org.uk>
 * @author Mark Rushton <mark@modernfidelity.co.uk>
 *
 * @description Main angular application
 *
 * @namespace app
 *
 */

(function() {
  'use strict';

  // Declare app level module which depends on views, and components
  angular.module('project', [

      // CORE
      'ngRoute',
      'templates',
      'ngSanitize',
      //'ngAnimate',
      'angular-jwt',
      'angular-storage',

      //'formly',
      //'formlyBootstrap',
      //'ui.bootstrap',

      // SHARED
      //'mobile-menu',
      //'search-bar',
      //'bookmarks',
      //'meta',
      //'menu',
      //'landing-page',

      // CUSTOM
      //'project.auth',
      'project.frontpage',
      //'project.news',
      //'project.about',
      //'project.maintenance',
      //'project.dashboard',
      //'project.contact',
      //'project.login',
      //'project.auth',
      //'project.user',
      //'project.api',

      //'shared'

    ])

    // App config
    .config([

      '$routeProvider',
      '$locationProvider',
      '$httpProvider',
      'jwtInterceptorProvider',

      function($routeProvider, $locationProvider, $httpProvider, jwtInterceptorProvider) {

        $locationProvider.html5Mode({
          enabled: true,
          requireBase: false
        });

        //$httpProvider.interceptors.push('AuthInterceptor');
        $routeProvider.otherwise({redirectTo: '/frontpage'});

        // Add JWT Token to each request
        jwtInterceptorProvider.tokenGetter = function() {
          return sessionStorage.getItem('auth-token');
        };

        $httpProvider.interceptors.push('jwtInterceptor');

      }])

    // Define App constants (ref env vars)
    .constant('API_URL', 'https://api.aat-sa-prod.elasticbeanstalk.com/')

    .run(appRun);

  // Inject Deps
  appRun.$inject = ['$rootScope', '$location'];

  /**
   *
   * App RUN scope
   *
   * @param {object} $rootScope
   * @param {object} $location
   *
   */

  function appRun($rootScope, $location) {

    // register listener to watch route changes
    $rootScope.$on('$routeChangeStart', function(event, current, next) {

      // Page Title
      //$rootScope.pageTitle = MetaDataService.pageTitle();
      //$rootScope.metaDescription = MetaDataService.pageTitle();

      // Check token
      var token = localStorage.getItem('auth-token');

      if (current.access.requiresLogin === true) {

        if (!token) {
          console.log('REQUIRES LOGIN');
          event.preventDefault();
          $location.path('/login');
        }

      }

    });

    // Page Title
    $rootScope.$on('$routeChangeSuccess', function(event, current, previous) {

      //console.log(current.hasOwnProperty('$$route'));

      if (current.hasOwnProperty('$$route')) {
        $rootScope.pageTitle = current.$$route.pageTitle;
        $rootScope.metaDescription = current.$$route.metaDescription;
      }
    });

  }

  // Precompile .tpls
  angular.module('templates', []);

}());
